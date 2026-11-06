// Person-in-frame pause for Neural Dance sticker detection.
// A person is a tall or bulky luminance mass, or a skin-toned region, much
// larger than a vinyl sticker. Neon dancer colors stay out of that mask.
//
// Hook: live detect() calls personInFrame, then observe(). While the result
// is paused, sticker blobs are dropped. After PERSON_CLEAR_MS of clear
// frames, commitStage only the stickers that stayed within PERSON_STAY_RADIUS.
// [data-person-note] on /neural-dance/live/ and /neural-dance/debug/ shows
// PERSON_PAUSE_NOTE while a person is actually in frame.

export const PERSON_PAUSE_NOTE = 'person in frame, detection paused';
export const PERSON_CLEAR_MS = 1500;
export const PERSON_STAY_RADIUS = 80;
export const PERSON_MIN_FRACTION = 0.08;
export const PERSON_BULK_FRACTION = 0.15;
export const PERSON_TALL_FRACTION = 0.34;
export const PERSON_SKIN_FRACTION = 0.02;
export const PERSON_MAX_FRACTION = 0.93;
export const PERSON_LUMA_DELTA = 32;
export const PERSON_BODY_SATURATION = 0.42;

export function emptyOcclusion() {
  return {paused: false, settling: false, phase: 'clear', note: null, latch: null, rescan: false};
}

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  if (max < 1) return 0;
  return (max - Math.min(r, g, b)) / max;
}

// Yellow-red skin, not a pink note (hue ~330) and not a maxed neon dancer.
export function isSkinTone(r, g, b) {
  if (r < 95 || g < 40 || b < 20 || r <= g || r <= b) return false;
  const rg = r - g;
  if (rg <= 15 || rg > 90) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d < 12 || max < 70) return false;
  const s = d / max;
  if (s < 0.15 || s > 0.65) return false;
  let h = ((g - b) / d) % 6;
  h *= 60;
  if (h < 0) h += 360;
  return h <= 45;
}

function largestComponent(mask, cols, rows) {
  const seen = new Uint8Array(mask.length);
  const qx = new Int32Array(mask.length);
  const qy = new Int32Array(mask.length);
  let best = {area: 0, minX: 0, minY: 0, maxX: 0, maxY: 0};
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const start = y * cols + x;
      if (!mask[start] || seen[start]) continue;
      let head = 0;
      let tail = 0;
      qx[tail] = x;
      qy[tail] = y;
      tail++;
      seen[start] = 1;
      let area = 0;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      while (head < tail) {
        const cx = qx[head];
        const cy = qy[head];
        head++;
        area++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
            const ni = ny * cols + nx;
            if (!mask[ni] || seen[ni]) continue;
            seen[ni] = 1;
            qx[tail] = nx;
            qy[tail] = ny;
            tail++;
          }
        }
      }
      if (area > best.area) best = {area, minX, minY, maxX, maxY};
    }
  }
  return best;
}

export function personInFrame(rgba, width, height, options = {}) {
  const none = {present: false, fraction: 0, bodyFraction: 0, skinFraction: 0};
  const w = width | 0;
  const h = height | 0;
  if (!rgba || w < 8 || h < 8 || rgba.length < w * h * 4) return none;
  const requested = Number.isFinite(+options.step) ? Math.max(1, options.step | 0) : 0;
  const step = requested || Math.max(1, Math.floor(Math.max(w, h) / 80));
  const inside = typeof options.inside === 'function' ? options.inside : null;
  const cols = Math.ceil(w / step);
  const rows = Math.ceil(h / step);
  const valid = new Uint8Array(cols * rows);
  const cr = new Uint8Array(cols * rows);
  const cg = new Uint8Array(cols * rows);
  const cb = new Uint8Array(cols * rows);
  const lums = [];
  for (let gy = 0; gy < rows; gy++) {
    const y = Math.min(h - 1, gy * step);
    for (let gx = 0; gx < cols; gx++) {
      const x = Math.min(w - 1, gx * step);
      if (inside && !inside(x, y)) continue;
      const p = (y * w + x) * 4;
      const i = gy * cols + gx;
      valid[i] = 1;
      cr[i] = rgba[p];
      cg[i] = rgba[p + 1];
      cb[i] = rgba[p + 2];
      lums.push(luminance(rgba[p], rgba[p + 1], rgba[p + 2]));
    }
  }
  const counted = lums.length;
  if (counted < 16) return none;
  lums.sort((a, b) => a - b);
  const median = lums[counted >> 1];
  const bodyMask = new Uint8Array(cols * rows);
  const skinMask = new Uint8Array(cols * rows);
  for (let i = 0; i < valid.length; i++) {
    if (!valid[i]) continue;
    const r = cr[i];
    const g = cg[i];
    const b = cb[i];
    if (Math.abs(luminance(r, g, b) - median) >= PERSON_LUMA_DELTA && saturation(r, g, b) <= PERSON_BODY_SATURATION) bodyMask[i] = 1;
    if (isSkinTone(r, g, b)) skinMask[i] = 1;
  }
  const body = largestComponent(bodyMask, cols, rows);
  const skin = largestComponent(skinMask, cols, rows);
  const bodyFraction = body.area / counted;
  const skinFraction = skin.area / counted;
  const heightFraction = rows > 0 && body.area ? (body.maxY - body.minY + 1) / rows : 0;
  const bodyPresent = bodyFraction >= PERSON_MIN_FRACTION
    && bodyFraction < PERSON_MAX_FRACTION
    && (heightFraction >= PERSON_TALL_FRACTION || bodyFraction >= PERSON_BULK_FRACTION);
  const skinPresent = skinFraction >= PERSON_SKIN_FRACTION && skinFraction < PERSON_MAX_FRACTION;
  return {
    present: bodyPresent || skinPresent,
    fraction: Math.max(bodyFraction, skinFraction),
    bodyFraction,
    skinFraction
  };
}

