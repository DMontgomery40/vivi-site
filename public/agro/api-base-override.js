// Netlify demo: keep vivified.dev/api untouched; route GUI /api calls to /agro-api
(() => {
  const orig = window.fetch;
  window.fetch = function(input, init){
    try{
      let url = typeof input === 'string' ? input : (input && input.url) || '';
      if (url.startsWith('/api/')){
        const newUrl = url.replace(/^\/api\//, '/agro-api/');
        if (typeof input === 'string') input = newUrl; else input = new Request(newUrl, input);
      }
    }catch{}
    return orig(input, init);
  };
})();
