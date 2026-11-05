// Chrome for the full-screen live page: collapse, hide, preview, and fullscreen.
// The dancer stage and the camera stay in their own modules.

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
    if (typingTarget(event.target)) return;
    const mapping = doc.querySelector('#nd-room-lab [data-action="align"]');
    const aligning = mapping && mapping.getAttribute('aria-pressed') === 'true';
    if (event.key === 'Escape' && state.hidden && !aligning) {
      persist({hidden: false});
      event.preventDefault();
    }
    if ((event.key === 'h' || event.key === 'H') && !event.metaKey && !event.ctrlKey && !event.altKey) {
      persist({hidden: !state.hidden});
      event.preventDefault();
    }
  });

  const room = doc.getElementById('nd-room-lab');
  if (!room) return;
  const startStage = () => {
    const play = room.querySelector('[data-action="play"]');
    if (play && play.textContent.trim() === 'Start') play.click();
  };
  if (room.dataset.roomReady === '1') startStage();
  else if (typeof MutationObserver === 'function') {
    const obs = new MutationObserver(() => {
      if (room.dataset.roomReady === '1') {
        obs.disconnect();
        startStage();
      }
    });
    obs.observe(room, {attributes: true, attributeFilter: ['data-room-ready']});
  }
}

if (typeof document !== 'undefined') {
  const boot = () => attachLiveShow(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
