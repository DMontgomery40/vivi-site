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

// When building on Netlify, we don't have the local agro/ path. Instead of a
// static list (which easily goes stale), fetch the directory listing from the
// GitHub Contents API so we always copy every file under gui/js, gui/css, gui/profiles.
async function listRemoteDir(dir) {
  const api = `https://api.github.com/repos/${REPO}/contents/gui/${dir}?ref=${REF}`;
  const r = await fetch(api);
  if (!r.ok) throw new Error(`Failed list ${dir}: ${r.status}`);
  const items = await r.json();
  return (Array.isArray(items) ? items : []).filter(x => x && x.type === 'file').map(x => x.name);
}

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
  // Rewrite asset paths from /gui/... to absolute under /agro for robust base-url handling
  let out = html
    .replace(/(href\s*=\s*\")\/gui\//g, '$1/agro/')
    .replace(/(src\s*=\s*\")\/gui\//g, '$1/agro/');

  // Guard rails: rewrite any accidental root-absolute assets to relative
  out = out
    .replace(/(src\s*=\s*\")\/js\//g, '$1/agro/js/')
    .replace(/(src\s*=\s*\')\/js\//g, '$1/agro/js/')
    .replace(/(href\s*=\s*\")\/css\//g, '$1/agro/css/')
    .replace(/(href\s*=\s*\')\/css\//g, '$1/agro/css/')
    .replace(/(src\s*=\s*\")\/app\.js\b/g, '$1/agro/app.js')
    .replace(/(src\s*=\s*\')\/app\.js\b/g, '$1/agro/app.js');

  // Inject fetch shim + API override right around core-utils so downstream modules bind the corrected api()
  const bust = Date.now();
  out = out.replace(
    /<script src=\".*?core-utils\.js\"><\/script>/,
    `<script src="/agro/fetch-shim.js?v=${bust}"></script>\n    <script src="/agro/js/core-utils.js?v=${bust}"></script>\n    <script src="/agro/api-base-override.js?v=${bust}"></script>`
  );

  // Popout scripts removed - not needed
  // if (!out.includes('wire-popout.js')) {
  //   out = out.replace(
  //     /<\/body>/i,
  //     '  \n  <script src="/agro/popout-helper.js"></script>\n  <script src="/agro/wire-popout.js"></script>\n</body>'
  //   );
  // }
  // Inject API base override to route GUI calls to /agro-api/* (avoids clobbering site /api)
  if (!out.includes('api-base-override.js')) {
    out = out.replace(
      /<\/body>/i,
      '  \n  <script src="/agro/api-base-override.js"></script>\n</body>'
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
    // Remote fallback (GitHub raw + dynamic listing)
    for (const f of rootFiles) {
      const url = `${RAW}/${f}`;
      const dest = path.join(OUT, f);
      let content = await fetchText(url);
      if (f === 'index.html') content = rewriteIndexHtml(content);
      writeFile(dest, content);
    }
    for (const dir of ['js','css','profiles']) {
      let files = [];
      try { files = await listRemoteDir(dir); } catch (e) { console.error('List failed', dir, e); }
      for (const f of files) {
        const url = `${RAW}/${dir}/${f}`;
        const dest = path.join(OUT, dir, f);
        const content = await fetchText(url);
        writeFile(dest, content);
      }
    }
  }

  // Popout helpers removed - not needed
  // writeFile(path.join(OUT, 'popout-helper.js'), POP_HELPER);
  // writeFile(path.join(OUT, 'wire-popout.js'), WIRE_POPOUT);
  writeFile(path.join(OUT, 'fetch-shim.js'), FETCH_SHIM);
  writeFile(path.join(OUT, 'api-base-override.js'), API_BASE_OVERRIDE);
  // Normalize cost_logic.js at build time to avoid double /api prefixes
  try {
    const p = path.join(OUT, 'js', 'cost_logic.js');
    if (fs.existsSync(p)) {
      let s = fs.readFileSync(p, 'utf8');
      if (!s.includes('CoreUtils.api')) {
        s = s.replace("base + '/api/cost/estimate_pipeline'", "(window.CoreUtils&&CoreUtils.api?CoreUtils.api('/api/cost/estimate_pipeline'):base+'/cost/estimate_pipeline')");
        s = s.replace("base + '/api/cost/estimate'", "(window.CoreUtils&&CoreUtils.api?CoreUtils.api('/api/cost/estimate'):base+'/cost/estimate')");
        fs.writeFileSync(p, s);
        console.log('Patched cost_logic.js to use CoreUtils.api for cost endpoints');
      }
    }
  } catch (e) {
    console.warn('Could not normalize cost_logic.js:', e);
  }

  // Enforce API base default to /agro-api when served under /agro, regardless of upstream core-utils.js
  try {
    const p = path.join(OUT, 'js', 'core-utils.js');
    if (fs.existsSync(p)) {
      let s = fs.readFileSync(p, 'utf8');
      const before = s;
      s = s.replace(
        /if \(u\.protocol\.startsWith\('http'\)\) return u\.origin;?/,
        "if (u.protocol.startsWith('http')) { if (u.pathname.startsWith('/agro')) return u.origin + '/agro-api'; return u.origin; }"
      );
      // Strengthen api() to normalize '/api/*' and de-dupe '/agro-api/api/*'
      const SIMPLE_API_SIG = "const api = (p) => `${API_BASE}${p}`;";
      if (s.includes(SIMPLE_API_SIG)) {
        s = s.replace(
          SIMPLE_API_SIG,
          "const api = (p) => {\n  const s = String(p || '');\n  if (s.startsWith('/agro-api/api/')) return API_BASE + s.slice('/agro-api'.length + 4);\n  if (s.startsWith('/agro-api/')) return API_BASE + s.slice('/agro-api'.length);\n  if (s.startsWith('/api/')) return API_BASE + s.slice(4);\n  if (s.startsWith('/')) return API_BASE + s;\n  return API_BASE + '/' + s;\n};"
        );
      }
      if (s !== before) {
        fs.writeFileSync(p, s);
        console.log('Patched core-utils.js to default API_BASE to /agro-api under /agro');
      } else {
        console.warn('core-utils.js pattern did not match; consider updating rewrite');
      }
    } else {
      console.warn('core-utils.js not found at', p);
    }
  } catch (e) {
    console.error('Failed to enforce API base default:', e);
  }
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
      window.CoreUtils.api = (p) => {
        const s = String(p || '');
        if (s.startsWith('/agro-api/api/')) return BASE + s.slice('/agro-api'.length + 4);
        if (s.startsWith('/agro-api/')) return BASE + s.slice('/agro-api'.length);
        if (s.startsWith('/api/')) return BASE + s.slice(4);
        if (s.startsWith('/')) return BASE + s;
        return BASE + '/' + s;
      };
      console.log('[AGRO GUI] API_BASE set to', BASE);
    } catch (e) { console.warn('API override failed', e); }

    // Global fetch shim: route any '/api/*' calls to '/agro-api/*'
    try {
      const orig = window.fetch?.bind(window);
      if (orig) {
        window.fetch = (input, init) => {
          try {
            // String URL
            if (typeof input === 'string') {
              if (input.startsWith('/agro-api/api/')) input = '/agro-api' + input.slice('/agro-api'.length + 4);
              else if (input.startsWith('/api/')) input = '/agro-api' + input.slice(4);
              else if (/^https?:\/\//i.test(input)) {
                const u = new URL(input);
                if (u.origin === window.location.origin) {
                  if (u.pathname.startsWith('/agro-api/api/')) u.pathname = '/agro-api' + u.pathname.slice('/agro-api'.length + 4);
                  else if (u.pathname.startsWith('/api/')) u.pathname = '/agro-api' + u.pathname.slice(4);
                  input = u.toString();
                }
              }
            } else if (input && typeof input === 'object' && input.href) {
              // URL object
              const u = new URL(input.href);
              if (u.pathname.startsWith('/api/')) {
                u.pathname = '/agro-api' + u.pathname.slice(4);
              }
              input = u.toString();
            }
          } catch {}
          return orig(input, init);
        };
      }
    } catch (e) { console.warn('fetch shim failed', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach); else attach();
})();`;

// Minimal early fetch shim (no CoreUtils dependency). Inserted before any other scripts.
const FETCH_SHIM = `(() => {
  try {
    const orig = window.fetch?.bind(window);
    if (!orig) return;
    window.fetch = (input, init) => {
      try {
        if (typeof input === 'string') {
          if (input.startsWith('/agro-api/api/')) input = '/agro-api' + input.slice('/agro-api'.length + 4);
          else if (input.startsWith('/api/')) input = '/agro-api' + input.slice(4);
          else if (/^https?:\/\//i.test(input)) {
            const u = new URL(input);
            if (u.origin === window.location.origin) {
              if (u.pathname.startsWith('/agro-api/api/')) u.pathname = '/agro-api' + u.pathname.slice('/agro-api'.length + 4);
              else if (u.pathname.startsWith('/api/')) u.pathname = '/agro-api' + u.pathname.slice(4);
              input = u.toString();
            }
          }
        } else if (input && typeof input === 'object' && input.href) {
          const u = new URL(input.href);
          if (u.pathname.startsWith('/api/')) u.pathname = '/agro-api' + u.pathname.slice(4);
          input = u.toString();
        }
      } catch {}
      return orig(input, init);
    };
    // Also rewrite XMLHttpRequest URLs
    if (window.XMLHttpRequest) {
      const Open = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        try {
          if (typeof url === 'string') {
            if (url.startsWith('/api/')) url = '/agro-api' + url.slice(4);
            else if (/^https?:\/\//i.test(url)) {
              const u = new URL(url);
              if (u.origin === window.location.origin && u.pathname.startsWith('/api/')) {
                u.pathname = '/agro-api' + u.pathname.slice(4);
                url = u.toString();
              }
            }
          }
        } catch {}
        return Open.call(this, method, url, ...rest);
      };
    }
  } catch {}
})();`;
run().catch((e) => { console.error(e); process.exit(1); });
