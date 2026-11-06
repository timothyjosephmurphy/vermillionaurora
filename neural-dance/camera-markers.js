// Camera mode for the Neural Dance wall.
// Continuity Camera (an "iPhone Camera" device) watches the projection.
// Four clicked corners build a homography into the Room music canvas.
// Pink notes become dancers through nd-room-lab.neuralDance.setMarkers,
// the marker hook studio-tracker #793 can call. sample() returns
// [{id, x, y, type}] in projection pixels, or null while the camera is not driving.

// v2 drops poisoned auto-saved cameras (nd.camera.v1 / nd-camera-mode) and zeroed sliders.
export const STORAGE_KEY = 'nd.camera.v2';
export const LEGACY_CAMERA_KEYS = ['nd.camera.v1', 'nd-camera-mode'];
export const CANVAS_W = 1000;
export const CANVAS_H = 620;
// Raw single-pixel pink, wide enough for both of TJ's measured notes (293.8° and 8.6°).
export const PINK_HUE = 332;
// White-balanced pink. Both real rooms land near 340° after dividing out the screen.
export const PINK_WB_HUE = 340;
export const APPEAR_MS = 1500;
export const CLEAR_MS = 300;
export const DETECT_WIDTH = 480;
export const VALUE_FLOOR = 0.35;
export const PINK_VALUE_FLOOR = 0.32;
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
export const DETECTION_MODES = ['both', 'pink', 'stickers'];
export const DEFAULTS = {
  hueTolerance: 48,
  saturationSensitivity: 0.75,
  minBlobSize: 18,
  maxBlobSize: 160,
  detectionMode: 'both',
  markerMode: 'both',
  stickerSensitivity: 0.5
};
export function areaScaleFor(width) {
  const w = Math.max(1, width | 0);
  return Math.max(1, (w / 160) * (w / 160));
}
export function normalizeDetectionMode(mode) {
  return DETECTION_MODES.includes(mode) ? mode : 'both';
}

function clamp(n, lo, hi, fallback) {
  const v = +n;
  if (!Number.isFinite(v)) return fallback;
  return Math.min(hi, Math.max(lo, v));
}

function point(p) {
  if (!p || !Number.isFinite(+p.x) || !Number.isFinite(+p.y)) return null;
  return {x: +p.x, y: +p.y};
}

// 0 tightens to ~0.45. Default 0.75 is a washed-out note (~0.14). 1 reaches ~0.06.
export function saturationFloor(sensitivity) {
  const s = clamp(sensitivity, 0, 1, DEFAULTS.saturationSensitivity);
  if (s <= 0.75) return 0.45 - (s / 0.75) * (0.45 - 0.14);
  return 0.14 - ((s - 0.75) / 0.25) * (0.14 - 0.06);
}

// Green absorption of a physical note. Low sensitivity requires 0.26; default 0.16; high 0.10.
export function greenAbsorption(sensitivity) {
  const s = clamp(sensitivity, 0, 1, DEFAULTS.saturationSensitivity);
  if (s <= 0.75) return 0.26 - (s / 0.75) * (0.26 - 0.16);
  return 0.16 - ((s - 0.75) / 0.25) * (0.16 - 0.10);
}

