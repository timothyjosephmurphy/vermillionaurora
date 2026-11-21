// Every file committed under the R2-backed static prefixes must exist at https://img.tjm.art.
// Built pages rewrite those paths to the R2 origin, so a file that is only in git shows as a
// broken picture (the Nov 2026 gallery-wall book-art thumbs, the people walkthrough atlas, and
// the 1600px walk-206 court photo were in this repo but missing from the bucket).
// Upload missing objects with: node scripts/sync-images-r2.mjs
// (needs R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY) or:
// wrangler r2 object put tjm-images/<key> --file=static/<key> --remote --content-type=image/webp
// Skip this live HEAD check with SKIP_R2_LIVE_CHECK=1 when working offline.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
import path from 'node:path';
import {IMAGE_ORIGIN, R2_PREFIXES} from '../scripts/lib/image-keys.mjs';

const CONCURRENCY = 8;
const UA = 'tjm.art r2-image-presence test';

function listKeys(prefix) {
  const root = path.join('static', prefix);
  let entries;
  try { entries = readdirSync(root, {recursive: true, withFileTypes: true}); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
  return entries.filter(e => e.isFile() && !e.name.startsWith('.')).map(e => {
    const dir = e.parentPath ?? e.path;
    const rel = path.relative(root, dir).split(path.sep).join('/');
    return (rel && rel !== '.' ? `${prefix}/${rel}/${e.name}` : `${prefix}/${e.name}`).replace(/\/{2,}/g, '/');
  });
}

async function sleep(ms) { await new Promise(r => setTimeout(r, ms)); }

async function head(url) {
  let last = {url, status: 0, type: '', error: 'no attempt'};
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, {method: 'HEAD', headers: {'user-agent': UA}, redirect: 'manual', signal: AbortSignal.timeout(20000)});
      last = {url, status: res.status, type: res.headers.get('content-type') || ''};
      if (res.status === 200 || (res.status >= 400 && res.status < 500 && res.status !== 429)) return last;
    } catch (e) {
      last = {url, status: 0, type: '', error: e.cause?.message || e.message};
    }
    await sleep(250 * (i + 1));
  }
  return last;
}

async function mapLimit(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({length: Math.min(n, items.length)}, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }));
  return out;
}

test('committed R2-backed images are present on img.tjm.art', {concurrency: 1}, async t => {
  if (process.env.SKIP_R2_LIVE_CHECK === '1') {
    t.skip('SKIP_R2_LIVE_CHECK=1');
    return;
  }
  const keys = R2_PREFIXES.flatMap(listKeys).sort();
  assert.ok(keys.length > 100, `expected a full image tree, found ${keys.length}`);
  const results = await mapLimit(keys, CONCURRENCY, key => head(`${IMAGE_ORIGIN}/${key}`));
  const missing = results.filter(r => r.status !== 200);
  const wrongType = results.filter(r => r.status === 200 && r.type && !/image|video|octet-stream|application\/pdf/i.test(r.type));
  assert.deepEqual(missing.map(r => `${r.status || 'ERR'} ${r.error || r.type} ${r.url}`), [], `${missing.length} committed file(s) missing from ${IMAGE_ORIGIN}. Upload with node scripts/sync-images-r2.mjs`);
  assert.deepEqual(wrongType.map(r => `${r.type} ${r.url}`), [], 'R2 object returned a non-image type');
});
