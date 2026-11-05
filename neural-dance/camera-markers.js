// Camera mode for the Neural Dance wall.
// Continuity Camera (an "iPhone Camera" device) watches the projection.
// Four clicked corners build a homography into the Room music canvas.
// Pink notes become dancers through nd-room-lab.neuralDance.setMarkers,
// the marker hook studio-tracker #793 can call. sample() returns
// [{id, x, y, type}] in projection pixels, or null while the camera is not driving.

export const STORAGE_KEY = 'nd-camera-mode';
export const CANVAS_W = 1000;
export const CANVAS_H = 620;
export const PINK_HUE = 330;
export const APPEAR_MS = 1500;
export const CLEAR_MS = 300;
export const DETECT_WIDTH = 160;
export const VALUE_FLOOR = 0.35;
export const CORNER_STEPS = ['top left', 'top right', 'bottom right', 'bottom left'];
export const PROJECTION_CORNERS = [
  {x: 0, y: 0},
  {x: CANVAS_W, y: 0},
  {x: CANVAS_W, y: CANVAS_H},
  {x: 0, y: CANVAS_H}
];
// Colored corner fiducials drawn over the live dancers, in stage units (0–1).
// Order matches PROJECTION_CORNERS: top left, top right, bottom right, bottom left.
export const CALIBRATION_MARKERS = [
  {hue: 0, name: 'red', x: 0.14, y: 0.14},
  {hue: 120, name: 'green', x: 0.86, y: 0.14},
  {hue: 240, name: 'blue', x: 0.86, y: 0.86},
  {hue: 60, name: 'yellow', x: 0.14, y: 0.86}
];
export const ALIGN_TIMEOUT_MS = 8000;
export const DEFAULTS = {
  hueTolerance: 28,
  saturationSensitivity: 0.55,
  minBlobSize: 18
};

function clamp(n, lo, hi, fallback) {
  const v = +n;
  if (!Number.isFinite(v)) return fallback;
  return Math.min(hi, Math.max(lo, v));
}

function point(p) {
  if (!p || !Number.isFinite(+p.x) || !Number.isFinite(+p.y)) return null;
  return {x: +p.x, y: +p.y};
}

// 0 = only a very saturated pink counts. 1 = pale pink still counts.
export function saturationFloor(sensitivity) {
  const s = clamp(sensitivity, 0, 1, DEFAULTS.saturationSensitivity);
  return 0.82 - s * 0.64;
}

function solveLinear(rows, values) {
  const n = values.length;
  const m = rows.map((row, i) => row.concat(values[i]));
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
    }
    if (Math.abs(m[pivot][col]) < 1e-10) return null;
    if (pivot !== col) {
      const swap = m[col];
      m[col] = m[pivot];
      m[pivot] = swap;
    }
    const div = m[col][col];
    for (let c = col; c <= n; c++) m[col][c] /= div;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = m[r][col];
      if (factor === 0) continue;
      for (let c = col; c <= n; c++) m[r][c] -= factor * m[col][c];
    }
  }
  return m.map(row => row[n]);
}

// Four camera points to four projection points. Returns 9 coefficients
// (row-major, h33 = 1), or null when the corners do not define a plane.
export function solveHomography(src, dst) {
  if (!src || !dst || src.length !== 4 || dst.length !== 4) return null;
  const a = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const s = point(src[i]);
    const d = point(dst[i]);
    if (!s || !d) return null;
    a.push([s.x, s.y, 1, 0, 0, 0, -d.x * s.x, -d.x * s.y]);
    b.push(d.x);
    a.push([0, 0, 0, s.x, s.y, 1, -d.y * s.x, -d.y * s.y]);
    b.push(d.y);
  }
  const h = solveLinear(a, b);
  if (!h) return null;
  const H = [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
  if (H.some(v => !Number.isFinite(v))) return null;
  return H;
}

export function applyHomography(H, x, y) {
  if (!H || H.length !== 9) return null;
  const w = H[6] * x + H[7] * y + H[8];
  if (!Number.isFinite(w) || Math.abs(w) < 1e-8) return null;
  const px = (H[0] * x + H[1] * y + H[2]) / w;
  const py = (H[3] * x + H[4] * y + H[5]) / w;
  if (!Number.isFinite(px) || !Number.isFinite(py)) return null;
  return {x: px, y: py};
}

