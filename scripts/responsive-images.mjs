// Point display <img> tags on the main public pages at committed WebP derivatives
// The catalog original stays in data-image-src for cart/catalog checks.
// (static/display/, made by make-display-images.mjs) with srcset/sizes.
// Only HTML on DISPLAY_PAGES is rewritten. Original files, catalog JSON, print assets,
// and print samples are left untouched, so catalog and checkout hashes do not change.
import { readFile, writeFile } from 'node:fs/promises';
import { DISPLAY_PAGES } from './display-images.config.mjs';
const map = JSON.parse(await readFile('scripts/display-images.json', 'utf8'));
let changed = 0;
for (const page of DISPLAY_PAGES) {
  const file = `dist${page}index.html`;
  const html = await readFile(file, 'utf8');
  const next = html.replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    const entry = src && map[src];
    if (!entry || /\ssrcset=/.test(tag)) return tag;
    const v = entry.variants;
    const pick = v.filter(x => x.w <= 960).at(-1) || v[0];
    changed++;
    const keep = /\sdata-image-src=/.test(tag) ? '' : ` data-image-src="${src}"`;
    return tag.replace(` src="${src}"`, `${keep} src="${pick.src}" srcset="${v.map(x => `${x.src} ${x.w}w`).join(', ')}" sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 600px"`);
  });
  if (next !== html) await writeFile(file, next);
}
console.log(`Responsive WebP display images: ${changed} img tags updated`);
