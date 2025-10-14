import fs from 'node:fs';
import path from 'node:path';

const REPO = 'DMontgomery40/agro';
const REF = 'live-demo'; // branch to fetch GUI from (fallback)
const RAW = `https://raw.githubusercontent.com/${REPO}/${REF}/gui`;
const OUT = path.resolve('public/agro');
// Prefer local GUI directory (ensures the FULL app with scripts)
const LOCAL_DEFAULT = '/Users/davidmontgomery/agro/gui';
const LOCAL = process.env.AGRO_GUI_LOCAL || LOCAL_DEFAULT;
const LOCAL_MODE = fs.existsSync(LOCAL);

const rootFiles = [
  'index.html',
  'app.js',
  'style.css',
  'prices.json',
  'rag-calculator.html',
  'autotune_policy.json',
];

const dirs = {
  css: ['storage-calculator.css', 'tokens.css'],
  profiles: ['defaults.json', 'min_local.json', 'onboard-wizard-test-project.json', 'pw-test.json'],
  js: [
    'autoprofile_v2.js',
    'autotune.js',
    'chat.js',
    'config.js',
    'core-utils.js',
    'cost_logic.js',
    'eval_runner.js',
    'git-hooks.js',
    'golden_questions.js',
    'health.js',
    'index-display.js',
    'keywords.js',
    'profile_logic.js',
    'profile_renderer.js',
    'search.js',
    'secrets.js',
    'storage-calculator-template.js',
    'storage-calculator.js',
    'tabs.js',
    'theme.js',
    'tooltips.js',
    'ui-helpers.js',
  ],
};

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed fetch ${url}: ${r.status}`);
  return await r.text();
}
function readLocalText(sub) {
  const p = path.join(LOCAL, sub);
  return fs.readFileSync(p, 'utf8');
}
function copyLocalDir(dir) {
  const srcDir = path.join(LOCAL, dir);
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir);
  for (const f of entries) {
    const src = path.join(srcDir, f);
    const dest = path.join(OUT, dir, f);
    if (fs.statSync(src).isFile()) {
      writeFile(dest, fs.readFileSync(src));
    }
  }
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content);
  console.log('Wrote', p);
}

function rewriteIndexHtml(html) {
  // Rewrite asset paths from /gui/... to ./...
  let out = html
    .replace(/(href\s*=\s*\")\/gui\//g, '$1./')
    .replace(/(src\s*=\s*\")\/gui\//g, '$1./');

  // Inject popout scripts (non-module to avoid MIME strictness)
  if (!out.includes('wire-popout.js')) {
    out = out.replace(
      /<\/body>/i,
      '  \n  <script src="./popout-helper.js"></script>\n  <script src="./wire-popout.js"></script>\n</body>'
    );
  }
  // Inject API base override to route GUI calls to /agro-api/* (avoids clobbering site /api)
  if (!out.includes('api-base-override.js')) {
    out = out.replace(
      /<\/body>/i,
      '  \n  <script src="./api-base-override.js"></script>\n</body>'
    );
  }
  return out;
}

async function run() {
  ensureDir(OUT);

  if (LOCAL_MODE) {
    // Copy from local agro/gui for full fidelity
    for (const f of rootFiles) {
      const dest = path.join(OUT, f);
      let content = readLocalText(f);
      if (f === 'index.html') content = rewriteIndexHtml(content);
      writeFile(dest, content);
    }
    // Copy entire js/css directories (not just a fixed list)
    copyLocalDir('js');
    copyLocalDir('css');
    copyLocalDir('profiles');
  } else {
    // Remote fallback (GitHub raw)
    for (const f of rootFiles) {
      const url = `${RAW}/${f}`;
      const dest = path.join(OUT, f);
      let content = await fetchText(url);
      if (f === 'index.html') content = rewriteIndexHtml(content);
      writeFile(dest, content);
    }
    for (const [dir, files] of Object.entries(dirs)) {
      for (const f of files) {
        const url = `${RAW}/${dir}/${f}`;
        const dest = path.join(OUT, dir, f);
        const content = await fetchText(url);
        writeFile(dest, content);
      }
    }
  }

  // Write popout helpers
  writeFile(path.join(OUT, 'popout-helper.js'), POP_HELPER);
  writeFile(path.join(OUT, 'wire-popout.js'), WIRE_POPOUT);
  writeFile(path.join(OUT, 'api-base-override.js'), API_BASE_OVERRIDE);
}

// Inline helper file contents to avoid extra tooling
const POP_HELPER = `export const Popout = (() => {
  const MAX_CHUNK_BYTES = 200 * 1024;
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  function encode(obj){return enc.encode(JSON.stringify(obj));}
  function decode(bytes){return JSON.parse(dec.decode(bytes));}
  function chunkBytes(bytes){const chunks=[];for(let i=0;i<bytes.length;i+=MAX_CHUNK_BYTES){chunks.push(bytes.slice(i,i+MAX_CHUNK_BYTES));}return chunks;}
  function create({getState,applyState,onSyncEvent}={}){
    const url = new URL(window.location.href);
    const sid = url.searchParams.get('sid');
    const mode = url.searchParams.get('mode');
    const isPopout = mode === 'popout' && !!sid;
    let channel=null, assembling=null;
    function initChannel(sessionId){
      channel = new BroadcastChannel(\`agro-session-\${sessionId}\`);
      channel.onmessage = (ev)=>{
        const { type } = ev.data || {};
        if (type==='state-chunk-init'){ const { total, version } = ev.data; assembling={version,total,parts:[],received:0}; }
        else if (type==='state-chunk-part' && assembling){ assembling.parts.push(new Uint8Array(ev.data.bytes)); assembling.received++; }
        else if (type==='state-chunk-done' && assembling){ const full = new Uint8Array(assembling.parts.reduce((s,p)=>s+p.byteLength,0)); let o=0; for (const p of assembling.parts){ full.set(p,o); o+=p.byteLength; } const state = decode(full); assembling=null; applyState && applyState(state); }
        else if (type==='sync-event'){ onSyncEvent && onSyncEvent(ev.data.event); }
        else if (type==='request-state'){ sendFullState(); }
      };
    }
    function sendFullState(){ if(!channel||!getState) return; const snap=getState(); const bytes=encode(snap); const chunks=chunkBytes(bytes); const version=crypto.randomUUID(); channel.postMessage({type:'state-chunk-init', total:chunks.length, version}); for(const c of chunks){ channel.postMessage({type:'state-chunk-part', version, bytes:c}); } channel.postMessage({type:'state-chunk-done', version}); }
    function sendSyncEvent(event){ if(!channel) return; channel.postMessage({type:'sync-event', event}); }
    function openPopout({path='/agro/index.html', features='noopener,noreferrer'}={}){ const sessionId=crypto.randomUUID(); initChannel(sessionId); const popUrl=new URL(path, window.location.origin); popUrl.searchParams.set('mode','popout'); popUrl.searchParams.set('sid',sessionId); window.open(popUrl.toString(),'_blank',features); setTimeout(()=>sendFullState(),300); window.addEventListener('beforeunload',()=>{ try{ channel && channel.close(); }catch{} }); return { sessionId, channel, sendSyncEvent, sendFullState }; }
    function bootIfPopout(){ if(!isPopout) return null; initChannel(sid); channel.postMessage({type:'request-state'}); window.addEventListener('beforeunload',()=>{ try{ channel && channel.close(); }catch{} }); return { sessionId: sid, channel, sendSyncEvent }; }
    return { isPopout, openPopout, bootIfPopout, sendFullState, sendSyncEvent };
  }
  return { create };
})();`;

const WIRE_POPOUT = `(() => {
  const getWorkspaceState = () => (window.AgroApp?.exportState?.() || {});
  const applyWorkspaceState = (state) => { window.AgroApp?.importState?.(state); };
  const onSyncEvent = (ev) => { window.AgroApp?.applyEvent?.(ev); };
  const pop = (window.Popout?.create) ? window.Popout.create({ getState: getWorkspaceState, applyState: applyWorkspaceState, onSyncEvent }) : null;
  if (pop) pop.bootIfPopout();
  function ensureButton(){
    const parent = document.querySelector('.top-actions') || document.querySelector('.topbar') || document.body;
    if (!parent) return;
    let btn = document.querySelector('[data-action="popout"]');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'small-button';
      btn.setAttribute('data-action','popout');
      btn.title = 'Open in a new tab';
      btn.textContent = 'Pop out';
      parent.appendChild(btn);
    }
    btn.addEventListener('click', () => {
      if (!pop) return;
      pop.openPopout({ path: '/agro/index.html' });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureButton);
  } else {
    ensureButton();
  }
})();`;
if (typeof fetch !== 'function') {
  console.error('Global fetch not available. Use Node 18+ on Netlify.');
  process.exit(1);
}

// Force GUI to use same-origin /agro-api/* for backend calls
const API_BASE_OVERRIDE = `(() => {
  const BASE = window.location.origin + '/agro-api';
  function attach() {
    if (!window.CoreUtils) return;
    try {
      window.CoreUtils.API_BASE = BASE;
      window.CoreUtils.api = (p) => BASE + p;
      console.log('[AGRO GUI] API_BASE set to', BASE);
    } catch (e) { console.warn('API override failed', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach); else attach();
})();`;
run().catch((e) => { console.error(e); process.exit(1); });
