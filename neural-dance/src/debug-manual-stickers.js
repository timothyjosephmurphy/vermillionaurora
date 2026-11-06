// Manual latched stickers for /neural-dance/debug/.
// Tap empty stage space to add one. Tap an existing manual sticker to remove
// it. resolveStageTap builds the patch; sanitizeDebugPatch lets it through
// the debug room; the live camera applies it with createManualStickers and
// merges the list into the latched markers.
//
// Stage units match the room canvas (1000×620). Ids sit above camera tracks
// and above the sim-dancer range.

export const STAGE_W = 1000;
export const STAGE_H = 620;
export const MANUAL_HIT_RADIUS = 48;
export const MANUAL_ID_BASE = 500000;
export const MANUAL_CAP = 48;

function clamp(value, lo, hi) {
  return Math.min(hi, Math.max(lo, +value));
}

function finitePoint(x, y) {
  return Number.isFinite(+x) && Number.isFinite(+y);
}

export function stagePoint(x, y) {
  if (!finitePoint(x, y)) return null;
  return {x: clamp(x, 0, STAGE_W), y: clamp(y, 0, STAGE_H)};
}

function nearestManual(markers, x, y, radius) {
  let best = null;
  let bestD = radius;
  for (const marker of markers || []) {
    if (!marker || marker.manual !== true) continue;
    if (!finitePoint(marker.x, marker.y)) continue;
    const d = Math.hypot(+marker.x - x, +marker.y - y);
    if (d <= bestD) {
      bestD = d;
      best = marker;
    }
  }
  return best;
}

export function resolveStageTap(markers, x, y, radius = MANUAL_HIT_RADIUS) {
  const at = stagePoint(x, y);
  if (!at) return null;
  const limit = Number.isFinite(+radius) && +radius > 0 ? +radius : MANUAL_HIT_RADIUS;
  const hit = nearestManual(markers, at.x, at.y, limit);
  if (hit) {
    const id = hit.id | 0;
    if (id > 0) return {action: 'remove-manual-sticker', id, x: +hit.x, y: +hit.y};
  }
  return {action: 'add-manual-sticker', x: at.x, y: at.y};
}

function copyList(items) {
  return items.map(sticker => ({
    id: sticker.id,
    x: sticker.x,
    y: sticker.y,
    kind: 'sticker',
    manual: true
  }));
}

export function createManualStickers({hitRadius = MANUAL_HIT_RADIUS, idBase = MANUAL_ID_BASE, limit = MANUAL_CAP} = {}) {
  const radius = Number.isFinite(+hitRadius) && +hitRadius > 0 ? +hitRadius : MANUAL_HIT_RADIUS;
  const base = (idBase | 0) > 0 ? (idBase | 0) : MANUAL_ID_BASE;
  const cap = (limit | 0) > 0 ? (limit | 0) : MANUAL_CAP;
  let items = [];
  let seq = 1;

  function removeAt(index) {
    const removed = items[index];
    items = items.slice(0, index).concat(items.slice(index + 1));
    return removed;
  }

  return {
    list() { return copyList(items); },
    clear() { items = []; },
    apply(command) {
      const action = command && command.action;
      if (action === 'remove-manual-sticker') {
        const id = command.id | 0;
        let index = id > 0 ? items.findIndex(sticker => sticker.id === id) : -1;
        if (index < 0 && finitePoint(command.x, command.y)) {
          const hit = nearestManual(items, +command.x, +command.y, radius);
          if (hit) index = items.findIndex(sticker => sticker.id === hit.id);
        }
        if (index < 0) return {changed: false, stickers: copyList(items)};
        const removed = removeAt(index);
        return {changed: true, removed, stickers: copyList(items)};
      }
      if (action === 'add-manual-sticker') {
        const at = stagePoint(command.x, command.y);
        if (!at) return {changed: false, stickers: copyList(items)};
        if (items.length >= cap) return {changed: false, stickers: copyList(items)};
        let id = command.id | 0;
        if (!(id > 0) || items.some(sticker => sticker.id === id)) id = base + seq++;
        else seq = Math.max(seq, id - base + 1);
        const sticker = {id, x: at.x, y: at.y, kind: 'sticker', manual: true};
        items = items.concat(sticker);
        return {changed: true, added: sticker, stickers: copyList(items)};
      }
      return {changed: false, stickers: copyList(items)};
    }
  };
}

export function mergeLatchedStickers(markers, manual, radius = 80) {
  const limit = Number.isFinite(+radius) && +radius > 0 ? +radius : 80;
  const out = [];
  for (const marker of markers || []) {
    if (!marker || !(marker.id > 0) || !finitePoint(marker.x, marker.y)) continue;
    const type = Number.isFinite(+marker.type) ? (((+marker.type) % 4) + 4) % 4 : (((marker.id - 1) % 4) + 4) % 4;
    out.push({
      id: marker.id | 0,
      x: +marker.x,
      y: +marker.y,
      type,
      kind: marker.kind === 'sticker' ? 'sticker' : 'pink',
      manual: marker.manual === true
    });
  }
  for (const sticker of manual || []) {
    if (!sticker || !(sticker.id > 0) || !finitePoint(sticker.x, sticker.y)) continue;
    const near = out.find(marker => marker.kind === 'sticker' && Math.hypot(marker.x - sticker.x, marker.y - sticker.y) <= limit);
    if (near) {
      near.manual = true;
      near.id = sticker.id | 0;
      near.x = +sticker.x;
      near.y = +sticker.y;
      near.kind = 'sticker';
    } else {
      out.push({
        id: sticker.id | 0,
        x: +sticker.x,
        y: +sticker.y,
        type: 1,
        kind: 'sticker',
        manual: true
      });
    }
  }
  return out;
}
