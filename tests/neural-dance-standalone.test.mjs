import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {polish} from '../scripts/enrich-html-seo.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

function manifestLinks(html) {
  return [...html.matchAll(/<link\b[^>]*\brel=["']manifest["'][^>]*>/gi)].map((match) => match[0]);
}
function viewportTags(html) {
  return [...html.matchAll(/<meta\b[^>]*\bname=["']viewport["'][^>]*>/gi)].map((match) => match[0]);
}
function one(html, name) {
  return [...html.matchAll(new RegExp(`<meta\\b[^>]*\\bname=["']${name}["'][^>]*>`, 'gi'))].map((match) => match[0]);
}

const manifest = JSON.parse(read('static/neural-dance/manifest.webmanifest'));
const siteManifest = JSON.parse(read('static/site.webmanifest'));
// The Neural Dance fast path does not build dist/. The full gate leaves this unset.
const builtSite = process.env.NEURAL_DANCE_FAST !== '1';

test('Neural Dance manifest is standalone and its icons exist', () => {
  assert.equal(manifest.name, 'Neural Dance');
  assert.equal(manifest.short_name, 'Neural Dance');
  assert.equal(manifest.description, 'Live sound-reactive dancers and room projection by TJ Murphy.');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, '/neural-dance/');
  assert.equal(manifest.scope, '/neural-dance/');
  assert.equal(manifest.background_color, '#070a12');
  assert.equal(manifest.theme_color, '#070a12');
  assert.equal(siteManifest.display, 'browser');
  assert.ok(manifest.icons.length >= 1);
  for (const icon of manifest.icons) {
    assert.match(icon.src, /^\//);
    const file = icon.src.split('?')[0].replace(/^\//, '');
    assert.equal(siteManifest.icons.some((item) => item.src.split('?')[0] === icon.src.split('?')[0]), true, icon.src);
    assert.ok(fs.existsSync(path.join(root, 'static', file)), file);
    if (builtSite) assert.ok(fs.existsSync(path.join(root, 'dist', file)), `dist/${file}`);
  }
  if (builtSite) {
    const built = path.join(root, 'dist/neural-dance/manifest.webmanifest');
    assert.ok(fs.existsSync(built), 'dist manifest missing');
    assert.deepEqual(JSON.parse(fs.readFileSync(built, 'utf8')), manifest);
  }
});

test('standalone pages link the Neural Dance manifest once, and other pages keep the site manifest', () => {
  const layout = read('src/layouts/BaseLayout.astro');
  assert.match(layout, /manifestHref = '\/site\.webmanifest'/);
  assert.match(layout, /apple-mobile-web-app-capable/);
  assert.match(layout, /mobile-web-app-capable/);
  assert.match(layout, /apple-mobile-web-app-status-bar-style/);
  assert.match(layout, /content="black-translucent"/);
  assert.match(layout, /apple-mobile-web-app-title/);
  assert.match(layout, /apple-touch-icon/);
  assert.match(layout, /theme-color/);
  assert.match(layout, /#070a12/);
  assert.match(layout, /navigator\.standalone === true/);
  assert.match(layout, /display-mode: standalone/);
  assert.match(layout, /nd-standalone/);

  for (const page of ['src/pages/neural-dance/index.astro', 'src/pages/neural-dance/live/index.astro']) {
    const source = read(page);
    assert.equal(viewportTags(source).length, 1, page);
    assert.match(viewportTags(source)[0], /viewport-fit=cover/);
    assert.equal(manifestLinks(source).length, 0, `${page} should emit its manifest from BaseLayout`);
  }
  assert.match(read('src/pages/neural-dance/index.astro'), /manifestHref="\/neural-dance\/manifest\.webmanifest"/);
  assert.match(read('src/pages/neural-dance/live/index.astro'), /manifestHref="\/neural-dance\/live\/manifest\.webmanifest"/);
  const liveManifest = JSON.parse(read('static/neural-dance/live/manifest.webmanifest'));
  assert.equal(liveManifest.start_url, '/neural-dance/live/');
  assert.equal(liveManifest.scope, '/neural-dance/');
  assert.equal(liveManifest.display, 'standalone');
  assert.equal(liveManifest.background_color, manifest.background_color);
  assert.equal(liveManifest.theme_color, manifest.theme_color);
  assert.deepEqual(liveManifest.icons, manifest.icons);
  assert.doesNotMatch(read('src/pages/index.astro'), /neural-dance\/manifest\.webmanifest/);

  if (!builtSite) return;
  const builtManifests = {
    'dist/neural-dance/index.html': '/neural-dance/manifest.webmanifest',
    'dist/neural-dance/live/index.html': '/neural-dance/live/manifest.webmanifest'
  };
  for (const [built, href] of Object.entries(builtManifests)) {
    const html = read(built);
    const links = manifestLinks(html);
    assert.equal(links.length, 1, built);
    assert.match(links[0], new RegExp(`href="${href.replace(/\//g, '\\/')}"`));
    assert.doesNotMatch(html, /site\.webmanifest/);
    assert.equal(viewportTags(html).length, 1, built);
    assert.match(viewportTags(html)[0], /width=device-width/);
    assert.match(viewportTags(html)[0], /initial-scale=1/);
    assert.match(viewportTags(html)[0], /viewport-fit=cover/);
    for (const name of ['apple-mobile-web-app-capable', 'mobile-web-app-capable']) {
      const tags = one(html, name);
      assert.equal(tags.length, 1, `${built} ${name}`);
      assert.match(tags[0], /content="yes"/);
    }
    const bar = one(html, 'apple-mobile-web-app-status-bar-style');
    assert.equal(bar.length, 1, built);
    assert.match(bar[0], /content="black-translucent"/);
    const title = one(html, 'apple-mobile-web-app-title');
    assert.equal(title.length, 1, built);
    assert.match(title[0], /content="Neural Dance"/);
    const theme = one(html, 'theme-color');
    assert.equal(theme.length, 1, built);
    assert.match(theme[0], /content="#070a12"/);
    assert.match(html, /rel="apple-touch-icon"/);
    assert.match(html, /navigator\.standalone === true/);
    assert.match(html, /standalone\.css/);
    assert.match(html, /standalone\.js/);
  }

  const home = read('dist/index.html');
  const homeLinks = manifestLinks(home);
  assert.equal(homeLinks.length, 1);
  assert.match(homeLinks[0], /href="\/site\.webmanifest/);
  assert.doesNotMatch(home, /neural-dance\/manifest\.webmanifest/);
});

test('polish does not add a second manifest, and the manifest is not a Worker route', () => {
  const plain = polish('<html><head></head><body><main></main></body></html>');
  assert.equal(manifestLinks(plain).length, 1);
  assert.match(manifestLinks(plain)[0], /\/site\.webmanifest/);
  const neural = polish('<html><head><link rel="icon" href="/favicon.ico"><link rel="manifest" href="/neural-dance/manifest.webmanifest"></head><body><main></main></body></html>');
  assert.equal(manifestLinks(neural).length, 1);
  assert.match(manifestLinks(neural)[0], /\/neural-dance\/manifest\.webmanifest/);
  const manifestOnly = polish('<html><head><link rel="manifest" href="/neural-dance/manifest.webmanifest"></head><body></body></html>');
  assert.equal(manifestLinks(manifestOnly).length, 1);

  const headers = read('static/_headers');
  assert.match(headers, /\/neural-dance\/manifest\.webmanifest\r?\n {2}Content-Type: application\/manifest\+json/);
  assert.match(headers, /\/neural-dance\/live\/manifest\.webmanifest\r?\n {2}Content-Type: application\/manifest\+json/);
  if (builtSite) assert.equal(read('dist/_headers'), headers);
  const config = JSON.parse(read('wrangler.jsonc'));
  const patterns = config.assets.run_worker_first.map((pattern) => new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'));
  assert.equal(patterns.some((pattern) => pattern.test('/neural-dance/manifest.webmanifest')), false);
  assert.match(read('neural-dance/standalone.css'), /@media all and \(display-mode: standalone\)/);
  assert.match(read('neural-dance/standalone.css'), /html\.nd-standalone \.site-header/);
  assert.match(read('neural-dance/standalone.css'), /display:\s*none !important/);
  for (const edge of ['safe-area-inset-top', 'safe-area-inset-right', 'safe-area-inset-bottom', 'safe-area-inset-left']) {
    assert.match(read('neural-dance/standalone.css'), new RegExp(edge));
  }
  assert.match(read('neural-dance/standalone.js'), /nd-standalone/);
  assert.match(read('worker/site.mjs'), /neural-dance\/manifest\.webmanifest/);
});
