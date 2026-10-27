import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {artworkAlt} from '../src/data/artwork-alt.mjs';
import {avifSrcset} from '../src/data/avif-srcset.mjs';
import {collectionPage, studio} from '../src/data/structured-data.mjs';
import {byId} from '../catalog/catalog.mjs';

test('artwork alt names the medium, year and artist when the catalog has them', () => {
  const painting = byId['honeybadger-and-cub-with-genesis-block'];
  const alt = artworkAlt(painting);
  assert.match(alt, /Honeybadger and Cub with Genesis Block/);
  assert.match(alt, /Watercolor pastel/);
  assert.match(alt, /2026/);
  assert.match(alt, /by TJ Murphy/);
  assert.notEqual(alt, painting.image.alt);
});

test('AVIF srcset keeps only display files that exist', () => {
  const present = avifSrcset('/display/strawberry-point-12-36e436a0-480.webp 480w, /display/strawberry-point-12-36e436a0-960.webp 960w');
  assert.match(present, /strawberry-point-12-36e436a0-480\.avif 480w/);
  assert.match(present, /strawberry-point-12-36e436a0-960\.avif 960w/);
  assert.equal(avifSrcset('/display/strawberry-point-1-480.webp 480w'), '');
  assert.equal(avifSrcset('/display/archived-painting-1-480.webp 480w'), '');
});

test('gallery listing JSON-LD is a collection with breadcrumbs and no LLC', () => {
  const data = collectionPage({
    name: 'Available paintings',
    url: 'https://tjm.art/gallery/available/',
    crumbs: [{name: 'Home', url: 'https://tjm.art/'}],
    items: [{name: 'Hope', url: 'https://tjm.art/products/hope/'}]
  });
  assert.equal(data['@graph'].find(node => node['@type'] === 'ItemList').numberOfItems, 1);
  assert.equal(data['@graph'].find(node => node['@type'] === 'BreadcrumbList').itemListElement[0].name, 'Home');
  assert.equal(studio.name, 'Vermillion Aurora Productions');
  assert.doesNotMatch(JSON.stringify(data) + studio.name, /LLC/);
});

test('film page uses the June 5 2026 premiere, a hosted poster and the studio signup', () => {
  const html = fs.readFileSync('src/pages/film.astro', 'utf8');
  assert.match(html, /uploadDate:'2026-06-05'/);
  assert.match(html, /coined-in-watercolor-at-festival\.jpeg/);
  assert.doesNotMatch(html, /i\.ytimg\.com/);
  assert.match(html, /EmailSignup/);
  assert.match(html, /publisher:studio/);
  assert.doesNotMatch(html, /LLC/);
});

test('shop and book galleries use the descriptive artwork alt', () => {
  assert.match(fs.readFileSync('src/pages/gallery/available.astro', 'utf8'), /alt=\{artworkAlt\(product\)\}/);
  assert.match(fs.readFileSync('src/pages/book-galleries/[section].astro', 'utf8'), /alt=\{artworkAlt\(original\|\|product\)\}/);
  assert.match(fs.readFileSync('src/pages/galleries/[id].astro', 'utf8'), /alt=\{artworkAlt\(hero\)\}/);
  assert.match(fs.readFileSync('src/pages/galleries/[id].astro', 'utf8'), /alt=""/);
});

test('release gate and production deploy retry a failed install once', () => {
  for (const file of ['.github/workflows/release-gate.yml', '.github/workflows/deploy-production.yml']) {
    const yml = fs.readFileSync(file, 'utf8');
    assert.match(yml, /until npm ci/, file);
    assert.match(yml, /retrying once/, file);
  }
  const gate = fs.readFileSync('.github/workflows/release-gate.yml', 'utf8');
  assert.match(gate, /until npx playwright install --only-shell chromium/);
  assert.match(gate, /until npx playwright install --with-deps webkit/);
});
