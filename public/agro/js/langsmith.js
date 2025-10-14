// LangSmith viewer binder. Exported via window.LangSmith
;(function(){
  'use strict';
  const api = (window.CoreUtils && window.CoreUtils.api) ? window.CoreUtils.api : (p=>p);
  const state = (window.CoreUtils && window.CoreUtils.state) ? window.CoreUtils.state : {};

  function bind(){
    const btn = document.getElementById('btn-ls-latest');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    const projEl = document.getElementById('ls-project');
    if (projEl && state.config && state.config.env && state.config.env.LANGCHAIN_PROJECT) {
      projEl.value = state.config.env.LANGCHAIN_PROJECT;
    }
    btn.addEventListener('click', async () => {
      const proj = projEl && projEl.value ? projEl.value.trim() : '';
      const shareSel = document.getElementById('ls-share');
      const share = shareSel && String(shareSel.value) === 'false' ? 'false' : 'true';
      const qs = new URLSearchParams({ share });
      if (proj) qs.set('project', proj);
      const frame = document.getElementById('ls-iframe');
      const link = document.getElementById('ls-open');
      const note = document.getElementById('ls-note');
      try {
        if (frame) frame.src = 'about:blank';
        const r = await fetch(api(`/api/langsmith/latest?${qs.toString()}`));
        const d = await r.json();
        if (d && d.url) {
          if (link) { link.href = d.url; link.style.display = 'inline-block'; }
          if (frame) {
            frame.src = d.url;
            frame.addEventListener('error', () => { if (note) note.style.display = 'block'; }, { once: true });
            setTimeout(()=>{ if (note) note.style.display = 'block'; }, 1500);
          }
        } else {
          if (note) { note.style.display = 'block'; note.textContent = 'No recent LangSmith run found or URL unavailable.'; }
        }
      } catch (e) {
        if (note) { note.style.display = 'block'; note.textContent = 'Failed to load LangSmith run: ' + e.message; }
      }
    });
  }

  window.LangSmith = { bind };
})();

