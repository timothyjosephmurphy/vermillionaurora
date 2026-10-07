import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { load } from 'cheerio';

const site = 'https://tjm.art';
const dist = resolve('dist');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const parse = html => {
  const $ = load(html);
  return {
    title: normalize($('title').text()),
    heading: normalize($('h1').text()),
    text: normalize($('main').text()),
    images: $('img').map((_, image) => $(image).attr('src')).get(),
  };
};
const storyPaths = html => {
  const $ = load(html);
  return [...new Set($('[data-static-story] a[href]').map((_, a) => {
    const url = new URL($(a).attr('href'), site);
    assert.equal(url.origin, site, 'Static story must link to this website');
    assert.match(url.pathname, /^\/blog\/[a-z0-9-]+\/$/, 'Expected a blog article route');
    return url.pathname;
  }).get())];
};

const paths = storyPaths(await readFile(resolve(dist, 'blog/index.html'), 'utf8'));
assert(paths.length, 'No static blog article links found in the built blog index');
const expected = new Map();
for (const path of paths) {
  const article = parse(await readFile(resolve(dist, '.' + path, 'index.html'), 'utf8'));
  assert(article.title && article.heading && article.text, path + ': article content missing');
  assert(article.images.length, path + ': article photos missing');
  expected.set(path, article);
}
console.log('PASS: built blog links resolve to complete articles: ' + paths.join(', '));

if (process.argv.includes('--live')) {
  async function request(url, options = {}) {
    const response = await fetch(url, { ...options, cache: 'no-store', signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 200, url + ': HTTP ' + response.status);
    return response;
  }
  let verified = false;
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      const indexResponse = await request(site + '/blog/');
      assert.match(indexResponse.headers.get('content-type') || '', /text\/html/);
      const livePaths = storyPaths(await indexResponse.text());
      for (const [path, article] of expected) {
        assert(livePaths.includes(path), 'Live blog card missing: ' + path);
        const response = await request(site + path);
        assert.match(response.headers.get('content-type') || '', /text\/html/);
        assert.deepEqual(parse(await response.text()), article, 'Live article differs from this build: ' + path);
      }
      const images = [...new Set([...expected.values()].flatMap(article => article.images))];
      for (let start = 0; start < images.length; start += 5) {
        await Promise.all(images.slice(start, start + 5).map(async src => {
          const url = new URL(src, site).href;
          const response = await request(url, { method: 'HEAD' });
          assert.match(response.headers.get('content-type') || '', /^image\//, url + ': not an image');
        }));
      }
      console.log('PASS: live blog cards open HTTP 200 articles matching this build; ' + images.length + ' photos accessible.');
      for (const path of paths) console.log('Verified ' + site + path);
      verified = true;
      break;
    } catch (error) {
      console.log('Live blog verification ' + attempt + '/30: ' + error.message);
      if (attempt < 30) await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  assert(verified, 'Production blog articles did not become ready');
}
