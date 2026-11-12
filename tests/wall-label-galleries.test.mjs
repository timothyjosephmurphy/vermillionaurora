import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import manifest from '../catalog/wall-label-galleries.json' with {type:'json'};
import tags from '../catalog/painting-tags.json' with {type:'json'};
import bookGalleries from '../catalog/book-galleries.json' with {type:'json'};
import {byId, urlFor} from '../catalog/catalog.mjs';
import {twinGroups} from '../catalog/related-works.mjs';
import {galleryHero} from '../src/data/gallery-hero.mjs';
import {olderWorkGalleryTiles} from '../src/data/older-work-gallery.mjs';
import {canonicalArtwork, sectionArtworkIds} from '../src/data/canonical-artworks.mjs';
import {resolveWallLabelGalleries, wallLabelGalleries} from '../catalog/wall-label-galleries.mjs';

const ids = [
  'festival-burning-man',
  'father-paul',
  'bounty-of-satoshi',
  'ukraine',
  'small-watercolors',
  'landscapes-by-size',
];
const folded = {
  temples: 'festival-burning-man',
  'bass-coast-sunrises': 'festival-burning-man',
  attendees: 'bitcoiners',
  'renoirs-and-ridges': 'small-watercolors',
  'forest-triptych': 'landscapes-by-size',
  hummingbirds: 'older-work',
  bitcoiners: 'watercolor-portraits-bitcoiners',
};
const bitcoinersHref = '/book-galleries/watercolor-portraits-bitcoiners/';
const tagged = (...names) => Object.entries(tags.assignments).filter(([, assigned]) => names.some(name => assigned.includes(name))).map(([id]) => id);
const galleryById = id => manifest.galleries.find(gallery => gallery.id === id);

test('wall label galleries follow labels354 order, omit reiki, and fold #751', () => {
  assert.deepEqual(manifest.galleries.map(gallery => gallery.id), ids);
  assert.deepEqual(wallLabelGalleries.map(gallery => gallery.id), ids);
  assert.equal(manifest.omitted.map(entry => entry.id).join(), 'reiki');
  assert.equal(manifest.galleries.some(gallery => gallery.id === 'reiki'), false);
  assert.deepEqual(manifest.galleries.map(gallery => [gallery.id, gallery.title, gallery.members.length]), [
    ['festival-burning-man', 'Festivals', 21],
    ['father-paul', 'Father Paul', 4],
    ['bounty-of-satoshi', 'Bounty of Satoshi', 3],
    ['ukraine', 'Ukraine', 3],
    ['small-watercolors', 'Small Watercolors', 26],
    ['landscapes-by-size', 'Landscapes', 11],
  ]);
  assert.deepEqual(manifest.folded.map(entry => [entry.id, entry.into]), Object.entries(folded));
  assert.deepEqual(galleryById('bounty-of-satoshi').members, [
    'archived-painting-img-1612',
    'painting-phoenix-rising',
    'painting-festival-portrait',
  ]);
});

