// Chrome for the full-screen live page: collapse, hide, preview, fullscreen,
// and automatic projector alignment. The dancer stage and the camera stay in their own modules.

import {ALIGN_TIMEOUT_MS, cornersFromMarkerCenters, findCalibrationMarkers, showStageToast} from './camera-markers.js';

export const LIVE_KEY = 'nd-live-show';
export const LIVE_DEFAULTS = {collapsed: false, hidden: false, preview: true};

function memoryOf(storage) {
  try {
    return storage || (typeof localStorage === 'undefined' ? null : localStorage);
  } catch {
    return null;
  }
}

function flag(value, fallback) {
  if (value === true || value === false) return value;
  return fallback;
}

export function readLiveShow(storage) {
  const box = memoryOf(storage);
  if (!box) return {...LIVE_DEFAULTS};
  let data;
  try {
    const raw = box.getItem(LIVE_KEY);
    if (!raw) return {...LIVE_DEFAULTS};
    data = JSON.parse(raw);
  } catch {
    return {...LIVE_DEFAULTS};
  }
  if (!data || typeof data !== 'object') return {...LIVE_DEFAULTS};
  return {
    collapsed: flag(data.collapsed, false),
    hidden: flag(data.hidden, false),
    preview: flag(data.preview, true)
  };
}

export function writeLiveShow(storage, state) {
  const box = memoryOf(storage);
  if (!box || !state) return false;
  try {
    box.setItem(LIVE_KEY, JSON.stringify({
      v: 1,
      collapsed: !!state.collapsed,
      hidden: !!state.hidden,
      preview: state.preview !== false
    }));
    return true;
  } catch {
    return false;
  }
}

export function applyLiveShow(doc, state) {
  const body = doc && doc.body;
  if (!body || !body.classList) return state;
  body.classList.toggle('nd-live-collapsed', !!state.collapsed);
  body.classList.toggle('nd-live-hidden', !!state.hidden);
  body.classList.toggle('nd-live-preview-off', state.preview === false);
  const collapse = doc.querySelector('[data-live="collapse"]');
  if (collapse) {
    collapse.setAttribute('aria-expanded', state.collapsed ? 'false' : 'true');
    collapse.textContent = state.collapsed ? 'Show controls' : 'Collapse';
  }
  const preview = doc.querySelector('[data-live="preview"]');
  if (preview) {
    preview.setAttribute('aria-pressed', state.preview === false ? 'false' : 'true');
    preview.textContent = state.preview === false ? 'Preview off' : 'Preview';
  }
  const reveal = doc.querySelector('[data-live="reveal"]');
  if (reveal) reveal.hidden = !state.hidden;
  return state;
}

function typingTarget(target) {
  if (!target || !target.tagName) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export function attachLiveShow(doc) {
  if (!doc || !doc.body || doc.body.dataset.liveReady === '1') return;
  if (!doc.querySelector('[data-live="fullscreen"]')) return;
  doc.body.dataset.liveReady = '1';
  let state = readLiveShow(null);
  const persist = next => {
    state = {...state, ...next};
    writeLiveShow(null, state);
    applyLiveShow(doc, state);
  };
  applyLiveShow(doc, state);

  const fullscreen = doc.querySelector('[data-live="fullscreen"]');
  fullscreen.addEventListener('click', () => {
    const root = doc.documentElement;
    if (doc.fullscreenElement) {
      if (doc.exitFullscreen) doc.exitFullscreen();
      return;
    }
    const pending = root.requestFullscreen && root.requestFullscreen();
    if (pending && typeof pending.catch === 'function') pending.catch(() => {});
  });
  doc.querySelector('[data-live="collapse"]').addEventListener('click', () => {
    persist({collapsed: !state.collapsed, hidden: false});
  });
  doc.querySelector('[data-live="hide"]').addEventListener('click', () => {
    persist({hidden: true});
  });
  doc.querySelector('[data-live="preview"]').addEventListener('click', () => {
    persist({preview: state.preview === false});
  });
  const reveal = doc.querySelector('[data-live="reveal"]');
  if (reveal) reveal.addEventListener('click', () => persist({hidden: false}));

  doc.addEventListener('keydown', event => {
    if (event.key === 'Escape' && doc.body.classList.contains('nd-live-aligning')) {
      cancelAlign(doc);
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }
    if (typingTarget(event.target)) return;
    const mapping = doc.querySelector('#nd-room-lab [data-action="align"]');
    const aligning = mapping && mapping.getAttribute('aria-pressed') === 'true';
    if (event.key === 'Escape' && state.hidden && !aligning) {
      persist({hidden: false});
      event.preventDefault();
    }
    if ((event.key === 'h' || event.key === 'H') && !event.metaKey && !event.ctrlKey && !event.altKey && !doc.body.classList.contains('nd-live-aligning')) {
      persist({hidden: !state.hidden});
      event.preventDefault();
    }
  }, true);

  const exitAlign = doc.querySelector('[data-live="exit-align"]');
  if (exitAlign) exitAlign.addEventListener('click', () => cancelAlign(doc));

  const room = doc.getElementById('nd-room-lab');
  if (!room) return;
  const align = room.querySelector('[data-action="align"]');
  if (align) {
    align.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (doc.body.classList.contains('nd-live-aligning')) cancelAlign(doc);
      else beginAlign(doc);
    }, true);
  }
  const startStage = () => {
    const play = room.querySelector('[data-action="play"]');
    if (play && play.textContent.trim() === 'Start') play.click();
  };
  const whenReady = () => { startStage(); };
  if (room.dataset.roomReady === '1') whenReady();
  else if (typeof MutationObserver === 'function') {
    const obs = new MutationObserver(() => {
      if (room.dataset.roomReady === '1') {
        obs.disconnect();
        whenReady();
      }
    });
    obs.observe(room, {attributes: true, attributeFilter: ['data-room-ready']});
  }
}

