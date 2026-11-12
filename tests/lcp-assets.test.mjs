import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
import {eagerBlogHero} from '../scripts/blog-hero-lcp.mjs';
import {homeStripSources} from '../src/data/home-strip-image.mjs';
import {resolveHref} from '../scripts/hash-head-assets.mjs';

const root = path.resolve('.');
const read = (file) => readFileSync(path.join(root, file), 'utf8');

function blogArticles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (/^[a-z0-9-]+$/.test(entry.name) && existsSync(path.join(full, 'index.html'))) out.push(path.join(full, 'index.html'));
  }
  return out;
}

function slotPx(sizes, viewport) {
  const parts = String(sizes || '100vw').split(',').map(part => part.trim());
  for (const part of parts) {
    const maxPx = part.match(/\(max-width:\s*(\d+(?:\.\d+)?)px\)\s+(\d+(?:\.\d+)?)px/);
    if (maxPx && viewport <= Number(maxPx[1])) return Number(maxPx[2]);
    const maxVw = part.match(/\(max-width:\s*(\d+(?:\.\d+)?)px\)\s+(\d+(?:\.\d+)?)vw/);
    if (maxVw && viewport <= Number(maxVw[1])) return viewport * Number(maxVw[2]) / 100;
  }
  const last = parts.at(-1);
  const px = last.match(/(\d+(?:\.\d+)?)px/);
  if (px) return Number(px[1]);
  const vw = last.match(/(\d+(?:\.\d+)?)vw/);
  if (vw) return viewport * Number(vw[1]) / 100;
  return viewport;
}

function chosenUrl(img, viewport = 390, dpr = 2) {
  const src = img.attr('src') || '';
  const srcset = img.attr('srcset') || '';
  const candidates = [...srcset.matchAll(/(\S+)\s+(\d+)w/g)].map(match => ({url: match[1], w: Number(match[2])}));
  if (!candidates.length) return src;
  candidates.sort((a, b) => a.w - b.w);
  const target = slotPx(img.attr('sizes'), viewport) * dpr;
  return (candidates.find(candidate => candidate.w >= target) || candidates.at(-1)).url;
}

