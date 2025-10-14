// Onboarding Wizard Module. Exported via window.Onboarding
;(function(){
  'use strict';
  const { api, $, $$, state } = window.CoreUtils || {};

  if (!api || !$ || !$$) {
    console.error('[onboarding.js] CoreUtils not loaded!');
    return;
  }

  const onboardingState = {
    step: 1,
    maxStep: 5,
    projectDraft: {
      sourceType: 'folder',
      folderPath: '',
      githubUrl: '',
      githubBranch: 'main',
      githubToken: '',
      saveToken: false
    },
    indexing: { running: false, stage: 'idle', progress: 0 },
    questions: [
      { text: 'Where is hybrid retrieval implemented?', answer: null },
      { text: 'Where are indexing settings?', answer: null },
      { text: 'How do I change the default model?', answer: null }
    ],
    settings: { speed: 2, quality: 2, cloud: 1 }
  };

  function showOnboardStep(n){
    if (n < 1 || n > onboardingState.maxStep) return;
    onboardingState.step = n;
    $$('.ob-dot').forEach((dot, i) => {
      dot.classList.remove('active', 'completed');
      if (i + 1 === n) dot.classList.add('active');
      else if (i + 1 < n) dot.classList.add('completed');
    });
    $$('.ob-step').forEach((step, i) => { step.classList.toggle('active', i + 1 === n); });
    const backBtn = $('#onboard-back'); const nextBtn = $('#onboard-next');
    if (backBtn) backBtn.style.display = n === 1 ? 'none' : 'block';
    if (nextBtn) nextBtn.textContent = n === onboardingState.maxStep ? 'Done' : 'Next →';
    try { localStorage.setItem('onboarding_step', String(n)); localStorage.setItem('onboarding_state', JSON.stringify(onboardingState)); } catch {}
  }

  function nextOnboard(){
    if (onboardingState.step === onboardingState.maxStep){
      if (window.Tabs && window.Tabs.switchTab) window.Tabs.switchTab('dashboard');
      try { localStorage.removeItem('onboarding_step'); } catch {}
      return;
    }
    if (onboardingState.step === 2){
      const mode = onboardingState.projectDraft.sourceType;
      if (mode === 'folder'){
        const path = $('#onboard-folder-path');
        if (path && !path.value.trim()){ alert('Please select a folder or enter a path'); return; }
        onboardingState.projectDraft.folderPath = path ? path.value.trim() : '';
      } else if (mode === 'github'){
        const url = $('#onboard-github-url'); if (url && !url.value.trim()){ alert('Please enter a GitHub repository URL'); return; }
        onboardingState.projectDraft.githubUrl = url ? url.value.trim() : '';
        const branch = $('#onboard-github-branch'); const token = $('#onboard-github-token');
        onboardingState.projectDraft.githubBranch = branch && branch.value.trim() ? branch.value.trim() : 'main';
        onboardingState.projectDraft.githubToken = token ? token.value.trim() : '';
      }
    }
    if (onboardingState.step === 2){ setTimeout(()=> startOnboardingIndexing(), 500); }
    showOnboardStep(onboardingState.step + 1);
  }

  function backOnboard(){ if (onboardingState.step > 1) showOnboardStep(onboardingState.step - 1); }

  async function startOnboardingIndexing(){
    onboardingState.indexing.running = true;
    const bar = $('#onboard-index-bar'); const status = $('#onboard-index-status'); const log = $('#onboard-index-log'); const nextBtn = $('#onboard-next');
    if (nextBtn) nextBtn.disabled = true;
    updateIndexStage('scan', 20); if (status) status.textContent = 'Scanning files...'; await new Promise(r=>setTimeout(r, 1000));
    updateIndexStage('keywords', 50); if (status) status.textContent = 'Building keyword index...';
    try{
      const res = await fetch(api('/api/index/start'), { method:'POST' }); if (!res.ok) throw new Error('Failed to start indexing');
      let running = true;
      while (running){
        await new Promise(r=>setTimeout(r,2000));
        const statusRes = await fetch(api('/api/index/status')); const data = await statusRes.json();
        if (log && data.lines){ log.textContent = data.lines.join('\n'); log.scrollTop = log.scrollHeight; }
        running = data.running !== false;
        if (!running){
          updateIndexStage('keywords', 70); if (status) status.textContent = 'Building cards...';
          await fetch(api('/api/cards/build'), { method:'POST' });
          updateIndexStage('smart', 100); if (status) status.textContent = 'Indexing complete!';
          if (nextBtn) nextBtn.disabled = false; onboardingState.indexing.running = false;
        }
      }
    }catch(err){
      console.error('Indexing error:', err);
      if (status) status.textContent = 'Indexing completed with keyword-only mode';
      const fb = $('#onboard-index-fallback'); if (fb) fb.style.display = 'block';
      if (bar) bar.style.width = '70%'; if (nextBtn) nextBtn.disabled = false; onboardingState.indexing.running = false;
    }
  }

  function updateIndexStage(stage, progress){
    onboardingState.indexing.stage = stage; onboardingState.indexing.progress = progress;
    const bar = $('#onboard-index-bar'); if (bar) bar.style.width = progress + '%';
    $$('.ob-stage').forEach(el => { const s = el.getAttribute('data-stage'); el.classList.remove('active', 'completed'); if (s === stage) el.classList.add('active'); else if (['scan','keywords'].indexOf(s) < ['scan','keywords','smart'].indexOf(stage)) el.classList.add('completed'); });
  }

  async function askQuestion(qIndex){
    const input = $(`#onboard-q${qIndex}`); const answerDiv = $(`#onboard-ans-${qIndex}`); const traceLink = $(`#onboard-trace-${qIndex}`); const btn = $(`.ob-ask-btn[data-q="${qIndex}"]`);
    if (!input || !answerDiv) return; const question = input.value.trim(); if (!question) return; if (btn) btn.disabled = true; answerDiv.textContent = 'Thinking...'; answerDiv.classList.add('visible');
    try{
      const repo = (state.config && state.config.REPO) ? state.config.REPO : 'agro';
      const res = await fetch(api('/api/chat'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question, repo }) });
      if (!res.ok) throw new Error('Failed to get answer'); const data = await res.json(); answerDiv.textContent = data.answer || 'No answer received'; onboardingState.questions[qIndex - 1].answer = data.answer; if (traceLink) traceLink.style.display = 'inline-block';
    }catch(err){ console.error('Question error:', err); answerDiv.textContent = 'Error: ' + err.message; }
    finally{ if (btn) btn.disabled = false; }
  }

  async function showTrace(qIndex){
    const panel = $(`#onboard-trace-panel-${qIndex}`); if (!panel) return; if (panel.style.display === 'block'){ panel.style.display = 'none'; return; }
    panel.textContent = 'Loading trace...'; panel.style.display = 'block';
    try{ const res = await fetch(api('/api/traces/latest')); if (!res.ok) throw new Error('Failed to load trace'); const data = await res.json(); panel.textContent = JSON.stringify(data, null, 2); }
    catch(err){ panel.textContent = 'Error loading trace: ' + err.message; }
  }

  function updateSettingsSummary(){
    const summary = $('#onboard-summary-content'); if (!summary) return;
    const { speed, quality, cloud } = onboardingState.settings;
    const speedMap = { 1:'MQ_REWRITES=1, LANGGRAPH_FINAL_K=10', 2:'MQ_REWRITES=2, LANGGRAPH_FINAL_K=15', 3:'MQ_REWRITES=3, LANGGRAPH_FINAL_K=20', 4:'MQ_REWRITES=4, LANGGRAPH_FINAL_K=25' };
    const qualityMap = { 1:'RERANK_BACKEND=none, GEN_MODEL=local', 2:'RERANK_BACKEND=local, GEN_MODEL=gpt-4o-mini', 3:'RERANK_BACKEND=cohere, GEN_MODEL=gpt-4o, CONF_TOP1=0.55' };
    const cloudMap = { 1:'EMBEDDING_TYPE=local, VECTOR_BACKEND=qdrant (local)', 2:'EMBEDDING_TYPE=openai, VECTOR_BACKEND=qdrant (cloud)' };
    summary.innerHTML = `<div>Speed: ${speedMap[speed]||'default'}</div><div>Quality: ${qualityMap[quality]||'default'}</div><div>Cloud: ${cloudMap[cloud]||'default'}</div>`;
  }

  async function saveAsProject(){
    const name = prompt('Enter a name for this project:'); if (!name || !name.trim()) return;
    const { speed, quality, cloud } = onboardingState.settings;
    const profile = { name: name.trim(), sources: onboardingState.projectDraft, settings: { MQ_REWRITES: speed, LANGGRAPH_FINAL_K: 10 + (speed*5), RERANK_BACKEND: quality===1?'none':(quality===2?'local':'cohere'), GEN_MODEL: quality===1?'local':'gpt-4o-mini', EMBEDDING_TYPE: cloud===1?'local':'openai' }, golden: onboardingState.questions.map(q=>q.text) };
    try{ const res = await fetch(api('/api/profiles/save'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(profile) }); if (!res.ok) throw new Error('Failed to save project'); alert('Project saved successfully!'); await fetch(api('/api/profiles/apply'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ profile_name: name.trim() }) }); }
    catch(err){ console.error('Save project error:', err); alert('Error saving project: ' + err.message); }
  }

  async function runTinyEval(){
    const box=$('#onboard-eval-progress'), bar=$('#onboard-eval-bar'), status=$('#onboard-eval-status'), result=$('#onboard-eval-result'); if (!box) return; box.style.display='block'; if(status) status.textContent='Running evaluation...'; if(bar) bar.style.width='30%';
    try{ await fetch(api('/api/eval/run'), { method:'POST' }); let running=True; }catch{}
    try{
      await fetch(api('/api/eval/run'), { method:'POST' });
      let running=true; while(running){ await new Promise(r=>setTimeout(r,2000)); const statusRes = await fetch(api('/api/eval/status')); const data = await statusRes.json(); running = data.running === true; if(!running){ if(bar) bar.style.width='100%'; if(status) status.textContent='Evaluation complete'; const resRes = await fetch(api('/api/eval/results')); const resData = await resRes.json(); if (result && resData){ const score = resData.top1_accuracy || resData.topk_accuracy || 0; result.textContent = `Retrieval Score: ${(score*100).toFixed(1)}%`; } } }
    }catch(err){ console.error('Eval error:', err); if(status) status.textContent='Evaluation failed'; if(result) result.textContent='Error: '+err.message; }
  }

  async function askHelpQuestion(){
    const input=$('#onboard-help-input'), results=$('#onboard-help-results'), btn=$('#onboard-help-send'); if(!input||!results) return; const question=input.value.trim(); if(!question) return; if(btn){btn.disabled=true;btn.textContent='Asking...';btn.style.opacity='0.6';}
    results.innerHTML = '<div style="display:flex;align-items:center;gap:8px;color:var(--fg-muted);"><div style="width:16px;height:16px;border:2px solid var(--accent);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div> Thinking...</div>';
    results.classList.add('visible');
    try{ const repo = (state.config && state.config.REPO) ? state.config.REPO : 'agro'; const res = await fetch(api('/api/chat'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question, repo }) }); if(!res.ok) throw new Error('Failed to get answer'); const data=await res.json(); const answer=(data.answer||'No answer received').replace(/\n/g,'<br>'); results.innerHTML=answer; }
    catch(err){ console.error('Help question error:', err); results.innerHTML = '<span style="color:var(--err);">Error: '+err.message+'</span>'; }
    finally{ if(btn){btn.disabled=false;btn.textContent='Ask';btn.style.opacity='1';} }
  }

  function initOnboarding(){
    try{ const savedStep = localStorage.getItem('onboarding_step'); const savedState = localStorage.getItem('onboarding_state'); if(savedStep){ const step=parseInt(savedStep,10); if(step>=1 && step<=onboardingState.maxStep){ onboardingState.step = step; } } if(savedState){ const parsed=JSON.parse(savedState); Object.assign(onboardingState, parsed); } }catch{}
    $$('.ob-card').forEach(card=>{ card.addEventListener('click', ()=>{ const choice = card.getAttribute('data-choice'); onboardingState.projectDraft.sourceType = choice; nextOnboard(); }); });
    $$('.ob-mode-tab').forEach(tab=>{ tab.addEventListener('click', ()=>{ const mode = tab.getAttribute('data-mode'); onboardingState.projectDraft.sourceType = mode; $$('.ob-mode-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active'); $$('.ob-mode-content').forEach(c=>c.classList.remove('active')); const tgt=$(`#onboard-${mode}-mode`); if(tgt) tgt.classList.add('active'); }); });
    const folderBtn=$('#onboard-folder-btn'), folderPicker=$('#onboard-folder-picker'), folderDisplay=$('#onboard-folder-display'), folderPath=$('#onboard-folder-path');
    if (folderBtn && folderPicker){ folderBtn.addEventListener('click', ()=>folderPicker.click()); folderPicker.addEventListener('change',(e)=>{ if(e.target.files && e.target.files.length>0){ const path=e.target.files[0].webkitRelativePath || e.target.files[0].path || ''; const folderName = path.split('/')[0] || 'Selected folder'; if (folderDisplay) folderDisplay.textContent = folderName; if (folderPath) folderPath.value = folderName; } }); }
    $$('.ob-ask-btn').forEach(btn=>{ btn.addEventListener('click', ()=>{ const qIndex = parseInt(btn.getAttribute('data-q'),10); askQuestion(qIndex); }); });
    for(let i=1;i<=3;i++){ const link=$(`#onboard-trace-${i}`); if(link){ link.addEventListener('click',(e)=>{ e.preventDefault(); showTrace(i); }); } }
    const saveGolden=$('#onboard-save-golden'); if (saveGolden){ saveGolden.addEventListener('click', ()=> alert('Golden questions saved! (Feature placeholder)') ); }
    const speedSlider=$('#onboard-slider-speed'), qualitySlider=$('#onboard-slider-quality'), cloudSlider=$('#onboard-slider-cloud'); [speedSlider,qualitySlider,cloudSlider].forEach(slider=>{ if(slider){ slider.addEventListener('input', ()=>{ if(speedSlider) onboardingState.settings.speed = parseInt(speedSlider.value,10); if(qualitySlider) onboardingState.settings.quality = parseInt(qualitySlider.value,10); if(cloudSlider) onboardingState.settings.cloud = parseInt(cloudSlider.value,10); updateSettingsSummary();}); } });
    updateSettingsSummary();
    const saveProject=$('#onboard-save-project'), runEval=$('#onboard-run-eval'); if (saveProject) saveProject.addEventListener('click', saveAsProject); if (runEval) runEval.addEventListener('click', runTinyEval);
    const helpSend=$('#onboard-help-send'); if (helpSend) helpSend.addEventListener('click', askHelpQuestion);
    $$('.ob-help-pill').forEach(pill=>{ pill.addEventListener('click', ()=>{ const q=pill.getAttribute('data-q'); const input=$('#onboard-help-input'); if(input&&q){ input.value=q; askHelpQuestion(); } }); });
    const openChat=$('#onboard-open-chat'); if (openChat){ openChat.addEventListener('click',(e)=>{ e.preventDefault(); if (window.Tabs && window.Tabs.switchTab) window.Tabs.switchTab('chat'); }); }
    const backBtn=$('#onboard-back'), nextBtn=$('#onboard-next'); if (backBtn) backBtn.addEventListener('click', backOnboard); if (nextBtn) nextBtn.addEventListener('click', nextOnboard);
    showOnboardStep(onboardingState.step);
  }

  function ensureOnboardingInit(){ if (!onboardingState._initialized){ initOnboarding(); onboardingState._initialized = true; } }

  window.Onboarding = { ensureOnboardingInit, initOnboarding };
})();

