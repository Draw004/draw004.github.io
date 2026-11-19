/* Shared tool shell: update mobile currency badge. No financial or account logic. */
(() => {
  'use strict';
  const update = () => {
    const full = document.getElementById('localeCurrent')?.textContent || 'India · INR';
    const compact = document.getElementById('cmCompactCurrency');
    if (compact) compact.textContent = full.split('·').pop().trim() || 'INR';
  };
  const wire = () => {
    update();
    window.addEventListener('carrowmont:localechange', () => queueMicrotask(update));
    const localeCurrent = document.getElementById('localeCurrent');
    if (localeCurrent && typeof MutationObserver !== 'undefined') {
      new MutationObserver(update).observe(localeCurrent, {childList:true, characterData:true, subtree:true});
    }
    document.addEventListener('click', (event) => {
      const more = document.querySelector('.cm-global-more');
      if (more?.open && !more.contains(event.target)) more.open = false;
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',wire,{once:true});
  else wire();
})();