export function maxBlobCap(width, height, override) {
  if (override != null && Number.isFinite(+override)) return Math.max(1, Math.round(+override));
  const area = Math.max(1, (width | 0) * (height | 0));
  // 160 cells on a 160×100 grid rejects the projector's 180px wash. Smaller frames keep 10%.
  return Math.min(160, Math.max(64, Math.round(area * 0.10)));
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
// baseline, when the same length as rgba, keeps only pixels that changed after the
// grid appeared. Omit it and detection is the relaxed HSV path (existing tests).
export function findCalibrationMarkers(rgba, width, height, markers = CALIBRATION_MARKERS, baseline = null) {
  if (!rgba || !(width > 0) || !(height > 0) || !markers || markers.length !== 4) return null;
  const changed = baseline && baseline.length === rgba.length ? baseline : null;
  const centers = [];
  for (const marker of markers) {
    const blobs = detectPinkBlobs(rgba, width, height, {
      hueCenter: marker.hue,
      hueTolerance: 28,
      minSaturation: 0.25,
      minBlobSize: 3,
      valueFloor: 0.35,
      baseline: changed
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
    valueFloor: Number.isFinite(+options.valueFloor) ? +options.valueFloor : PINK_VALUE_FLOOR,
    minSaturation: Number.isFinite(+options.minSaturation) ? clamp(+options.minSaturation, 0, 1, 0) : null,
    bg: options.bg && Number.isFinite(+options.bg.r) ? options.bg : null,
    baseline: options.baseline || null,
    homography: options.homography || null,
    scale: options.scale || null,
    exclude: Array.isArray(options.exclude) ? options.exclude : null,
    customSample: !!options.customSample,
    maxBlobSize: Number.isFinite(+options.maxBlobSize) ? +options.maxBlobSize : null
  };
}

function stageInside(x, y, settings) {
  if (!settings.homography) return true;
  const sx = (x + 0.5) * (settings.scale && settings.scale.scaleX ? settings.scale.scaleX : 1);
  const sy = (y + 0.5) * (settings.scale && settings.scale.scaleY ? settings.scale.scaleY : 1);
  const p = applyHomography(settings.homography, sx, sy);
  if (!p || p.x < 0 || p.y < 0 || p.x > CANVAS_W || p.y > CANVAS_H) return false;
  for (const rect of settings.exclude || []) {
    if (p.x >= rect.x && p.x < rect.x + rect.w && p.y >= rect.y && p.y < rect.y + rect.h) return false;
  }
  return true;
}

function hueDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function pinkFamily(hueCenter) {
  return hueDistance(hueCenter, PINK_HUE) <= 70 || hueDistance(hueCenter, PINK_WB_HUE) <= 70;
}

// Median of a coarse grid. Channels are clamped to >= 32 so a black frame
// cannot divide the white balance. Returns null for an empty buffer.
export function frameBackground(rgba, width, height, step = 8, accept = null) {
  const w = width | 0;
  const h = height | 0;
  if (!rgba || w < 1 || h < 1) return null;
  const rs = [];
  const gs = [];
  const bs = [];
  const jump = Math.max(1, step | 0);
  for (let y = 0; y < h; y += jump) {
    for (let x = 0; x < w; x += jump) {
      if (accept && !accept(x, y)) continue;
      const i = (y * w + x) * 4;
      if (i + 2 >= rgba.length) continue;
      rs.push(rgba[i]);
      gs.push(rgba[i + 1]);
      bs.push(rgba[i + 2]);
    }
  }
  if (!rs.length) return null;
  const mid = (arr) => arr.slice().sort((a, b) => a - b)[arr.length >> 1];
  return {r: Math.max(32, mid(rs)), g: Math.max(32, mid(gs)), b: Math.max(32, mid(bs))};
}

// White point is the screen median. Dividing by (channel / mean) keeps hue and
// saturation of r/rBg and puts brightness back on the camera scale.
function whiteBalance(r, g, b, bg) {
  const mean = (bg.r + bg.g + bg.b) / 3 || 1;
  return {
    r: r * mean / bg.r,
    g: g * mean / bg.g,
    b: b * mean / bg.b,
    rRatio: r / bg.r,
    gRatio: g / bg.g,
    bRatio: b / bg.b
  };
}

export function isPink(r, g, b, settings) {
  const hsv = rgbToHsv(r, g, b);
  const floor = Number.isFinite(settings.minSaturation) ? settings.minSaturation : saturationFloor(settings.saturationSensitivity);
  const center = settings.hueCenter;
  if (!pinkFamily(center)) {
    return hueDistance(hsv.h, center) <= settings.hueTolerance
      && hsv.s >= floor
      && hsv.v >= (Number.isFinite(settings.valueFloor) ? settings.valueFloor : VALUE_FLOOR);
  }
  const bg = settings.bg;
  if (bg && rgbToHsv(bg.r, bg.g, bg.b).s <= 0.42 && bg.r > 0 && bg.g > 0 && bg.b > 0) {
    const wb = whiteBalance(r, g, b, bg);
    if (settings.customSample) {
      const adapted = rgbToHsv(wb.r, wb.g, wb.b);
      return hueDistance(adapted.h, settings.hueCenter) <= settings.hueTolerance && adapted.s >= Math.min(floor, 0.12);
    }
    const thresh = greenAbsorption(settings.saturationSensitivity);
    return wb.rRatio >= 0.98
      && (wb.rRatio - wb.gRatio) >= thresh
      && (wb.bRatio - wb.gRatio) >= 0.04;
  }
  return hueDistance(hsv.h, center) <= settings.hueTolerance
    && hsv.s >= floor
    && hsv.v >= PINK_VALUE_FLOOR
    && (r - g) >= 12;
}

// Connected components on an already-downscaled RGBA buffer.
export function detectPinkBlobs(rgba, width, height, options = {}) {
  const w = width | 0;
  const h = height | 0;
  if (!rgba || w < 1 || h < 1 || rgba.length < w * h * 4) return [];
  const settings = blobSettings(options);
  const count = w * h;
  const mask = new Uint8Array(count);
  const baseline = settings.baseline && settings.baseline.length === rgba.length ? settings.baseline : null;
  const areaScale = areaScaleFor(w);
  const maxEq = settings.maxBlobSize != null ? settings.maxBlobSize : DEFAULTS.maxBlobSize;
  for (let i = 0, p = 0, y = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i++, p += 4) {
      if (settings.homography && !stageInside(x, y, settings)) continue;
      if (baseline) {
        const delta = Math.abs(rgba[p] - baseline[p]) + Math.abs(rgba[p + 1] - baseline[p + 1]) + Math.abs(rgba[p + 2] - baseline[p + 2]);
        if (delta < 36) continue;
      }
      if (isPink(rgba[p], rgba[p + 1], rgba[p + 2], settings)) mask[i] = 1;
    }
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
      const eq = area / areaScale;
      if (eq >= settings.minBlobSize && eq <= maxEq) blobs.push({x: sumX / area, y: sumY / area, area, kind: 'pink'});
    }
  }
  blobs.sort((p, q) => q.area - p.area || p.x - q.x || p.y - q.y);
  return blobs;
}

// Frame-level pink scan. The screen median is the illuminant unless it is
// already a saturated color (a synthetic pink canvas), which is left raw.
export function detectPinkMarkers(rgba, width, height, options = {}) {
  const opts = {...options};
  if (!opts.disableWhiteBalance && !opts.bg) {
    const accept = opts.homography ? (x, y) => stageInside(x, y, opts) : null;
    const bg = frameBackground(rgba, width, height, 8, accept);
    if (bg && rgbToHsv(bg.r, bg.g, bg.b).s <= 0.42) opts.bg = bg;
  }
  return detectPinkBlobs(rgba, width, height, opts);
}

export function createStageEcho() {
  const w = 100;
  const h = 62;
  const samples = [];
  const maxR = new Uint8Array(w * h);
  const maxG = new Uint8Array(w * h);
  const maxB = new Uint8Array(w * h);
  let scratch = null;
  let ctx = null;
  function rebuild(now) {
    const kept = samples.filter(sample => now - sample.t <= 300);
    samples.length = 0;
    for (const sample of kept) samples.push(sample);
    maxR.fill(0);
    maxG.fill(0);
    maxB.fill(0);
    for (const sample of samples) {
      for (let i = 0; i < w * h; i++) {
        const o = i * 3;
        if (sample.rgb[o] > maxR[i]) maxR[i] = sample.rgb[o];
        if (sample.rgb[o + 1] > maxG[i]) maxG[i] = sample.rgb[o + 1];
        if (sample.rgb[o + 2] > maxB[i]) maxB[i] = sample.rgb[o + 2];
      }
    }
  }
  return {
    clear() { samples.length = 0; maxR.fill(0); maxG.fill(0); maxB.fill(0); },
    sample(canvas, now) {
      if (!canvas || !(canvas.width > 0) || typeof document === 'undefined') return;
      if (!scratch) {
        scratch = document.createElement('canvas');
        scratch.width = w;
        scratch.height = h;
        ctx = scratch.getContext('2d', {willReadFrequently: true});
      }
      try { ctx.drawImage(canvas, 0, 0, w, h); } catch { return; }
      const data = ctx.getImageData(0, 0, w, h).data;
      const rgb = new Uint8Array(w * h * 3);
      for (let i = 0, p = 0; i < w * h; i++, p += 4) {
        rgb[i * 3] = data[p];
        rgb[i * 3 + 1] = data[p + 1];
        rgb[i * 3 + 2] = data[p + 2];
      }
      samples.push({t: now, rgb});
      rebuild(now);
    },
    // Pink, magenta, and coral. Gold (high green) is the safe kick color and is not vetoed.
    veto(sx, sy) {
      const cx = Math.max(0, Math.min(w - 1, Math.round(sx / CANVAS_W * (w - 1))));
      const cy = Math.max(0, Math.min(h - 1, Math.round(sy / CANVAS_H * (h - 1))));
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= w || y >= h) continue;
          const i = y * w + x;
          const r = maxR[i];
          const g = maxG[i];
          if (r > 35 && (r - g) > 12 && g < 190) return true;
        }
      }
      return false;
    },
    // A dark stage center inside a bright ring is the pink-note pupil, not a vinyl sticker.
    vetoSticker(sx, sy) {
      const latest = samples[samples.length - 1];
      if (!latest) return false;
      const cx = Math.max(0, Math.min(w - 1, Math.round(sx / CANVAS_W * (w - 1))));
      const cy = Math.max(0, Math.min(h - 1, Math.round(sy / CANVAS_H * (h - 1))));
      const center = Math.max(latest.rgb[(cy * w + cx) * 3], latest.rgb[(cy * w + cx) * 3 + 1], latest.rgb[(cy * w + cx) * 3 + 2]);
      if (center >= 20) return false;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (!dx && !dy) continue;
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || y < 0 || x >= w || y >= h) continue;
          const o = (y * w + x) * 3;
          if (Math.max(latest.rgb[o], latest.rgb[o + 1], latest.rgb[o + 2]) > 45) return true;
        }
      }
      return false;
    }
  };
}

