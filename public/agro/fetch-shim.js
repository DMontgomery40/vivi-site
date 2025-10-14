(() => {
  try {
    const orig = window.fetch?.bind(window);
    if (!orig) return;
    window.fetch = (input, init) => {
      try {
        if (typeof input === 'string' && input.startsWith('/api/')) {
          input = '/agro-api' + input.slice(4);
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
          if (typeof url === 'string' && url.startsWith('/api/')) {
            url = '/agro-api' + url.slice(4);
          }
        } catch {}
        return Open.call(this, method, url, ...rest);
      };
    }
  } catch {}
})();