export function homographyFromNormalized(corners, videoWidth, videoHeight, dest = PROJECTION_CORNERS) {
  if (!corners || corners.length !== 4) return null;
  if (!(videoWidth > 0) || !(videoHeight > 0)) return null;
  const src = [];
  for (const corner of corners) {
    const p = point(corner);
    if (!p) return null;
    src.push({x: p.x * videoWidth, y: p.y * videoHeight});
  }
  return solveHomography(src, dest);
}

// Largest blob of each calibration hue. Coordinates are in the buffer that was passed in.
export function findCalibrationMarkers(rgba, width, height, markers = CALIBRATION_MARKERS) {
  if (!rgba || !(width > 0) || !(height > 0) || !markers || markers.length !== 4) return null;
  const centers = [];
  for (const marker of markers) {
    const blobs = detectPinkBlobs(rgba, width, height, {
      hueCenter: marker.hue,
      hueTolerance: 10,
      saturationSensitivity: 0.25,
      minBlobSize: 3
    });
    if (!blobs.length) return null;
    centers.push({x: blobs[0].x, y: blobs[0].y});
  }
  return centers;
}

// Marker centers in video pixels → normalized images of the four stage corners.
export function cornersFromMarkerCenters(centers, videoWidth, videoHeight, markers = CALIBRATION_MARKERS) {
  if (!centers || centers.length !== 4 || !(videoWidth > 0) || !(videoHeight > 0)) return null;
  const src = [];
  const dst = [];
  for (let i = 0; i < 4; i++) {
    const c = point(centers[i]);
    const m = markers[i];
    if (!c || !m) return null;
    src.push(c);
    dst.push({x: m.x * CANVAS_W, y: m.y * CANVAS_H});
  }
  const inverse = solveHomography(dst, src);
  if (!inverse) return null;
  const corners = [];
  for (const dest of PROJECTION_CORNERS) {
    const hit = applyHomography(inverse, dest.x, dest.y);
    if (!hit) return null;
    const x = hit.x / videoWidth;
    const y = hit.y / videoHeight;
    if (x < -0.25 || x > 1.25 || y < -0.25 || y > 1.25) return null;
    corners.push({x, y});
  }
  return corners;
}

export function projectVideoPoint(H, x, y) {
  const p = applyHomography(H, x, y);
  if (!p) return null;
  return {
    x: Math.min(CANVAS_W, Math.max(0, p.x)),
    y: Math.min(CANVAS_H, Math.max(0, p.y))
  };
}

export function rgbToHsv(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return {h, s: max === 0 ? 0 : d / max, v: max};
}

function wrapHue(value, fallback) {
  const v = +value;
  if (!Number.isFinite(v)) return fallback;
  return ((v % 360) + 360) % 360;
}

export function blobSettings(options = {}) {
  return {
    hueCenter: wrapHue(options.hueCenter, PINK_HUE),
    hueTolerance: clamp(options.hueTolerance, 0, 180, DEFAULTS.hueTolerance),
    saturationSensitivity: clamp(options.saturationSensitivity, 0, 1, DEFAULTS.saturationSensitivity),
    minBlobSize: Math.round(clamp(options.minBlobSize, 1, 100000, DEFAULTS.minBlobSize)),
    valueFloor: VALUE_FLOOR
  };
}

function hueDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

export function isPink(r, g, b, settings) {
  const hsv = rgbToHsv(r, g, b);
  return hueDistance(hsv.h, settings.hueCenter) <= settings.hueTolerance
    && hsv.s >= saturationFloor(settings.saturationSensitivity)
    && hsv.v >= settings.valueFloor;
}

// Connected components on an already-downscaled RGBA buffer.
export function detectPinkBlobs(rgba, width, height, options = {}) {
  const w = width | 0;
  const h = height | 0;
  if (!rgba || w < 1 || h < 1 || rgba.length < w * h * 4) return [];
  const settings = blobSettings(options);
  const count = w * h;
  const mask = new Uint8Array(count);
  for (let i = 0, p = 0; i < count; i++, p += 4) {
    if (isPink(rgba[p], rgba[p + 1], rgba[p + 2], settings)) mask[i] = 1;
  }
  const seen = new Uint8Array(count);
  const qx = new Int32Array(count);
  const qy = new Int32Array(count);
  const blobs = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const start = y * w + x;
      if (!mask[start] || seen[start]) continue;
      let head = 0;
      let tail = 0;
      qx[tail] = x;
      qy[tail] = y;
      tail++;
      seen[start] = 1;
      let sumX = 0;
      let sumY = 0;
      let area = 0;
      while (head < tail) {
        const cx = qx[head];
        const cy = qy[head];
        head++;
        sumX += cx;
        sumY += cy;
        area++;
        const neighbors = [cx - 1, cy, cx + 1, cy, cx, cy - 1, cx, cy + 1];
        for (let k = 0; k < neighbors.length; k += 2) {
          const nx = neighbors[k];
          const ny = neighbors[k + 1];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const ni = ny * w + nx;
          if (!mask[ni] || seen[ni]) continue;
          seen[ni] = 1;
          qx[tail] = nx;
          qy[tail] = ny;
          tail++;
        }
      }
      if (area >= settings.minBlobSize) blobs.push({x: sumX / area, y: sumY / area, area});
    }
  }
  blobs.sort((p, q) => q.area - p.area || p.x - q.x || p.y - q.y);
  return blobs;
}