export function holdDarkStage(ms = 150) {
  if (typeof document === 'undefined') return;
  const room = document.getElementById('nd-room-lab');
  if (!room) return;
  room.dataset.ndDarkUntil = String((typeof performance !== 'undefined' ? performance.now() : Date.now()) + ms);
  if (room.neuralDance && typeof room.neuralDance.retint === 'function') room.neuralDance.retint();
}

export function medianPatch(rgba, width, height, x, y, radius = 2) {
  const w = width | 0;
  const h = height | 0;
  const pixels = [];
  for (let yy = y - radius; yy <= y + radius; yy++) {
    for (let xx = x - radius; xx <= x + radius; xx++) {
      if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
      const i = (yy * w + xx) * 4;
      pixels.push([rgba[i], rgba[i + 1], rgba[i + 2]]);
    }
  }
  if (!pixels.length) return null;
  const channel = (index) => pixels.map(px => px[index]).sort((a, b) => a - b)[pixels.length >> 1];
  const r = channel(0);
  const g = channel(1);
  const b = channel(2);
  const hsv = rgbToHsv(r, g, b);
  return {r, g, b, h: hsv.h, s: hsv.s, v: hsv.v};
}

export function luminanceByte(r, g, b) {
  return Math.max(0, Math.min(255, Math.round(0.299 * r + 0.587 * g + 0.114 * b)));
}

