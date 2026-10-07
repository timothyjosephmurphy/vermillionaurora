// One-off generator for display-only WebP derivatives (run manually, outputs are committed).
// Originals are never modified: print masters, catalog image SHAs, and print samples stay as-is.
// Usage: node scripts/make-display-images.mjs  (after npm run build, so dist/ exists)
import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { DISPLAY_PAGES, MIN_BYTES, WIDTHS, EXTRA_SOURCES, QUALITY, DEFAULT_QUALITY } from './display-images.config.mjs';
const map = {};
const srcs = new Set();
for (const page of DISPLAY_PAGES) {
  const html = await readFile(`dist${page}index.html`, 'utf8').catch(() => '');
  for (const m of html.matchAll(/<img\b[^>]*?\s(?:data-image-)?src="([^"]+)"/g)) srcs.add(m[1]);
}
const load = async src => {
  if (/^https:\/\/media\.vermillionaurora\.com\//.test(src)) {
    const r = await fetch(src); if (!r.ok) throw new Error(`${src} ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
  if (src.startsWith('/') && !src.startsWith('//')) return readFile(`dist${decodeURI(src)}`).catch(() => null);
  return null;
};
for (const src of EXTRA_SOURCES) srcs.add(src);
const work = async src => {
  if (!/\.(jpe?g|png)$/i.test(src)) return;
  const buf = await load(src); if (!buf || (buf.length < MIN_BYTES && !EXTRA_SOURCES.includes(src))) return;
  const meta = await sharp(buf).metadata();
  const w0 = (meta.orientation >= 5 ? meta.height : meta.width);
  const id = createHash('sha1').update(src).digest('hex').slice(0, 10);
  const base = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const variants = [];
  for (const w of WIDTHS.filter(w => w < w0).concat(w0 <= WIDTHS.at(-1) ? [w0] : [])) {
    const out = `/display/${base}-${id}-${w}.webp`;
    const data = await sharp(buf).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY[src] ?? DEFAULT_QUALITY, effort: 6 }).toBuffer();
    await writeFile(`static${out}`, data);
    variants.push({ w, src: out, bytes: data.length });
  }
  map[src] = { original: buf.length, width: w0, variants };
  console.log(src, buf.length, variants.map(v => `${v.w}:${v.bytes}`).join(' '));
};
const queue = [...srcs].sort();
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await work(queue.shift()); }));
const sorted = Object.fromEntries(Object.keys(map).sort().map(k => [k, map[k]]));
await writeFile('scripts/display-images.json', JSON.stringify(sorted, null, 1) + '\n');