test('festival and landscapes members keep the tag backfill, with #751 folds and twin dedupe', () => {
  const festivals = galleryById('festival-burning-man').members;
  const landscapes = galleryById('landscapes-by-size').members;
  const group = twinGroups();
  const taggedFestivals = tagged('burning-man', 'festival');
  for (const id of festivals) assert.ok(taggedFestivals.includes(id), id);
  for (const id of taggedFestivals) {
    assert.ok(festivals.some(member => group(member) === group(id)), `${id} missing from Festivals`);
  }
  assert.ok(festivals.includes('burning-man-temple-2022-daytime'));
  assert.equal(festivals.includes('archived-painting-19'), false);
  assert.ok(festivals.includes('archived-painting-20'));
  const bassTwins = ['archived-painting-433', 'archived-painting-436', 'archived-painting-437', 'archived-painting-438', 'book-art-9a4b9331f62350fa36fc', 'book-art-c198f09bc8ddad18ed1e'];
  assert.deepEqual(bassTwins.filter(id => festivals.includes(id)), ['archived-painting-438']);
  assert.equal(festivals.includes('book-art-67cc9a4d5823eca2182e'), false);
  assert.ok(festivals.includes('archived-painting-22'));

  const taggedLandscapes = tagged('landscapes');
  assert.deepEqual(landscapes.filter(id => id === 'rice-paddies-in-vietnam' || id === 'book-art-9f6386bac0e6198f6661'), ['rice-paddies-in-vietnam']);
  for (const id of taggedLandscapes) {
    if (id === 'book-art-9f6386bac0e6198f6661') continue;
    assert.ok(landscapes.includes(id), id);
  }
  for (const id of ['older-work-forest-triptych-original-1', 'older-work-forest-triptych-original-2', 'older-work-forest-triptych-original-3']) {
    assert.ok(landscapes.includes(id), id);
  }
  assert.equal(manifest.galleries.some(gallery => gallery.id === 'bitcoiners'), false);
  assert.ok(manifest.folded.find(entry => entry.id === 'bitcoiners').members.includes('book-art-044d157c01c7bb07eeab'));
  assert.ok(galleryById('small-watercolors').members.includes('painting-portrait-with-hat'));
  assert.match(manifest.memberResolution['festival-burning-man'], /burning-man/);
  assert.match(manifest.memberResolution['landscapes-by-size'], /rice-paddies-in-vietnam/);
  assert.match(manifest.memberResolution['older-work'], /Hummingbird Friend/);
  const hummingbirds = manifest.folded.find(entry => entry.id === 'hummingbirds');
  assert.equal(hummingbirds.href, '/gallery/older-work/');
  assert.deepEqual(hummingbirds.members, ['book-art-b7a9cd259d8ac51a236b', 'older-work-hummingbird-feeder-190']);
  assert.notEqual(twinGroups()('book-art-b7a9cd259d8ac51a236b'), twinGroups()('older-work-hummingbird-feeder-190'));
  const olderIds = olderWorkGalleryTiles().map(tile => tile.id);
  assert.equal(olderIds.filter(id => id === 'older-work-hummingbird-feeder-190').length, 1);
  assert.equal(olderIds[olderIds.indexOf('older-work-hummingbird-feeder-190') - 1], 'book-art-b7a9cd259d8ac51a236b');
  for (const gallery of manifest.galleries) {
    assert.equal(new Set(gallery.members).size, gallery.members.length, gallery.id);
    assert.ok(gallery.members.includes(gallery.hero), gallery.id);
    assert.equal(fs.existsSync(`static${gallery.thumb}`), true, gallery.thumb);
    assert.equal(byId[gallery.hero].image.src.length > 0, true, gallery.hero);
    assert.equal(wallLabelGalleries.find(entry => entry.id === gallery.id).works.length, gallery.members.length);
    assert.equal(galleryHero(wallLabelGalleries.find(entry => entry.id === gallery.id)).id, gallery.hero);
  }
});

test('folded gallery URLs redirect to the surviving gallery', () => {
  const rules = fs.readFileSync('static/_redirects', 'utf8');
  for (const entry of manifest.folded) {
    const to = entry.href || `/galleries/${entry.into}/`;
    assert.equal(folded[entry.id], entry.into);
    assert.ok(rules.includes(`/galleries/${entry.id} ${to} 301\n`), entry.id);
    assert.ok(rules.includes(`/galleries/${entry.id}/ ${to} 301\n`), `${entry.id}/`);
  }
});

test('missing catalog ids are skipped without dropping the gallery', () => {
  const warnings = [];
  const [gallery] = resolveWallLabelGalleries(
    [{id:'sample', title:'Sample', members:['not-in-catalog', 'painting-phoenix-rising', 'also-missing']}],
    {'painting-phoenix-rising':{id:'painting-phoenix-rising', title:'Phoenix'}},
    message => warnings.push(message),
  );
  assert.deepEqual(gallery.works.map(product => product.id), ['painting-phoenix-rising']);
  assert.deepEqual(gallery.skipped, ['not-in-catalog', 'also-missing']);
  assert.equal(warnings.length, 2);
});

