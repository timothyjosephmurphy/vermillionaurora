// Copyright (c) 2026 TJ Murphy / Vermillion Aurora Productions
// All rights reserved. No use, copying, modification, or distribution
// without a written license. Contact tj@tjm.art.
// License: neural-dance/LICENSE

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