export function detectionSize(srcW, srcH, targetW = DETECT_WIDTH) {
  const sw = Math.max(1, Math.round(+srcW || targetW));
  const sh = Math.max(1, Math.round(+srcH || targetW));
  const width = Math.max(1, Math.min(targetW, sw));
  const height = Math.max(1, Math.round(sh * width / sw));
  return {width, height, scaleX: sw / width, scaleY: sh / height};
}

export function downsampleRgba(src, srcW, srcH, dstW, dstH) {
  const dst = new Uint8ClampedArray(dstW * dstH * 4);
  for (let y = 0; y < dstH; y++) {
    const sy = Math.min(srcH - 1, Math.floor((y + 0.5) * srcH / dstH));
    for (let x = 0; x < dstW; x++) {
      const sx = Math.min(srcW - 1, Math.floor((x + 0.5) * srcW / dstW));
      const si = (sy * srcW + sx) * 4;
      const di = (y * dstW + x) * 4;
      dst[di] = src[si];
      dst[di + 1] = src[si + 1];
      dst[di + 2] = src[si + 2];
      dst[di + 3] = 255;
    }
  }
  return dst;
}

// A note must stay up for about 1.5s before it is published. A short hold
// keeps one missed frame from clearing it; after that the marker is gone.
export function createMarkerTracker({appearMs = APPEAR_MS, clearMs = CLEAR_MS, matchRadius = 64} = {}) {
  let tracks = [];
  let nextId = 1;
  return {
    update(blobs, now) {
      const incoming = (blobs || [])
        .map(b => point(b))
        .filter(Boolean)
        .sort((p, q) => p.x - q.x || p.y - q.y);
      const used = new Set();
      const next = [];
      for (const track of tracks) {
        let best = -1;
        let bestD = matchRadius;
        for (let i = 0; i < incoming.length; i++) {
          if (used.has(i)) continue;
          const d = Math.hypot(incoming[i].x - track.x, incoming[i].y - track.y);
          if (d <= bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best >= 0) {
          used.add(best);
          next.push({
            id: track.id,
            x: incoming[best].x,
            y: incoming[best].y,
            seenSince: track.seenSince,
            missingSince: null,
            active: track.active || now - track.seenSince >= appearMs
          });
        } else if (track.missingSince == null) {
          next.push({...track, missingSince: now});
        } else if (now - track.missingSince < clearMs) {
          next.push(track);
        }
      }
      for (let i = 0; i < incoming.length; i++) {
        if (used.has(i)) continue;
        next.push({
          id: nextId++,
          x: incoming[i].x,
          y: incoming[i].y,
          seenSince: now,
          missingSince: null,
          active: appearMs <= 0
        });
      }
      tracks = next;
      return tracks
        .filter(t => t.active)
        .map(t => ({id: t.id, x: t.x, y: t.y}))
        .sort((p, q) => p.id - q.id);
    }
  };
}

export function toDancerMarkers(markers) {
  return (markers || []).map(m => {
    const id = m.id | 0;
    const type = Number.isFinite(+m.type) ? (((+m.type) % 4) + 4) % 4 : (((id - 1) % 4) + 4) % 4;
    return {id, x: +m.x, y: +m.y, type};
  }).filter(m => m.id > 0 && Number.isFinite(m.x) && Number.isFinite(m.y));
}

export function markersFromFrame(frame, settings, homography, scale, tracker, now) {
  const blobs = detectPinkBlobs(frame.data, frame.width, frame.height, settings);
  const videoBlobs = blobs.map(b => ({
    x: (b.x + 0.5) * scale.scaleX,
    y: (b.y + 0.5) * scale.scaleY,
    area: b.area
  }));
  const stable = tracker.update(videoBlobs, now);
  if (!homography) return {blobs: videoBlobs, markers: []};
  const projected = [];
  for (const marker of stable) {
    const p = projectVideoPoint(homography, marker.x, marker.y);
    if (!p) continue;
    projected.push({id: marker.id, x: p.x, y: p.y});
  }
  return {blobs: videoBlobs, markers: toDancerMarkers(projected)};
}

export function cameraChoices(devices) {
  return (devices || [])
    .filter(d => d && d.kind === 'videoinput' && d.deviceId)
    .map(d => ({
      deviceId: String(d.deviceId),
      label: d.label && String(d.label).trim() ? String(d.label).trim() : 'Camera'
    }));
}

// Saved device wins. Otherwise prefer the Continuity Camera label "iPhone Camera".
export function pickCamera(choices, saved) {
  if (!choices || !choices.length) return null;
  if (saved && saved.deviceId) {
    const byId = choices.find(c => c.deviceId === saved.deviceId);
    if (byId) return byId;
  }
  if (saved && saved.deviceLabel) {
    const byLabel = choices.find(c => c.label === saved.deviceLabel);
    if (byLabel) return byLabel;
  }
  // "iPhone Camera" and Continuity Camera's "iPhone (3) Camera".
  return choices.find(c => /iPhone(?:\s*\(\d+\))?\s*Camera/i.test(c.label))
    || choices.find(c => /iPhone/i.test(c.label))
    || choices[0];
}

function normalizeCorners(input) {
  if (!Array.isArray(input) || input.length !== 4) return null;
  const out = [];
  for (const corner of input) {
    const p = point(corner);
    if (!p || p.x < -0.25 || p.x > 1.25 || p.y < -0.25 || p.y > 1.25) return null;
    out.push(p);
  }
  return out;
}

export function readCameraSettings(storage) {
  if (!storage) return null;
  let data;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object') return null;
  return {
    deviceId: typeof data.deviceId === 'string' ? data.deviceId : '',
    deviceLabel: typeof data.deviceLabel === 'string' ? data.deviceLabel : '',
    corners: normalizeCorners(data.corners),
    hueTolerance: clamp(data.hueTolerance, 5, 80, DEFAULTS.hueTolerance),
    saturationSensitivity: clamp(data.saturationSensitivity, 0, 1, DEFAULTS.saturationSensitivity),
    minBlobSize: Math.round(clamp(data.minBlobSize, 4, 200, DEFAULTS.minBlobSize))
  };
}

export function writeCameraSettings(storage, settings) {
  if (!storage || !settings) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({
      v: 1,
      deviceId: settings.deviceId || '',
      deviceLabel: settings.deviceLabel || '',
      corners: settings.corners || null,
      hueTolerance: settings.hueTolerance,
      saturationSensitivity: settings.saturationSensitivity,
      minBlobSize: settings.minBlobSize
    }));
    return true;
  } catch {
    return false;
  }
}

