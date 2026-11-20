// Zoom and pan for the product-page painting lightbox.
// High-resolution (watermarked) previews are loaded only after the viewer opens.
(function () {
  const trigger = document.querySelector('.painting-image-trigger');
  const dialog = document.querySelector('.painting-lightbox');
  if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;

  const viewport = dialog.querySelector('.painting-hires-viewport') || dialog;
  const stage = dialog.querySelector('.painting-hires-stage');
  const img = dialog.querySelector('img');
  const status = dialog.querySelector('.painting-hires-status');
  const zoomInBtn = dialog.querySelector('[data-hires-zoom="in"]');
  const zoomOutBtn = dialog.querySelector('[data-hires-zoom="out"]');
  const resetBtn = dialog.querySelector('[data-hires-zoom="reset"]');
  if (!stage || !img) return;

  let scale = 1, minScale = 1, maxScale = 4, x = 0, y = 0;
  let pointers = new Map();
  let pinchStart = null;
  let panLast = null;
  let loadedHiRes = false;
  let pendingSrc = '';
  let lastTap = 0;

  const clamp = (value, lo, hi) => Math.min(hi, Math.max(lo, value));

  function apply() {
    stage.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')';
    dialog.classList.toggle('is-zoomed', scale > 1.01);
  }

  function resetView() {
    scale = 1;
    x = 0;
    y = 0;
    apply();
  }

  function setMaxScale() {
    const long = Math.max(Number(img.getAttribute('width')) || img.naturalWidth || 0, Number(img.getAttribute('height')) || img.naturalHeight || 0);
    const box = viewport.getBoundingClientRect();
    const view = Math.max(box.width, box.height) || 1;
    maxScale = clamp(long > 0 ? long / view : 4, 3, 6);
  }

  function clampPan() {
    if (scale <= 1.01) {
      x = 0;
      y = 0;
      return;
    }
    const box = viewport.getBoundingClientRect();
    const limitX = (box.width * (scale - 1)) / 2 + 32;
    const limitY = (box.height * (scale - 1)) / 2 + 32;
    x = clamp(x, -limitX, limitX);
    y = clamp(y, -limitY, limitY);
  }

  function zoomAt(clientX, clientY, next) {
    const nextScale = clamp(next, minScale, maxScale);
    if (nextScale === scale) return;
    const box = viewport.getBoundingClientRect();
    const cx = clientX - box.left - box.width / 2;
    const cy = clientY - box.top - box.height / 2;
    const ratio = nextScale / scale;
    x = cx - (cx - x) * ratio;
    y = cy - (cy - y) * ratio;
    scale = nextScale;
    if (scale <= 1.01) {
      scale = 1;
      x = 0;
      y = 0;
    }
    clampPan();
    apply();
  }

  function setStatus(text) {
    if (status) status.textContent = text;
  }

  function hiresSrc() {
    const src = dialog.getAttribute('data-hires-src') || '';
    if (!src || /print-masters/i.test(src)) return '';
    return src;
  }

  function loadHiRes() {
    const src = hiresSrc();
    if (!src || loadedHiRes || pendingSrc === src) return;
    pendingSrc = src;
    setStatus('Loading high-resolution preview…');
    const probe = new Image();
    probe.decoding = 'async';
    probe.onload = function () {
      if (pendingSrc !== src) return;
      img.src = src;
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      const width = dialog.getAttribute('data-hires-width');
      const height = dialog.getAttribute('data-hires-height');
      if (width) img.setAttribute('width', width);
      if (height) img.setAttribute('height', height);
      loadedHiRes = true;
      pendingSrc = '';
      setMaxScale();
      setStatus('Pinch, scroll, or use the buttons to zoom');
    };
    probe.onerror = function () {
      if (pendingSrc !== src) return;
      pendingSrc = '';
      loadedHiRes = false;
      setStatus('High-resolution preview could not be loaded');
    };
    probe.src = src;
  }

  dialog.addEventListener('open-hires-viewer', function () {
    loadedHiRes = false;
    pendingSrc = '';
    resetView();
    setMaxScale();
    if (hiresSrc()) loadHiRes();
    else setStatus('Scroll or pinch to zoom');
  });

  viewport.addEventListener('wheel', function (event) {
    if (!dialog.open) return;
    event.preventDefault();
    const delta = event.deltaY < 0 ? 1.12 : 1 / 1.12;
    zoomAt(event.clientX, event.clientY, scale * delta);
  }, {passive: false});

  viewport.addEventListener('pointerdown', function (event) {
    if (event.target.closest('button')) return;
    viewport.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {x: event.clientX, y: event.clientY});
    if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      pinchStart = {distance: Math.hypot(dx, dy) || 1, scale: scale, midX: (pts[0].x + pts[1].x) / 2, midY: (pts[0].y + pts[1].y) / 2};
      panLast = null;
    } else if (pointers.size === 1) {
      panLast = {x: event.clientX, y: event.clientY};
    }
  });

  viewport.addEventListener('pointermove', function (event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, {x: event.clientX, y: event.clientY});
    if (pointers.size === 2 && pinchStart) {
      const pts = Array.from(pointers.values());
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const distance = Math.hypot(dx, dy) || 1;
      zoomAt(pinchStart.midX, pinchStart.midY, pinchStart.scale * (distance / pinchStart.distance));
      return;
    }
    if (pointers.size === 1 && panLast && scale > 1.01) {
      x += event.clientX - panLast.x;
      y += event.clientY - panLast.y;
      panLast = {x: event.clientX, y: event.clientY};
      clampPan();
      apply();
    }
  });

  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchStart = null;
    if (pointers.size === 1) {
      const remaining = pointers.values().next().value;
      panLast = remaining ? {x: remaining.x, y: remaining.y} : null;
    } else {
      panLast = null;
    }
  }
  viewport.addEventListener('pointerup', endPointer);
  viewport.addEventListener('pointercancel', endPointer);
  viewport.addEventListener('lostpointercapture', endPointer);

  viewport.addEventListener('dblclick', function (event) {
    if (event.target.closest('button')) return;
    event.preventDefault();
    if (scale > 1.01) resetView();
    else zoomAt(event.clientX, event.clientY, Math.min(2.5, maxScale));
  });

  // iOS Chrome often swallows dblclick; a second tap within 280ms also toggles zoom.
  viewport.addEventListener('pointerup', function (event) {
    if (event.pointerType === 'mouse' || pointers.size > 0) return;
    if (event.target.closest('button')) return;
    const now = Date.now();
    if (now - lastTap < 280) {
      if (scale > 1.01) resetView();
      else zoomAt(event.clientX, event.clientY, Math.min(2.5, maxScale));
      lastTap = 0;
    } else {
      lastTap = now;
    }
  });

  zoomInBtn && zoomInBtn.addEventListener('click', function () {
    const box = viewport.getBoundingClientRect();
    zoomAt(box.left + box.width / 2, box.top + box.height / 2, scale * 1.3);
  });
  zoomOutBtn && zoomOutBtn.addEventListener('click', function () {
    const box = viewport.getBoundingClientRect();
    zoomAt(box.left + box.width / 2, box.top + box.height / 2, scale / 1.3);
  });
  resetBtn && resetBtn.addEventListener('click', resetView);

  dialog.addEventListener('close', function () {
    loadedHiRes = false;
    pendingSrc = '';
    resetView();
  });
  if (dialog.open) dialog.dispatchEvent(new Event('open-hires-viewer'));
})();
