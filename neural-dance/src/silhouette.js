// Neural Dance sticker silhouettes.
// Take a sticker contour, map it through the projector homography, and draw that
// shape as the light on that dancer. The debug light mode is "dot" or "silhouette".
// Pulses start on the outline and expand as offset contours. A live waveform
// rides on those offsets. Bloom and beat styling belong to another pass:
//
//   style(pulse, defaults) -> {alpha, stroke, fill, lineWidth, composite}
//
// pulse is {t, age, duration, expansion, band, onset, color, points}.
// t is 0 on the outline and approaches 1 as the pulse finishes expanding.
// band is the dancer's own band (0 kick, 1 bass, 2 snare, 3 hi-hat), which is
// also the waveform that was sampled. onset is whatever beat() was given.
// The room passes the nd_update tone mask there. Return a partial object.
// Omitted fields keep the quiet default bloom. Null keeps every default.

import {beatEnvelope, deformSilhouette, variationFor} from './silhouette-dance.js';

export const LIGHT_MODES = ['dot', 'silhouette'];
export const PULSE_REACH = 36;
export const PULSE_WAVE_GAIN = 8;
export const SILHOUETTE_LIGHT = 'rgba(255, 220, 176, 1)';

export function normalizeLightMode(mode) {
  return mode === 'silhouette' ? 'silhouette' : 'dot';
}

// Same 3x3 layout as camera-markers.applyHomography: row-major, h33 = 1.
export function applyHomography(H, x, y) {
  if (!H || H.length !== 9) return null;
  const w = H[6] * x + H[7] * y + H[8];
  if (!Number.isFinite(w) || Math.abs(w) < 1e-8) return null;
  const px = (H[0] * x + H[1] * y + H[2]) / w;
  const py = (H[3] * x + H[4] * y + H[5]) / w;
  if (!Number.isFinite(px) || !Number.isFinite(py)) return null;
  return {x: px, y: py};
}

export function simplifyContour(points, maxPoints = 48) {
  const clean = [];
  for (const point of points || []) {
    if (!point || !Number.isFinite(+point.x) || !Number.isFinite(+point.y)) continue;
    const next = {x: +point.x, y: +point.y};
    const prev = clean[clean.length - 1];
    if (prev && prev.x === next.x && prev.y === next.y) continue;
    clean.push(next);
  }
  if (clean.length < 3) return [];
  const cap = Math.max(3, maxPoints | 0);
  if (clean.length <= cap) return clean;
  const out = [];
  for (let i = 0; i < cap; i++) {
    const index = Math.round(i * (clean.length - 1) / (cap - 1));
    out.push(clean[index]);
  }
  return out;
}

export function sanitizeContour(contour, maxPoints = 64) {
  const simple = simplifyContour(contour, maxPoints);
  return simple.length >= 3 ? simple : null;
}

export function projectContour(contour, homography) {
  const clean = sanitizeContour(contour, 96);
  if (!clean) return null;
  const project = typeof homography === 'function'
    ? homography
    : (x, y) => applyHomography(homography, x, y);
  const out = [];
  for (const point of clean) {
    let mapped = null;
    try {
      mapped = project(point.x, point.y);
    } catch {
      mapped = null;
    }
    if (!mapped || !Number.isFinite(+mapped.x) || !Number.isFinite(+mapped.y)) continue;
    out.push({x: +mapped.x, y: +mapped.y});
  }
  return out.length >= 3 ? out : null;
}

const TRACE_DIRS = [
  [1, 0], [1, 1], [0, 1], [-1, 1],
  [-1, 0], [-1, -1], [0, -1], [1, -1]
];

// Moore neighborhood around one filled component. Seed may sit inside the blob.
export function traceContour(mask, width, height, seed, maxPoints = 48) {
  const w = width | 0;
  const h = height | 0;
  if (!mask || w < 1 || h < 1 || !seed) return [];
  const inside = (x, y) => x >= 0 && y >= 0 && x < w && y < h && mask[y * w + x] > 0;
  let sx = seed.x | 0;
  let sy = seed.y | 0;
  if (!inside(sx, sy)) return [];
  while (sx > 0 && inside(sx - 1, sy)) sx--;
  const startX = sx;
  const startY = sy;
  const contour = [{x: startX, y: startY}];
  let cx = startX;
  let cy = startY;
  let back = 4;
  const limit = w * h;
  for (let step = 0; step < limit; step++) {
    let found = -1;
    for (let k = 0; k < 8; k++) {
      const dir = (back + 1 + k) % 8;
      const nx = cx + TRACE_DIRS[dir][0];
      const ny = cy + TRACE_DIRS[dir][1];
      if (inside(nx, ny)) {
        found = dir;
        break;
      }
    }
    if (found < 0) break;
    cx += TRACE_DIRS[found][0];
    cy += TRACE_DIRS[found][1];
    back = (found + 4) % 8;
    if (cx === startX && cy === startY) break;
    contour.push({x: cx, y: cy});
  }
  return simplifyContour(contour, maxPoints);
}