test('landing pages and the homepage carousel list every wall label gallery', () => {
  const home = load(fs.readFileSync('dist/index.html', 'utf8'));
  const hrefs = home('.book-section-carousel .ex-slide > a').map((_, link) => home(link).attr('href')).get();
  const bookHrefs = bookGalleries.sections.map(section => `/book-galleries/${section.id}/`);
  assert.deepEqual(hrefs.slice(0, bookHrefs.length), bookHrefs);
  assert.deepEqual(hrefs.slice(bookHrefs.length, bookHrefs.length + ids.length), ids.map(id => `/galleries/${id}/`));
  assert.deepEqual(hrefs.slice(-2), ['/gallery/archived/', '/gallery/older-work/']);
  assert.equal(home('.book-section-carousel a[href="/galleries/reiki/"]').length, 0);
  assert.equal(home('.book-section-carousel .ex-position').text(), `1 / ${hrefs.length}`);

  const index = load(fs.readFileSync('dist/galleries/index.html', 'utf8'));
  const selected = load(fs.readFileSync('dist/book-galleries/index.html', 'utf8'));
  assert.equal(index('h1').text(), 'Galleries');
  assert.deepEqual(index('.wall-label-card a').map((_, link) => index(link).attr('href')).get(), ids.map(id => `/galleries/${id}/`));

  for (const gallery of wallLabelGalleries) {
    const page = load(fs.readFileSync(`dist/galleries/${gallery.id}/index.html`, 'utf8'));
    const hero = galleryHero(gallery);
    const shown = img => img.attr('data-image-src') || img.attr('src');
    assert.equal(page('h1').text().replace(/\s+/g, ' ').trim(), gallery.title);
    assert.equal(page('h1').hasClass('wall-label-page-title'), true, gallery.id);
    assert.equal(page('.wall-label-mark').attr('alt'), '');
    assert.equal(page('.wall-label-mark').attr('src'), gallery.thumb);
    assert.equal(shown(page('.wall-label-hero img')), hero.image.src);
    assert.notEqual(shown(page('.wall-label-hero img')), gallery.thumb);
    assert.equal(page('link[rel="canonical"]').attr('href'), `https://tjm.art/galleries/${gallery.id}/`);
    assert.deepEqual(page('.wall-label-works a').map((_, link) => page(link).attr('href')).get(), gallery.works.map(urlFor));
    assert.equal(page('.wall-label-works a[href^="/play"]').length, 0);
  }
  const shown = img => img.attr('data-image-src') || img.attr('src');
  assert.equal(home('.book-section-carousel a[href="/galleries/bass-coast-sunrises/"]').length, 0);
  assert.equal(home('.book-section-carousel a[href="/galleries/temples/"]').length, 0);
  assert.equal(home('.book-section-carousel a[href="/galleries/hummingbirds/"]').length, 0);
  assert.equal(home('.book-section-carousel a[href="/galleries/bitcoiners/"]').length, 0);
  assert.equal(home('.book-section-carousel a[href="/book-galleries/watercolor-portraits-bitcoiners/"]').length, 1);
  assert.equal(home('.book-section-carousel a[href="/book-galleries/watercolor-portraits-bitcoiners/"] h3').text(), 'Bitcoiners');
  assert.match(home('.book-section-carousel a[href="/book-galleries/watercolor-portraits-bitcoiners/"]').text(), /46 works/);
  assert.equal(index('a[href="/galleries/attendees/"]').length, 0);
  assert.equal(index('a[href="/galleries/hummingbirds/"]').length, 0);
  assert.equal(index('a[href="/galleries/bitcoiners/"]').length, 0);
  assert.equal(selected('#wall-labels a[href="/galleries/renoirs-and-ridges/"]').length, 0);
  assert.equal(selected('#wall-labels a[href="/galleries/hummingbirds/"]').length, 0);
  assert.equal(selected('#wall-labels a[href="/galleries/bitcoiners/"]').length, 0);
  assert.equal(selected('.book-gallery-carousel-grid a[href="/book-galleries/watercolor-portraits-bitcoiners/"]').length, 1);
  assert.equal(selected('a[href="/book-galleries/watercolor-portraits-bitcoiners/"]').length, 1);
  const older = load(fs.readFileSync('dist/gallery/older-work/index.html', 'utf8'));
  const olderIds = older('.older-work-grid > li').map((_, item) => older(item).attr('data-product-id')).get();
  assert.equal(olderIds.filter(id => id === 'older-work-hummingbird-feeder-190').length, 1);
  assert.equal(olderIds.filter(id => id === 'book-art-b7a9cd259d8ac51a236b').length, 1);
  assert.equal(older(`a[href="/products/book-art-b7a9cd259d8ac51a236b/"]`).length, 1);
  assert.equal(older(`a[href="/products/older-work-hummingbird-feeder-190/"]`).length, 1);
  assert.equal(selected('#wall-labels a[href="/galleries/festival-burning-man/"] h3').text(), 'Festivals');
  assert.equal(selected('#wall-labels a[href="/galleries/landscapes-by-size/"] h3').text(), 'Landscapes');
  assert.equal(shown(selected('#wall-labels a[href="/galleries/landscapes-by-size/"] img')), galleryHero(wallLabelGalleries.find(gallery => gallery.id === 'landscapes-by-size')).image.src);
  assert.deepEqual(selected('#wall-labels .wall-label-card a').map((_, link) => selected(link).attr('href')).get(), ids.map(id => `/galleries/${id}/`));
  assert.match(selected('.book-gallery-carousel-grid a[href="/book-galleries/watercolor-portraits-bitcoiners/"]').text(), /46 works/);
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  assert.match(sitemap, /https:\/\/tjm\.art\/book-galleries\/watercolor-portraits-bitcoiners\//);
  assert.doesNotMatch(sitemap, /https:\/\/tjm\.art\/galleries\/bitcoiners\/?/);
});

test('the Bitcoiners book chapter is the one gallery and keeps prices', () => {
  const foldedBitcoiners = manifest.folded.find(entry => entry.id === 'bitcoiners');
  const attendees = manifest.folded.find(entry => entry.id === 'attendees');
  assert.equal(foldedBitcoiners.href, bitcoinersHref);
  assert.equal(attendees.href, bitcoinersHref);
  assert.equal(foldedBitcoiners.members.length, 22);
  const section = bookGalleries.sections.find(group => group.id === 'watercolor-portraits-bitcoiners');
  const shown = sectionArtworkIds(section);
  assert.equal(shown.length, 46);
  assert.equal(new Set(shown).size, shown.length);
  for (const id of foldedBitcoiners.members) assert.ok(shown.includes(canonicalArtwork[id] || id), id);
  const prices = {
    'book-art-e4bbfe556c3c847d9c90': ['1000.00', 'available', 'Nick Szabo @NickSzabo4'],
    'book-art-0735a5fb0eb1c613b658': ['1000.00', 'available', 'Michael Saylor @saylor'],
    'book-art-7a498f39e7a66a2e8eb5': ['200.00', 'available', 'Nico @BITVOLT'],
    'older-work-bitcoin-voices-original-4': ['250.00', 'available', 'TJ Michael Saylor'],
    'older-work-fernandez-moran-pysh-original-2': ['200.00', 'available', 'TJ Nico Moran 345'],
  };
  for (const [id, [amount, status, title]] of Object.entries(prices)) {
    assert.equal(shown.filter(member => member === id).length, 1, id);
    assert.equal(byId[id].listing.price.amount, amount, id);
    assert.equal(byId[id].listing.status, status, id);
    assert.equal(byId[id].title, title, id);
  }
  for (const id of ['book-art-e4bbfe556c3c847d9c90', 'book-art-0735a5fb0eb1c613b658', 'book-art-7a498f39e7a66a2e8eb5', 'older-work-bitcoin-voices-original-4']) {
    assert.ok(tags.assignments[id].includes('bitcoiners'), id);
  }
  assert.equal(tags.assignments['older-work-fernandez-moran-pysh-original-2'], undefined);
  const page = load(fs.readFileSync('dist/book-galleries/watercolor-portraits-bitcoiners/index.html', 'utf8'));
  assert.equal(page('link[rel="canonical"]').attr('href'), `https://tjm.art${bitcoinersHref}`);
  assert.deepEqual(page('.painting-list-row').map((_, row) => page(row).attr('data-product-id')).get(), shown);
  assert.match(page('[data-product-id="book-art-e4bbfe556c3c847d9c90"] .painting-list-price').text(), /Original · \$1,000/);
  assert.match(page('[data-product-id="book-art-0735a5fb0eb1c613b658"] .painting-list-price').text(), /Original · \$1,000/);
  assert.match(page('[data-product-id="book-art-7a498f39e7a66a2e8eb5"] .painting-list-price').text(), /Original · \$200/);
  assert.match(page('[data-product-id="older-work-bitcoin-voices-original-4"] .painting-list-price').text(), /Original · \$250/);
  assert.match(page('[data-product-id="older-work-fernandez-moran-pysh-original-2"] .painting-list-price').text(), /Original · \$200/);
});
