// tjm-catalog D1: shared by the website Worker (pages, /catalog-admin/) and the checkout Worker (quotes,
// checkout, /inventory/status, Etsy). Schema: catalog/d1/schema.sql. Reads are cached per isolate and
// keyed by meta.rev, which every admin write bumps, so a change is live on the next request (<= REV_TTL_MS).
export const REV_TTL_MS = 2000;
let cache = { rev: null, checkedAt: 0, data: null };
export const now = () => new Date().toISOString();
export async function readRev(db) {
  const row = await db.prepare("SELECT value FROM meta WHERE key='rev'").first();
  return row ? String(row.value) : null;
}
// Returns {rev, empty, paintings: Map, editions: Map, images: Map<productId, [{key,width,rev}]>, status: Map} or throws.
export async function readLive(db, { force = false } = {}) {
  const t = Date.now();
  if (!force && cache.data && t - cache.checkedAt < REV_TTL_MS) return cache.data;
  const rev = await readRev(db);
  if (!force && cache.data && cache.rev === rev) { cache.checkedAt = t; return cache.data; }
  const [p, e, i, s] = await db.batch([
    db.prepare('SELECT * FROM paintings'), db.prepare('SELECT * FROM editions'),
    db.prepare('SELECT product_id, key, width, rev FROM images ORDER BY width'), db.prepare('SELECT * FROM status')]);
  const images = new Map();
  for (const r of i.results) { if (!images.has(r.product_id)) images.set(r.product_id, []); images.get(r.product_id).push({ key: r.key, width: r.width, rev: r.rev }); }
  const data = { rev, empty: p.results.length === 0,
    paintings: new Map(p.results.map(r => [r.id, r])), editions: new Map(e.results.map(r => [r.id, r])),
    images, status: new Map(s.results.map(r => [r.product_id, r])) };
  cache = { rev, checkedAt: t, data };
  return data;
}
export function resetCache() { cache = { rev: null, checkedAt: 0, data: null }; }
export async function bumpRev(db, action, target, change) {
  await db.batch([
    db.prepare("UPDATE meta SET value = CAST(value AS INTEGER) + 1 WHERE key='rev'"),
    db.prepare('INSERT INTO audit (at, action, target, change_json) VALUES (?, ?, ?, ?)').bind(now(), action, target || null, change ? JSON.stringify(change) : null)]);
  resetCache();
}
// One-time import from the built snapshot (dist/catalog/snapshot.json). Refuses when D1 already has paintings.
export async function importSnapshot(db, snap) {
  const existing = await db.prepare('SELECT COUNT(*) AS n FROM paintings').first();
  if (existing.n > 0) throw Error('The catalog database already has paintings; import runs only once.');
  const at = now(), stmts = [];
  const P = db.prepare('INSERT INTO paintings (id, slug, type, title, artist, medium, surface, year, width, height, unit, description, price_amount, currency, parcel_json, source, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  const E = db.prepare('INSERT INTO editions (id, product_id, title, amount, currency, sku, image_w, image_h, paper_w, paper_h, enabled, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,1,?)');
  const I = db.prepare('INSERT OR IGNORE INTO images (product_id, key, width, role, rev) VALUES (?,?,?,?,0)');
  const S = db.prepare('INSERT INTO status (product_id, status, note, updated_at) VALUES (?,?,NULL,?)');
  for (const p of snap.paintings) {
    stmts.push(P.bind(p.id, p.slug, p.type, p.title, p.artist, p.medium, p.surface, p.year, p.width, p.height, p.unit, p.description, p.price, p.currency, p.parcel ? JSON.stringify(p.parcel) : null, 'import', at));
    for (const im of p.images) stmts.push(I.bind(p.id, im.key, im.width, 'display'));
    if (p.status) stmts.push(S.bind(p.id, p.status, at));
  }
  for (const e of snap.editions) stmts.push(E.bind(e.id, e.productId, e.title, e.amount, e.currency, e.sku, e.imageW, e.imageH, e.paperW, e.paperH, at));
  for (let i = 0; i < stmts.length; i += 200) await db.batch(stmts.slice(i, i + 200));
  await bumpRev(db, 'import', null, { catalogVersion: snap.catalogVersion, printVersion: snap.printVersion, paintings: snap.paintings.length, editions: snap.editions.length });
  return { paintings: snap.paintings.length, editions: snap.editions.length, statements: stmts.length };
}
export async function exportAll(db) {
  const [p, e, i, s, m] = await db.batch(['paintings ORDER BY id', 'editions ORDER BY id', 'images ORDER BY product_id, width', 'status ORDER BY product_id', 'meta ORDER BY key'].map(t => db.prepare('SELECT * FROM ' + t)));
  return { exportedAt: now(), schema: 1, meta: Object.fromEntries(m.results.map(r => [r.key, r.value])), paintings: p.results, editions: e.results, images: i.results, status: s.results };
}
// Bring repo changes into D1: for the given product ids (or every painting/edition D1 does not have yet),
// copy the built snapshot's values over D1 (painting, status, image keys, print sizes). Use after a repo PR
// adds or reprices paintings; untouched ids keep their D1 values.
export async function syncFromSnapshot(db, snap, { ids = [], missing = true } = {}) {
  const live = await readLive(db, { force: true }), want = new Set(ids), at = now(), stmts = [], done = new Set();
  const P = db.prepare('INSERT INTO paintings (id, slug, type, title, artist, medium, surface, year, width, height, unit, description, price_amount, currency, parcel_json, source, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, type=excluded.type, title=excluded.title, artist=excluded.artist, medium=excluded.medium, surface=excluded.surface, year=excluded.year, width=excluded.width, height=excluded.height, unit=excluded.unit, description=excluded.description, price_amount=excluded.price_amount, currency=excluded.currency, parcel_json=excluded.parcel_json, source=excluded.source, updated_at=excluded.updated_at');
  const S = db.prepare('INSERT INTO status (product_id, status, note, updated_at) VALUES (?,?,?,?) ON CONFLICT(product_id) DO UPDATE SET status=excluded.status, note=excluded.note, updated_at=excluded.updated_at');
  const I = db.prepare("INSERT OR IGNORE INTO images (product_id, key, width, role, rev) VALUES (?,?,?,'display',0)");
  const E = db.prepare('INSERT INTO editions (id, product_id, title, amount, currency, sku, image_w, image_h, paper_w, paper_h, enabled, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,1,?) ON CONFLICT(id) DO UPDATE SET product_id=excluded.product_id, title=excluded.title, amount=excluded.amount, currency=excluded.currency, sku=excluded.sku, image_w=excluded.image_w, image_h=excluded.image_h, paper_w=excluded.paper_w, paper_h=excluded.paper_h, enabled=1, updated_at=excluded.updated_at');
  for (const p of snap.paintings) {
    if (!want.has(p.id) && !(missing && !live.paintings.has(p.id))) continue;
    done.add(p.id);
    stmts.push(P.bind(p.id, p.slug, p.type, p.title, p.artist, p.medium, p.surface, p.year, p.width, p.height, p.unit, p.description, p.price, p.currency, p.parcel ? JSON.stringify(p.parcel) : null, 'import', at));
    if (p.status) stmts.push(S.bind(p.id, p.status, 'repo sync', at));
    for (const im of p.images) stmts.push(I.bind(p.id, im.key, im.width));
  }
  let editions = 0;
  for (const e of snap.editions) if (done.has(e.productId) || (missing && !live.editions.has(e.id))) { editions++; stmts.push(E.bind(e.id, e.productId, e.title, e.amount, e.currency, e.sku, e.imageW, e.imageH, e.paperW, e.paperH, at)); }
  for (let i = 0; i < stmts.length; i += 200) await db.batch(stmts.slice(i, i + 200));
  if (stmts.length) await bumpRev(db, 'sync', null, { paintings: [...done], editions });
  return { paintings: done.size, editions, statements: stmts.length };
}
// Repo print prices are the approved FinerWorks retail. Checkout overlays D1 on top of the built
// catalog, and a framed quote is refused unless that amount matches the supplier to the cent.
// When the built print catalog version changes, copy those amounts into existing edition rows.
// Admin edits made after that sync stay until the next print catalog version.
let editionPriceSync = null;
export function editionAmountChanges(liveEditions, built) {
  const changes = [];
  for (const edition of built || []) {
    if (!edition?.id || typeof edition.amount !== 'string' || !/^\d+\.\d{2}$/.test(edition.amount)) continue;
    const row = liveEditions.get(edition.id);
    if (row && row.amount !== edition.amount) changes.push({ id: edition.id, amount: edition.amount, before: row.amount });
  }
  return changes;
}
export async function syncBuiltEditionPrices(db, printVersion, built) {
  if (!db || !printVersion) return { updated: 0, skipped: true };
  if (editionPriceSync) return editionPriceSync;
  editionPriceSync = syncBuiltEditionPricesOnce(db, printVersion, built).finally(() => { editionPriceSync = null; });
  return editionPriceSync;
}
async function syncBuiltEditionPricesOnce(db, printVersion, built) {
  if (!built?.length) return { updated: 0, skipped: true };
  const marked = await db.prepare("SELECT value FROM meta WHERE key='print_version'").first();
  if (marked?.value === printVersion) return { updated: 0, skipped: true };
  const live = await readLive(db, { force: true });
  const changes = editionAmountChanges(live.editions, built);
  const at = now();
  const update = db.prepare('UPDATE editions SET amount=?, updated_at=? WHERE id=? AND amount=?');
  const stmts = changes.map(change => update.bind(change.amount, at, change.id, change.before));
  for (let i = 0; i < stmts.length; i += 100) await db.batch(stmts.slice(i, i + 100));
  if (changes.length) await bumpRev(db, 'edition-prices', null, { printVersion, updated: changes.length });
  await db.batch([db.prepare("INSERT INTO meta (key, value) VALUES ('print_version', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(printVersion)]);
  resetCache();
  return { updated: changes.length, skipped: false };
}
// Built listing status is what the pages and checkout catalog publish. Copy it onto D1 rows that
// still say they came from the repo or from a catalog-admin toggle, once per catalog version.
// A status row with any other note is an intentional override and is left alone.
let paintingStatusSync = null;
const REPO_STATUS_NOTES = new Set(['repo sync', 'catalog-admin']);
export async function syncBuiltPaintingStatuses(db, catalogVersion, inventory) {
  if (!db || !catalogVersion || !inventory || !Object.keys(inventory).length) return { updated: 0, skipped: true };
  if (paintingStatusSync) return paintingStatusSync;
  paintingStatusSync = syncBuiltPaintingStatusesOnce(db, catalogVersion, inventory).finally(() => { paintingStatusSync = null; });
  return paintingStatusSync;
}
async function syncBuiltPaintingStatusesOnce(db, catalogVersion, inventory) {
  const marked = await db.prepare("SELECT value FROM meta WHERE key='catalog_version'").first();
  if (marked?.value === catalogVersion) return { updated: 0, skipped: true };
  const live = await readLive(db, { force: true });
  const at = now();
  const update = db.prepare('UPDATE status SET status=?, note=?, updated_at=? WHERE product_id=? AND status=?');
  const stmts = [];
  for (const [id, item] of Object.entries(inventory)) {
    const row = live.status.get(id);
    if (!row || !item?.status || row.status === item.status) continue;
    if (row.note && !REPO_STATUS_NOTES.has(row.note)) continue;
    stmts.push(update.bind(item.status, 'repo sync', at, id, row.status));
  }
  for (let i = 0; i < stmts.length; i += 100) await db.batch(stmts.slice(i, i + 100));
  if (stmts.length) await bumpRev(db, 'painting-status', null, { catalogVersion, updated: stmts.length });
  await db.batch([db.prepare("INSERT INTO meta (key, value) VALUES ('catalog_version', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(catalogVersion)]);
  resetCache();
  return { updated: stmts.length, skipped: false };
}