export function centroid(points) {
  let x = 0;
  let y = 0;
  const n = points.length || 1;
  for (const point of points) {
    x += point.x;
    y += point.y;
  }
  return {x: x / n, y: y / n};
}

function outwardNormals(points) {
  const center = centroid(points);
  const normals = [];
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const next = points[(i + 1) % n];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    let nx = -ty;
    let ny = tx;
    const vx = points[i].x - center.x;
    const vy = points[i].y - center.y;
    if (nx * vx + ny * vy < 0) {
      nx = -nx;
      ny = -ny;
    }
    normals.push({x: nx, y: ny});
  }
  return normals;
}

// distance is one radius, or one radius per vertex, along the outward normal.
export function offsetContour(points, distance) {
  if (!points || points.length < 3) return null;
  const normals = outwardNormals(points);
  const perVertex = Array.isArray(distance);
  return points.map((point, index) => {
    const radius = perVertex ? +distance[index] || 0 : +distance || 0;
    return {
      x: point.x + normals[index].x * radius,
      y: point.y + normals[index].y * radius
    };
  });
}

function waveSample(samples, index, count) {
  if (!samples || !samples.length || !(count > 0)) return 0;
  const at = Math.floor((index / count) * samples.length) % samples.length;
  let sample = +samples[at] || 0;
  if (sample > 1) sample = 1;
  if (sample < -1) sample = -1;
  return sample;
}

// expansion 0 and a silent waveform sit on the outline. Samples ripple that offset.
export function waveformContour(points, expansion, samples, gain = PULSE_WAVE_GAIN) {
  const clean = sanitizeContour(points, 128);
  if (!clean) return null;
  const base = +expansion || 0;
  const amp = Number.isFinite(+gain) ? +gain : 0;
  const distances = clean.map((_, index) => base + waveSample(samples, index, clean.length) * amp);
  return offsetContour(clean, distances);
}

export function placeContour(points, x, y, scale = 1) {
  const clean = sanitizeContour(points, 128);
  if (!clean) return null;
  const center = centroid(clean);
  const s = Number.isFinite(+scale) && +scale !== 0 ? +scale : 1;
  return clean.map(point => ({
    x: x + (point.x - center.x) * s,
    y: y + (point.y - center.y) * s
  }));
}

function tracePath(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.closePath();
}

// Filled light plus a soft outline. This is the projection, not the pulse bloom.
export function paintSilhouette(ctx, points, options = {}) {
  if (!ctx || !points || points.length < 3) return false;
  const color = options.color || SILHOUETTE_LIGHT;
  const alpha = Number.isFinite(+options.alpha) ? +options.alpha : 0.72;
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;
  tracePath(ctx, points);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = Math.max(0.12, Math.min(1, alpha * 0.4));
  ctx.lineWidth = 7;
  tracePath(ctx, points);
  ctx.stroke();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.lineWidth = 2;
  tracePath(ctx, points);
  ctx.stroke();
  ctx.restore();
  return true;
}

// Quiet semi-transparent bloom. Another pass replaces this through the style hook.
export function defaultBloomStyle(pulse) {
  const t = Math.max(0, Math.min(1, +pulse.t || 0));
  const fade = 1 - t;
  const color = pulse.color || SILHOUETTE_LIGHT;
  return {
    alpha: 0.34 * fade,
    stroke: color,
    fill: color,
    lineWidth: 2 + 5 * fade,
    composite: 'lighter'
  };
}

