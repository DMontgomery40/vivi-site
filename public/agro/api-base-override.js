(() => {
  const BASE = window.location.origin + '/agro-api';
  function attach() {
    if (!window.CoreUtils) return;
    try {
      window.CoreUtils.API_BASE = BASE;
      window.CoreUtils.api = (p) => BASE + p;
      console.log('[AGRO GUI] API_BASE set to', BASE);
    } catch (e) { console.warn('API override failed', e); }

    // Global fetch shim: route any '/api/*' calls to '/agro-api/*'
    try {
      const orig = window.fetch?.bind(window);
      if (orig) {
        window.fetch = (input, init) => {
          try {
            // String URL
            if (typeof input === 'string' && input.startsWith('/api/')) {
              input = '/agro-api' + input.slice(4);
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