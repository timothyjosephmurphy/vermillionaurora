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
import {resolveWallLabelGalleries, wallLabelGalleries} from '../catalog/wall-label-galleries.mjs';

const ids = [
  'bitcoiners',
  'festival-burning-man',
  'father-paul',
  'bounty-of-satoshi',
  'ukraine',
  'small-watercolors',
  'landscapes-by-size',
  'hummingbirds',
];
const folded = {
  temples: 'festival-burning-man',
  'bass-coast-sunrises': 'festival-burning-man',
  attendees: 'bitcoiners',
  'renoirs-and-ridges': 'small-watercolors',
  'forest-triptych': 'landscapes-by-size',
};
const tagged = (...names) => Object.entries(tags.assignments).filter(([, assigned]) => names.some(name => assigned.includes(name))).map(([id]) => id);
const galleryById = id => manifest.galleries.find(gallery => gallery.id === id);

test('wall label galleries follow labels354 order, omit reiki, and fold #751', () => {
  assert.deepEqual(manifest.galleries.map(gallery => gallery.id), ids);
  assert.deepEqual(wallLabelGalleries.map(gallery => gallery.id), ids);
  assert.equal(manifest.omitted.map(entry => entry.id).join(), 'reiki');
  assert.equal(manifest.galleries.some(gallery => gallery.id === 'reiki'), false);
  assert.deepEqual(manifest.galleries.map(gallery => [gallery.id, gallery.title, gallery.members.length]), [
    ['bitcoiners', 'Bitcoiners', 22],
    ['festival-burning-man', 'Festivals', 21],
    ['father-paul', 'Father Paul', 4],
    ['bounty-of-satoshi', 'Bounty of Satoshi', 3],
    ['ukraine', 'Ukraine', 3],
    ['small-watercolors', 'Small Watercolors', 26],
    ['landscapes-by-size', 'Landscapes', 11],
    ['hummingbirds', 'Hummingbirds', 2],
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
  assert.ok(galleryById('bitcoiners').members.includes('book-art-044d157c01c7bb07eeab'));
  assert.ok(galleryById('small-watercolors').members.includes('painting-portrait-with-hat'));
  assert.match(manifest.memberResolution['festival-burning-man'], /burning-man/);
  assert.match(manifest.memberResolution['landscapes-by-size'], /rice-paddies-in-vietnam/);
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
  for (const [from, to] of Object.entries(folded)) {
    assert.ok(rules.includes(`/galleries/${from} /galleries/${to}/ 301\n`), from);
    assert.ok(rules.includes(`/galleries/${from}/ /galleries/${to}/ 301\n`), `${from}/`);
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
  const bitcoiners = wallLabelGalleries.find(gallery => gallery.id === 'bitcoiners');
  assert.equal(shown(home('.book-section-carousel a[href="/galleries/bitcoiners/"] img')), galleryHero(bitcoiners).image.src);
  assert.equal(home('.book-section-carousel a[href="/galleries/bass-coast-sunrises/"]').length, 0);
  assert.equal(home('.book-section-carousel a[href="/galleries/temples/"]').length, 0);
  assert.equal(index('a[href="/galleries/attendees/"]').length, 0);
  assert.equal(selected('#wall-labels a[href="/galleries/renoirs-and-ridges/"]').length, 0);
  assert.equal(selected('#wall-labels a[href="/galleries/festival-burning-man/"] h3').text(), 'Festivals');
  assert.equal(selected('#wall-labels a[href="/galleries/landscapes-by-size/"] h3').text(), 'Landscapes');
  assert.equal(shown(selected('#wall-labels a[href="/galleries/landscapes-by-size/"] img')), galleryHero(wallLabelGalleries.find(gallery => gallery.id === 'landscapes-by-size')).image.src);
  assert.deepEqual(selected('#wall-labels .wall-label-card a').map((_, link) => selected(link).attr('href')).get(), ids.map(id => `/galleries/${id}/`));
});