export function paintBloom(ctx, points, pulse, style) {
  if (!ctx || !points || points.length < 3) return false;
  const defaults = defaultBloomStyle(pulse || {});
  let look = defaults;
  if (typeof style === 'function') {
    let extra = null;
    try {
      extra = style(pulse, defaults);
    } catch {
      extra = null;
    }
    if (extra && typeof extra === 'object') look = {...defaults, ...extra};
  }
  ctx.save();
  ctx.globalCompositeOperation = look.composite || 'lighter';
  ctx.globalAlpha = Math.max(0, Math.min(1, +look.alpha || 0));
  ctx.fillStyle = look.fill || defaults.fill;
  ctx.strokeStyle = look.stroke || defaults.stroke;
  ctx.lineWidth = Number.isFinite(+look.lineWidth) ? +look.lineWidth : defaults.lineWidth;
  ctx.lineJoin = 'round';
  tracePath(ctx, points);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  return true;
}

function createPulseLayer() {
  let items = [];
  return {
    hit(now, band) {
      items.push({born: +now || 0, band: band | 0});
      if (items.length > 4) items = items.slice(-4);
    },
    frames(contour, now, waveform, duration) {
      const tNow = +now || 0;
      const life = duration > 0 ? duration : 560;
      items = items.filter(item => tNow - item.born < life);
      const frames = [];
      for (const item of items) {
        const age = Math.max(0, tNow - item.born);
        const t = age / life;
        const points = waveformContour(contour, t * PULSE_REACH, waveform, PULSE_WAVE_GAIN * (1 - t));
        if (!points) continue;
        frames.push({
          t,
          age,
          duration: life,
          expansion: t * PULSE_REACH,
          band: item.band,
          color: null,
          points
        });
      }
      return frames;
    },
    clear() {
      items = [];
    }
  };
}

// One show owns the dot/silhouette toggle, the beat clock, and the pulse layer.
// The renderer calls paint. It does not own the deformation or the bloom look.
export function createSilhouetteShow() {
  let mode = 'dot';
  let at = -1;
  let interval = 520;
  let index = 0;
  const pulses = createPulseLayer();

  function envelope(now) {
    if (at < 0) return 0;
    return beatEnvelope((+now || 0) - at, interval);
  }

  function pose(contour, id, now) {
    return deformSilhouette(contour, {
      envelope: envelope(now),
      variation: variationFor(id),
      beatIndex: index
    });
  }

  return {
    mode() {
      return mode;
    },
    setMode(next) {
      if (next === 'dot' || next === 'silhouette') mode = next;
      return mode;
    },
    toggle() {
      mode = mode === 'silhouette' ? 'dot' : 'silhouette';
      return mode;
    },
    beat(now, band) {
      const t = +now || 0;
      if (at >= 0) interval = Math.min(1400, Math.max(180, t - at));
      at = t;
      index += 1;
      pulses.hit(t, band);
      return index;
    },
    beatIndex() {
      return index;
    },
    envelope(now) {
      return envelope(now);
    },
    pose(contour, id, now) {
      return pose(contour, id, now);
    },
    clearPulses() {
      pulses.clear();
    },
    // paintDots(list) draws whatever this pass does not turn into a silhouette.
    // style is the bloom hook described at the top of this file.
    paint(ctx, markers, options = {}) {
      const opts = options || {};
      const xy = typeof opts.xy === 'function' ? opts.xy : (x, y) => ({x, y});
      const now = +opts.now || 0;
      if (mode !== 'silhouette') {
        if (typeof opts.paintDots === 'function') opts.paintDots(markers || []);
        return mode;
      }
      const plain = [];
      for (const marker of markers || []) {
        const contour = marker && marker.kind !== 'pink' ? sanitizeContour(marker.contour) : null;
        if (!contour) {
          if (marker) plain.push(marker);
          continue;
        }
        const posed = pose(contour, marker.id | 0, now);
        const body = posed.map(point => xy(point.x, point.y));
        paintSilhouette(ctx, body, {color: marker.color || SILHOUETTE_LIGHT});
        const waveform = typeof opts.waveform === 'function' ? opts.waveform(marker.type | 0) : null;
        const frames = pulses.frames(posed, now, waveform, interval);
        for (const frame of frames) {
          const points = frame.points.map(point => xy(point.x, point.y));
          paintBloom(ctx, points, {
            ...frame,
            points,
            band: marker.type | 0,
            onset: frame.band,
            color: marker.color || frame.color
          }, opts.style);
        }
      }
      if (plain.length && typeof opts.paintDots === 'function') opts.paintDots(plain);
      return mode;
    }
  };
}
