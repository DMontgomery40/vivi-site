// Cards Builder (Job + SSE) logic with PERMANENT VISIBLE PROGRESS. Exported via window.CardsBuilder
;(function(){
  'use strict';
  const api = (window.CoreUtils && window.CoreUtils.api) ? window.CoreUtils.api : (p=>p);
  const state = (window.CoreUtils && window.CoreUtils.state) ? window.CoreUtils.state : {};
  const $ = (id) => document.getElementById(id);
  let cardsJob = { id: null, timer: null, sse: null };

  // Populate repo dropdown
  async function populateRepoSelect(){
    const sel = $('cards-repo-select');
    if (!sel) return;
    try {
      const r = await fetch(api('/api/config'));
      const config = await r.json();
      sel.innerHTML = '';
      (config.repos || []).forEach(repo => {
        const opt = document.createElement('option');
        opt.value = repo.name;
        opt.textContent = repo.name;
        sel.appendChild(opt);
      });
      sel.value = (config.env && config.env.REPO) || config.default_repo || 'agro';
    } catch(e){ console.error('[cards_builder] Failed to load repos:', e); }
  }

  function showProgress(){
    const cont = $('cards-progress-container');
    if (cont) cont.style.display = 'block';
  }

  function hideProgress(){
    const cont = $('cards-progress-container');
    if (cont) cont.style.display = 'none';
  }

  function showCompletionStatus(data){
    // Show progress bar as a persistent status summary
    const cont = $('cards-progress-container');
    if (cont) {
      cont.style.display = 'block';
      cont.style.border = '2px solid var(--ok)';
    }
    const title = cont?.querySelector('div[style*="Building Cards"]');
    if (title) {
      title.textContent = '✓ Cards Build Complete';
      title.style.color = 'var(--ok)';
    }
    updateProgress(data);
    // Keep visible - don't auto-hide
  }

  function showErrorStatus(error){
    const cont = $('cards-progress-container');
    if (cont) {
      cont.style.display = 'block';
      cont.style.border = '2px solid var(--err)';
    }
    const title = cont?.querySelector('div');
    if (title) {
      title.textContent = '✗ Cards Build Failed';
      title.style.color = 'var(--err)';
    }
    const tipEl = $('cards-progress-tip');
    if (tipEl) tipEl.textContent = `❌ ${error || 'Unknown error'}`;
  }

  function highlightStage(stage){
    const all = ['scan','chunk','summarize','sparse','write','finalize'];
    all.forEach(s => {
      const el = $('cards-progress-stage-'+s);
      if (el) {
        if (s === stage) {
          el.style.color = 'var(--fg)';
          el.style.borderColor = 'var(--ok)';
          el.style.background = 'var(--ok)';
          el.style.fontWeight = '600';
        } else {
          el.style.color = 'var(--fg-muted)';
          el.style.borderColor = 'var(--line)';
          el.style.background = 'transparent';
          el.style.fontWeight = '400';
        }
      }
    });
  }

  function updateProgress(data){
    try {
      const { pct, total, done, tip, model, stage, throughput, eta_s, repo } = data || {};
      
      const bar = $('cards-progress-bar');
      if (bar) bar.style.width = `${pct||0}%`;
      
      const stats = $('cards-progress-stats');
      if (stats) stats.textContent = `${done||0} / ${total||0} (${(pct||0).toFixed(1)}%)`;
      
      const thr = $('cards-progress-throughput');
      if (thr) thr.textContent = throughput || '--';
      
      const eta = $('cards-progress-eta');
      if (eta) eta.textContent = `ETA: ${eta_s||0}s`;
      
      const tipEl = $('cards-progress-tip');
      if (tipEl && tip) tipEl.textContent = `💡 ${tip}`;
      
      const repoEl = $('cards-progress-repo');
      if (repoEl && repo) repoEl.textContent = repo;
      
      highlightStage(stage);
    } catch(e){ console.error('[cards_builder] Update progress failed:', e); }
  }

  function stopCardsStreams(){
    if (cardsJob.timer) { clearInterval(cardsJob.timer); cardsJob.timer = null; }
    if (cardsJob.sse) { try { cardsJob.sse.close(); } catch{} cardsJob.sse = null; }
  }

  async function startCardsBuild(){
    try{
      const repo = $('cards-repo-select')?.value || 'agro';
      const enrich = $('cards-enrich-gui')?.checked ? 1 : 0;
      const excludeDirs = $('cards-exclude-dirs')?.value || '';
      const excludePatterns = $('cards-exclude-patterns')?.value || '';
      const excludeKeywords = $('cards-exclude-keywords')?.value || '';
      
      const params = new URLSearchParams({
        repo,
        enrich,
        exclude_dirs: excludeDirs,
        exclude_patterns: excludePatterns,
        exclude_keywords: excludeKeywords
      });
      
      showProgress();
      // Reset styling for new build
      const cont = $('cards-progress-container');
      if (cont) cont.style.border = '2px solid var(--accent)';
      const title = cont?.querySelector('div');
      if (title) {
        title.textContent = '⚡ Building Cards...';
        title.style.color = 'var(--fg)';
      }
      updateProgress({ stage: 'scan', done: 0, total: 0, pct: 0, repo, tip: 'Starting cards build...' });
      
      const r = await fetch(api(`/api/cards/build/start?${params}`), { method: 'POST' });
      if (r.status === 409) {
        const d = await r.json();
        if (window.showStatus) window.showStatus(d.detail || 'Job already running', 'error');
        hideProgress();
        return;
      }
      const d = await r.json();
      cardsJob.id = d.job_id;
      if (window.showStatus) window.showStatus('Cards build started', 'loading');
      
      try {
        const es = new EventSource(api(`/api/cards/build/stream/${cardsJob.id}`));
        cardsJob.sse = es;
        es.addEventListener('progress', (ev) => { try { const data = JSON.parse(ev.data||'{}'); updateProgress(data); } catch(e){ console.error('[cards_builder] SSE parse error:', e); } });
        es.addEventListener('done', async (ev) => {
          stopCardsStreams();
          const finalData = JSON.parse(ev.data||'{}');
          showCompletionStatus(finalData);
          if (window.showStatus) window.showStatus('✓ Cards built successfully', 'success');
          if (window.Cards?.load) await window.Cards.load();
        });
        es.addEventListener('error', (_ev) => { console.log('[cards_builder] SSE error, falling back to polling'); });
        es.addEventListener('cancelled', (_ev) => {
          stopCardsStreams();
          if (window.showStatus) window.showStatus('Cards build cancelled', 'warn');
          hideProgress();
        });
      } catch (_e) {
        // SSE not available; use polling
        cardsJob.timer = setInterval(async () => {
          try {
            const s = await (await fetch(api(`/api/cards/build/status/${cardsJob.id}`))).json();
            updateProgress(s);
            if ((s.status||'')==='done'){
              stopCardsStreams();
              showCompletionStatus(s);
              if (window.Cards?.load) await window.Cards.load();
              if (window.showStatus) window.showStatus('✓ Cards built successfully', 'success');
            }
            if ((s.status||'')==='error'){
              stopCardsStreams();
              showErrorStatus(s.error||'Unknown error');
              if (window.showStatus) window.showStatus('✗ Cards build failed: '+(s.error||'Unknown error'), 'error');
            }
          } catch(e){ console.error('[cards_builder] Polling error:', e); }
        }, 1000);
      }
    }catch(e){
      if (window.showStatus) window.showStatus('Failed to start cards build: '+e.message, 'error');
      hideProgress();
    }
  }

  async function cancelCardsBuild(){
    if (!cardsJob.id) return;
    try {
      await fetch(api('/api/cards/build/cancel/'+cardsJob.id), { method: 'POST' });
      stopCardsStreams();
      hideProgress();
      if (window.showStatus) window.showStatus('Cards build cancelled', 'warn');
    } catch (e) {
      if (window.showStatus) window.showStatus('Cancel failed: '+e.message, 'error');
    }
  }

  async function showLogs(){
    try {
      const r = await fetch(api('/api/cards/build/logs'));
      const d = await r.json();
      alert(d.content || 'No logs available');
    } catch(e){
      alert('Unable to load logs: ' + e.message);
    }
  }

  // Bind events on load
  document.addEventListener('DOMContentLoaded', () => {
    populateRepoSelect();
    const buildBtn = $('btn-cards-build');
    if (buildBtn) buildBtn.addEventListener('click', startCardsBuild);
    const cancelBtn = $('cards-progress-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', cancelCardsBuild);
    const logsBtn = $('cards-progress-logs');
    if (logsBtn) logsBtn.addEventListener('click', showLogs);
    const clearBtn = $('cards-progress-clear');
    if (clearBtn) clearBtn.addEventListener('click', hideProgress);
  });

  window.CardsBuilder = { startCardsBuild, cancelCardsBuild, showLogs, updateProgress, populateRepoSelect };
})();

