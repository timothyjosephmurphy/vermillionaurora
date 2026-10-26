// Upload the blog media this branch adds to the tjm-images bucket (https://img.tjm.art).
// --write-manifest reads repo paths on stdin and writes scripts/blog-media-upload/manifest.tjm.json.
// --upload puts those objects through the temporary Worker and checks the public SHA-256.
// Objects that are already public with the same hash are left in place. Different bytes are refused.
import { readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash, randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { MAX_BYTES, contentType, keyAllowed, objectKey } from './blog-media-upload/keys.mjs';

export const manifestPath = 'scripts/blog-media-upload/manifest.tjm.json';
export const workerName = 'vermillion-blog-publish-upload';
const account = '3c1fddf0f4f4fc9c84594757d2e1bda0';
const api = `https://api.cloudflare.com/client/v4/accounts/${account}/workers/scripts/${workerName}`;
const origin = 'https://img.tjm.art';

export function manifestDocument(specs) {
  const body = specs.map(({ file, key, size, sha256, contentType: type }) => ({ file, key, size, sha256, contentType: type }));
  return `${JSON.stringify(body, null, 2)}\n`;
}

export async function specsFor(files) {
  const specs = [];
  const seen = new Set();
  for (const file of files) {
    const key = objectKey(file);
    if (!key || !keyAllowed(key)) throw new Error(`Not a blog media file: ${file}`);
    if (seen.has(key)) throw new Error(`Duplicate blog media key: ${key}`);
    seen.add(key);
    const bytes = await readFile(file);
    if (bytes.length === 0) throw new Error(`Refusing empty file: ${file}`);
    if (bytes.length > MAX_BYTES) throw new Error(`${file} is ${bytes.length} bytes; the uploader allows ${MAX_BYTES}`);
    const type = contentType(key);
    if (!type) throw new Error(`No content type for ${key}`);
    specs.push({ file, key, size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), contentType: type });
  }
  return specs;
}

export function decideUpload(status, hash, spec) {
  if (status === 200 && hash === spec.sha256) return 'skip';
  if (status === 200) return 'conflict';
  if (status === 404) return 'put';
  return 'retry';
}

async function writeManifest(files) {
  const specs = await specsFor(files);
  await writeFile(manifestPath, manifestDocument(specs));
  if (!specs.length) console.log('No blog media to upload.');
  else console.log(`Wrote ${specs.length} object${specs.length === 1 ? '' : 's'} to ${manifestPath}`);
  for (const spec of specs) console.log(`  ${spec.key}`);
}

async function uploadAll() {
  const specs = JSON.parse(await readFile(manifestPath, 'utf8'));
  assert(Array.isArray(specs), 'Blog media manifest is not a list');
  for (const spec of specs) {
    assert(keyAllowed(spec.key), `Manifest key is not allowed: ${spec.key}`);
    assert.equal(objectKey(spec.file), spec.key, `Manifest path does not match key: ${spec.file}`);
  }
  if (!specs.length) {
    console.log('No blog media to upload.');
    return;
  }
  const token = `${Date.now() + 30 * 60000}.${randomBytes(32).toString('hex')}`;
  const headers = { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };
  let secretInstalled = false;
  try {
    const secret = await fetch(`${api}/secrets`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: 'BLOG_MEDIA_UPLOAD_TOKEN', text: token, type: 'secret_text' }),
    });
    assert(secret.ok, 'Could not install short-lived upload credential');
    secretInstalled = true;

    let cursor = 0;
    let uploaded = 0;
    let skipped = 0;
    async function uploadNext() {
      while (cursor < specs.length) {
        const spec = specs[cursor++];
        const bytes = await readFile(spec.file);
        assert.equal(bytes.length, spec.size);
        assert.equal(createHash('sha256').update(bytes).digest('hex'), spec.sha256);
        const decision = await publicState(spec, { allowMissing: true });
        if (decision === 'skip') {
          skipped += 1;
          continue;
        }
        assert.equal(decision, 'put', `Public object differs and will not be overwritten: ${spec.key}`);
        let stored = false;
        for (let attempt = 0; attempt < 6; attempt += 1) {
          const response = await fetch(`https://${workerName}.timothyjosephmurphy.workers.dev/${spec.key}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': spec.contentType },
            body: bytes,
            signal: AbortSignal.timeout(90000),
          });
          if (response.ok) {
            const result = await response.json();
            assert.equal(result.sha256, spec.sha256);
            stored = true;
            break;
          }
          const detail = await response.text();
          if (response.status === 409) break;
          if (![404, 429, 500, 502, 503, 504].includes(response.status) || attempt === 5) {
            throw new Error(`R2 upload failed for ${spec.key}: ${response.status} ${detail}`);
          }
          await new Promise((resolve) => setTimeout(resolve, 3000 * (attempt + 1)));
        }
        assert(stored || (await publicState(spec, { allowMissing: false })) === 'skip', `Upload failed: ${spec.key}`);
        uploaded += 1;
      }
    }
    const results = await Promise.allSettled([uploadNext(), uploadNext(), uploadNext(), uploadNext()]);
    for (const result of results) if (result.status === 'rejected') throw result.reason;

    cursor = 0;
    async function verifyNext() {
      while (cursor < specs.length) {
        const spec = specs[cursor++];
        assert.equal(await publicState(spec, { allowMissing: false }), 'skip', `Public image unavailable or different: ${spec.key}`);
      }
    }
    const checks = await Promise.allSettled([verifyNext(), verifyNext(), verifyNext(), verifyNext()]);
    for (const check of checks) if (check.status === 'rejected') throw check.reason;
    console.log(`PASS: ${uploaded} uploaded, ${skipped} already public, ${specs.length} hash-verified at ${origin}.`);
  } finally {
    if (!secretInstalled) return;
    const response = await fetch(`${api}/secrets/BLOG_MEDIA_UPLOAD_TOKEN`, { method: 'DELETE', headers });
    assert(response.ok || response.status === 404, 'Temporary uploader credential cleanup failed');
  }
}

async function publicState(spec, { allowMissing }) {
  const url = `${origin}/${spec.key}`;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(90000) });
    if (response.status === 404) {
      if (allowMissing) return 'put';
    } else if (response.ok) {
      const hash = createHash('sha256').update(new Uint8Array(await response.arrayBuffer())).digest('hex');
      const decision = decideUpload(200, hash, spec);
      if (decision === 'conflict') throw new Error(`Public object differs and will not be overwritten: ${url}`);
      return decision;
    }
    if (attempt === 5) throw new Error(`Public media check failed for ${url}: HTTP ${response.status === 404 ? 404 : response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 3000 * (attempt + 1)));
  }
  return 'retry';
}

async function main() {
  const write = process.argv.includes('--write-manifest');
  const upload = process.argv.includes('--upload');
  if (write === upload) {
    console.error('Use exactly one of --write-manifest or --upload');
    process.exit(1);
  }
  if (upload) {
    await uploadAll();
    return;
  }
  const files = readFileSync(0, 'utf8').split('\n').map((line) => line.trim()).filter(Boolean);
  await writeManifest(files);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
