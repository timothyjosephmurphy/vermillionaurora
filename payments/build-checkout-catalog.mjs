import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const inventory = JSON.parse(await readFile(new URL('../gallery/inventory.json', import.meta.url)));
const links = JSON.parse(await readFile(new URL('./paypal-links.json', import.meta.url)));
const shippingOverrides = JSON.parse(await readFile(new URL('./shipping-overrides.json', import.meta.url)));
for (const [slug, profile] of Object.entries(shippingOverrides)) {
  if (!inventory.paintings.some(painting => painting.A === slug) ||
      !['flat', 'tube'].includes(profile.packaging) ||
      !['length', 'width', 'height', 'weight'].every(key => typeof profile.parcel?.[key] === 'number' && Number.isFinite(profile.parcel[key]) && profile.parcel[key] > 0)) {
    throw new Error(`Invalid shipping override: ${slug}`);
  }
}
const catalog = {};
for (const painting of inventory.paintings) {
  const { A: slug, B: title, C: rawPrice, D: currency, E: availability } = painting;
  if (availability !== 'Available' || currency !== 'USD' || !Number.isFinite(Number(rawPrice)) || Number(rawPrice) <= 0 || links[slug]) continue;
  if (!/^[a-z0-9-]+$/.test(slug) || !existsSync(new URL(`../products/${slug}/index.html`, import.meta.url))) continue;
  const html = await readFile(new URL(`../products/${slug}/index.html`, import.meta.url), 'utf8');
  const titleOnPage = html.match(/<h1>([^<]+)<\/h1>/)?.[1];
  const priceOnPage = html.match(/<p class="product-detail-price">\$([\d,.]+) USD<\/p>/)?.[1];
  if (titleOnPage !== title || Number(priceOnPage?.replaceAll(',', '')) !== Number(rawPrice) || !html.includes('<p class="product-availability">Available</p>')) {
    throw new Error(`Product page does not match inventory: ${slug}`);
  }
  const width = Number(painting.F) * (painting.H === 'cm' ? 1 / 2.54 : 1);
  const height = Number(painting.G) * (painting.H === 'cm' ? 1 / 2.54 : 1);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0 || !['cm','in'].includes(painting.H)) {
    throw new Error(`Physical dimensions missing for ${slug}`);
  }
  const shorter = Math.min(width,height), longer = Math.max(width,height);
  const rolled = longer > 12;
  const estimatedParcel = rolled
    ? {length:Math.ceil(shorter),width:4,height:4,weight:2}
    : {length:Math.ceil(longer + 2),width:Math.ceil(shorter + 2),height:2,weight:2};
  const profile = shippingOverrides[slug];
  const parcel = profile ? Object.fromEntries(['length', 'width', 'height', 'weight'].map(key => [key, profile.parcel[key]])) : estimatedParcel;
  catalog[slug] = { title, amount: Number(rawPrice).toFixed(2), currency, parcel, packaging:profile?.packaging ?? (rolled ? 'tube' : 'flat'),
    ...(profile?.insuranceRequested === true ? {insuranceRequested:true} : {}) };
}
await writeFile(new URL('../cloudflare/checkout-catalog.mjs', import.meta.url), `export default ${JSON.stringify(catalog, null, 2)};\n`);
console.log(`Built checkout catalog: ${Object.keys(catalog).length} paintings`);