let alignTimer = 0;

export function cancelAlign(doc) {
  finishAlign(doc, 'Alignment cancelled.');
}

function finishAlign(doc, message) {
  clearTimeout(alignTimer);
  alignTimer = 0;
  if (!doc || !doc.body) return;
  doc.body.classList.remove('nd-live-aligning');
  const pattern = doc.querySelector('[data-cal-pattern]');
  if (pattern) pattern.hidden = true;
  const exit = doc.querySelector('[data-live="exit-align"]');
  if (exit) exit.hidden = true;
  const align = doc.querySelector('#nd-room-lab [data-action="align"]');
  if (align) {
    align.textContent = 'Align projector';
    align.setAttribute('aria-pressed', 'false');
  }
  if (message) {
    const status = doc.querySelector('#nd-room-lab [data-status]');
    if (status) status.textContent = message;
  }
}

function flashLock(doc) {
  const outline = doc.querySelector('[data-align-lock-outline]');
  if (!outline) return;
  outline.hidden = false;
  setTimeout(() => { outline.hidden = true; }, 2500);
}

function nowMs() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

export async function beginAlign(doc) {
  const room = doc.getElementById('nd-room-lab');
  if (!room || !doc.body) return;
  clearTimeout(alignTimer);
  doc.body.classList.add('nd-live-aligning');
  const exit = doc.querySelector('[data-live="exit-align"]');
  if (exit) exit.hidden = false;
  const align = room.querySelector('[data-action="align"]');
  if (align) {
    align.textContent = 'Cancel align';
    align.setAttribute('aria-pressed', 'false');
  }
  showStageToast('Aligning camera to projector grid…', 'busy', 0, doc);
  const camRoot = doc.getElementById('nd-camera-mode');
  const cam = camRoot && camRoot.neuralDanceCamera;
  if (cam && cam.cancelCalibration) cam.cancelCalibration(true);
  if (cam && cam.ensureCamera) {
    try { await cam.ensureCamera(); } catch { /* the grid still tries */ }
  }
  if (!doc.body.classList.contains('nd-live-aligning')) return;
  let baseline = null;
  const before = cam && cam.grabFrame && cam.grabFrame();
  if (before && before.data) baseline = before.data;
  const pattern = doc.querySelector('[data-cal-pattern]');
  if (pattern) pattern.hidden = false;
  const status = room.querySelector('[data-status]');
  if (status) status.textContent = 'Aligning camera to projector grid…';
  const started = nowMs();
  const tick = () => {
    if (!doc.body.classList.contains('nd-live-aligning')) return;
    if (nowMs() - started >= ALIGN_TIMEOUT_MS) {
      const miss = 'Couldn\'t see all 4 grid corners — check camera aim or tap Fine-tune corners';
      showStageToast(miss, 'warn', 5000, doc);
      finishAlign(doc, miss);
      return;
    }
    const frame = cam && cam.grabFrame && cam.grabFrame();
    if (frame) {
      const base = baseline && frame.data && baseline.length === frame.data.length ? baseline : null;
      const centers = findCalibrationMarkers(frame.data, frame.width, frame.height, undefined, base);
      if (centers) {
        const scaled = centers.map(blob => ({
          x: (blob.x + 0.5) * frame.scale.scaleX,
          y: (blob.y + 0.5) * frame.scale.scaleY
        }));
        const corners = cornersFromMarkerCenters(scaled, frame.videoWidth, frame.videoHeight);
        if (corners && cam.setNormalizedCorners(corners, 'Camera aligned to grid.')) {
          if (cam.setMarkersEnabled) cam.setMarkersEnabled(true);
          showStageToast('✓ Camera aligned to grid! Pink-note tracking active', 'ok', 4000, doc);
          flashLock(doc);
          finishAlign(doc, '✓ Camera aligned to grid! Pink-note tracking active');
          return;
        }
      }
    }
    alignTimer = setTimeout(tick, 250);
  };
  alignTimer = setTimeout(tick, 200);
}

if (typeof document !== 'undefined') {
  const boot = () => attachLiveShow(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
