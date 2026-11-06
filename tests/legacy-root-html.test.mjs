import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function htmlRoutes(dir) {
  const routes = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, {withFileTypes: true})) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) routes.push(path.relative(dir, full).split(path.sep).join('/'));
    }
  }
  walk(dir);
  return routes.sort();
}

test('the obsolete public_html bundle is gone and root pages stay in Astro', () => {
  assert.equal(fs.existsSync('public_html'), false);
  const rootHtml = fs.readdirSync('.').filter(name => name.endsWith('.html'));
  assert.deepEqual(rootHtml, []);
  const copy = fs.readFileSync('scripts/copy-assets.mjs', 'utf8');
  assert.doesNotMatch(copy, /public_html/);
  assert.match(fs.readFileSync('src/pages/index.astro', 'utf8'), /<html/);
  for (const kept of ['styles.css', 'script.js', 'site-header.js', 'home-hero.js']) {
    assert.equal(fs.existsSync(kept), true, kept);
  }
});

test('built routes still include every page shipped before the public_html removal', () => {
  assert.equal(fs.existsSync('dist/index.html'), true, 'Run npm run build first');
  const expected = fs.readFileSync('tests/fixtures/dist-routes.txt', 'utf8').trim().split('\n').filter(Boolean);
  const built = new Set(htmlRoutes('dist'));
  const missing = expected.filter(route => !built.has(route));
  assert.deepEqual(missing, [], `routes missing from dist: ${missing.slice(0, 20).join(', ')}`);
  assert.equal(built.has('public_html/index.html'), false);
  assert.equal(built.has('index.html'), true);
});
