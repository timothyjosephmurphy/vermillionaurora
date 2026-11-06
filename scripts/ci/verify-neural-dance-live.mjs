// Poll tjm.art until this push's Neural Dance site files are the ones Workers Builds published.
// Scripts, wasm, and manifests are copied byte-for-byte. Astro pages are not, so a changed
// quoted string has to show up in the live HTML. Image bytes may be rewritten at the edge,
// so those only have to answer.
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {neuralDanceAssetUrl, neuralDancePageUrl} from './classify-changes.mjs';

const hashExt = /\.(?:js|mjs|css|wasm|json|webmanifest|svg|txt)$/i;

export function liveChecks(files) {
  const checks = [];
  for (const file of files) {
    const asset = neuralDanceAssetUrl(file);
    if (asset) checks.push({file, url: asset, kind: hashExt.test(file) ? 'hash' : 'exists'});
    const page = neuralDancePageUrl(file);
    if (page) checks.push({file, url: page, kind: 'page'});
  }
  return checks;
}

// Quoted strings survive the Astro build. CSS rules often do not, so they are not needles.
export function pageNeedles(before, after) {
  const old = new Set(String(before).split('\n').map(line => line.trim()));
  const needles = [];
  for (const raw of String(after).split('\n')) {
    const line = raw.trim();
    if (!line || old.has(line)) continue;
    const quoted = line.match(/['"`]([^'"`\n]{24,})['"`]/);
    if (quoted) needles.push(quoted[1]);
  }
  return needles.slice(0, 3);
}

function needlesFor(file, base) {
  if (!base || /^0+$/.test(base)) return [];
  const show = spawnSync('git', ['show', `${base}:${file}`], {encoding: 'utf8'});
  if (show.status !== 0) return [];
  return pageNeedles(show.stdout, readFileSync(file, 'utf8'));
}

async function checkOnce(checks, base, fetchImpl) {
  for (const check of checks) {
    const response = await fetchImpl(`${check.url}?nd=${Date.now()}`, {cache: 'no-store', headers: {'Cache-Control': 'no-cache'}});
    if (!response.ok) throw new Error(`${check.url} returned ${response.status}`);
    if (check.kind === 'hash') {
      const local = createHash('sha256').update(readFileSync(check.file)).digest('hex');
      const remote = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
      if (remote !== local) throw new Error(`${check.file} is not on tjm.art yet`);
      continue;
    }
    if (check.kind === 'page') {
      const needles = needlesFor(check.file, base);
      if (!needles.length) continue;
      const html = await response.text();
      const missing = needles.filter(needle => !html.includes(needle));
      if (missing.length) throw new Error(`${check.file} is not on tjm.art yet`);
    }
  }
}

async function main() {
  const files = (process.env.CHANGED_FILES || '').split('\n').map(file => file.trim()).filter(Boolean);
  const checks = liveChecks(files);
  if (!checks.length) {
    console.error('No Neural Dance site URL matched the changed files.');
    process.exit(1);
  }
  const tries = Number(process.env.SITE_WAIT_TRIES || 480);
  const base = process.env.BASE_SHA || '';
  let ready = false;
  for (let i = 0; i < tries; i++) {
    try {
      await checkOnce(checks, base, globalThis.fetch);
      ready = true;
      break;
    } catch (error) {
      console.log(`Waiting for Neural Dance on tjm.art (${i + 1}/${tries}): ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  if (!ready) throw new Error('Neural Dance site files were not published. Workers Builds still builds the whole site for pages, scripts, and wasm.');
  console.log(`PASS: ${checks.length} Neural Dance URL(s) match this push.`);
}

const invoked = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invoked) main();
