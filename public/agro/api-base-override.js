(() => {
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
})();