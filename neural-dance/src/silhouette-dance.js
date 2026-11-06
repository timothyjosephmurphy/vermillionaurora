// Jointed warp of a dancer's own filled silhouette.
// The joints only move contour points. Nothing here draws a stick figure.
// On a beat the body takes a side-to-side step and the arms sway. The envelope
// eases back to zero between beats, and the contour is the original outline again.
// variationFor(id) keeps the step and the sway a little different per dancer.

// Standing dancer in local pixels, head toward -y, feet toward +y, centered near 0.
// The sim places copies of this outline. A camera sticker uses its own contour instead.
export const DANCER_SILHOUETTE = [
  {x: 0, y: -46},
  {x: 6, y: -44},
  {x: 8, y: -38},
  {x: 6, y: -32},
  {x: 14, y: -30},
  {x: 24, y: -20},
  {x: 26, y: -8},
  {x: 18, y: -6},
  {x: 12, y: -22},
  {x: 10, y: -12},
  {x: 12, y: 8},
  {x: 14, y: 28},
  {x: 8, y: 42},
  {x: 3, y: 42},
  {x: 2, y: 16},
  {x: 0, y: 8},
  {x: -2, y: 16},
  {x: -3, y: 42},
  {x: -8, y: 42},
  {x: -14, y: 28},
  {x: -12, y: 8},
  {x: -10, y: -12},
  {x: -12, y: -22},
  {x: -18, y: -6},
  {x: -26, y: -8},
  {x: -24, y: -20},
  {x: -14, y: -30},
  {x: -6, y: -32},
  {x: -8, y: -38},
  {x: -6, y: -44}
];

export function dancerSilhouette() {
  return DANCER_SILHOUETTE.map(point => ({x: point.x, y: point.y}));
}

function hashUnit(id) {
  let x = (Math.abs(id | 0) + 1) >>> 0;
  const out = [];
  for (let i = 0; i < 3; i++) {
    x = Math.imul(x ^ (x >>> 16), 0x7FEB352D) >>> 0;
    x = Math.imul(x ^ (x >>> 15), 0x846CA68B) >>> 0;
    out.push(x / 4294967296);
  }
  return out;
}

// lead is which way the first step travels. Scales stay near 1.
export function variationFor(id) {
  const [lead, step, sway] = hashUnit(id);
  return {
    lead: lead < 0.5 ? -1 : 1,
    stepScale: 0.75 + step * 0.5,
    swayScale: 0.7 + sway * 0.6
  };
}

// 1 on the beat, 0 once a full interval has passed. Flat at both ends.
export function beatEnvelope(elapsed, interval) {
  if (!(interval > 0) || !Number.isFinite(+elapsed)) return 0;
  if (elapsed <= 0) return 1;
  const t = elapsed / interval;
  if (t >= 1) return 0;
  const s = t * t * (3 - 2 * t);
  return 1 - s;
}

function clamp01(t) {
  if (t < 0) return 0;
  if (t > 1) return 1;
  return t;
}

function smoothstep(edge0, edge1, value) {
  const t = clamp01((value - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
}

// u,v are 0..1 inside the silhouette bounds. v = 0 is the head.
// Weights overlap so the outline stays one filled shape.
export function regionWeights(u, v) {
  const head = 1 - smoothstep(0.14, 0.28, v);
  const armBand = smoothstep(0.12, 0.22, v) * (1 - smoothstep(0.40, 0.56, v));
  const leftArm = armBand * (1 - smoothstep(0.22, 0.42, u));
  const rightArm = armBand * smoothstep(0.58, 0.78, u);
  const leg = smoothstep(0.50, 0.66, v);
  const leftLeg = leg * (1 - smoothstep(0.40, 0.55, u));
  const rightLeg = leg * smoothstep(0.45, 0.60, u);
  const torso = Math.max(0.001, (1 - head) * (1 - leg) * (1 - Math.max(leftArm, rightArm)));
  const sum = head + leftArm + rightArm + torso + leftLeg + rightLeg;
  return {
    head: head / sum,
    leftArm: leftArm / sum,
    rightArm: rightArm / sum,
    torso: torso / sum,
    leftLeg: leftLeg / sum,
    rightLeg: rightLeg / sum
  };
}

function boundsOf(points) {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const point of points) {
    if (point.x < left) left = point.x;
    if (point.y < top) top = point.y;
    if (point.x > right) right = point.x;
    if (point.y > bottom) bottom = point.y;
  }
  return {
    left,
    top,
    right,
    bottom,
    width: Math.max(1e-6, right - left),
    height: Math.max(1e-6, bottom - top)
  };
}

function rotateAround(point, origin, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  return {
    x: origin.x + c * dx - s * dy,
    y: origin.y + s * dx + c * dy
  };
}

function copyPoints(points) {
  const out = [];
  for (const point of points || []) {
    if (!point || !Number.isFinite(+point.x) || !Number.isFinite(+point.y)) continue;
    out.push({x: +point.x, y: +point.y});
  }
  return out;
}

// envelope 0 returns the same positions. The point count never changes.
export function deformSilhouette(contour, options = {}) {
  const clean = copyPoints(contour);
  if (clean.length < 3) return clean;
  const envelope = +options.envelope || 0;
  if (!(envelope > 0)) return clean;
  const variation = options.variation || variationFor(options.id | 0);
  const beatIndex = options.beatIndex | 0;
  const box = boundsOf(clean);
  const dir = (variation.lead < 0 ? -1 : 1) * (beatIndex % 2 === 0 ? 1 : -1);
  const step = box.width * 0.09 * (variation.stepScale || 1) * envelope * dir;
  const sway = 0.5 * (variation.swayScale || 1) * envelope;
  const leftPivot = {x: box.left + box.width * 0.30, y: box.top + box.height * 0.24};
  const rightPivot = {x: box.left + box.width * 0.70, y: box.top + box.height * 0.24};
  const armSign = dir >= 0 ? 1 : -1;
  return clean.map(point => {
    const u = (point.x - box.left) / box.width;
    const v = (point.y - box.top) / box.height;
    const weight = regionWeights(u, v);
    const lean = step * (
      weight.torso * 0.55
      + weight.head * 0.28
      + weight.leftLeg * -0.85
      + weight.rightLeg * 0.45
    );
    const stepping = dir > 0 ? weight.leftLeg : weight.rightLeg;
    const lift = Math.abs(step) * stepping * 0.12;
    let x = point.x + lean;
    let y = point.y - lift;
    const spunLeft = rotateAround(point, leftPivot, sway * armSign);
    const spunRight = rotateAround(point, rightPivot, -sway * 0.85 * armSign);
    x += weight.leftArm * (spunLeft.x - point.x) + weight.rightArm * (spunRight.x - point.x);
    y += weight.leftArm * (spunLeft.y - point.y) + weight.rightArm * (spunRight.y - point.y);
    return {x, y};
  });
}