export function clientToNormalized(clientX, clientY, rect) {
  if (!rect || !(rect.width > 0) || !(rect.height > 0)) return null;
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y))};
}

function memoryOf(storage) {
  try {
    return storage || window.localStorage;
  } catch {
    return null;
  }
}

// Continuity Camera (Safari and Chrome on macOS) delivers a live but black
// track when width/height are combined with deviceId. Ask for the device only.
// exact keeps a picked "iPhone (3) Camera" from falling through to the built-in
// camera. ideal is the fallback when exact is overconstrained. The constraint stays an object.
export function videoConstraints(deviceId, mode = 'exact') {
  const video = {};
  if (deviceId) video.deviceId = mode === 'ideal' ? {ideal: String(deviceId)} : {exact: String(deviceId)};
  return video;
}

export function armPreviewElement(video) {
  if (!video) return video;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.controls = false;
  if (typeof video.setAttribute === 'function') {
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('webkit-playsinline', '');
  }
  return video;
}

// readyState HAVE_CURRENT_DATA plus a non-zero frame, and the element is actually playing.
export function videoFrameReady(video) {
  return !!(video && video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0 && !video.paused && !video.ended);
}

export function drawVideoFrame(video, ctx, width, height) {
  if (!videoFrameReady(video) || !ctx || !(width > 0) || !(height > 0)) return false;
  try {
    ctx.drawImage(video, 0, 0, width, height);
    return true;
  } catch {
    return false;
  }
}

