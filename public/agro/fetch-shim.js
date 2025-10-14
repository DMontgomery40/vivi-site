(() => {
  try {
    const orig = window.fetch ? window.fetch.bind(window) : null;
    if (orig) {
      window.fetch = (input, init) => {
        try {
          if (typeof input === 'string') {
            if (/^https?:\/\//i.test(input)) {
              const u = new URL(input);
              if (u.origin === window.location.origin) {
                u.pathname = u.pathname.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
                input = u.toString();
              }
            } else {
              input = input.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
            }
          } else if (input && typeof input === 'object' && input.href) {
            const u = new URL(input.href);
            if (u.origin === window.location.origin) {
              u.pathname = u.pathname.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
              input = u.toString();
            }
          }
        } catch {}
        return orig(input, init);
      };
    }
    if (window.XMLHttpRequest) {
      const Open = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        try {
          if (typeof url === 'string') {
            if (/^https?:\/\//i.test(url)) {
              const u = new URL(url);
              if (u.origin === window.location.origin) {
                u.pathname = u.pathname.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
                url = u.toString();
              }
            } else {
              url = url.replace(/^\/agro-api\/api\//, '/agro-api/').replace(/^\/api\//, '/agro-api/');
            }
          }
        } catch {}
        return Open.call(this, method, url, ...rest);
      };
    }
  } catch {}
})();