function localBytes(url) {
  if (!url || url.startsWith('data:')) return 0;
  const bare = url.replace(/^https:\/\/img\.tjm\.art/i, '').replace(/^https:\/\/(?:www\.)?tjm\.art/i, '').split(/[?#]/)[0];
  if (!bare.startsWith('/')) return null;
  for (const base of ['static', 'dist']) {
    const file = path.join(root, base, bare.slice(1));
    if (existsSync(file) && statSync(file).isFile()) return statSync(file).size;
  }
  return null;
}

const remoteBytes = new Map();
async function bytesFor(url) {
  const local = localBytes(url);
  if (local != null) return local;
  if (!/^https:\/\/(?:img\.tjm\.art|media\.vermillionaurora\.com)\//.test(url)) return null;
  if (remoteBytes.has(url)) return remoteBytes.get(url);
  const response = await fetch(url, {method: 'HEAD'});
  const length = response.ok ? Number(response.headers.get('content-length')) : NaN;
  const size = Number.isFinite(length) ? length : null;
  remoteBytes.set(url, size);
  return size;
}

test('the first blog image is eager and the rest stay lazy', () => {
  const sample = '<main><img src="/a.jpg" loading="lazy"><img src="/b.jpg"></main>';
  const once = eagerBlogHero(sample);
  const sampleDom = load(once);
  assert.equal(sampleDom('main img').first().attr('loading'), 'eager');
  assert.equal(sampleDom('main img').first().attr('fetchpriority'), 'high');
  assert.equal(sampleDom('main img').eq(1).attr('loading'), 'lazy');
  assert.equal(eagerBlogHero(once), once);
  const files = blogArticles(path.join(root, 'static/blog'));
  assert.ok(files.length >= 5);
  for (const file of files) {
    const $ = load(readFileSync(file, 'utf8'));
    const imgs = $('main img');
    if (!imgs.length) continue;
    assert.equal(imgs.first().attr('loading'), 'eager', file);
    assert.equal(imgs.first().attr('fetchpriority'), 'high', file);
    imgs.slice(1).each((index, el) => assert.equal($(el).attr('loading'), 'lazy', `${file} image ${index + 2}`));
  }
});

test('home strip thumbs avoid full JPEGs and full book scans', () => {
  const older = homeStripSources('https://tjm.art/display/older-work-bitcoin-voices-3.jpg');
  assert.equal(older.src, '/display/older-work-bitcoin-voices-3-480.webp');
  assert.match(older.avif, /older-work-bitcoin-voices-3-480\.avif/);
  assert.equal(localBytes(older.src) > 0 && localBytes(older.src) < 80_000, true);
  const book = homeStripSources('https://media.vermillionaurora.com/images/book-galleries/v1/ded6b759e667e3c2a313.webp');
  assert.equal(book.src, '/home-thumbs/book-ded6b759e667e3c2a313-480.webp');
  assert.ok(localBytes(book.src) < 80_000, book.src);
  assert.equal(homeStripSources('/gallery-images/couple-in-color.jpg'), null);
  assert.equal(resolveHref('/', 'styles.css'), '/styles.css');
  assert.equal(resolveHref('/', 'script.js'), '/script.js');
});

test('home and product source keep the LCP image eager and preconnect early', () => {
  const home = read('src/pages/index.astro');
  const product = read('src/layouts/ProductLayout.astro');
  const painting = read('src/components/PaintingImage.astro');
  assert.match(home, /rel="preconnect" href="https:\/\/img\.tjm\.art" crossorigin/);
  assert.match(home, /class="hero-slide is-active"[^>]*loading="eager"[^>]*fetchpriority="high"/);
  assert.match(home, /src="script\.js" defer/);
  assert.match(product, /rel="preconnect" href="https:\/\/img\.tjm\.art" crossorigin/);
  assert.match(painting, /loading="eager"[^>]*fetchpriority="high"/);
  assert.match(read('site-header.css'), /\.cart-count\{display:inline-flex/);
});

test('built home and product ship one hashed stylesheet, deferred scripts, and a small mobile image budget', async () => {
  if (!existsSync('dist/index.html')) return;
  const homeHtml = readFileSync('dist/index.html', 'utf8');
  const home = load(homeHtml);
  assert.ok(home('link[rel="preconnect"][href="https://img.tjm.art"]').length, 'home preconnect');
  const hero = home('.hero-slide.is-active');
  assert.equal(hero.attr('loading'), 'eager');
  assert.equal(hero.attr('fetchpriority'), 'high');
  const blocking = home('link[rel="stylesheet"]').filter((_, el) => {
    const media = home(el).attr('media');
    return !media || media === 'all';
  });
  assert.ok(blocking.length >= 1 && blocking.length <= 4, `blocking stylesheets: ${blocking.length}`);
  blocking.each((_, el) => assert.match(home(el).attr('href') || '', /^\/_astro\/[^"]+\.css$/));
  assert.doesNotMatch(homeHtml, /href="(?:\/)?styles\.css"/);
  assert.doesNotMatch(homeHtml, /href="\/fonts\/fonts\.css"/);
  assert.match(homeHtml, /media="print" onload="this\.media='all'"/);
  home('script[src]').each((_, el) => {
    const src = home(el).attr('src') || '';
    if (home(el).attr('type') === 'module' || /^https?:/.test(src)) return;
    assert.ok(home(el).attr('defer') !== undefined, src);
    if (/\.js$/.test(src) && !src.includes('/_astro/')) assert.match(src, /^\/_astro\//, src);
  });

  const productFile = 'dist/products/strawberry-point-11/index.html';
  assert.ok(existsSync(productFile));
  const product = load(readFileSync(productFile, 'utf8'));
  assert.ok(product('link[rel="preconnect"][href="https://img.tjm.art"]').length);
  const lcp = product('.painting-image-trigger img').first();
  assert.equal(lcp.attr('loading') || 'eager', 'eager');
  assert.notEqual(lcp.attr('loading'), 'lazy');
  assert.equal(lcp.attr('fetchpriority'), 'high');
  assert.match(product('link[rel="stylesheet"][media="print"]').attr('href') || '', /^\/_astro\/cart-[a-f0-9]+\.css$/);

  const blog = load(readFileSync('dist/blog/walk-my-paintings-3d-gallery/index.html', 'utf8'));
  assert.equal(blog('main img').first().attr('loading'), 'eager');
  assert.equal(blog('main img').first().attr('fetchpriority'), 'high');
  blog('main img').slice(1).each((_, el) => assert.equal(blog(el).attr('loading'), 'lazy'));

  let budget = 0;
  const urls = new Set();
  home('img').each((_, el) => {
    const img = home(el);
    const src = img.attr('src') || '';
    const srcset = img.attr('srcset') || '';
    assert.doesNotMatch(`${src} ${srcset}`, /older-work-[a-z0-9-]+\.jpg/);
    assert.doesNotMatch(`${src} ${srcset}`, /\/images\/book-galleries\/v1\/[a-f0-9]+\.webp/);
    const lazy = img.attr('loading') === 'lazy';
    const counted = !lazy || img.closest('#book-galleries').length > 0;
    const url = chosenUrl(img);
    for (const candidate of [src, ...[...srcset.matchAll(/(\S+)\s+\d+w/g)].map(match => match[1])]) {
      if (candidate && !candidate.startsWith('data:')) urls.add(candidate);
    }
    if (counted && url) urls.add(`budget:${url}`);
  });
  const missing = [];
  for (const entry of urls) {
    const counted = entry.startsWith('budget:');
    const url = counted ? entry.slice('budget:'.length) : entry;
    const size = await bytesFor(url);
    if (size == null) missing.push(url);
    else if (counted) budget += size;
  }
  assert.deepEqual([...new Set(missing)], [], 'every home image URL should return 200 from the site build or the image host');
  assert.ok(budget < 1.5 * 1024 * 1024, `mobile home image budget ${budget} bytes`);
  console.log(`mobile home image budget ${budget} bytes`);
});
