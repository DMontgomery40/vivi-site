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
  } catch {}
})();