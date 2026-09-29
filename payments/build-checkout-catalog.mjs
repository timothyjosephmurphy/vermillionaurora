import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const inventory = JSON.parse(await readFile(new URL('../gallery/inventory.json', import.meta.url)));
const links = JSON.parse(await readFile(new URL('./paypal-links.json', import.meta.url)));
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
  catalog[slug] = { title, amount: Number(rawPrice).toFixed(2), currency };
}
await writeFile(new URL('../cloudflare/checkout-catalog.mjs', import.meta.url), `export default ${JSON.stringify(catalog, null, 2)};\n`);
console.log(`Built checkout catalog: ${Object.keys(catalog).length} paintings`);