export function stickerWindow(width) {
  return Math.max(9, Math.round(21 * ((width | 0) / 160))) | 1;
}

// Default sensitivity 0.5 accepts luma <= localMean * 0.84.
// TJ's vinyl is 0.70–0.85 of the screen around it; 0.84 keeps the darker body.
export function stickerDarkRatio(sensitivity) {
  const s = clamp(sensitivity, 0, 1, DEFAULTS.stickerSensitivity);
  return 0.70 + s * 0.28;
}

export function localWallThreshold(wallLuminance, sensitivity) {
  const wall = +wallLuminance;
  if (!Number.isFinite(wall) || wall < 35) return -1;
  return wall * stickerDarkRatio(sensitivity);
}

export function detectStickerBlobs(rgba, width, height, options = {}) {
  const w = width | 0;
  const h = height | 0;
  if (!rgba || w < 1 || h < 1 || rgba.length < w * h * 4) return [];
  const sensitivity = clamp(options.stickerSensitivity, 0, 1, DEFAULTS.stickerSensitivity);
  const radius = stickerWindow(w) >> 1;
  const stride = w + 1;
  const integral = new Float64Array(stride * (h + 1));
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) {
      const p = (y * w + x) * 4;
      row += luminanceByte(rgba[p], rgba[p + 1], rgba[p + 2]);
      integral[(y + 1) * stride + (x + 1)] = integral[y * stride + (x + 1)] + row;
    }
  }
  const gate = {homography: options.homography || null, scale: options.scale || null, exclude: options.exclude || null};
  const mask = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(h, y + radius + 1);
    for (let x = 0; x < w; x++) {
      if (gate.homography && !stageInside(x, y, gate)) continue;
      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(w, x + radius + 1);
      const area = (x1 - x0) * (y1 - y0);
      const sum = integral[y1 * stride + x1] - integral[y0 * stride + x1] - integral[y1 * stride + x0] + integral[y0 * stride + x0];
      const p = (y * w + x) * 4;
      const lum = luminanceByte(rgba[p], rgba[p + 1], rgba[p + 2]);
      if (lum <= localWallThreshold(sum / area, sensitivity)) mask[y * w + x] = 1;
    }
  }
  const scale = areaScaleFor(w);
  const minArea = w > 160 ? Math.max(8, Math.round(14 * scale / areaScaleFor(480))) : Math.max(4, Math.round(clamp(options.minBlobSize, 1, 100000, 8)));
  const maxArea = w > 160 ? Math.max(minArea + 1, Math.round(220 * scale / areaScaleFor(480))) : Math.max(minArea, Math.round(w * h * 0.2));
  const seen = new Uint8Array(w * h);
  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);
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
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
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
        const neighbors = [cx - 1, cy, cx + 1, cy, cx, cy - 1, cx, cy + 1, cx - 1, cy - 1, cx + 1, cy - 1, cx - 1, cy + 1, cx + 1, cy + 1];
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
      if (area < minArea || area > maxArea) continue;
      const bw = maxX - minX + 1;
      const bh = maxY - minY + 1;
      const aspect = bw / bh;
      const extent = area / (bw * bh);
      if (aspect < 0.12 || aspect > 4 || extent > 0.82 || extent < 0.04) continue;
      blobs.push({x: sumX / area, y: sumY / area, area, kind: 'sticker', aspect, extent});
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
        .map(b => {
          const p = point(b);
          if (!p) return null;
          p.kind = b.kind === 'sticker' ? 'sticker' : 'pink';
          return p;
        })
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
            kind: incoming[best].kind || track.kind || 'pink',
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
          kind: incoming[i].kind || 'pink',
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
        .map(t => ({id: t.id, x: t.x, y: t.y, kind: t.kind || 'pink'}))
        .sort((p, q) => p.id - q.id);
    }
  };
}

