import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync('src/pages/exhibitions/3d-gallery/index.astro', 'utf8');
const home = fs.readFileSync('src/pages/index.astro', 'utf8');
const index = fs.readFileSync('src/pages/exhibitions/index.astro', 'utf8');

test('the 3D gallery landing page is indexable and points at the exterior shot', () => {
  assert.match(page, /<html lang="en">/);
  assert.match(page, /const title = 'Walk-Through 3D Gallery \| TJ Murphy'/);
  assert.match(page, /<title>\{title\}<\/title>/);
  assert.match(page, /name="description" content=\{description\}/);
  assert.match(page, /Walk TJ Murphy’s 3D gallery/);
  assert.match(page, /rel="canonical" href=\{pageUrl\}/);
  assert.match(page, /const pageUrl = 'https:\/\/tjm\.art\/exhibitions\/3d-gallery\/'/);
  assert.equal(/noindex/i.test(page), false);
  assert.match(page, /property="og:image"/);
  assert.match(page, /exterior\.webp/);
  assert.match(page, /property="og:image:alt"/);
  assert.match(page, /'@type': 'WebPage'/);
});

test('the enter control is a portal into the live gallery and respects reduced motion', () => {
  assert.match(page, /href=\{GALLERY_3D_URL\}/);
  assert.match(page, /class="portal-core">Enter the gallery</);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(page, /event\.metaKey \|\| event\.ctrlKey/);
  assert.match(page, /location\.href = link\.href/);
});

test('the exhibitions carousel tile opens the landing page with a 16:9 thumbnail', () => {
  assert.match(home, /aria-label="9 of 10"><a href="\/exhibitions\/3d-gallery\/">/);
  assert.doesNotMatch(home, /GalleryRoomCard|The Gallery Room/);
  assert.match(home, /src="\/exhibitions\/3d-gallery\/images\/thumb\.webp" alt="The domed 3D gallery from the lawn, with the courtyard fountain and the Kinoteka tower" loading="lazy"/);
  assert.doesNotMatch(home, /3d-gallery\/images\/thumb\.webp" width=/);
  assert.match(home, /<h3>Walk-Through 3D Gallery<\/h3>/);
  assert.match(home, /1 \/ 10/);
  assert.equal(fs.existsSync('src/components/GalleryRoomCard.astro'), false);
  assert.match(fs.readFileSync('src/components/PrintWallCard.astro', 'utf8'), /aria-label="10 of 10"/);
  assert.match(index, /href="\/exhibitions\/3d-gallery\/"/);
});

test('each still has a caption and the page keeps the public stories and the pay line', () => {
  assert.match(page, /You can walk this gallery in a browser/);
  assert.match(page, /class="shot-caption"/);
  assert.match(page, /href="\/products\/sunrise-on-rainier-from-denny-blaine\/"/);
  assert.match(page, /href="\/products\/honeybadger-and-cub-with-genesis-block\/"/);
  assert.match(page, /href="\/products\/painting-insect-garden\/"/);
  assert.match(page, /href="\/neural-dance\/"/);
  assert.match(page, /\$\{GALLERY_3D_URL\}\?room=neural-dance/);
  assert.match(page, /Pay with Bitcoin \/ Lightning \(BTCPay\) or card\./);
  assert.doesNotMatch(page, /\$\d/);
});

test('gallery stills are WebP files at the exhibition image path', () => {
  assert.match(page, /loading="lazy"/);
  assert.match(page, /alt=\{shot\.alt\}/);
  for (const name of ['exterior.webp', 'thumb.webp', 'rotunda.webp', 'round-room.webp', 'green-room.webp', 'patio-arch.webp', 'portrait-salon.webp', 'sunset-studies.webp', 'wide-hall.webp', 'kinoteka.webp']) {
    const file = `exhibitions/3d-gallery/images/${name}`;
    const bytes = fs.readFileSync(file);
    assert.ok(bytes.length > 8000, name);
    assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', name);
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', name);
  }
});
