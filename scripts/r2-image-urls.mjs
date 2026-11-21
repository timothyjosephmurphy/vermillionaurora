// Point built pages at the tjm-images R2 bucket (https://img.tjm.art) instead of /display/ on
// the site, so a picture swap (scripts/swap-image.mjs) needs no deploy. Runs last on dist/:
// only the URL prefix changes; markup, srcset widths and file names stay identical. Catalog JSON
// (catalog/products.json, gallery/inventory.json) is left alone so catalog hashes do not move.
// Rollback without R2: IMAGE_ORIGIN=self npm run build (static/display/ is still deployed).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { IMAGE_ORIGIN, R2_PREFIXES } from './lib/image-keys.mjs';
import { hashHeadAssets } from './hash-head-assets.mjs';

const prefixes = R2_PREFIXES.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
// Include &quot; so JSON URLs in HTML data attributes (the homepage hero slideshow) are
// rewritten too. A match of "/display/..." after &quot; used to stay on tjm.art and 301 to R2.
const re = new RegExp(`(["'(\\s,]|&quot;)(?:https://(?:www\\.)?tjm\\.art)?/(${prefixes})/`, 'g');
const srcRe = new RegExp(`^(?:https://(?:www\\.)?tjm\\.art)?/(?:${prefixes})/`);

export function rewriteR2ImageUrls(text, origin = IMAGE_ORIGIN) {
  // Keep the catalog URL of an <img> whose src moves to R2 in data-image-src (as
  // responsive-images.mjs does), so cart/catalog checks still see the catalog's image.src.
  const withSrc = text.replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    return src && !/\sdata-image-src=/.test(tag) && srcRe.test(src) ? tag.replace(/^<img\b/, `<img data-image-src="${src}"`) : tag;
  });
  let n = 0;
  const next = withSrc.replace(re, (m, pre, prefix, at) => {
    const before = withSrc.slice(Math.max(0, at - 15), at + 1);
    return before.endsWith('data-image-src="') ? m : (n++, `${pre}${origin}/${prefix}/`);
  });
  return { text: next, count: n };
}

async function main() {
  if (process.env.IMAGE_ORIGIN === 'self') {
    console.log('R2 image URLs: skipped (IMAGE_ORIGIN=self)');
    await hashHeadAssets();
    process.exit(0);
  }
  let files = 0, refs = 0;
  const all = await readdir('dist', { recursive: true });
  for (const rel of all.filter(f => /\.(html|css)$/.test(f) || f === 'portrait-preview.js')) {
    const file = `dist/${rel}`;
    const { text: next, count: n } = rewriteR2ImageUrls(await readFile(file, 'utf8'));
    if (n) { files++; refs += n; await writeFile(file, next); }
  }
  console.log(`R2 image URLs: ${refs} references in ${files} files now use ${IMAGE_ORIGIN}`);
  await hashHeadAssets();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