// Set srcObject, force muted / playsInline / autoplay, and call play() only after loadedmetadata.
export function playPreview(video, stream) {
  armPreviewElement(video);
  video.srcObject = stream;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => finish(Object.assign(new Error('preview timeout'), {name: 'TimeoutError'})), 8000);
    let settled = false;
    const finish = err => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('error', onError);
      if (err) reject(err);
      else resolve();
    };
    const start = () => {
      try {
        const playing = video.play();
        if (playing && typeof playing.then === 'function') playing.then(() => finish(), finish);
        else finish();
      } catch (err) {
        finish(err);
      }
    };
    const onReady = () => start();
    const onError = () => finish(Object.assign(new Error('preview error'), {name: 'AbortError'}));
    if (video.readyState >= 1 && video.videoWidth > 0) start();
    else {
      video.addEventListener('loadedmetadata', onReady);
      video.addEventListener('error', onError);
    }
  });
}

function permissionDenied(err) {
  return !!(err && (err.name === 'NotAllowedError' || err.name === 'SecurityError' || err.name === 'PermissionDeniedError'));
}

export async function acquireCameraStream(md, deviceId) {
  if (!md || typeof md.getUserMedia !== 'function') {
    throw Object.assign(new Error('camera unavailable'), {name: 'NotFoundError'});
  }
  const attempts = [];
  if (deviceId) {
    attempts.push(videoConstraints(deviceId, 'exact'));
    attempts.push(videoConstraints(deviceId, 'ideal'));
  }
  attempts.push(videoConstraints(''));
  let last;
  for (const video of attempts) {
    try {
      return await md.getUserMedia({video, audio: false});
    } catch (err) {
      last = err;
      if (permissionDenied(err)) throw err;
    }
  }
  throw last || Object.assign(new Error('no camera'), {name: 'NotFoundError'});
}