export function toDancerMarkers(markers) {
  return (markers || []).map(m => {
    const id = m.id | 0;
    const type = Number.isFinite(+m.type) ? (((+m.type) % 4) + 4) % 4 : (((id - 1) % 4) + 4) % 4;
    return {id, x: +m.x, y: +m.y, type, kind: m.kind === 'sticker' ? 'sticker' : 'pink'};
  }).filter(m => m.id > 0 && Number.isFinite(m.x) && Number.isFinite(m.y));
}

export function markersFromFrame(frame, settings, homography, scale, tracker, now, extra = {}) {
  const options = settings || {};
  const mode = normalizeDetectionMode(options.detectionMode || options.markerMode);
  const shared = {
    ...options,
    homography: homography || null,
    scale,
    exclude: extra.exclude || null,
    customSample: Number.isFinite(+options.hueCenter) && hueDistance(+options.hueCenter, PINK_HUE) > 20
  };
  const found = [];
  if (mode !== 'stickers') {
    for (const blob of detectPinkMarkers(frame.data, frame.width, frame.height, shared)) found.push({...blob, kind: 'pink'});
  }
  if (mode !== 'pink') {
    for (const blob of detectStickerBlobs(frame.data, frame.width, frame.height, shared)) found.push(blob);
  }
  let videoBlobs = found.map(b => ({
    x: (b.x + 0.5) * scale.scaleX,
    y: (b.y + 0.5) * scale.scaleY,
    area: b.area,
    kind: b.kind === 'sticker' ? 'sticker' : 'pink'
  }));
  if (extra.echo && homography) {
    videoBlobs = videoBlobs.filter(blob => {
      const at = applyHomography(homography, blob.x, blob.y);
      if (!at) return true;
      if (blob.kind === 'sticker') return !extra.echo.vetoSticker(at.x, at.y);
      return !extra.echo.veto(at.x, at.y);
    });
  }
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

function rearRank(label) {
  const text = String(label || '');
  const rear = /\b(back|rear|environment)\b/i.test(text) || /facing\s*back/i.test(text);
  if (!rear) return null;
  if (/ultra\s*wide|telephoto/i.test(text)) return 3;
  if (/dual|triple/i.test(text)) return 2;
  if (/^(back|rear)\s+camera$/i.test(text) || /facing\s*back/i.test(text)) return 0;
  return 1;
}

// An explicit saved camera wins. Otherwise the 1× rear camera, then any rear
// camera, then macOS Continuity Camera, then the first device.
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
  const rear = choices
    .map(choice => ({choice, rank: rearRank(choice.label)}))
    .filter(item => item.rank !== null)
    .sort((a, b) => a.rank - b.rank);
  if (rear.length) return rear[0].choice;
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

function readRaw(storage, key) {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : null;
  } catch {
    return null;
  }
}

