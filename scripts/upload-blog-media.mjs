import { readFile } from 'node:fs/promises';
import { createHash, randomBytes } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';

const assetDirectory = process.argv[2];
const specs = JSON.parse(await readFile('scripts/blog-media-upload/manifest.json', 'utf8'));
const api = 'https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-blog-media-upload';
const token = `${Date.now() + 30 * 60000}.${randomBytes(32).toString('hex')}`;
const headers = { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };

try {
  const secret = await fetch(`${api}/secrets`, { method: 'PUT', headers, body: JSON.stringify({ name: 'BLOG_MEDIA_UPLOAD_TOKEN', text: token, type: 'secret_text' }) });
  assert(secret.ok, 'Could not install short-lived upload credential');

  let cursor = 0;
  let uploaded = 0;
  async function uploadNext() {
    while (cursor < specs.length) {
      const spec = specs[cursor++];
      const bytes = await readFile(path.join(assetDirectory, spec.file));
      assert.equal(bytes.length, spec.size);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), spec.sha256);
      const response = await fetch(`https://vermillion-blog-media-upload.timothyjosephmurphy.workers.dev/${spec.key}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': spec.contentType },
        body: bytes,
        signal: AbortSignal.timeout(90000),
      });
      if (!response.ok) throw new Error(`R2 upload failed for ${spec.key}: ${response.status} ${await response.text()}`);
      const result = await response.json();
      assert.equal(result.sha256, spec.sha256);
      uploaded += 1;
    }
  }

  const results = await Promise.allSettled([uploadNext(), uploadNext(), uploadNext(), uploadNext()]);
  for (const result of results) if (result.status === 'rejected') throw result.reason;

  cursor = 0;
  async function verifyNext() {
    while (cursor < specs.length) {
      const spec = specs[cursor++];
      const response = await fetch(`https://media.vermillionaurora.com/${spec.key}`, { signal: AbortSignal.timeout(90000) });
      assert(response.ok, `Public image unavailable: ${spec.key}`);
      assert.equal(createHash('sha256').update(new Uint8Array(await response.arrayBuffer())).digest('hex'), spec.sha256);
    }
  }
  const checks = await Promise.allSettled([verifyNext(), verifyNext(), verifyNext(), verifyNext()]);
  for (const check of checks) if (check.status === 'rejected') throw check.reason;
  console.log(`PASS: ${uploaded} blog photos uploaded and hash-verified through the public media domain.`);
} finally {
  const response = await fetch(`${api}/secrets/BLOG_MEDIA_UPLOAD_TOKEN`, { method: 'DELETE', headers });
  assert(response.ok, 'Temporary uploader credential cleanup failed');
}
