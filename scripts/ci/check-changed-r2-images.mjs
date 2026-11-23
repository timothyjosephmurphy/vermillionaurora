// HEAD-check only the R2-backed images this change set adds or updates.
// Used by the blog gate so a story PR does not scan the whole bucket.
// Keys: static/<prefix>/... under R2_PREFIXES, and
// scripts/blog-media-upload/publish-assets/<slug>/<file> -> blog/<slug>/<file>.
// Skip the live check with SKIP_R2_LIVE_CHECK=1 when working offline.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {IMAGE_ORIGIN, R2_PREFIXES} from '../lib/image-keys.mjs';

const MEDIA = /\.(?:jpe?g|png|webp|gif|avif|svg|mp4|webm)$/i;
const PUBLISH_ASSETS = /^scripts\/blog-media-upload\/publish-assets\/([^/]+)\/(.+)$/;

export function r2KeysFromChangedFiles(files) {
  const keys = [];
  for (const raw of files) {
    const file = String(raw).trim();
    if (!file || !MEDIA.test(file)) continue;
    const published = file.match(PUBLISH_ASSETS);
    if (published) {
      keys.push(`blog/${published[1]}/${published[2]}`);
      continue;
    }
    if (!file.startsWith('static/')) continue;
    const rest = file.slice('static/'.length);
    if (R2_PREFIXES.some((prefix) => rest === prefix || rest.startsWith(prefix + '/'))) {
      keys.push(rest);
    }
  }
  return [...new Set(keys)];
}

function changedFilesFromEnv(env = process.env) {
  return String(env.CHANGED_FILES || '').split('\n').map((s) => s.trim()).filter(Boolean);
}

async function head(url) {
  let last = {url, status: 0, type: '', error: 'no attempt'};
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        headers: {'user-agent': 'tjm.art r2-changed-image check'},
        redirect: 'manual',
        signal: AbortSignal.timeout(20000),
      });
      last = {url, status: res.status, type: res.headers.get('content-type') || ''};
      if (res.status === 200 || (res.status >= 400 && res.status < 500 && res.status !== 429)) return last;
    } catch (e) {
      last = {url, status: 0, type: '', error: e.cause?.message || e.message};
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * (i + 1)));
  }
  return last;
}

export async function checkChangedR2Images(files, env = process.env) {
  const keys = r2KeysFromChangedFiles(files);
  if (!keys.length) {
    console.log('PASS: no new or changed R2-backed images in this change set');
    return {keys, missing: [], wrongType: []};
  }
  if (env.SKIP_R2_LIVE_CHECK === '1') {
    console.log('SKIP: SKIP_R2_LIVE_CHECK=1; would have checked ' + keys.join(', '));
    return {keys, missing: [], wrongType: [], skipped: true};
  }
  const results = [];
  for (const key of keys) results.push(await head(`${IMAGE_ORIGIN}/${key}`));
  const missing = results.filter((r) => r.status !== 200);
  const wrongType = results.filter((r) => r.status === 200 && r.type && !/image|video|octet-stream|application\/pdf/i.test(r.type));
  if (missing.length || wrongType.length) {
    const lines = [
      ...missing.map((r) => `${r.status || 'ERR'} ${r.error || r.type} ${r.url}`),
      ...wrongType.map((r) => `${r.type} ${r.url}`),
    ];
    throw new Error(
      `${lines.length} changed file(s) missing from ${IMAGE_ORIGIN}. Upload with: gh workflow run publish-blog.yml --ref <branch>\n` +
      lines.join('\n')
    );
  }
  console.log('PASS: changed R2 images are on ' + IMAGE_ORIGIN + ': ' + keys.join(', '));
  return {keys, missing, wrongType};
}

const invoked = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invoked) {
  const fromStdin = !process.stdin.isTTY;
  const files = fromStdin && !process.env.CHANGED_FILES
    ? fs.readFileSync(0, 'utf8').split('\n')
    : changedFilesFromEnv();
  checkChangedR2Images(files).catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}
