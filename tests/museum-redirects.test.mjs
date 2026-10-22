import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { MUSEUM_REDIRECTS, museumRedirect, museumRedirectsFile } from '../worker/museum-redirects.mjs';

test('every old museum project redirects every path, keeping the query', () => {
  for (const [project, target] of Object.entries(MUSEUM_REDIRECTS)) {
    for (const path of ['/', '/index.html', '/art/x.jpg', '/some/deep/path/?a=1']) {
      const r = museumRedirect(`https://${project}.pages.dev${path}`);
      assert.equal(r.status, 301);
      assert.equal(r.location, `https://tjm.art${target}${new URL(`https://x${path}`).search}`);
    }
    assert.equal(museumRedirect(`https://${project}.pages.dev/?pick=a,b`).location, `https://tjm.art${target}?pick=a,b`);
  }
});
test('to-cart.html keeps working: lands on the tjm.art copy with its query', () => {
  const r = museumRedirect('https://tjm-play-bilbao.pages.dev/to-cart.html?add=a,b');
  assert.equal(r.location, 'https://tjm.art/play/to-cart.html?add=a,b');
  assert.ok(existsSync('static/play/to-cart.html'));
});
test('other hosts are untouched (tjm.art, other pages.dev projects, Chase\'s Montreal)', () => {
  for (const u of ['https://tjm.art/play/', 'https://tjm-play.pages.dev/', 'https://tjm-play-montreal.pages.dev/', 'https://tjm-play-orsay.example.com/']) assert.equal(museumRedirect(u), null);
});
test('destinations are real deep links in the one-app shell, and exactly four projects', () => {
  assert.deepEqual(Object.keys(MUSEUM_REDIRECTS).sort(), ['tjm-play-bilbao', 'tjm-play-gugg-ny', 'tjm-play-orsay', 'tjm-play-uffizi']);
  for (const target of Object.values(MUSEUM_REDIRECTS)) assert.ok(existsSync(`static${target}index.html`), target);
});
test('committed _redirects files match the generator and put to-cart before the catch-all', () => {
  for (const project of Object.keys(MUSEUM_REDIRECTS)) {
    const text = readFileSync(`redirects/museum-pagesdev/${project}/_redirects`, 'utf8');
    assert.equal(text, museumRedirectsFile(project));
    const rules = text.split('\n').filter((l) => l && !l.startsWith('#'));
    assert.equal(rules.length, 2);
    assert.ok(rules[0].startsWith('/to-cart.html ') && rules[1].startsWith('/* '));
    assert.ok(rules.every((r) => r.endsWith(' 301')));
  }
});
