// Check the live D1 catalog against the built snapshot, and (with --quote-all) quote every print edition
// through the live checkout to prove quotes use the same prices. Quote-only: no payment, no order, no hold.
// Usage: CATALOG_ADMIN_PASSWORD=... node scripts/verify-catalog-d1.mjs [--quote-all] [--snapshot=dist/catalog/snapshot.json]
import { readFile } from 'node:fs/promises';
const pw = process.env.CATALOG_ADMIN_PASSWORD; if (!pw) throw Error('Set CATALOG_ADMIN_PASSWORD');
const snapPath = process.argv.find(a => a.startsWith('--snapshot='))?.slice(11) || 'dist/catalog/snapshot.json';
const snap = JSON.parse(await readFile(snapPath, 'utf8'));
const r = await fetch('https://tjm.art/catalog-admin/api/export', { headers: { Authorization: `Bearer ${pw}` } });
if (!r.ok) throw Error(`export ${r.status}`);
const d1 = await r.json();
const P = new Map(d1.paintings.map(p => [p.id, p])), E = new Map(d1.editions.map(e => [e.id, e])), S = new Map(d1.status.map(s => [s.product_id, s]));
const I = d1.images.reduce((m, i) => m.set(i.product_id, [...(m.get(i.product_id) || []), i.key]), new Map());
const bad = [];
for (const p of snap.paintings) {
  const l = P.get(p.id); if (!l) { bad.push(`missing painting ${p.id}`); continue; }
  for (const [a, b] of [['slug', 'slug'], ['title', 'title'], ['type', 'type'], ['width', 'width'], ['height', 'height'], ['unit', 'unit'], ['price', 'price_amount'], ['currency', 'currency'], ['description', 'description']])
    if ((p[a] ?? null) !== (l[b] ?? null)) bad.push(`${p.id} ${a}: built ${JSON.stringify(p[a])} vs D1 ${JSON.stringify(l[b])}`);
  if ((p.status ?? null) !== (S.get(p.id)?.status ?? null)) bad.push(`${p.id} status: ${p.status} vs ${S.get(p.id)?.status}`);
  const keys = (I.get(p.id) || []).sort().join(), want = p.images.map(i => i.key).sort().join();
  if (keys !== want) bad.push(`${p.id} images differ`);
}
for (const e of snap.editions) {
  const l = E.get(e.id); if (!l) { bad.push(`missing edition ${e.id}`); continue; }
  for (const [a, b] of [['productId', 'product_id'], ['title', 'title'], ['amount', 'amount'], ['sku', 'sku'], ['imageW', 'image_w'], ['imageH', 'image_h'], ['paperW', 'paper_w'], ['paperH', 'paper_h']])
    if ((e[a] ?? null) !== (l[b] ?? null)) bad.push(`${e.id} ${a}: built ${e[a]} vs D1 ${l[b]}`);
  if (!l.enabled) bad.push(`${e.id} disabled in D1`);
}
const extra = d1.paintings.filter(p => !snap.paintings.some(s => s.id === p.id)).map(p => p.id);
console.log(`Diff: ${snap.paintings.length} paintings, ${snap.editions.length} editions checked; ${bad.length} differences; ${extra.length} D1-only paintings ${extra.join(' ')}`);
for (const b of bad.slice(0, 40)) console.log('  ' + b);
let quoteBad = 0;
if (process.argv.includes('--quote-all')) {
  const API = 'https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/cart';
  const version = (await (await fetch(API + '/catalog')).json()).version;
  const editions = d1.editions.filter(e => e.enabled), batches = [];
  for (let i = 0; i < editions.length; i += 8) batches.push(editions.slice(i, i + 8));
  let done = 0;
  const one = async batch => {
    for (let t = 1; t <= 3; t++) {
      const res = await fetch(API + '/quote', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://tjm.art' },
        body: JSON.stringify({ catalogVersion: version, items: batch.map(e => ({ id: e.id, quantity: 1 })), email: 'quote-test@example.com', address: { name: 'Quote Test', street1: '400 Broad St', street2: '', city: 'Seattle', state: 'WA', zip: '98109', country: 'US' } }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.quote?.items) {
        for (const e of batch) { const q = j.quote.items.find(i => i.id === e.id); if (!q || q.amount !== e.amount) { quoteBad++; console.log(`  quote ${e.id}: D1 ${e.amount} vs quote ${q?.amount}`); } }
        done += batch.length; return;
      }
      if (t === 3) { quoteBad += batch.length; console.log(`  quote failed ${res.status} ${j.error || ''} for ${batch.map(e => e.id).join(',')}`); }
      await new Promise(r => setTimeout(r, 2000 * t));
    }
  };
  for (let i = 0; i < batches.length; i += 4) { await Promise.all(batches.slice(i, i + 4).map(one)); if (i % 40 === 0) console.log(`  quoted ${done}/${editions.length}`); }
  console.log(`Quotes: ${done}/${editions.length} editions quoted at the D1 price; ${quoteBad} mismatches or failures`);
}
if (bad.length || quoteBad) process.exit(1);
