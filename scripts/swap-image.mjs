// Replace a painting's picture on the live site without a deploy.
// Usage: node scripts/swap-image.mjs <slug> <photo> [--master] [--keep-ratio] [--fit-widths] [--dry-run]
//   (image-proportional print artworks, and --keep-ratio, keep the photo's own proportions)
//   1. Crops <photo> (EXIF-rotated) to the painting's recorded proportions, centred. Never pads:
//      it only cuts away the excess on one axis.
//   2. Regenerates every existing display WebP for that painting at the same widths and the same
//      quality, and uploads them to R2 (tjm-images) under the SAME keys, so no page changes.
//      Widths larger than the cropped photo are skipped (never upscaled) and reported.
//   3. Purges those https://img.tjm.art/... URLs from Cloudflare's cache when CLOUDFLARE_API_TOKEN
//      (Zone > Cache Purge) is set; otherwise writes the URL list to .cache/swap-purge-<slug>.json
//      for a manual purge (Cloudflare dashboard or API, max 30 URLs per call).
//   --master  also treats the crop as the new print master: writes static/print-masters/<sha256>.jpg
//      and updates catalog/prints.json artworks[id].source; print sizes that would need more pixels
//      than the new master has (below minimumDpi) are dropped from that artwork's variants.
//      Until the Phase 3 D1 catalog exists this is a repo change: rebuild the edition files
//      (node scripts/build-edition-print-assets.mjs --only=<id>), requote, then commit and merge.
//   --fit-widths  a width larger than the cropped photo is written at the photo's own width (never upscaled)
//      instead of being left unchanged, so a tighter crop never leaves a stale larger image behind.
//   --dry-run writes the derivatives to .cache/swap-<slug>/ and uploads/purges nothing.
// Needs R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY (see scripts/lib/r2.mjs).
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import products from '../catalog/all-products.mjs';
import { QUALITY, DEFAULT_QUALITY } from './display-images.config.mjs';
import { putObject } from './lib/r2.mjs';
import { imageUrl } from './lib/image-keys.mjs';
const [slug, photo] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const master = process.argv.includes('--master'), dry = process.argv.includes('--dry-run'), fit = process.argv.includes('--fit-widths');
if (!slug || !photo) { console.error('Usage: node scripts/swap-image.mjs <slug> <photo> [--master] [--keep-ratio] [--fit-widths] [--dry-run]'); process.exit(2); }
const product = products.find(p => p.slug === slug || p.id === slug);
if (!product) throw Error(`No catalog product with slug ${slug}`);
const map = JSON.parse(await readFile('scripts/display-images.json', 'utf8'));
// Existing display keys for this painting: the catalog image's derivatives plus id-named previews
// (archive / older-work: display/<id>-<width>.webp).
const keys = new Map();
for (const v of map[product.image?.src]?.variants || []) keys.set(v.src.slice(1), { w: v.w, quality: QUALITY[product.image.src] ?? DEFAULT_QUALITY });
const idRe = new RegExp(`^${product.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)\\.webp$`);
for (const f of await readdir('static/display')) { const m = f.match(idRe); if (m) keys.set(`display/${f}`, { w: +m[1], quality: DEFAULT_QUALITY }); }
if (!keys.size) throw Error(`${slug} has no display images to swap`);
// Target proportions: recorded dimensions, else the current image's pixel ratio.
// Target proportions: recorded dimensions, else the current image's pixel ratio. Image-proportional print
// editions (catalog/prints.json sizing) follow the photo itself, so the photo's own ratio is kept.
const printArt = JSON.parse(await readFile('catalog/prints.json', 'utf8')).artworks?.[product.id];
const d = product.dimensions;
let ratio = d?.width > 0 && d?.height > 0 ? d.width / d.height : product.image.width / product.image.height;
if (printArt?.sizing === 'image-proportional' || process.argv.includes('--keep-ratio')) ratio = null;
const src = await sharp(await readFile(photo)).rotate().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = src.info;
if (ratio === null) ratio = W / H;
if (!(ratio > 0)) throw Error(`${slug}: no proportions to crop to`);
let cw = W, ch = Math.round(W / ratio);
if (ch > H) { ch = H; cw = Math.round(H * ratio); }
const crop = await sharp(src.data).extract({ left: Math.floor((W - cw) / 2), top: Math.floor((H - ch) / 2), width: cw, height: ch }).toBuffer();
console.log(`${slug}: photo ${W}x${H} cropped to ${cw}x${ch} (ratio ${ratio.toFixed(4)}, nothing padded)`);
const outDir = `.cache/swap-${slug}`; await mkdir(outDir, { recursive: true });
const done = [], skipped = [];
for (const [key, { w, quality }] of [...keys].sort((a, b) => a[1].w - b[1].w)) {
  if (w > cw && !fit) { skipped.push(key); continue; }
  const data = await sharp(crop).resize({ width: Math.min(w, cw) }).webp({ quality, effort: 6 }).toBuffer();
  await writeFile(`${outDir}/${key.split('/').pop()}`, data);
  if (!dry) await putObject(key, data);
  done.push(key);
}
console.log(`${dry ? 'Generated (dry run)' : 'Uploaded'} ${done.length} display images${skipped.length ? `; left unchanged (photo too small, would upscale): ${skipped.join(', ')}` : ''}`);
const urls = done.map(imageUrl);
if (!dry) {
  const token = process.env.CLOUDFLARE_API_TOKEN, zone = process.env.CLOUDFLARE_ZONE_ID || '5c51165760cc5bc41120a3567c75dc28';
  if (token) {
    for (let i = 0; i < urls.length; i += 30) {
      const r = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify({ files: urls.slice(i, i + 30) }) });
      const j = await r.json(); if (!j.success) throw Error(`Purge failed: ${JSON.stringify(j.errors)}`);
    }
    console.log(`Purged ${urls.length} URLs from Cloudflare cache`);
  } else {
    await writeFile(`.cache/swap-purge-${slug}.json`, JSON.stringify({ files: urls }, null, 1));
    // No local token: purge through the purge-image-cache workflow so the new display images go live now,
    // independent of any print-master PR.
    try {
      execFileSync('gh', ['workflow', 'run', 'purge-image-cache.yml', '--ref', 'main', '-f', `urls=${urls.join(' ')}`], { stdio: 'inherit' });
      console.log(`Requested purge of ${urls.length} URLs via the purge-image-cache workflow`);
    } catch { console.log(`CLOUDFLARE_API_TOKEN not set: purge these URLs (listed in .cache/swap-purge-${slug}.json):\n${urls.join('\n')}`); }
  }
}
if (master) {
  const config = JSON.parse(await readFile('catalog/prints.json', 'utf8')), art = config.artworks[product.id];
  if (!art) throw Error(`${product.id} is not in catalog/prints.json; not a print master`);
  const jpg = await sharp(crop).jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toBuffer();
  const sha = createHash('sha256').update(jpg).digest('hex');
  if (!dry) await writeFile(`static/print-masters/${sha}.jpg`, jpg);
  const old = art.source;
  art.source = { ...old, url: `https://vermillionaurora.com/print-masters/${sha}.jpg`, widthPx: cw, heightPx: ch, sha256: sha };
  // Drop sizes the new master cannot fill at minimumDpi (they would be upscaled).
  const dropped = [];
  for (const [k, v] of Object.entries(art.variants || {})) {
    const a = v.asset, wIn = a?.imageWidthIn, hIn = a?.imageHeightIn;
    if (wIn && hIn && (cw / wIn < config.minimumDpi || ch / hIn < config.minimumDpi)) { delete art.variants[k]; dropped.push(k); }
  }
  if (!dry) await writeFile('catalog/prints.json', JSON.stringify(config, null, 2) + '\n');
  // Keep the master registries (tj/archive/older-work print masters) pointing at the new file.
  for (const reg of ['catalog/tj-print-masters.json', 'catalog/archive-print-masters.json', 'catalog/older-work-print-masters.json']) {
    const list = JSON.parse(await readFile(reg, 'utf8').catch(() => '[]')), row = Array.isArray(list) && list.find(r => r.id === product.id);
    if (!row) continue;
    if (row.sha256) row.sha256 = sha; if (row.local) row.local = `static/print-masters/${sha}.jpg`;
    if (!dry) await writeFile(reg, JSON.stringify(list, null, 2) + '\n');
  }
  console.log(`Print master ${old?.widthPx}x${old?.heightPx} -> ${cw}x${ch} (${sha}); dropped sizes: ${dropped.join(', ') || 'none'}.`);
  console.log(`Next: node scripts/build-edition-print-assets.mjs --only=${product.id}, requote, then commit + PR (print masters still live in the repo until Phase 3).`);
}
