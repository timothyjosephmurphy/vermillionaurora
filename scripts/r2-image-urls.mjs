// Point built pages at the tjm-images R2 bucket (https://img.tjm.art) instead of /display/ on
// the site, so a picture swap (scripts/swap-image.mjs) needs no deploy. Runs last on dist/:
// only the URL prefix changes; markup, srcset widths and file names stay identical. Catalog JSON
// (catalog/products.json, gallery/inventory.json) is left alone so catalog hashes do not move.
// Rollback without R2: IMAGE_ORIGIN=self npm run build (static/display/ is still deployed).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { IMAGE_ORIGIN, R2_PREFIXES } from './lib/image-keys.mjs';
if (process.env.IMAGE_ORIGIN === 'self') { console.log('R2 image URLs: skipped (IMAGE_ORIGIN=self)'); process.exit(0); }
const prefixes = R2_PREFIXES.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
// A root-relative or https://tjm.art URL that starts with one of the R2 prefixes, preceded by a
// quote, paren, whitespace or comma (attribute values, srcset lists, CSS url()).
const re = new RegExp(`(["'(\\s,])(?:https://(?:www\\.)?tjm\\.art)?/(${prefixes})/`, 'g');
let files = 0, refs = 0;
const all = await readdir('dist', { recursive: true });
for (const rel of all.filter(f => /\.(html|css)$/.test(f) || f === 'portrait-preview.js')) {
  const file = `dist/${rel}`;
  // Keep the catalog URL of an <img> whose src moves to R2 in data-image-src (as responsive-images.mjs
  // does), so cart/catalog checks still see the catalog's image.src.
  const text = (await readFile(file, 'utf8')).replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    return src && !/\sdata-image-src=/.test(tag) && new RegExp(`^(?:https://(?:www\\.)?tjm\\.art)?/(?:${prefixes})/`).test(src) ? tag.replace(/^<img\b/, `<img data-image-src="${src}"`) : tag;
  });
  let n = 0;
  // data-image-src carries the catalog's own image.src for cart/catalog checks: never rewritten.
  const next = text.replace(re, (m, pre, prefix, at) => text.slice(Math.max(0, at - 15), at + 1).endsWith('data-image-src="') ? m : (n++, `${pre}${IMAGE_ORIGIN}/${prefix}/`));
  if (n) { files++; refs += n; await writeFile(file, next); }
}
console.log(`R2 image URLs: ${refs} references in ${files} files now use ${IMAGE_ORIGIN}`);
