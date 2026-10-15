// Checkout side of the D1 catalog: before each request the generated catalogs (checkout-catalog.mjs,
// print-catalog.mjs, etsy-sync-source.mjs) are reset to their built values and the live D1 values are laid on
// top, in place, so every existing module (quotes, cart, Square/BTCPay/PayPal, /inventory/status, Etsy) reads
// the same prices the pages show. If D1 is missing, empty or errors, the built values are used unchanged.
import catalog, { inventory } from './checkout-catalog.mjs';
import prints from './print-catalog.mjs';
import syncWorks from './etsy-sync-source.mjs';
import { readLive } from './catalog-d1.mjs';
const base = { catalog: structuredClone(catalog), inventory: structuredClone(inventory), prints: structuredClone(prints), works: structuredClone(syncWorks) };
let applied = 'built';
const refill = (target, source) => {
  if (Array.isArray(target)) { target.length = 0; target.push(...structuredClone(source)); return; }
  for (const k of Object.keys(target)) delete target[k]; Object.assign(target, structuredClone(source));
};
function reset() { refill(catalog, base.catalog); refill(inventory, base.inventory); refill(prints, base.prints); refill(syncWorks, base.works); applied = 'built'; }
const DEFAULT_PARCEL = { length: 30, width: 4, height: 4, weight: 2 };
export function overlay(live) {
  reset();
  for (const [id, p] of live.paintings) {
    if (catalog[id]) {
      if (p.price_amount) Object.assign(catalog[id], { amount: p.price_amount, title: p.title, currency: p.currency || 'USD' });
      else delete catalog[id];
    } else if (p.source === 'admin' && p.price_amount) {
      catalog[id] = { title: p.title, amount: p.price_amount, currency: p.currency || 'USD', parcel: p.parcel_json ? JSON.parse(p.parcel_json) : DEFAULT_PARCEL, packaging: 'tube' };
    }
  }
  for (const [id, s] of live.status) if (inventory[id] || live.paintings.get(id)?.source === 'admin') inventory[id] = { ...(inventory[id] || {}), status: s.status };
  for (const [id, e] of live.editions) {
    if (!prints[id]) continue;
    if (!e.enabled) { delete prints[id]; continue; }
    prints[id].amount = e.amount;
    prints[id].title = e.title;
  }
  // Etsy: originals keep the +10% uplift (etsyOriginalPrice) on top of the live site price; print prices follow D1.
  for (const w of Object.values(syncWorks)) {
    if (w.original && catalog[w.id]) w.original.price = catalog[w.id].amount;
    for (const v of w.variants || []) {
      const e = prints[`print-${w.id}-${v.key}`]; if (e) v.price = e.amount;
      for (const f of v.frames || []) { const fe = prints[`print-${w.id}-${v.key}-frame-${f.key}`]; if (fe) f.price = fe.amount; }
    }
  }
  applied = live.rev;
}
export async function applyCatalogOverlay(env) {
  if (!env?.CATALOG_DB) { if (applied !== 'built') reset(); return 'built'; }
  try {
    const live = await readLive(env.CATALOG_DB);
    if (live.empty) { if (applied !== 'built') reset(); return 'built'; }
    if (applied !== live.rev) overlay(live);
    return applied;
  } catch {
    if (applied !== 'built') reset();
    return 'built';
  }
}
export const catalogSource = () => applied;