function pointOf(marker) {
  if (!marker || !Number.isFinite(+marker.x) || !Number.isFinite(+marker.y)) return null;
  return {x: +marker.x, y: +marker.y, kind: 'sticker'};
}

export function stickersThatStayed(before, after, radius = PERSON_STAY_RADIUS) {
  const prior = [];
  for (const marker of before || []) {
    const spot = pointOf(marker);
    if (spot) prior.push(spot);
  }
  const next = [];
  for (const marker of after || []) {
    const spot = pointOf(marker);
    if (spot) next.push(spot);
  }
  const limit = Number.isFinite(+radius) && +radius > 0 ? +radius : PERSON_STAY_RADIUS;
  const used = new Set();
  const stayed = [];
  for (const spot of prior) {
    let best = -1;
    let bestD = limit;
    for (let i = 0; i < next.length; i++) {
      if (used.has(i)) continue;
      const d = Math.hypot(next[i].x - spot.x, next[i].y - spot.y);
      if (d <= bestD) {
        bestD = d;
        best = i;
      }
    }
    if (best >= 0) {
      used.add(best);
      stayed.push({x: next[best].x, y: next[best].y, kind: 'sticker'});
    }
  }
  return stayed;
}

export function stickerStagePoints(blobs, project) {
  const out = [];
  if (typeof project !== 'function') return out;
  for (const blob of blobs || []) {
    if (!blob || blob.kind !== 'sticker') continue;
    const at = project(blob);
    const spot = pointOf(at);
    if (spot) out.push(spot);
  }
  return out;
}

export function gateStickerBlobs(blobs, decision, project, radius = PERSON_STAY_RADIUS) {
  const list = blobs || [];
  if (!decision || (!decision.paused && !decision.rescan)) return list.slice();
  if (decision.paused) return list.filter(blob => !blob || blob.kind !== 'sticker');
  const stayed = decision.latch || [];
  const limit = Number.isFinite(+radius) && +radius > 0 ? +radius : PERSON_STAY_RADIUS;
  return list.filter(blob => {
    if (!blob || blob.kind !== 'sticker') return true;
    if (typeof project !== 'function') return false;
    const at = pointOf(project(blob));
    if (!at) return false;
    return stayed.some(spot => Math.hypot(spot.x - at.x, spot.y - at.y) <= limit);
  });
}

export function occlusionTelemetry(decision) {
  const note = decision && decision.note ? PERSON_PAUSE_NOTE : null;
  return {
    paused: !!(decision && decision.paused),
    settling: !!(decision && decision.settling),
    note
  };
}

export function syncPersonNote(doc, show) {
  if (!doc || typeof doc.querySelector !== 'function') return false;
  const note = doc.querySelector('[data-person-note]');
  if (!note) return false;
  const visible = !!show;
  note.hidden = !visible;
  if (visible) note.textContent = PERSON_PAUSE_NOTE;
  return true;
}

function clonePoints(list) {
  return (list || []).map(spot => ({x: spot.x, y: spot.y, kind: 'sticker'}));
}

// paused: sticker detection must not latch. settling: the person has left and
// the clear wait is still running. rescan: this call is the moment to
// permanently latch `latch` (stickers that matched the pre-person snapshot).
export function createPersonOcclusion({clearMs = PERSON_CLEAR_MS, matchRadius = PERSON_STAY_RADIUS} = {}) {
  const wait = Number.isFinite(+clearMs) && +clearMs >= 0 ? +clearMs : PERSON_CLEAR_MS;
  const radius = Number.isFinite(+matchRadius) && +matchRadius > 0 ? +matchRadius : PERSON_STAY_RADIUS;
  let phase = 'clear';
  let clearSince = null;
  let frozen = [];
  let lastStickers = [];

  function present(person) {
    return person === true || !!(person && person.present === true);
  }

  return {
    observe({person = false, stickers = [], now = 0} = {}) {
      const blocked = present(person);
      const points = [];
      for (const marker of stickers || []) {
        const spot = pointOf(marker);
        if (spot) points.push(spot);
      }
      const t = Number.isFinite(+now) ? +now : 0;
      if (blocked) {
        if (phase === 'clear') frozen = clonePoints(lastStickers);
        phase = 'paused';
        clearSince = null;
        return {paused: true, settling: false, phase, note: PERSON_PAUSE_NOTE, latch: null, rescan: false};
      }
      if (phase === 'paused' || phase === 'settling') {
        if (clearSince == null || t < clearSince) clearSince = t;
        if (t - clearSince < wait) {
          phase = 'settling';
          return {paused: true, settling: true, phase, note: null, latch: null, rescan: false};
        }
        const latch = stickersThatStayed(frozen, points, radius);
        phase = 'clear';
        clearSince = null;
        frozen = [];
        lastStickers = clonePoints(points);
        return {paused: false, settling: false, phase, note: null, latch, rescan: true};
      }
      lastStickers = clonePoints(points);
      return emptyOcclusion();
    },
    reset() {
      phase = 'clear';
      clearSince = null;
      frozen = [];
      lastStickers = [];
    }
  };
}
