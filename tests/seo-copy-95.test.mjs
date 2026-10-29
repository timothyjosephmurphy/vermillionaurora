import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { byId } from '../catalog/catalog.mjs';
import { productCrumb } from '../src/data/product-crumb.mjs';
import { playReturn } from '../src/data/play-return.mjs';
import { GALLERY_3D_LABEL, GALLERY_3D_URL } from '../src/data/gallery-entry.mjs';

const HOME_TITLE = 'TJ Murphy | Original Watercolor Paintings &amp; Prints, Seattle';
const HOME_DESCRIPTION = 'Original watercolor pastel paintings and fine-art prints of Pacific Northwest landscapes, travels and portraits by Seattle artist TJ Murphy. Originals from $75, prints from $25, commissions from $100.';

test('home title and meta description are the buyer SEO copy', () => {
  const html = fs.readFileSync('src/pages/index.astro', 'utf8');
  assert.ok(html.includes(`<title>${HOME_TITLE}</title>`));
  assert.ok(html.includes(`<meta name="description" content="${HOME_DESCRIPTION}">`));
  assert.equal(html.includes('Seattle Watercolor Artist'), false);
});

test('available originals name Available Paintings; sold originals stay on Gallery', () => {
  for (const id of ['hope-the-vermillion-aurora', 'meditation-at-denny-blaine']) {
    assert.deepEqual(productCrumb(byId[id]), { href: '/gallery/available/', name: 'Available Paintings' });
  }
  assert.deepEqual(productCrumb(byId['painting-golden-coast']), { href: '/gallery/', name: 'Gallery' });
  assert.equal(productCrumb(byId['archived-painting-193']).name, 'Archived Paintings');
  assert.equal(productCrumb(byId['older-work-shore-figures']).name, 'Older Work');
  assert.equal(productCrumb(byId['paul-murphy-painting-1']).name, 'Paul Murphy');
  assert.equal(productCrumb(byId['strawberry-point-1']).name, 'Strawberry Point Backpacking Trip');
  const book = productCrumb(byId['book-art-c33709aeb2717b0c53de']);
  assert.equal(book.name, 'Friends');
  assert.match(book.href, /^\/book-galleries\//);
});

test('product pages render the crumb and room-shot alts without emptying the main image', () => {
  const page = fs.readFileSync('src/pages/products/[slug]/index.astro', 'utf8');
  assert.match(page, /productCrumb\(p\)/);
  assert.match(page, /\{crumb\.name\}/);
  const thumbs = fs.readFileSync('src/components/PaintingImage.astro', 'utf8');
  assert.match(thumbs, /alt="" loading="lazy" decoding="async"/);
  assert.match(thumbs, /alt=\{g\.alt\}/);
  const layout = fs.readFileSync('src/layouts/ProductLayout.astro', 'utf8');
  assert.match(layout, /BreadcrumbList/);
  assert.match(layout, /VisualArtwork/);
});

test('home wall-label cards use a painting hero; the page title stays a small mosaic mark', () => {
  const home = fs.readFileSync('src/components/BookGalleryCarousel.astro', 'utf8');
  assert.match(home, /alt=\{artworkAlt\(hero\)\}/);
  assert.doesNotMatch(home, /studio wall label/);
  assert.match(fs.readFileSync('src/pages/index.astro', 'utf8'), /aria-hidden="true"/);
  const landing = fs.readFileSync('src/pages/galleries/[id].astro', 'utf8');
  assert.match(landing, /class="wall-label-page-title"/);
  assert.match(landing, /class="wall-label-mark"/);
  assert.match(landing, /alt=\{artworkAlt\(hero\)\}/);
  assert.match(landing, /studio wall label/);
});

test('/play shell title and start-screen H1 use gallery wording', () => {
  const shell = fs.readFileSync('static/play/index.html', 'utf8');
  assert.match(shell, /<title>Walk-Through 3D Gallery \| TJ Murphy Paintings<\/title>/);
  const frame = fs.readFileSync('static/play/g/play/index.html', 'utf8');
  assert.match(frame, /<h1>TJM Gallery<\/h1>/);
  assert.doesNotMatch(frame, /<h1>TJM GALLERY<\/h1>/);
  const manifest = JSON.parse(fs.readFileSync('static/play/manifest.webmanifest', 'utf8'));
  assert.equal(manifest.name, 'TJM Gallery');
  assert.equal(manifest.short_name, 'TJM Gallery');
});

test('dungeon wording is gone from buyer return chips; 3D gallery returns use the hex soft-point (studio-tracker #771)', () => {
  const hex = { show: true, label: '← Back to 3D gallery', href: GALLERY_3D_URL };
  const previewId = new URL(GALLERY_3D_URL).hostname.split('.')[0];
  const hidden = { show: false, label: '← Back to the gallery', href: '/gallery/' };
  assert.equal(previewId, 'preview-251');
  assert.deepEqual(playReturn({ search: '?from=tags' }), hex);
  assert.deepEqual(playReturn({ search: `?from=${previewId}` }), hex);
  assert.deepEqual(playReturn({ search: '?from=tags', playState: true, referrer: 'https://tjm.art/play/' }), hex);
  assert.deepEqual(playReturn({ search: '?from=play', playState: true }), hex);
  assert.deepEqual(playReturn({ search: '?from=play' }), hex);
  assert.deepEqual(playReturn({ referrer: 'https://tjm.art/play/orsay/' }), hex);
  assert.deepEqual(playReturn({ playState: true }), hex);
  assert.deepEqual(playReturn({ referrer: 'https://preview-251.tjm-tag-gallery-preview.pages.dev/play/' }), hex);
  assert.deepEqual(playReturn({ referrer: 'https://preview-251.tjm-tag-gallery-preview.pages.dev/' }), hex);
  assert.deepEqual(playReturn({ referrer: 'https://tjm.art/gallery/' }), hidden);
  assert.deepEqual(playReturn({ search: '?from=home' }), hidden);
  for (const visit of [{ search: '?from=tags' }, { search: '?from=play' }, { playState: true }, { referrer: 'https://tjm.art/play/' }]) {
    assert.equal(playReturn(visit).href, GALLERY_3D_URL);
    assert.notEqual(playReturn(visit).href, '/play/?resume=1');
  }
  const layout = fs.readFileSync('src/layouts/ProductLayout.astro', 'utf8');
  assert.match(layout, /← Back to the gallery/);
  assert.doesNotMatch(layout, /Dungeon/);
  const cart = fs.readFileSync('src/pages/cart/index.astro', 'utf8');
  assert.match(cart, /← Back to the gallery/);
  assert.doesNotMatch(cart, /Dungeon/);
  const header = fs.readFileSync('src/components/SiteHeader.astro', 'utf8');
  assert.ok(header.includes(`href="${GALLERY_3D_URL}">${GALLERY_3D_LABEL}`));
  assert.doesNotMatch(header, /dungeon/i);
  for (const file of ['src/pages/index.astro', 'src/components/GalleryRoomCard.astro']) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /GALLERY_3D_URL/, file);
    assert.match(html, /GALLERY_3D_LABEL/, file);
    assert.doesNotMatch(html, /dungeon/i, file);
    assert.doesNotMatch(html, /href="\/play\/"/, file);
  }
  for (const post of ['static/blog/my-week-in-art-oct-11-17-2026/index.html', 'static/blog/3d-gallery-to-relay-gate/index.html', 'static/blog/el-salvador-sunrises-sunsets/index.html']) {
    const html = fs.readFileSync(post, 'utf8');
    assert.match(html, new RegExp(GALLERY_3D_LABEL), post);
    assert.doesNotMatch(html, /step into the dungeon|take me to the dungeon/i, post);
  }
});

test('blog index drops placeholder jargon and the week post matches the Older Work count', () => {
  const blog = fs.readFileSync('src/pages/blog/index.astro', 'utf8');
  assert.match(blog, /New stories every week or so/);
  assert.match(blog, /Loading stories…/);
  assert.doesNotMatch(blog, /when they go out on Nostr/);
  assert.doesNotMatch(blog, /Checking for the latest story/);
  const week = fs.readFileSync('static/blog/my-week-in-art-oct-11-17-2026/index.html', 'utf8');
  assert.match(week, /with 64 paintings/);
  assert.doesNotMatch(week, /hero carousel/);
  assert.doesNotMatch(week, /with 65 paintings/);
});
