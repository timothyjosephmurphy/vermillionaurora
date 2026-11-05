// Camera mode for the Neural Dance wall.
// Continuity Camera (an "iPhone Camera" device) watches the projection.
// Four clicked corners build a homography into the Room music canvas.
// Pink notes and dark dancer-silhouette stickers become dancers through
// nd-room-lab.neuralDance.setMarkers, the marker hook studio-tracker #793
// can call. sample() returns [{id, x, y, type}] in projection pixels, or
// null while the camera is not driving.

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
export const DETECTION_MODES = ['pink', 'stickers', 'both'];
// Dark vinyl dancers on a light wall (studio-tracker #801).
// The window is wider than a post-it-sized sticker and smaller than a
// wall-sized shadow, so a lighting gradient does not fill in.
export const STICKER_SHAPE = {
  minAspect: 0.18,
  maxAspect: 1.7,
  minSolidity: 0.42,
  minExtent: 0.22,
  maxExtent: 0.9,
  maxAreaFraction: 0.07,
  wallFloor: 72,
  windowScale: 0.2
};
export const DEFAULTS = {
  hueTolerance: 28,
  saturationSensitivity: 0.55,
  minBlobSize: 18,
  detectionMode: 'pink',
  stickerSensitivity: 0.55
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

export function blobSettings(options = {}) {
  return {
    hueCenter: PINK_HUE,
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

function neighborOffsets(eight) {
  return eight
    ? [-1, 0, 1, 0, 0, -1, 0, 1, -1, -1, 1, -1, -1, 1, 1, 1]
    : [-1, 0, 1, 0, 0, -1, 0, 1];
}

// Connected components. pixels is a flat [x, y, ...] list when geometry is requested.
function labelComponents(mask, w, h, eight, geometry) {
  const count = w * h;
  const seen = new Uint8Array(count);
  const qx = new Int32Array(count);
  const qy = new Int32Array(count);
  const dirs = neighborOffsets(eight);
  const comps = [];
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
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      const pixels = geometry ? [] : null;
      while (head < tail) {
        const cx = qx[head];
        const cy = qy[head];
        head++;
        sumX += cx;
        sumY += cy;
        area++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        if (pixels) {
          pixels.push(cx, cy);
        }
        for (let k = 0; k < dirs.length; k += 2) {
          const nx = cx + dirs[k];
          const ny = cy + dirs[k + 1];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const ni = ny * w + nx;
          if (!mask[ni] || seen[ni]) continue;
          seen[ni] = 1;
          qx[tail] = nx;
          qy[tail] = ny;
          tail++;
        }
      }
      const comp = {x: sumX / area, y: sumY / area, area, minX, maxX, minY, maxY};
      if (pixels) comp.pixels = pixels;
      comps.push(comp);
    }
  }
  return comps;
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
  const blobs = [];
  for (const comp of labelComponents(mask, w, h, false, false)) {
    if (comp.area >= settings.minBlobSize) blobs.push({x: comp.x, y: comp.y, area: comp.area});
  }
  blobs.sort((p, q) => q.area - p.area || p.x - q.x || p.y - q.y);
  return blobs;
}

export function luminanceByte(r, g, b) {
  return Math.max(0, Math.min(255, Math.round(0.299 * r + 0.587 * g + 0.114 * b)));
}

// Neighborhood wider than a sticker, so the local mean stays near the wall.
export function stickerWindowRadius(width, height) {
  const span = Math.max(1, Math.min(width | 0, height | 0));
  return Math.max(5, Math.round(span * STICKER_SHAPE.windowScale));
}

// 0 = only pixels much darker than the local wall. 1 = dark gray still counts.
// A neighborhood below the wall floor is not a light wall, so nothing matches.
export function localWallThreshold(wallLuminance, sensitivity) {
  const wall = +wallLuminance;
  if (!Number.isFinite(wall) || wall < STICKER_SHAPE.wallFloor) return -1;
  const s = clamp(sensitivity, 0, 1, DEFAULTS.stickerSensitivity);
  const ratio = 0.34 + s * 0.42;
  const gap = 30 - s * 18;
  return Math.max(0, Math.min(wall * ratio, wall - gap));
}

export function stickerSettings(options = {}) {
  return {
    stickerSensitivity: clamp(options.stickerSensitivity, 0, 1, DEFAULTS.stickerSensitivity),
    minBlobSize: Math.round(clamp(options.minBlobSize, 1, 100000, DEFAULTS.minBlobSize)),
    minAspect: STICKER_SHAPE.minAspect,
    maxAspect: STICKER_SHAPE.maxAspect,
    minSolidity: STICKER_SHAPE.minSolidity,
    minExtent: STICKER_SHAPE.minExtent,
    maxExtent: STICKER_SHAPE.maxExtent,
    maxAreaFraction: STICKER_SHAPE.maxAreaFraction
  };
}

function cross(o, a, b) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function convexHull(points) {
  if (!points || !points.length) return [];
  const sorted = points.slice().sort((p, q) => p.x - q.x || p.y - q.y);
  const unique = [];
  for (const p of sorted) {
    const last = unique[unique.length - 1];
    if (last && last.x === p.x && last.y === p.y) continue;
    unique.push(p);
  }
  if (unique.length <= 1) return unique;
  const lower = [];
  for (const p of unique) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = unique.length - 1; i >= 0; i--) {
    const p = unique[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function polygonArea(hull) {
  if (!hull || hull.length < 3) return 0;
  let sum = 0;
  for (let i = 0, n = hull.length; i < n; i++) {
    const a = hull[i];
    const b = hull[(i + 1) % n];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

function shapeMetrics(comp) {
  const bw = comp.maxX - comp.minX + 1;
  const bh = comp.maxY - comp.minY + 1;
  const corners = [];
  const pixels = comp.pixels;
  for (let i = 0; i < pixels.length; i += 2) {
    const x = pixels[i];
    const y = pixels[i + 1];
    corners.push({x, y}, {x: x + 1, y}, {x, y: y + 1}, {x: x + 1, y: y + 1});
  }
  const hullArea = polygonArea(convexHull(corners));
  const solidity = hullArea > 0 ? comp.area / hullArea : 0;
  return {
    aspect: bw / bh,
    extent: comp.area / (bw * bh),
    solidity: Math.min(1, solidity)
  };
}

function luminanceIntegral(rgba, w, h) {
  const stride = w + 1;
  const sum = new Float64Array(stride * (h + 1));
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) {
      const p = (y * w + x) * 4;
      row += luminanceByte(rgba[p], rgba[p + 1], rgba[p + 2]);
      sum[(y + 1) * stride + (x + 1)] = sum[y * stride + (x + 1)] + row;
    }
  }
  return sum;
}

// Dark blobs against the local wall, then area / aspect / solidity / extent.
export function detectStickerBlobs(rgba, width, height, options = {}) {
  const w = width | 0;
  const h = height | 0;
  if (!rgba || w < 1 || h < 1 || rgba.length < w * h * 4) return [];
  const settings = stickerSettings(options);
  const radius = stickerWindowRadius(w, h);
  const integral = luminanceIntegral(rgba, w, h);
  const stride = w + 1;
  const count = w * h;
  const mask = new Uint8Array(count);
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(h, y + radius + 1);
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(w, x + radius + 1);
      const area = (x1 - x0) * (y1 - y0);
      const sum = integral[y1 * stride + x1] - integral[y0 * stride + x1] - integral[y1 * stride + x0] + integral[y0 * stride + x0];
      const lum = luminanceByte(rgba[(y * w + x) * 4], rgba[(y * w + x) * 4 + 1], rgba[(y * w + x) * 4 + 2]);
      if (lum <= localWallThreshold(sum / area, settings.stickerSensitivity)) mask[y * w + x] = 1;
    }
  }
  const maxArea = Math.max(settings.minBlobSize, Math.round(count * settings.maxAreaFraction));
  const blobs = [];
  for (const comp of labelComponents(mask, w, h, true, true)) {
    if (comp.area < settings.minBlobSize || comp.area > maxArea) continue;
    const shape = shapeMetrics(comp);
    if (shape.aspect < settings.minAspect || shape.aspect > settings.maxAspect) continue;
    if (shape.solidity < settings.minSolidity) continue;
    if (shape.extent < settings.minExtent || shape.extent > settings.maxExtent) continue;
    blobs.push({
      x: comp.x,
      y: comp.y,
      area: comp.area,
      kind: 'sticker',
      aspect: shape.aspect,
      solidity: shape.solidity,
      extent: shape.extent
    });
  }
  blobs.sort((p, q) => q.area - p.area || p.x - q.x || p.y - q.y);
  return blobs;
}

// Same spot found by both detectors becomes one marker. Neighbors of one kind stay.
export function dedupeBlobs(blobs, radius = 5) {
  const sorted = (blobs || [])
    .filter(blob => point(blob))
    .sort((a, b) => (b.area || 0) - (a.area || 0) || a.x - b.x || a.y - b.y);
  const kept = [];
  for (const blob of sorted) {
    const closeOther = kept.some(keptBlob => keptBlob.kind !== blob.kind && Math.hypot(keptBlob.x - blob.x, keptBlob.y - blob.y) <= radius);
    if (!closeOther) kept.push(blob);
  }
  return kept;
}

export function normalizeDetectionMode(mode) {
  return DETECTION_MODES.includes(mode) ? mode : 'pink';
}

export function blobPhrase(blobs, mode) {
  const list = blobs || [];
  const pink = list.filter(b => b.kind !== 'sticker').length;
  const stickers = list.filter(b => b.kind === 'sticker').length;
  const noun = (n, word) => n + ' ' + word + (n === 1 ? ' blob' : ' blobs');
  const which = normalizeDetectionMode(mode);
  if (which === 'stickers') return noun(stickers, 'sticker');
  if (which === 'both') return noun(pink, 'pink') + ' · ' + noun(stickers, 'sticker');
  return noun(pink, 'pink');
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
  const options = settings || {};
  const mode = normalizeDetectionMode(options.detectionMode);
  const found = [];
  if (mode !== 'stickers') {
    for (const blob of detectPinkBlobs(frame.data, frame.width, frame.height, options)) {
      found.push({...blob, kind: 'pink'});
    }
  }
  if (mode !== 'pink') {
    for (const blob of detectStickerBlobs(frame.data, frame.width, frame.height, options)) {
      found.push(blob);
    }
  }
  const blobs = dedupeBlobs(found, 5);
  const videoBlobs = blobs.map(b => ({
    x: (b.x + 0.5) * scale.scaleX,
    y: (b.y + 0.5) * scale.scaleY,
    area: b.area,
    kind: b.kind || 'pink'
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
  return choices.find(c => /iPhone\s*Camera/i.test(c.label))
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
    minBlobSize: Math.round(clamp(data.minBlobSize, 4, 200, DEFAULTS.minBlobSize)),
    detectionMode: normalizeDetectionMode(data.detectionMode),
    stickerSensitivity: clamp(data.stickerSensitivity, 0, 1, DEFAULTS.stickerSensitivity)
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
      minBlobSize: settings.minBlobSize,
      detectionMode: normalizeDetectionMode(settings.detectionMode),
      stickerSensitivity: clamp(settings.stickerSensitivity, 0, 1, DEFAULTS.stickerSensitivity)
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
  const sticker = root.querySelector('[data-control="sticker"]');
  const modeButtons = Array.from(root.querySelectorAll('[data-mode]'));
  const cameraButton = root.querySelector('[data-action="camera"]');
  const refreshButton = root.querySelector('[data-action="refresh"]');
  const calibrateButton = root.querySelector('[data-action="calibrate"]');
  const markerButton = root.querySelector('[data-action="markers"]');
  if (!video || !overlay || !select || !hue || !sat || !size || !sticker || modeButtons.length < 3) return;
  const octx = overlay.getContext('2d');
  const scratch = document.createElement('canvas');
  const sctx = scratch.getContext('2d', {willReadFrequently: true});
  let stream = null;
  let committed = [];
  let draft = null;
  let homography = null;
  let markersOn = false;
  let detectionMode = DEFAULTS.detectionMode;
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
      minBlobSize: +size.value,
      detectionMode,
      stickerSensitivity: +sticker.value
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
    showSlider(sticker, 'sticker', (+sticker.value).toFixed(2));
  }
  function syncMode() {
    detectionMode = normalizeDetectionMode(detectionMode);
    for (const button of modeButtons) {
      button.setAttribute('aria-pressed', button.dataset.mode === detectionMode ? 'true' : 'false');
    }
  }
  function applySaved(saved) {
    if (!saved) return;
    hue.value = String(saved.hueTolerance);
    sat.value = String(saved.saturationSensitivity);
    size.value = String(saved.minBlobSize);
    sticker.value = String(saved.stickerSensitivity);
    detectionMode = saved.detectionMode;
    if (saved.corners) committed = saved.corners.map(p => ({x: p.x, y: p.y}));
    refreshLabels();
    syncMode();
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
      calibrateButton.textContent = 'Recalibrate';
      calibrateButton.setAttribute('aria-pressed', 'false');
    } else {
      calibrateButton.textContent = 'Calibrate wall';
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
  function videoConstraints(deviceId) {
    const video = {width: {ideal: 1280}, height: {ideal: 720}};
    if (deviceId) video.deviceId = {exact: deviceId};
    return video;
  }
  function openedId() {
    const track = stream && stream.getVideoTracks()[0];
    return track && track.getSettings ? (track.getSettings().deviceId || '') : '';
  }
  function fail(err) {
    const denied = err && (err.name === 'NotAllowedError' || err.name === 'SecurityError' || err.name === 'PermissionDeniedError');
    say(denied ? 'Camera blocked' : 'No camera');
    cameraButton.textContent = 'Use camera';
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
    const next = await md.getUserMedia({video: videoConstraints(deviceId), audio: false});
    stopTracks(stream);
    stream = next;
    video.srcObject = stream;
    try { await video.play(); } catch { /* the preview element still attaches the stream */ }
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
    say(committed.length === 4 ? 'Calibrated. Pink notes and dancer stickers show on the preview.' : 'Click Calibrate wall, then the four corners of the projection.');
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
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;
    if (!homography && committed.length === 4) rebuild();
    const scale = detectionSize(vw, vh);
    if (scratch.width !== scale.width) scratch.width = scale.width;
    if (scratch.height !== scale.height) scratch.height = scale.height;
    sctx.drawImage(video, 0, 0, scale.width, scale.height);
    const frame = sctx.getImageData(0, 0, scale.width, scale.height);
    const result = markersFromFrame(frame, settings(), markersOn ? homography : null, scale, markersOn ? tracker : idleTracker, now);
    rawBlobs = result.blobs;
    if (markersOn) publish(result.markers);
    if (now - lastStatus > 800) {
      lastStatus = now;
      if (!draft) {
        const placed = latest ? latest.length : 0;
        const seen = blobPhrase(rawBlobs, detectionMode);
        say(markersOn
          ? 'Markers on · ' + placed + (placed === 1 ? ' dancer' : ' dancers') + ' · ' + seen
          : 'Preview · ' + seen);
      }
    }
  }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!stream || video.readyState < 2) return;
    if (now - lastDetect < 100) return;
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
    for (const blob of rawBlobs) {
      octx.strokeStyle = blob.kind === 'sticker' ? '#d5dbe6' : '#ffd1ec';
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
    say(on ? 'Markers on. A note or sticker joins the Room music stage after it has been up for a moment.' : 'Markers off.');
  }
  hue.addEventListener('input', () => { refreshLabels(); persist(); });
  sat.addEventListener('input', () => { refreshLabels(); persist(); });
  size.addEventListener('input', () => { refreshLabels(); persist(); });
  sticker.addEventListener('input', () => { refreshLabels(); persist(); });
  for (const button of modeButtons) {
    button.addEventListener('click', () => {
      detectionMode = normalizeDetectionMode(button.dataset.mode);
      tracker = createMarkerTracker();
      syncMode();
      persist();
    });
  }
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
      say(homography || video.videoWidth ? 'Wall calibrated. Turn markers on when a pink note or dancer sticker is up.' : 'Corners saved. Start the camera to finish the mapping.');
    } else {
      say('Corner ' + (draft.length + 1) + ' of 4 · ' + CORNER_STEPS[draft.length] + ' of the projected wall.');
    }
    drawOverlay();
  });
  video.addEventListener('loadedmetadata', () => { rebuild(); drawOverlay(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && stream) stopCamera('Camera off');
  });
  window.addEventListener('pagehide', () => stopCamera('Camera off'));
  applySaved(readCameraSettings(memoryOf(null)));
  syncMode();
  syncMarkerButton();
  refreshLabels();
  if (committed.length === 4) say('Calibration saved in this browser. Use camera to watch the wall.');
}

if (typeof document !== 'undefined') {
  const boot = () => attachCameraMode(document.getElementById('nd-camera-mode'));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