// A value below the new minimum was a bricked slider. Restore the working default.
function sliderValue(value, min, max, fallback) {
  const v = +value;
  if (!Number.isFinite(v) || v < min) return fallback;
  return Math.min(max, v);
}

export function readCameraSettings(storage) {
  if (!storage) return null;
  let data = readRaw(storage, STORAGE_KEY);
  let legacy = false;
  if (!data) {
    for (const key of LEGACY_CAMERA_KEYS) {
      data = readRaw(storage, key);
      if (data) { legacy = true; break; }
    }
  }
  if (!data) return null;
  const userSelected = !legacy && data.userSelected === true;
  return {
    deviceId: userSelected && typeof data.deviceId === 'string' ? data.deviceId : '',
    deviceLabel: userSelected && typeof data.deviceLabel === 'string' ? data.deviceLabel : '',
    userSelected,
    corners: normalizeCorners(data.corners),
    hueTolerance: sliderValue(data.hueTolerance, 18, 80, DEFAULTS.hueTolerance),
    saturationSensitivity: sliderValue(data.saturationSensitivity, 0.25, 1, DEFAULTS.saturationSensitivity),
    minBlobSize: Math.round(clamp(data.minBlobSize, 4, 200, DEFAULTS.minBlobSize)),
    hueCenter: Number.isFinite(+data.hueCenter) ? wrapHue(data.hueCenter, PINK_HUE) : null,
    detectionMode: normalizeDetectionMode((readRaw(storage, 'nd.markers.v2') || {}).markerMode || (readRaw(storage, 'nd.markers.v2') || {}).detectionMode || data.detectionMode),
    stickerSensitivity: clamp((readRaw(storage, 'nd.markers.v2') || {}).stickerSensitivity ?? data.stickerSensitivity, 0, 1, DEFAULTS.stickerSensitivity)
  };
}

