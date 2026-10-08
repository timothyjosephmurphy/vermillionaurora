// Runtime collector pins for the homepage exhibition card and the testimonials-page map.
// Exhibition dots on the homepage card are drawn at build time and stay if this request fails.
// Approved form submissions come from /testimonials/api/approved (city pins only; nothing private is drawn).

export function projectPin(lat, lng) {
  return {x: 24 + (Number(lng) + 180) * 3.2, y: 30 + (90 - Number(lat)) * 3.2};
}

export function readApprovedPins(payload) {
  const list = Array.isArray(payload?.testimonials) ? payload.testimonials : [];
  const pins = [];
  for (const entry of list) {
    if (!Array.isArray(entry?.pin) || entry.pin.length < 2) continue;
    const lat = Number(entry.pin[0]);
    const lng = Number(entry.pin[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) continue;
    pins.push({id: entry.id ? String(entry.id) : '', city: typeof entry.city === 'string' ? entry.city.trim() : '', lat, lng});
  }
  return pins;
}

// Nearby testimonials become one unlabeled dot so the small card and the side map stay readable.
// Dots that would sit on a build-time exhibition pin are nudged aside; both colors stay visible.
export function placeTestimonialPins(pins, obstacles = [], {merge = 16, clear = 16} = {}) {
  const items = [];
  const seen = new Set();
  for (const pin of pins || []) {
    const lat = Number(pin?.lat);
    const lng = Number(pin?.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) continue;
    const id = pin.id ? String(pin.id) : `${lat.toFixed(2)},${lng.toFixed(2)}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const point = projectPin(lat, lng);
    items.push({x: point.x, y: point.y, id, city: typeof pin.city === 'string' ? pin.city.trim() : ''});
  }
  const parent = items.map((_, index) => index);
  const find = index => (parent[index] === index ? index : (parent[index] = find(parent[index])));
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (Math.hypot(items[i].x - items[j].x, items[i].y - items[j].y) <= merge) parent[find(j)] = find(i);
    }
  }
  const groups = new Map();
  items.forEach((item, index) => {
    const key = find(index);
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  });
  const placed = [];
  for (const group of groups.values()) {
    let x = group.reduce((sum, pin) => sum + pin.x, 0) / group.length;
    let y = group.reduce((sum, pin) => sum + pin.y, 0) / group.length;
    for (let step = 0; step < 6; step++) {
      const near = [...obstacles, ...placed]
        .map(point => ({point, distance: Math.hypot(point.x - x, point.y - y)}))
        .filter(item => item.distance < clear)
        .sort((a, b) => a.distance - b.distance)[0];
      if (!near) break;
      const dx = x - near.point.x;
      const dy = y - near.point.y;
      const length = Math.hypot(dx, dy);
      const angle = length < 0.5 ? Math.PI / 4 + step : Math.atan2(dy, dx);
      x = near.point.x + Math.cos(angle) * clear;
      y = near.point.y + Math.sin(angle) * clear;
    }
    placed.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      cities: [...new Set(group.map(pin => pin.city).filter(Boolean))],
      ids: group.map(pin => pin.id),
    });
  }
  return placed;
}

function cityList(cities) {
  const shown = cities.slice(0, 8);
  const more = cities.length - shown.length;
  const body = shown.length < 2 ? shown[0] || '' : `${shown.slice(0, -1).join(', ')} and ${shown.at(-1)}`;
  return more > 0 ? `${body}, and ${more} more` : body;
}

function seedPins(root) {
  try {
    const parsed = JSON.parse(root.querySelector('[data-pin-seed]')?.textContent || '[]');
    return (Array.isArray(parsed) ? parsed : []).map(pin => ({
      id: pin.id ? String(pin.id) : '',
      city: typeof pin.city === 'string' ? pin.city : '',
      lat: Number(pin.lat),
      lng: Number(pin.lng),
    }));
  } catch {
    return [];
  }
}

export function paintLiveMap(root, pins) {
  const svg = root.querySelector('svg');
  const group = svg?.querySelector('[data-live-pins]');
  if (!svg || !group) return;
  const obstacles = [...svg.querySelectorAll('[data-pin="exhibition"]')].map(circle => ({
    x: Number(circle.getAttribute('cx')),
    y: Number(circle.getAttribute('cy')),
  }));
  const placed = placeTestimonialPins(pins, obstacles);
  const radius = svg.dataset.pinRadius || '5';
  group.replaceChildren();
  const svgNS = 'http://www.w3.org/2000/svg';
  for (const pin of placed) {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('data-pin', 'testimonial');
    circle.setAttribute('cx', String(pin.x));
    circle.setAttribute('cy', String(pin.y));
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', '#2f8a4c');
    circle.setAttribute('stroke', '#fffaf2');
    circle.setAttribute('stroke-width', '1.5');
    circle.setAttribute('pointer-events', 'none');
    group.append(circle);
  }
  const legend = root.querySelector('[data-compact-legend]');
  if (legend) legend.hidden = placed.length === 0;
  const base = svg.dataset.baseLabel || svg.getAttribute('aria-label') || '';
  if (!svg.dataset.baseLabel) svg.dataset.baseLabel = base;
  const where = cityList([...new Set(placed.flatMap(pin => pin.cities))]);
  svg.setAttribute('aria-label', where ? `${base} Collector testimonials in ${where}.` : base);
}

async function boot() {
  const maps = [...document.querySelectorAll('[data-live-map]')];
  if (!maps.length) return;
  const seeds = new Map(maps.map(root => [root, seedPins(root)]));
  for (const root of maps) paintLiveMap(root, seeds.get(root));
  try {
    const response = await fetch('/testimonials/api/approved', {cache: 'no-store', headers: {Accept: 'application/json'}});
    if (!response.ok) return;
    const live = readApprovedPins(await response.json());
    for (const root of maps) paintLiveMap(root, [...seeds.get(root), ...live]);
  } catch {
    // Build-time exhibition dots, and any hand-curated pins already painted, stay put.
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
