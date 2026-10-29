import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { diffCatalog, patchHtml, patchProductsJson } from '../worker/catalog-pages.mjs';
import { applyCatalogOverlay, catalogSource } from '../cloudflare/catalog-overlay.mjs';
import { resetCache } from '../cloudflare/catalog-d1.mjs';
import catalog, { inventory } from '../cloudflare/checkout-catalog.mjs';
import prints from '../cloudflare/print-catalog.mjs';
import works from '../cloudflare/etsy-sync-source.mjs';
const raw = JSON.parse(fs.readFileSync('dist/catalog/snapshot.json', 'utf8'));
const snap = { ...raw, byId: new Map(raw.paintings.map(p => [p.id, p])), bySlug: new Map(raw.paintings.map(p => [p.slug, p])), editionsById: new Map(raw.editions.map(e => [e.id, e])) };
// D1 rows exactly as importSnapshot writes them.
function rows(edit = x => x) {
  const paintings = raw.paintings.map(p => ({ id: p.id, slug: p.slug, type: p.type, title: p.title, width: p.width, height: p.height, unit: p.unit, description: p.description, price_amount: p.price, currency: p.currency, parcel_json: p.parcel ? JSON.stringify(p.parcel) : null, source: 'import' }));
  const editions = raw.editions.map(e => ({ id: e.id, product_id: e.productId, title: e.title, amount: e.amount, currency: e.currency, enabled: 1 }));
  const images = raw.paintings.flatMap(p => p.images.map(i => ({ product_id: p.id, key: i.key, width: i.width, rev: 0 })));
  const status = raw.paintings.filter(p => p.status).map(p => ({ product_id: p.id, status: p.status }));
  return edit({ paintings, editions, images, status, rev: '1' });
}
const fakeDb = t => ({
  prepare: sql => ({ sql, first: async () => (t.fail ? Promise.reject(Error('down')) : { value: t.rev }) }),
  batch: async qs => { if (t.fail) throw Error('down'); return qs.map(q => ({ results: t[q.sql.match(/FROM (\w+)/)[1]] })); }
});
const live = t => ({ rev: t.rev, empty: false, paintings: new Map(t.paintings.map(r => [r.id, r])), editions: new Map(t.editions.map(r => [r.id, r])), images: t.images.reduce((m, r) => m.set(r.product_id, [...(m.get(r.product_id) || []), r]), new Map()), status: new Map(t.status.map(r => [r.product_id, r])) });
test('an imported catalog is identical to the built one: no page changes', () => {
  const d = diffCatalog(live(rows()), snap);
  assert.equal(d.changes.size, 0); assert.equal(d.added.length, 0);
});
test('price and title edits patch only that painting, everywhere it appears', () => {
  assert.equal(raw.editions.length, 0, 'print editions stay out of the public snapshot until the 1 inch margin is quoted');
  const t = rows(t => { const p = t.paintings.find(p => p.id === 'el-zonte-at-sunrise'); p.price_amount = '1100.00'; p.title = 'Sunrise Test'; t.images.find(i => i.product_id === 'el-zonte-at-sunrise').rev = 7; return t; });
  const L = live(t), d = diffCatalog(L, snap);
  const page = patchHtml(fs.readFileSync('dist/products/el-zonte-at-sunrise/index.html', 'utf8'), 'el-zonte-at-sunrise', d, snap, L);
  assert.ok(page.includes('<h1') && page.includes('Sunrise Test') && !page.includes('Sunrise from Punta El Zonte Hostel'));
  assert.ok(page.includes('$1,100') && page.includes('"price":"1100.00"') && !page.includes('$1,000'));
  assert.match(page, /not yet available/);
  assert.match(page, /img\.tjm\.art\/display\/[^"? ]+\?v=7/);
  const gallery = fs.readFileSync('dist/gallery/index.html', 'utf8'), g = patchHtml(gallery, null, d, snap, L);
  assert.ok(g.includes('data-price="1100.00"') && g.includes('Sunrise Test'));
  const card = (h, id) => h.slice(h.indexOf(`data-product-id="${id}"`), h.indexOf('</li>', h.indexOf(`data-product-id="${id}"`)));
  assert.equal(card(g, 'painting-emergence'), card(gallery, 'painting-emergence'), 'other $1,000 paintings untouched');
  assert.ok(card(gallery, 'painting-emergence').includes('$1,000'));
});
test('an unavailable or sold original updates the product page details line; prints stay', () => {
  for (const [status, text] of [['unavailable', 'Not currently available'], ['sold', 'Sold']]) {
    const t = rows(t => { const r = t.status.find(s => s.product_id === 'strawberry-point-11'); if (r) r.status = status; else t.status.push({ product_id: 'strawberry-point-11', status }); return t; });
    const L = live(t), d = diffCatalog(L, snap), src = fs.readFileSync('dist/products/strawberry-point-11/index.html', 'utf8');
    assert.ok(src.includes('<dt>Original</dt><dd>Available · $200</dd>'));
    const page = patchHtml(src, 'strawberry-point-11', d, snap, L);
    assert.ok(page.includes(`<dt>Original</dt><dd>${text}</dd>`) && !page.includes('<dd>Available · $200</dd>'));
    assert.match(page, /not yet available/);
    assert.ok(!page.includes('Original available for $200') && !page.includes('schema.org/InStock'));
    for (const f of ['dist/gallery/strawberry-point/index.html', 'dist/index.html']) {
      const h = fs.readFileSync(f, 'utf8'), g = patchHtml(h, null, d, snap, L), at = (x, id) => x.slice(x.search(new RegExp(`data-(?:product|sp)-id="${id}"`)), x.indexOf('</li>', x.search(new RegExp(`data-(?:product|sp)-id="${id}"`))));
      assert.ok(at(h, 'strawberry-point-11').includes('$200') && !at(g, 'strawberry-point-11').includes('$200') && at(g, 'strawberry-point-11').includes(text), f);
      assert.equal(at(g, 'strawberry-point-12'), at(h, 'strawberry-point-12'), 'other originals untouched');
    }
  }
});
test('checkout uses D1 prices, keeps Etsy on the live price, and falls back to the built catalog when D1 fails', async () => {
  const builtAmount = catalog['el-zonte-at-sunrise'].amount;
  assert.equal(prints['print-el-zonte-at-sunrise-full'], undefined);
  const t = rows(t => { t.paintings.find(p => p.id === 'el-zonte-at-sunrise').price_amount = '1100.00'; t.status.find(s => s.product_id === 'el-zonte-at-sunrise').status = 'sold'; return t; });
  resetCache(); assert.equal(await applyCatalogOverlay({ CATALOG_DB: fakeDb(t) }), '1');
  assert.equal(catalog['el-zonte-at-sunrise'].amount, '1100.00'); assert.equal(inventory['el-zonte-at-sunrise'].status, 'sold');
  const w = works.find(w => w.id === 'el-zonte-at-sunrise'); if (w?.original) assert.equal(w.original.price, '1100.00');
  t.fail = true; resetCache(); assert.equal(await applyCatalogOverlay({ CATALOG_DB: fakeDb(t) }), 'built');
  assert.equal(catalog['el-zonte-at-sunrise'].amount, builtAmount); assert.equal(catalogSource(), 'built');
  assert.equal(await applyCatalogOverlay({}), 'built');
});
