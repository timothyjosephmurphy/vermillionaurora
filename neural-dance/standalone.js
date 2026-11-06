// Backup for the head script: module scripts run after parse, and again if
// the display mode changes. The head script is what prevents a header flash.
const query = window.matchMedia ? window.matchMedia('(display-mode: standalone)') : null;

function syncStandalone() {
  if (window.navigator.standalone === true || (query && query.matches)) {
    document.documentElement.classList.add('nd-standalone');
  }
}

syncStandalone();
if (query && query.addEventListener) query.addEventListener('change', syncStandalone);
