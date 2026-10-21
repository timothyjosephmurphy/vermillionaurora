// Related works for TJ Murphy painting pages (studio-tracker #248).
// Tags live in catalog/painting-tags.json, keyed by product id. Paul Murphy's works are never tagged or shown.
import data from './painting-tags.json' with { type: 'json' };
import { products as allProducts } from './catalog.mjs';

export const RELATED_LIMIT = 6;
const WEIGHT = { series: 3, place: 2, subject: 1 };
export const tagDefs = data.tags;
export const tagAssignments = data.assignments;

const norm = t => String(t || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const eligible = p => p && p.type === 'painting' && p.artist !== 'Paul Murphy';

// Group pages that show the same physical painting: explicit twins, book-gallery
// originalProductId pairs, and pages with the same normalized title.
export function twinGroups(products = allProducts, twins = data.twins) {
  const parent = new Map();
  const find = x => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
  const union = (a, b) => { if (parent.has(a) && parent.has(b)) parent.set(find(a), find(b)); };
  for (const p of products) parent.set(p.id, p.id);
  const byTitle = new Map();
  for (const p of products.filter(eligible)) {
    const k = norm(p.title);
    if (byTitle.has(k)) union(p.id, byTitle.get(k)); else byTitle.set(k, p.id);
    if (p.originalProductId) union(p.id, p.originalProductId);
  }
  for (const g of twins || []) for (const id of g.slice(1)) union(g[0], id);
  return id => (parent.has(id) ? find(id) : id);
}

// Prefer the main catalog page over book-gallery/archive copies, then available originals.
const pageRank = p => (p.bookGallery ? 2 : p.archive || p.olderWork ? 1 : 0);

export function tagsFor(p) {
  return (tagAssignments[p?.id] || []).filter(k => tagDefs[k]).map(k => ({ id: k, ...tagDefs[k] }));
}

export function relatedWorks(product, { products = allProducts, limit = RELATED_LIMIT } = {}) {
  if (!eligible(product)) return [];
  const group = twinGroups(products);
  const own = new Set(tagAssignments[product.id] || []);
  if (!own.size) return [];
  const self = group(product.id);
  const best = new Map();
  for (const p of products) {
    if (!eligible(p) || group(p.id) === self) continue;
    const shared = (tagAssignments[p.id] || []).filter(k => own.has(k) && tagDefs[k]);
    if (!shared.length) continue;
    const score = shared.reduce((s, k) => s + (WEIGHT[tagDefs[k].kind] || 1), 0);
    const entry = { product: p, score, shared, available: p.listing?.status === 'available' ? 1 : 0, rank: pageRank(p) };
    const key = group(p.id), prev = best.get(key);
    if (!prev || entry.rank < prev.rank || (entry.rank === prev.rank && entry.available > prev.available)) best.set(key, entry);
  }
  return [...best.values()]
    .sort((a, b) => b.score - a.score || b.available - a.available || a.rank - b.rank || a.product.title.localeCompare(b.product.title))
    .slice(0, limit)
    .map(e => ({ ...e.product, relatedTags: e.shared.map(k => tagDefs[k].label) }));
}
