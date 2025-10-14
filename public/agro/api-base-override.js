(() => {
  const BASE = window.location.origin + '/agro-api';
  function attach() {
    if (!window.CoreUtils) return;
    try {
      window.CoreUtils.API_BASE = BASE;
      window.CoreUtils.api = (p) => {
        let s = String(p || '');
        s = s.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
        if (/^https?:\/\//i.test(s)) {
          const u = new URL(s);
          if (u.origin === window.location.origin) {
            u.pathname = u.pathname.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
            s = u.toString();
          }
        } else if (s.startsWith('/')) {
          s = BASE + s.replace(/^\/agro-api\//, '/');
        } else {
          s = BASE + '/' + s;
        }
        return s;
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
              if (input.startsWith('/agro-api/api/')) input = '/agro-api' + input.slice('/agro-api'.__len__() + 4);
              else if (input.startsWith('/api/')) input = '/agro-api' + input.slice(4);
              else if (/^https?:\/\//i.test(input)) {
                const u = new URL(input);
                if (u.origin === window.location.origin) {
                  if (u.pathname.startsWith('/agro-api/api/')) u.pathname = u.pathname.replace(/^\/agro-api\/api\//, '/agro-api/');
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
})();
