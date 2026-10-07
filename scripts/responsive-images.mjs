// Point display images on DISPLAY_PAGES at committed WebP derivatives (static/display/,
// made by make-display-images.mjs) with srcset and layout-specific sizes.
// The catalog original stays in data-image-src for cart/catalog checks.
// Only HTML on DISPLAY_PAGES is rewritten. Original files, catalog JSON, print assets,
// and print samples are left untouched, so catalog and checkout hashes do not change.
import { readFile, writeFile } from 'node:fs/promises';
import { DISPLAY_PAGES, SIZES, DEFAULT_SIZES, PAGE_SIZES } from './display-images.config.mjs';
const map = JSON.parse(await readFile('scripts/display-images.json', 'utf8'));
const pick = v => v.filter(x => x.w <= 960).at(-1) || v[0];
const sizesFor = (before, page) => {
  let best = DEFAULT_SIZES, at = -1;
  for (const [cls, sizes] of SIZES) {
    const i = before.lastIndexOf(cls);
    if (i > at) { at = i; best = PAGE_SIZES[page]?.[cls] ?? sizes; }
  }
  return best;
};
const type = src => /\.png$/i.test(src) ? 'image/png' : 'image/jpeg';
let imgs = 0, backgrounds = 0;
for (const page of DISPLAY_PAGES) {
  const file = `dist${page}index.html`;
  const html = await readFile(file, 'utf8').catch(() => null);
  if (html === null) continue;
  let next = html.replace(/<img\b[^>]*>/g, (tag, offset) => {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    const entry = src && map[src];
    if (!entry || /\ssrcset=/.test(tag)) return tag;
    const v = entry.variants;
    // Look back over the surrounding markup to find the layout this image sits in.
    const sizes = sizesFor(html.slice(Math.max(0, offset - 600), offset), page);
    const keep = /\sdata-image-src=/.test(tag) ? '' : ` data-image-src="${src}"`;
    imgs++;
    return tag.replace(` src="${src}"`, `${keep} src="${pick(v).src}" srcset="${v.map(x => `${x.src} ${x.w}w`).join(', ')}" sizes="${sizes}"`);
  });
  // Preload hints must point at the same file the page will actually use.
  next = next.replace(/<link rel="preload" as="image" href="([^"]+)"/g, (m, src) => map[src] ? `<link rel="preload" as="image" type="image/webp" href="${pick(map[src].variants).src}"` : m);
  // Inline background images (e.g. the homepage featured painting panel).
  next = next.replace(/background-image:url\('([^']+)'\)/g, (m, src) => {
    const entry = map[src];
    if (!entry) return m;
    backgrounds++;
    return `${m};background-image:image-set(url('${pick(entry.variants).src}') type('image/webp'),url('${src}') type('${type(src)}'))`;
  });
  if (next !== html) await writeFile(file, next);
}
console.log(`Responsive WebP display images: ${imgs} img tags, ${backgrounds} inline backgrounds`);
