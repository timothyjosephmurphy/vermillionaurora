// Lists each product's share-image source as a local display derivative (largest width <= 1600) for
// scripts/make-social-images.py. Never a print master or legacy full-resolution file.
import { products } from '../catalog/catalog.mjs';
import { readFileSync, existsSync } from 'node:fs';
const display = JSON.parse(readFileSync('scripts/display-images.json', 'utf8'));
const norm = s => String(s || '').replace(/^https?:\/\/(?:www\.)?(?:tjm\.art|vermillionaurora\.com)/, '');
const out = {}, missing = [];
for (const p of products) {
  const src = p.image?.src || p.examples?.[0]?.src; if (!src) continue;
  let local = null;
  const entry = display[src] || display[norm(src)];
  const variants = entry?.variants?.filter(v => v.w <= 1600 && existsSync('static' + v.src)) || [];
  if (variants.length) local = 'static' + variants.at(-1).src;
  else if (/^\/display\//.test(norm(src)) && existsSync('static' + norm(src))) local = 'static' + norm(src);
  else if (existsSync('.' + norm(src)) && !/print-masters/.test(src)) local = '.' + norm(src);
  if (local) out[p.slug] = local; else missing.push(`${p.slug} ${src}`);
}
console.log(JSON.stringify({ out, missing }));
