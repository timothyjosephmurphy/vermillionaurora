import test from 'node:test';
import assert from 'node:assert/strict';
import {rewriteR2ImageUrls} from '../scripts/r2-image-urls.mjs';
import {IMAGE_ORIGIN} from '../scripts/lib/image-keys.mjs';

test('rewrites /display/ in normal attributes and in HTML-escaped JSON data attributes', () => {
  const hero = `<div class="hero-slideshow" data-hero-slides="[&quot;/display/el-zonte-at-dawn-2026-b6bb92e78d-1600.webp&quot;,&quot;/display/el-zonte-before-dawn-71f9a2ec15-1600.webp&quot;]"></div>`;
  const {text, count} = rewriteR2ImageUrls(hero);
  assert.equal(count, 2);
  assert.match(text, new RegExp(`&quot;${IMAGE_ORIGIN}/display/el-zonte-at-dawn-2026-b6bb92e78d-1600\\.webp`));
  assert.match(text, new RegExp(`&quot;${IMAGE_ORIGIN}/display/el-zonte-before-dawn-71f9a2ec15-1600\\.webp`));
  assert.doesNotMatch(text, /&quot;\/display\//);
});

test('rewrites srcset and CSS url() but leaves data-image-src on the catalog path', () => {
  const html = `<img src="/display/esperanza-hero-aba277665d-1134.webp" srcset="/display/esperanza-hero-aba277665d-1134.webp 1134w">`;
  const {text, count} = rewriteR2ImageUrls(html);
  assert.ok(count >= 2);
  assert.match(text, /data-image-src="\/display\/esperanza-hero-aba277665d-1134\.webp"/);
  assert.match(text, new RegExp(`src="${IMAGE_ORIGIN}/display/esperanza-hero-aba277665d-1134\\.webp"`));
  assert.match(text, new RegExp(`srcset="${IMAGE_ORIGIN}/display/esperanza-hero-aba277665d-1134\\.webp 1134w"`));
  const css = rewriteR2ImageUrls(`.hero{background:url(/display/foo-160.webp)}`).text;
  assert.match(css, new RegExp(`url\\(${IMAGE_ORIGIN}/display/foo-160\\.webp\\)`));
});