export function writeCameraSettings(storage, settings) {
  if (!storage || !settings) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({
      v: 2,
      userSelected: settings.userSelected === true,
      deviceId: settings.userSelected === true ? (settings.deviceId || '') : '',
      deviceLabel: settings.userSelected === true ? (settings.deviceLabel || '') : '',
      corners: settings.corners || null,
      hueTolerance: settings.hueTolerance,
      saturationSensitivity: settings.saturationSensitivity,
      minBlobSize: settings.minBlobSize,
      hueCenter: Number.isFinite(+settings.hueCenter) ? settings.hueCenter : null
    }));
    storage.setItem('nd.markers.v2', JSON.stringify({
      v: 2,
      markerMode: normalizeDetectionMode(settings.detectionMode || settings.markerMode),
      stickerSensitivity: clamp(settings.stickerSensitivity, 0, 1, DEFAULTS.stickerSensitivity),
      hueTolerance: settings.hueTolerance,
      saturationSensitivity: settings.saturationSensitivity,
      minBlobSize: settings.minBlobSize,
      hueCenter: Number.isFinite(+settings.hueCenter) ? settings.hueCenter : null
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
  if (!deviceId) return {facingMode: {ideal: 'environment'}};
  const video = {};
  video.deviceId = mode === 'ideal' ? {ideal: String(deviceId)} : {exact: String(deviceId)};
  return video;
}

let toastTimer = 0;
export function showStageToast(text, kind = 'ok', holdMs = 4000, doc = globalThis.document) {
  if (!doc || typeof doc.querySelector !== 'function') return null;
  let banner = doc.querySelector('[data-align-banner]');
  if (!banner && doc.createElement && doc.body) {
    banner = doc.createElement('div');
    banner.id = 'nd-live-toast';
    banner.setAttribute('data-align-banner', '');
    doc.body.appendChild(banner);
  }
  if (!banner) return null;
  banner.hidden = false;
  banner.dataset.kind = kind || 'ok';
  banner.textContent = text;
  if (holdMs > 0 && typeof setTimeout === 'function') {
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { banner.hidden = true; }, holdMs);
  }
  return banner;
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
  let userPicked = false;
  let hueCenterOverride = null;
  let detectionMode = 'both';
  const sticker = root.querySelector('[data-control="sticker"]');
  const modeButtons = Array.from(root.querySelectorAll('[data-mode]'));
  const announced = new Set();
  const echo = createStageEcho();
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
      userSelected: userPicked,
      corners: committed.length === 4 ? committed : null,
      hueTolerance: +hue.value,
      saturationSensitivity: +sat.value,
      minBlobSize: +size.value,
      hueCenter: hueCenterOverride == null ? undefined : hueCenterOverride,
      detectionMode,
      markerMode: detectionMode,
      stickerSensitivity: sticker ? +sticker.value : DEFAULTS.stickerSensitivity
    };
  }
  function persist(opts = {}) {
    if (opts.userSelected === true) userPicked = true;
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
    if (sticker) showSlider(sticker, 'sticker', (+sticker.value).toFixed(2));
    detectionMode = normalizeDetectionMode(detectionMode);
    for (const button of modeButtons) button.setAttribute('aria-pressed', button.dataset.mode === detectionMode ? 'true' : 'false');
  }
  function applySaved(saved) {
    if (!saved) return;
    if (saved.userSelected) userPicked = true;
    if (saved.hueCenter != null) hueCenterOverride = saved.hueCenter;
    hue.value = String(saved.hueTolerance);
    sat.value = String(saved.saturationSensitivity);
    size.value = String(saved.minBlobSize);
    if (saved.detectionMode) detectionMode = normalizeDetectionMode(saved.detectionMode);
    if (sticker && Number.isFinite(+saved.stickerSensitivity)) sticker.value = String(saved.stickerSensitivity);
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
      for (const marker of markers) {
        if (announced.has(marker.id)) continue;
        announced.add(marker.id);
        const noteName = marker.kind === 'sticker' ? 'Dancer sticker' : 'Pink note';
        showStageToast(noteName + ' #' + marker.id + ' detected ✓', 'ok', 4000);
        const stage = document.getElementById('nd-room-projector');
        if (!stage) continue;
        const badge = document.createElement('div');
        badge.className = 'nd-note-lock';
        badge.textContent = (marker.kind === 'sticker' ? 'Dancer sticker' : 'Pink note') + ' #' + marker.id + ' ✓';
        badge.style.left = (marker.x / CANVAS_W * 100) + '%';
        badge.style.top = (marker.y / CANVAS_H * 100) + '%';
        stage.appendChild(badge);
        setTimeout(() => { if (badge.parentNode) badge.remove(); }, 4000);
      }
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
    const stage = document.querySelector('#nd-room-lab [data-stage]');
    if (markersOn && stage) echo.sample(stage, now);
    const result = markersFromFrame(frame, settings(), markersOn ? homography : null, scale, markersOn ? tracker : idleTracker, now, {
      echo: markersOn ? echo : null,
      exclude: markersOn && homography ? uiExclusions() : null
    });
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
    for (const blob of rawBlobs) {
      octx.strokeStyle = blob.kind === 'sticker' ? '#7fe8b3' : '#ffd1ec';
      octx.beginPath();
      octx.arc(blob.x, blob.y, Math.max(8, vw / 80), 0, Math.PI * 2);
      octx.stroke();
    }
  }
  function uiExclusions() {
    const stage = document.querySelector('#nd-room-lab [data-stage]');
    if (!stage) return [];
    const sr = stage.getBoundingClientRect();
    if (!(sr.width > 0) || !(sr.height > 0)) return [];
    const rects = [];
    for (const sel of ['#nd-live-dock', '#nd-camera-mode', '.nd-live-chrome']) {
      const node = document.querySelector(sel);
      if (!node || node.hidden) continue;
      const style = getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      const r = node.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      rects.push({
        x: (r.left - sr.left) / sr.width * CANVAS_W,
        y: (r.top - sr.top) / sr.height * CANVAS_H,
        w: r.width / sr.width * CANVAS_W,
        h: r.height / sr.height * CANVAS_H
      });
    }
    return rects;
  }
  function setMarkersEnabled(on) {
    if (on && committed.length !== 4) {
      say('Calibrate the four wall corners first.');
      return;
    }
    markersOn = on;
    tracker = createMarkerTracker();
    announced.clear();
    echo.clear();
    askedStart = false;
    const room = document.getElementById('nd-room-lab');
    if (room) room.dataset.markersLive = on ? '1' : '';
    if (on) holdDarkStage(150);
    else if (room && room.neuralDance && room.neuralDance.retint) room.neuralDance.retint();
    if (!on) stopDriving();
    syncMarkerButton();
    say(on ? 'Markers on. A note joins the Room music stage after it has been up for a moment.' : 'Markers off.');
  }
  hue.addEventListener('input', () => { refreshLabels(); persist(); });
  sat.addEventListener('input', () => { refreshLabels(); persist(); });
  size.addEventListener('input', () => { refreshLabels(); persist(); });
  if (sticker) sticker.addEventListener('input', () => { refreshLabels(); persist(); });
  for (const button of modeButtons) {
    button.addEventListener('click', () => {
      detectionMode = button.dataset.mode;
      refreshLabels();
      persist();
    });
  }
  select.addEventListener('change', async () => {
    if (!select.value) return;
    try { await open(select.value); persist({userSelected: true}); } catch (err) { fail(err); }
  });
  async function flipCamera() {
    if (!choices.length) {
      await startCamera();
      return;
    }
    const current = choices.find(c => c.deviceId === select.value);
    const fronts = choices.filter(c => /\bfront\b|facing\s*user|selfie/i.test(c.label));
    const backs = choices
      .map(choice => ({choice, rank: rearRank(choice.label)}))
      .filter(item => item.rank !== null)
      .sort((a, b) => a.rank - b.rank)
      .map(item => item.choice);
    let next = null;
    if (current && fronts.some(c => c.deviceId === current.deviceId) && backs.length) next = backs[0];
    else if (fronts.length && (!current || backs.some(c => c.deviceId === current.deviceId))) next = fronts[0];
    else {
      const index = Math.max(0, choices.findIndex(c => current && c.deviceId === current.deviceId));
      next = choices[(index + 1) % choices.length];
    }
    if (!next) return;
    select.value = next.deviceId;
    try { await open(next.deviceId); persist({userSelected: true}); say(next.label); } catch (err) { fail(err); }
  }
  function resetMarkerDefaults() {
    hueCenterOverride = null;
    hue.value = String(DEFAULTS.hueTolerance);
    sat.value = String(DEFAULTS.saturationSensitivity);
    size.value = String(DEFAULTS.minBlobSize);
    refreshLabels();
    persist();
    showStageToast('Marker defaults restored', 'ok', 2500);
    say('Marker defaults restored.');
  }
  document.querySelectorAll('[data-camera-flip]').forEach(btn => {
    if (btn.dataset.flipReady === '1') return;
    btn.dataset.flipReady = '1';
    btn.addEventListener('click', () => { flipCamera(); });
  });
  document.querySelectorAll('[data-marker-reset]').forEach(btn => {
    if (btn.dataset.resetReady === '1') return;
    btn.dataset.resetReady = '1';
    btn.addEventListener('click', () => { resetMarkerDefaults(); });
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
    const spot = clientToNormalized(event.clientX, event.clientY, overlay.getBoundingClientRect());
    if (!spot) return;
    if (!draft) {
      if (!videoFrameReady(video)) return;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (scratch.width !== vw) scratch.width = vw;
      if (scratch.height !== vh) scratch.height = vh;
      if (!drawVideoFrame(video, sctx, vw, vh)) return;
      const frame = sctx.getImageData(0, 0, vw, vh);
      const sample = medianPatch(frame.data, vw, vh, Math.round(spot.x * (vw - 1)), Math.round(spot.y * (vh - 1)), 2);
      if (!sample) return;
      hueCenterOverride = sample.h;
      persist();
      showStageToast('Sampled marker color ✓', 'ok', 2500);
      say('Sampled marker color. Reset defaults restores pink.');
      return;
    }
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
    setMarkersEnabled(on) { setMarkersEnabled(!!on); return markersOn; },
    async ensureCamera() {
      if (!stream) await startCamera();
      const started = typeof performance !== 'undefined' ? performance.now() : Date.now();
      while (stream && !videoFrameReady(video)) {
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
        if (now - started > 2500) break;
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      return !!stream;
    },
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
