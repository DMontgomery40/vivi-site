// Trace panel utilities. Exported via window.Trace
;(function(){
  'use strict';

  const api = (window.CoreUtils && window.CoreUtils.api) ? window.CoreUtils.api : (p=>p);

  function _fmtTable(rows, headers){
    const cols = headers.length;
    const widths = new Array(cols).fill(0);
    const all = [headers].concat(rows);
    all.forEach(r => r.forEach((c,i)=>{ widths[i] = Math.max(widths[i], String(c||'').length); }));
    const line = (r)=> r.map((c,i)=> String(c||'').padEnd(widths[i])).join('  ');
    return ['```', line(headers), line(widths.map(w=>'-'.repeat(w))), ...rows.map(line), '```'].join('\n');
  }

  async function loadLatestTrace(targetId='trace-output'){
    try{
      const repoSel = document.querySelector('select[name="REPO"]');
      const repo = repoSel && repoSel.value ? `?repo=${encodeURIComponent(repoSel.value)}` : '';
      const r = await fetch(api(`/api/traces/latest${repo}`));
      const d = await r.json();
      const el = document.getElementById(targetId);
      if (!el) return;
      if (!d || !d.trace){ el.textContent = 'No traces yet. Enable LangChain Tracing V2 in Misc and run a query via /answer.'; return; }
      const t = d.trace;
      const decide = (t.events||[]).find(ev=>ev.kind==='router.decide');
      const rer = (t.events||[]).find(ev=>ev.kind==='reranker.rank');
      const gate = (t.events||[]).find(ev=>ev.kind==='gating.outcome');
      const header = [];
      header.push(`Policy: ${(decide?.data?.policy)||'—'}`);
      header.push(`Intent: ${(decide?.data?.intent)||'—'}`);
      header.push(`Final K: ${(rer?.data?.output_topK)||'—'}`);
      header.push(`Vector: ${((d && d.repo) ? (document.querySelector('[name="VECTOR_BACKEND"]').value||'qdrant'):'qdrant')}`);

      const parts = [];
      parts.push(header.join('  •  '));
      parts.push('');
      // Candidates
      const pre = (t.events||[]).find(ev=>ev.kind==='retriever.retrieve');
      if (pre && Array.isArray(pre.data?.candidates)){
        const rows = pre.data.candidates.slice(0,10).map(c=>[
          (c.path||'').split('/').slice(-2).join('/'), c.bm25_rank||'', c.dense_rank||''
        ]);
        parts.push('Pre‑rerank candidates (top 10):');
        parts.push(_fmtTable(rows, ['path','bm25','dense']));
        parts.push('');
      }
      // Rerank results
      if (rer && Array.isArray(rer.data?.scores)){
        const rows = rer.data.scores.slice(0,10).map(s=>[
          (s.path||'').split('/').slice(-2).join('/'), s.score?.toFixed?.(3) || s.score || ''
        ]);
        parts.push('Rerank top‑10:');
        parts.push(_fmtTable(rows, ['path','score']));
        parts.push('');
      }
      // Gating
      if (gate){ parts.push(`Gate: top1>=${gate.data?.top1_thresh} avg5>=${gate.data?.avg5_thresh}  →  ${gate.data?.outcome}`); parts.push(''); }

      // Events list
      const evs = (t.events||[]).slice(-10);
      if (evs.length){
        parts.push('Events:');
        evs.forEach(ev=>{
          const when = (new Date(ev.ts||Date.now())).toLocaleTimeString();
          const name = (ev.kind||'').padEnd(18);
          parts.push(`  ${when}  ${name}  ${ev.msg||''}`);
        });
      }
      el.textContent = parts.join('\n');
    }catch(e){ const el=document.getElementById('trace-output'); if(el) el.textContent = 'Failed to load trace: '+e.message; }
  }

  window.Trace = { loadLatestTrace };
})();