export function attachCameraMode(root) {
  if (!root || root.dataset.cameraReady === '1') return;
  root.dataset.cameraReady = '1';
  const video = root.querySelector('[data-preview]');
  const overlay = root.querySelector('[data-overlay]');
  const status = root.querySelector('[data-status]');
  const select = root.querySelector('[data-control="device"]');
  const hue = root.querySelector('[data-control="hue"]');
  const sat = root.querySelector('[data-control="sat"]');
  const size = root.querySelector('[data-control="size"]');
  const cameraButton = root.querySelector('[data-action="camera"]');
  const refreshButton = root.querySelector('[data-action="refresh"]');
  const calibrateButton = root.querySelector('[data-action="calibrate"]');
  const markerButton = root.querySelector('[data-action="markers"]');
  if (!video || !overlay || !select || !hue || !sat || !size) return;
  armPreviewElement(video);
  const octx = overlay.getContext('2d');
  const scratch = document.createElement('canvas');
  const sctx = scratch.getContext('2d', {willReadFrequently: true});
  let stream = null;
  let committed = [];
  let draft = null;
  let homography = null;
  let markersOn = false;
  let driving = false;
  let askedStart = false;
  let tracker = createMarkerTracker();
  let rawBlobs = [];
  let latest = null;
  let raf = 0;
  let lastDetect = 0;
  let lastStatus = 0;
  let choices = [];
  const idleTracker = createMarkerTracker();
  const api = {sample() { return latest; }};
  root.neuralDanceMarkers = api;

  function say(text) {
    if (status && status.textContent !== text) status.textContent = text;
  }
  function settings() {
    return {
      deviceId: select.value || '',
      deviceLabel: select.selectedOptions && select.selectedOptions[0] ? select.selectedOptions[0].textContent : '',
      corners: committed.length === 4 ? committed : null,
      hueTolerance: +hue.value,
      saturationSensitivity: +sat.value,
      minBlobSize: +size.value
    };
  }
  function persist() {
    writeCameraSettings(memoryOf(null), settings());
  }
  function showSlider(input, out, text) {
    const node = root.querySelector('[data-value="' + out + '"]');
    if (node) node.textContent = text;
  }
  function refreshLabels() {
    showSlider(hue, 'hue', Math.round(+hue.value) + '°');
    showSlider(sat, 'sat', (+sat.value).toFixed(2));
    showSlider(size, 'size', Math.round(+size.value) + ' px');
  }
  function applySaved(saved) {
    if (!saved) return;
    hue.value = String(saved.hueTolerance);
    sat.value = String(saved.saturationSensitivity);
    size.value = String(saved.minBlobSize);
    if (saved.corners) committed = saved.corners.map(p => ({x: p.x, y: p.y}));
    refreshLabels();
    rebuild();
    syncMarkerButton();
  }
  function rebuild() {
    homography = homographyFromNormalized(committed, video.videoWidth, video.videoHeight);
  }
  function syncMarkerButton() {
    const ready = committed.length === 4;
    markerButton.disabled = !ready;
    markerButton.textContent = markersOn ? 'Markers on' : 'Markers off';
    markerButton.setAttribute('aria-pressed', markersOn ? 'true' : 'false');
    if (draft) {
      calibrateButton.textContent = 'Cancel calibration';
      calibrateButton.setAttribute('aria-pressed', 'true');
    } else if (committed.length === 4) {
      calibrateButton.textContent = root.dataset.fineTune === '1' ? 'Fine-tune corners' : 'Recalibrate';
      calibrateButton.setAttribute('aria-pressed', 'false');
    } else {
      calibrateButton.textContent = root.dataset.fineTune === '1' ? 'Fine-tune corners' : 'Calibrate wall';
      calibrateButton.setAttribute('aria-pressed', 'false');
    }
  }
  function roomApi() {
    const room = document.getElementById('nd-room-lab');
    return room && room.neuralDance && typeof room.neuralDance.setMarkers === 'function' ? room.neuralDance : null;
  }
  function push(list) {
    latest = list;
    const nd = roomApi();
    if (!nd) return;
    nd.setMarkers(list);
    if (typeof nd.poke === 'function') nd.poke();
    if (list && list.length && !askedStart) {
      const play = document.getElementById('nd-room-lab').querySelector('[data-action="play"]');
      if (play && play.textContent.trim() === 'Start') {
        askedStart = true;
        play.click();
      }
    }
  }
  function stopDriving() {
    if (!driving) {
      latest = null;
      return;
    }
    driving = false;
    const nd = roomApi();
    if (nd) {
      nd.setMarkers([]);
      if (typeof nd.poke === 'function') nd.poke();
      nd.setMarkers(null);
    }
    latest = null;
  }
  function publish(markers) {
    if (!markersOn || !homography) {
      if (driving) stopDriving();
      else latest = null;
      return;
    }
    if (markers.length) {
      driving = true;
      push(markers);
      return;
    }
    if (driving) push([]);
    else latest = null;
  }
  function fillSelect(selectedId) {
    const keep = selectedId || select.value;
    select.replaceChildren();
    select.add(new Option('Choose a camera', ''));
    for (const choice of choices) select.add(new Option(choice.label, choice.deviceId));
    select.value = choices.some(c => c.deviceId === keep) ? keep : '';
  }
  function openedId() {
    const track = stream && stream.getVideoTracks()[0];
    return track && track.getSettings ? (track.getSettings().deviceId || '') : '';
  }
  function fail(err) {
    const denied = permissionDenied(err);
    const timeout = err && err.name === 'TimeoutError';
    say(denied ? 'Camera blocked' : timeout ? 'Camera picture did not start' : 'No camera');
    if (!stream) cameraButton.textContent = 'Use camera';
  }
  function stopTracks(current) {
    if (!current) return;
    current.getTracks().forEach(track => {
      try { track.stop(); } catch { /* already ended */ }
    });
  }
  function stopCamera(text) {
    stopLoop();
    stopTracks(stream);
    stream = null;
    video.srcObject = null;
    rawBlobs = [];
    cameraButton.textContent = 'Use camera';
    if (markersOn) setMarkersEnabled(false);
    say(text || 'Camera off');
    drawOverlay();
  }
  function startLoop() {
    if (!raf) raf = requestAnimationFrame(loop);
  }
  function stopLoop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  async function open(deviceId) {
    const md = navigator.mediaDevices;
    const next = await acquireCameraStream(md, deviceId);
    const previous = stream;
    try {
      await playPreview(video, next);
    } catch (err) {
      stopTracks(next);
      if (previous && previous !== next) {
        try { await playPreview(video, previous); } catch { video.srcObject = previous; }
      } else if (!previous) {
        video.srcObject = null;
      }
      throw err;
    }
    if (previous && previous !== next) stopTracks(previous);
    stream = next;
    const track = next.getVideoTracks()[0];
    if (track) track.addEventListener('unmute', () => { rebuild(); drawOverlay(); });
    startLoop();
    cameraButton.textContent = 'Stop camera';
  }
  async function enumerateAndPick(saved) {
    const md = navigator.mediaDevices;
    const found = await md.enumerateDevices();
    choices = cameraChoices(found);
    const pick = pickCamera(choices, saved || settings());
    fillSelect(pick ? pick.deviceId : '');
    return pick;
  }
  async function startCamera() {
    const md = navigator.mediaDevices;
    if (!md || !md.getUserMedia || !md.enumerateDevices) {
      say('Camera unavailable');
      return;
    }
    say('Asking for the camera');
    const saved = readCameraSettings(memoryOf(null));
    try {
      await open(saved && saved.deviceId || '');
    } catch (err) {
      if (saved && saved.deviceId) {
        try { await open(''); } catch (again) { fail(again); return; }
      } else {
        fail(err);
        return;
      }
    }
    let pick = null;
    try { pick = await enumerateAndPick(saved); } catch { pick = null; }
    if (pick && pick.deviceId && pick.deviceId !== openedId()) {
      try { await open(pick.deviceId); } catch { /* keep the camera that already opened */ }
    }
    persist();
    rebuild();
    say(committed.length === 4 ? 'Calibrated. Pink notes show on the preview.' : 'Click Calibrate wall, then the four corners of the projection.');
  }
  async function refreshCameras() {
    const md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) {
      say('Camera unavailable');
      return;
    }
    if (!stream) {
      await startCamera();
      return;
    }
    try {
      const pick = await enumerateAndPick(settings());
      if (pick) select.value = pick.deviceId;
      persist();
      say(choices.some(c => /iPhone\s*Camera/i.test(c.label)) ? 'iPhone Camera is in the list.' : 'Camera list updated.');
    } catch {
      say('Camera list unavailable');
    }
  }
  function detect(now) {
    if (!videoFrameReady(video)) return;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!homography && committed.length === 4) rebuild();
    const scale = detectionSize(vw, vh);
    if (scratch.width !== scale.width) scratch.width = scale.width;
    if (scratch.height !== scale.height) scratch.height = scale.height;
    if (!drawVideoFrame(video, sctx, scale.width, scale.height)) return;
    const frame = sctx.getImageData(0, 0, scale.width, scale.height);
    const result = markersFromFrame(frame, settings(), markersOn ? homography : null, scale, markersOn ? tracker : idleTracker, now);
    rawBlobs = result.blobs;
    if (markersOn) publish(result.markers);
    if (now - lastStatus > 800) {
      lastStatus = now;
      if (!draft) {
        const notes = rawBlobs.length;
        const placed = latest ? latest.length : 0;
        say(markersOn
          ? 'Markers on · ' + placed + (placed === 1 ? ' dancer' : ' dancers') + ' · ' + notes + ' pink ' + (notes === 1 ? 'blob' : 'blobs')
          : 'Preview · ' + notes + ' pink ' + (notes === 1 ? 'blob' : 'blobs'));
      }
    }
  }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const track = stream && stream.getVideoTracks()[0];
    if (!stream || !track || track.readyState !== 'live') return;
    if (track.muted || !videoFrameReady(video)) {
      if (!draft && now - lastStatus > 800) {
        lastStatus = now;
        say('Waiting for a picture from the camera.');
      }
      drawOverlay();
      return;
    }
    if (now - lastDetect < 100) {
      drawOverlay();
      return;
    }
    lastDetect = now;
    detect(now);
    drawOverlay();
  }
  function activeCorners() {
    return draft || committed;
  }
  function drawOverlay() {
    const vw = video.videoWidth || overlay.clientWidth || 16;
    const vh = video.videoHeight || overlay.clientHeight || 9;
    if (overlay.width !== vw) overlay.width = vw;
    if (overlay.height !== vh) overlay.height = vh;
    octx.clearRect(0, 0, overlay.width, overlay.height);
    drawVideoFrame(video, octx, overlay.width, overlay.height);
    const corners = activeCorners();
    if (corners.length) {
      octx.strokeStyle = '#ff7ad9';
      octx.fillStyle = '#ff7ad9';
      octx.lineWidth = Math.max(2, vw / 400);
      octx.beginPath();
      corners.forEach((corner, i) => {
        const x = corner.x * vw;
        const y = corner.y * vh;
        if (i) octx.lineTo(x, y);
        else octx.moveTo(x, y);
      });
      if (corners.length === 4) octx.closePath();
      octx.stroke();
      corners.forEach((corner, i) => {
        const x = corner.x * vw;
        const y = corner.y * vh;
        octx.beginPath();
        octx.arc(x, y, Math.max(6, vw / 120), 0, Math.PI * 2);
        octx.fill();
        octx.fillStyle = '#07080c';
        octx.font = Math.max(12, vw / 50) + 'px sans-serif';
        octx.fillText(String(i + 1), x - 4, y + 4);
        octx.fillStyle = '#ff7ad9';
      });
    }
    octx.strokeStyle = '#ffd1ec';
    for (const blob of rawBlobs) {
      octx.beginPath();
      octx.arc(blob.x, blob.y, Math.max(8, vw / 80), 0, Math.PI * 2);
      octx.stroke();
    }
  }
  function setMarkersEnabled(on) {
    if (on && committed.length !== 4) {
      say('Calibrate the four wall corners first.');
      return;
    }
    markersOn = on;
    tracker = createMarkerTracker();
    askedStart = false;
    if (!on) stopDriving();
    syncMarkerButton();
    say(on ? 'Markers on. A note joins the Room music stage after it has been up for a moment.' : 'Markers off.');
  }
  hue.addEventListener('input', () => { refreshLabels(); persist(); });
  sat.addEventListener('input', () => { refreshLabels(); persist(); });
  size.addEventListener('input', () => { refreshLabels(); persist(); });
  select.addEventListener('change', async () => {
    persist();
    if (!select.value) return;
    try { await open(select.value); persist(); } catch (err) { fail(err); }
  });
  cameraButton.addEventListener('click', () => {
    if (stream) stopCamera('Camera off');
    else startCamera();
  });
  refreshButton.addEventListener('click', () => { refreshCameras(); });
  calibrateButton.addEventListener('click', () => {
    if (draft) {
      draft = null;
      syncMarkerButton();
      say(committed.length === 4 ? 'Calibration kept.' : 'Calibration cancelled.');
      drawOverlay();
      return;
    }
    draft = [];
    syncMarkerButton();
    say('Corner 1 of 4 · ' + CORNER_STEPS[0] + ' of the projected wall.');
    drawOverlay();
  });
  markerButton.addEventListener('click', () => setMarkersEnabled(!markersOn));
  overlay.addEventListener('pointerdown', event => {
    if (!draft) return;
    const spot = clientToNormalized(event.clientX, event.clientY, overlay.getBoundingClientRect());
    if (!spot) return;
    draft.push(spot);
    if (draft.length >= 4) {
      committed = draft.slice(0, 4);
      draft = null;
      rebuild();
      persist();
      syncMarkerButton();
      say(homography || video.videoWidth ? 'Wall calibrated. Turn markers on when a pink note is up.' : 'Corners saved. Start the camera to finish the mapping.');
    } else {
      say('Corner ' + (draft.length + 1) + ' of 4 · ' + CORNER_STEPS[draft.length] + ' of the projected wall.');
    }
    drawOverlay();
  });
  function commitCorners(list, message) {
    if (!list || list.length !== 4) return false;
    const next = [];
    for (const corner of list) {
      const p = point(corner);
      if (!p || p.x < -0.25 || p.x > 1.25 || p.y < -0.25 || p.y > 1.25) return false;
      next.push(p);
    }
    committed = next;
    draft = null;
    rebuild();
    persist();
    syncMarkerButton();
    say(message || 'Wall aligned from the camera.');
    drawOverlay();
    return !!homography || !video.videoWidth;
  }
  root.neuralDanceCamera = {
    setNormalizedCorners(list, message) { return commitCorners(list, message); },
    cancelCalibration(silent) {
      draft = null;
      syncMarkerButton();
      if (!silent) say(committed.length === 4 ? 'Calibration kept.' : 'Alignment cancelled.');
      drawOverlay();
    },
    grabFrame() {
      if (!videoFrameReady(video)) return null;
      const scale = detectionSize(video.videoWidth, video.videoHeight);
      if (scratch.width !== scale.width) scratch.width = scale.width;
      if (scratch.height !== scale.height) scratch.height = scale.height;
      if (!drawVideoFrame(video, sctx, scale.width, scale.height)) return null;
      const frame = sctx.getImageData(0, 0, scale.width, scale.height);
      return {data: frame.data, width: scale.width, height: scale.height, scale, videoWidth: video.videoWidth, videoHeight: video.videoHeight};
    }
  };
  video.addEventListener('loadedmetadata', () => { rebuild(); drawOverlay(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && stream) stopCamera('Camera off');
  });
  window.addEventListener('pagehide', () => stopCamera('Camera off'));
  applySaved(readCameraSettings(memoryOf(null)));
  syncMarkerButton();
  refreshLabels();
  if (committed.length === 4) say('Calibration saved in this browser. Use camera to watch the wall.');
}

if (typeof document !== 'undefined') {
  const boot = () => attachCameraMode(document.getElementById('nd-camera-mode'));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
