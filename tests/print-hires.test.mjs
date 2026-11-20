import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import config from '../catalog/prints.json' with {type: 'json'};
import manifest from '../data/print-hires-manifest.json' with {type: 'json'};
import {printHiRes, printHiResManifest} from '../src/data/print-hires.mjs';
import {R2_PREFIXES, IMAGE_ORIGIN} from '../scripts/lib/image-keys.mjs';

const component = fs.readFileSync('src/components/PaintingImage.astro', 'utf8');
const viewer = fs.readFileSync('gallery/print-hires-viewer.js', 'utf8');
const productPage = fs.readFileSync('src/pages/products/[slug]/index.astro', 'utf8');

test('print-hires is a public tjm-images prefix and never aliases print masters', () => {
  assert.equal(R2_PREFIXES.includes('print-hires'), true);
  assert.equal(manifest.bucket, 'tjm-images');
  assert.equal(manifest.prefix, 'print-hires');
  assert.equal(manifest.origin, IMAGE_ORIGIN);
  assert.equal(manifest.longEdgeCap, 4000);
  assert.equal(manifest.watermark, 'tjm.art');
  assert.doesNotMatch(JSON.stringify(manifest), /print-masters/i);
});

test('every sellable print artwork has a watermarked preview at or under the 4000 px cap', () => {
  const files = new Map(manifest.files.map(file => [file.sha256, file]));
  const artworks = Object.entries(config.artworks);
  assert.equal(artworks.length > 0, true);
  assert.equal(manifest.files.length, new Set(artworks.map(([, art]) => art.source.sha256)).size);
  for (const [id, art] of artworks) {
    const preview = printHiRes(id);
    assert.ok(preview, id);
    assert.match(preview.src, /^https:\/\/img\.tjm\.art\/print-hires\/[a-f0-9]{64}-\d+w\.webp$/);
    assert.equal(preview.src.includes('print-masters'), false);
    assert.equal(preview.width <= 4000 && preview.height <= 4000, true, id);
    assert.equal(Math.max(preview.width, preview.height) >= 1, true, id);
    const file = files.get(art.source.sha256);
    assert.ok(file, id);
    assert.equal(file.artworkIds.includes(id), true);
    assert.equal(Math.max(file.widthPx, file.heightPx) <= 4000, true, id);
    const sourceLong = Math.max(art.source.widthPx, art.source.heightPx);
    assert.equal(file.meetsHiResFloor, sourceLong >= 3000, id);
    assert.equal(Math.max(file.widthPx, file.heightPx), Math.min(4000, sourceLong), id);
  }
  assert.equal(printHiResManifest().files.length, manifest.files.length);
  assert.equal(printHiRes('not-a-print-artwork'), null);
});

test('the product lightbox keeps the hi-res file out of the initial image src', () => {
  assert.match(component, /data-hires-src=\{hiResSrc/);
  assert.match(component, /<ArtworkImage src=\{full\}/);
  assert.match(component, /print-hires-viewer\.js/);
  assert.match(productPage, /printHiRes\(p\.id\)/);
  assert.match(productPage, /hiRes=\{hiRes\}/);
  // The dialog's visible <ArtworkImage> must start at the public display file, not hiResSrc.
  const dialog = component.slice(component.indexOf('<dialog'));
  assert.match(dialog, /<ArtworkImage src=\{full\}/);
  assert.doesNotMatch(dialog, /<ArtworkImage src=\{hiResSrc\}/);
  assert.match(component, /hiRes\?\.src && !\/print-masters\/i\.test\(hiRes\.src\)/);
  assert.doesNotMatch(component, /href=\{hiResSrc\}/);
  assert.doesNotMatch(component, /src=\{hiRes[^}]*print-masters/);
});

test('the viewer assigns the hi-res URL only after the lightbox opens', () => {
  assert.match(viewer, /addEventListener\('open-hires-viewer'/);
  assert.match(viewer, /function loadHiRes\(/);
  assert.match(viewer, /if \(!src \|\| loadedHiRes \|\| pendingSrc === src\) return;/);
  assert.match(viewer, /img\.src = src;/);
  assert.match(viewer, /\/print-masters\/i\.test\(src\)/);
  const loadStart = viewer.indexOf('function loadHiRes(');
  const openStart = viewer.indexOf("dialog.addEventListener('open-hires-viewer'");
  const loadCallAfterOpen = viewer.slice(openStart, openStart + 400);
  assert.match(loadCallAfterOpen, /if \(hiresSrc\(\)\) loadHiRes\(\);/);
  assert.equal(viewer.includes('img.src = src;'), true);
  assert.ok(loadStart > 0 && openStart > loadStart);
  // No top-level assignment of a hires URL at script start.
  const preamble = viewer.slice(0, loadStart);
  assert.doesNotMatch(preamble, /img\.src\s*=/);
  assert.match(viewer, /pointermove/);
  assert.match(viewer, /wheel/);
  assert.match(component, /touch-action: none/);
});
