import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { contentType, keyAllowed, objectKey, MAX_BYTES } from '../scripts/blog-media-upload/keys.mjs';
import { changedArticleSlugs } from '../scripts/verify-blog-pages.mjs';
import { decideUpload, manifestDocument, specsFor } from '../scripts/publish-blog-media.mjs';

test('blog media keys stay inside display, social, and blog/<slug>/', () => {
  assert.equal(objectKey('static/display/live-looping-pedalboard-b4f9ce5363-960.webp'), 'display/live-looping-pedalboard-b4f9ce5363-960.webp');
  assert.equal(objectKey('static/social/live-looping-guitar-b4f9ce5363.jpg'), 'social/live-looping-guitar-b4f9ce5363.jpg');
  assert.equal(
    objectKey('scripts/blog-media-upload/publish-assets/live-looping-guitar/clip.mp4'),
    'blog/live-looping-guitar/clip.mp4',
  );
  for (const file of [
    'static/blog/live-looping-guitar/index.html',
    'static/display/../social/x.jpg',
    'scripts/blog-media-upload/worker.mjs',
    'scripts/blog-media-upload/worker-tjm.mjs',
    'scripts/blog-media-upload/assets/001.jpg',
    'cloudflare/wrangler.jsonc',
    'static/display/Photo.WEBP',
  ]) {
    assert.equal(objectKey(file), null, file);
  }
  assert.equal(keyAllowed('display/live-looping-pedalboard-b4f9ce5363-960.webp'), true);
  assert.equal(keyAllowed('blog/live-looping-guitar/clip.mp4'), true);
  assert.equal(keyAllowed('images/blog/bitcoin-film-festival/001.jpg'), false);
  assert.equal(keyAllowed('display/../x.webp'), false);
  assert.equal(contentType('blog/live-looping-guitar/clip.mp4'), 'video/mp4');
  assert.equal(MAX_BYTES, 90_000_000);
});

test('changed article slugs come only from static story HTML', () => {
  assert.deepEqual(changedArticleSlugs([
    'static/blog/live-looping-guitar/index.html',
    'src/pages/blog/index.astro',
    'static/blog/Live/index.html',
    'static/display/x.webp',
  ]), ['live-looping-guitar']);
});

test('upload decisions never replace a different public object', () => {
  const spec = { sha256: 'abc' };
  assert.equal(decideUpload(200, 'abc', spec), 'skip');
  assert.equal(decideUpload(200, 'def', spec), 'conflict');
  assert.equal(decideUpload(404, '', spec), 'put');
  assert.equal(decideUpload(500, '', spec), 'retry');
});

test('specs hash the committed file and reject everything else', async () => {
  const dir = 'scripts/blog-media-upload/publish-assets/ci-fixture';
  await mkdir(dir, { recursive: true });
  try {
    await writeFile(`${dir}/a.jpg`, Buffer.from('hello'));
    const specs = await specsFor([`${dir}/a.jpg`]);
    assert.equal(specs[0].key, 'blog/ci-fixture/a.jpg');
    assert.equal(specs[0].contentType, 'image/jpeg');
    assert.equal(specs[0].size, 5);
    assert.equal(specs[0].sha256, createHash('sha256').update('hello').digest('hex'));
    assert.equal(manifestDocument(specs).includes('"key": "blog/ci-fixture/a.jpg"'), true);
    await assert.rejects(() => specsFor([`${dir}/a.jpg`, `${dir}/a.jpg`]), /Duplicate/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
  await assert.rejects(() => specsFor(['static/blog/example/index.html']), /Not a blog media file/);
  await assert.rejects(() => specsFor(['scripts/blog-media-upload/worker-tjm.mjs']), /Not a blog media file/);
});

test('publish workflow is manual and uploads only through the tjm-images worker', () => {
  const yml = readFileSync(new URL('../.github/workflows/publish-blog.yml', import.meta.url), 'utf8');
  assert.match(yml, /workflow_dispatch:/);
  assert.equal(/^\s*pull_request:/m.test(yml), false);
  assert.match(yml, /wrangler\.tjm\.jsonc/);
  assert.match(yml, /vermillion-blog-publish-upload/);
  assert.match(yml, /CLOUDFLARE_BOOK_MEDIA_API_TOKEN/);
});

test('write-manifest refuses non-media paths and leaves the manifest', async () => {
  const before = await readFile('scripts/blog-media-upload/manifest.tjm.json', 'utf8');
  const result = spawnSync(process.execPath, ['scripts/publish-blog-media.mjs', '--write-manifest'], {
    input: 'static/blog/example/index.html\n',
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(`${result.stderr}`, /Not a blog media file/);
  assert.equal(await readFile('scripts/blog-media-upload/manifest.tjm.json', 'utf8'), before);
});
