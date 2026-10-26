import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import manifest from '../catalog/wall-label-galleries.json' with {type:'json'};
import tags from '../catalog/painting-tags.json' with {type:'json'};
import bookGalleries from '../catalog/book-galleries.json' with {type:'json'};
import {urlFor} from '../catalog/catalog.mjs';
import {resolveWallLabelGalleries, wallLabelGalleries} from '../catalog/wall-label-galleries.mjs';

const ids = [
  'bitcoiners',
  'festival-burning-man',
  'bass-coast-sunrises',
  'temples',
  'renoirs-and-ridges',
  'father-paul',
  'bounty-of-satoshi',
  'ukraine',
  'small-watercolors',
  'attendees',
  'landscapes-by-size',
  'forest-triptych',
  'hummingbirds',
];
const tagged = (...names) => Object.entries(tags.assignments).filter(([, assigned]) => names.some(name => assigned.includes(name))).map(([id]) => id);

test('wall label galleries follow labels354 order and omit reiki', () => {
  assert.deepEqual(manifest.galleries.map(gallery => gallery.id), ids);
  assert.deepEqual(wallLabelGalleries.map(gallery => gallery.id), ids);
  assert.equal(manifest.omitted.map(entry => entry.id).join(), 'reiki');
  assert.equal(manifest.galleries.some(gallery => gallery.id === 'reiki'), false);
  assert.deepEqual(manifest.galleries.map(gallery => gallery.members.length), [16, 28, 4, 4, 16, 4, 3, 3, 10, 6, 9, 3, 2]);
});

test('festival and landscapes members are the painting-tag backfill', () => {
  const byId = Object.fromEntries(manifest.galleries.map(gallery => [gallery.id, gallery.members]));
  assert.deepEqual(byId['festival-burning-man'], tagged('burning-man', 'festival'));
  assert.deepEqual(byId['landscapes-by-size'], tagged('landscapes'));
  assert.match(manifest.memberResolution['festival-burning-man'], /burning-man/);
  assert.match(manifest.memberResolution['landscapes-by-size'], /landscapes/);
  for (const gallery of manifest.galleries) {
    assert.equal(new Set(gallery.members).size, gallery.members.length, gallery.id);
    assert.equal(fs.existsSync(`static${gallery.thumb}`), true, gallery.thumb);
    assert.equal(wallLabelGalleries.find(entry => entry.id === gallery.id).works.length, gallery.members.length);
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
  assert.equal(index('h1').text(), 'Galleries');
  assert.deepEqual(index('.wall-label-card a').map((_, link) => index(link).attr('href')).get(), ids.map(id => `/galleries/${id}/`));

  for (const gallery of wallLabelGalleries) {
    const page = load(fs.readFileSync(`dist/galleries/${gallery.id}/index.html`, 'utf8'));
    assert.equal(page('h1').text(), gallery.title);
    assert.equal(page('link[rel="canonical"]').attr('href'), `https://tjm.art/galleries/${gallery.id}/`);
    assert.deepEqual(page('.wall-label-works a').map((_, link) => page(link).attr('href')).get(), gallery.works.map(urlFor));
    assert.equal(page('.wall-label-works a[href^="/play"]').length, 0);
  }

  const selected = load(fs.readFileSync('dist/book-galleries/index.html', 'utf8'));
  assert.deepEqual(selected('#wall-labels .wall-label-card a').map((_, link) => selected(link).attr('href')).get(), ids.map(id => `/galleries/${id}/`));
});
