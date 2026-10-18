// Built catalog snapshot (dist/catalog/snapshot.json): the exact data the static pages were built from.
// It is (1) the one-time import source for the tjm-catalog D1 database (/catalog-admin/ "Import"),
// (2) the baseline the site Worker diffs D1 against to patch pages at request time, and
// (3) the fallback whenever D1 is unreachable (pages are then served exactly as built).
// Only public fields: no shipping notes, no provider assets.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { products, catalogVersion } from '../catalog/catalog.mjs';
import checkout, { inventory } from '../cloudflare/checkout-catalog.mjs';
import prints, { printVersion } from '../cloudflare/print-catalog.mjs';
const map = JSON.parse(await readFile('scripts/display-images.json', 'utf8'));
// Only part of static/display/ is still committed (the rest lives in R2 only, studio-tracker#55);
// scripts/display-files.json lists every display file name in the tjm-images bucket.
const displayFiles = JSON.parse(await readFile('scripts/display-files.json', 'utf8'));
const keysFor = p => {
  const keys = new Map();
  for (const v of map[p.image?.src]?.variants || []) keys.set(v.src.slice(1), v.w);
  if (map[p.image?.fullSrc]) for (const v of map[p.image.fullSrc].variants) keys.set(v.src.slice(1), v.w);
  const re = new RegExp(`^${p.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)\\.webp$`);
  for (const f of displayFiles) { const m = f.match(re); if (m) keys.set(`display/${f}`, +m[1]); }
  return [...keys].map(([key, width]) => ({ key, width })).sort((a, b) => a.width - b.width);
};
const paintings = products.map(p => ({
  id: p.id, slug: p.slug, type: p.type, title: p.title, artist: p.artist || null, medium: p.medium || null, surface: p.surface || null,
  year: Number.isFinite(p.year) ? p.year : null, width: p.dimensions?.width ?? null, height: p.dimensions?.height ?? null, unit: p.dimensions?.unit ?? null,
  description: p.description || null,
  price: checkout[p.id]?.amount ?? p.listing?.price?.amount ?? null, currency: checkout[p.id]?.currency || p.listing?.price?.currency || 'USD',
  priceFrom: !!p.listing?.price?.from,
  parcel: checkout[p.id]?.parcel || null,
  status: inventory[p.id]?.status ?? p.listing?.status ?? null,
  image: p.image ? { src: p.image.src, alt: p.image.alt || '', width: p.image.width || null, height: p.image.height || null } : null,
  images: keysFor(p)
}));
const editions = Object.values(prints).filter(e => !e.testOnly).map(e => ({
  id: e.id, productId: e.productId, title: e.title, amount: e.amount, currency: e.currency || 'USD', sku: e.sku || null,
  imageW: e.imageSize?.width ?? null, imageH: e.imageSize?.height ?? null, paperW: e.paperSize?.width ?? null, paperH: e.paperSize?.height ?? null
}));
await writeFile('dist/catalog/snapshot.json', JSON.stringify({ catalogVersion, printVersion, builtAt: new Date().toISOString(), paintings, editions }));
console.log(`Catalog snapshot: ${paintings.length} paintings, ${editions.length} editions, ${paintings.reduce((n, p) => n + p.images.length, 0)} image keys`);
