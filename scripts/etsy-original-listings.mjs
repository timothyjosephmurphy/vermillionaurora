#!/usr/bin/env node
// Owner ops for studio-tracker #872. Creates original drafts, uploads the painting
// photo, spot-checks, then optionally activates. Never prints secrets.
//
// Usage:
//   COMMISSION_MANAGER_TOKEN=… node scripts/etsy-original-listings.mjs sync
//   COMMISSION_MANAGER_TOKEN=… node scripts/etsy-original-listings.mjs media
//   COMMISSION_MANAGER_TOKEN=… node scripts/etsy-original-listings.mjs verify [--limit 5]
//   COMMISSION_MANAGER_TOKEN=… node scripts/etsy-original-listings.mjs activate
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import originals from '../cloudflare/etsy-original-source.mjs';
import {etsyOriginalPrice} from '../cloudflare/original-availability.mjs';

const ORIGIN = 'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
const SITE = 'https://tjm.art';
const BATCH = 8;
const token = process.env.COMMISSION_MANAGER_TOKEN;
if (!token) {
  console.error('Set COMMISSION_MANAGER_TOKEN in the environment (do not pass it on argv).');
  process.exit(1);
}

const [command, ...rest] = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = rest.indexOf(name);
  return i >= 0 ? rest[i + 1] : fallback;
};
const has = name => rest.includes(name);
const ids = originals.map(item => item.id);
const byId = Object.fromEntries(originals.map(item => [item.id, item]));

async function postJson(path, body) {
  const res = await fetch(ORIGIN + path, {
    method: 'POST',
    headers: {
      Origin: ORIGIN,
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = {raw: text}; }
  if (!res.ok) throw Error((data && data.error) || ('HTTP ' + res.status));
  return data;
}

async function postForm(path, form) {
  const res = await fetch(ORIGIN + path, {
    method: 'POST',
    headers: {Origin: ORIGIN, Authorization: 'Bearer ' + token},
    body: form
  });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = {raw: text}; }
  if (!res.ok) throw Error((data && data.error) || ('HTTP ' + res.status));
  return data;
}

function chunks(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

async function localImage(work) {
  const rel = String(work.image.src || '').replace(/^\//, '');
  const candidates = [rel, 'static/' + rel, 'gallery-images/' + rel.split('/').pop()];
  for (const candidate of candidates) {
    try {
      const bytes = await readFile(resolve(process.cwd(), candidate));
      if (bytes.byteLength > 0 && bytes.byteLength <= 8 * 1024 * 1024) {
        const type = candidate.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return {bytes, type, name: work.id + (type === 'image/png' ? '.png' : '.jpg')};
      }
    } catch { /* try next */ }
  }
  const url = new URL(work.image.src, SITE);
  const res = await fetch(url, {redirect: 'follow', signal: AbortSignal.timeout(20000)});
  const type = (res.headers.get('content-type') || '').split(';')[0];
  if (!res.ok || !['image/jpeg', 'image/png'].includes(type)) throw Error('Could not load image for ' + work.id);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (!bytes.byteLength || bytes.byteLength > 8 * 1024 * 1024) throw Error('Image for ' + work.id + ' is empty or too large');
  return {bytes, type, name: work.id + (type === 'image/png' ? '.png' : '.jpg')};
}

async function syncAll() {
  const results = [];
  for (const batch of chunks(ids, BATCH)) {
    const data = await postJson('/etsy/listings/sync', {kind: 'original', productIds: batch});
    results.push(...(data.results || []));
    console.log('synced', results.length + '/' + ids.length);
  }
  return results;
}

async function mediaAll() {
  const results = [];
  for (const id of ids) {
    const work = byId[id];
    const image = await localImage(work);
    const form = new FormData();
    form.set('productId', id);
    form.set('kind', 'original');
    form.set('slot', 'painting');
    form.set('file', new Blob([image.bytes], {type: image.type}), image.name);
    const data = await postForm('/etsy/listings/media', form);
    results.push(data);
    if (results.length % 10 === 0) console.log('media', results.length + '/' + ids.length);
  }
  console.log('media', results.length + '/' + ids.length);
  return results;
}

async function verifyAll() {
  const limit = Number(flag('--limit', String(ids.length)));
  const sample = has('--spot')
    ? pickSpotCheck()
    : ids.slice(0, Number.isFinite(limit) ? limit : ids.length);
  const results = [];
  for (const batch of chunks(sample, BATCH)) {
    const data = await postJson('/etsy/listings/verify', {kind: 'original', productIds: batch});
    results.push(...(data.results || []));
  }
  return results;
}

function pickSpotCheck() {
  const tube = originals.find(item => item.original.packaging === 'tube' && item.dimensions.width >= 36);
  const tubeMid = originals.find(item => item.original.packaging === 'tube' && item.dimensions.width < 20);
  const flatSmall = originals.find(item => item.original.packaging === 'flat' && item.dimensions.width <= 5);
  const flatMid = originals.find(item => item.id.startsWith('strawberry-point-1'));
  const existing = originals.find(item => item.id === 'hope-the-vermillion-aurora');
  return [...new Set([tube?.id, tubeMid?.id, flatSmall?.id, flatMid?.id, existing?.id].filter(Boolean))];
}

async function activateAll() {
  const results = [];
  for (const batch of chunks(ids, BATCH)) {
    const data = await postJson('/etsy/listings/activate', {kind: 'original', productIds: batch});
    results.push(...(data.results || []));
    console.log('activated', results.length + '/' + ids.length);
  }
  return results;
}

function summarizeVerify(results) {
  const failures = [];
  for (const item of results) {
    const work = byId[item.id];
    const expected = Number(etsyOriginalPrice(work.original.price));
    const reasons = [];
    if (item.state !== 'draft' && item.state !== 'active') reasons.push('state=' + item.state);
    if (!(item.images > 0)) reasons.push('missing photos');
    if (!(Math.abs(Number(item.price) - expected) < 0.009)) reasons.push('price ' + item.price + ' != ' + expected);
    if (reasons.length) failures.push({id: item.id, listingId: item.listingId, reasons});
  }
  return failures;
}

const handlers = {
  sync: async () => {
    const results = await syncAll();
    console.log(JSON.stringify({count: results.length, created: results.filter(item => item.created).length, updated: results.filter(item => !item.created).length}, null, 2));
  },
  media: async () => {
    const results = await mediaAll();
    console.log(JSON.stringify({count: results.length}, null, 2));
  },
  verify: async () => {
    const results = await verifyAll();
    const failures = summarizeVerify(results);
    console.log(JSON.stringify({checked: results.length, failures, results: results.map(item => ({
      id: item.id, listingId: item.listingId, title: item.title, state: item.state, price: item.price,
      images: item.images, url: item.url, expected: etsyOriginalPrice(byId[item.id].original.price),
      packaging: byId[item.id].original.packaging
    }))}, null, 2));
    if (failures.length) process.exitCode = 2;
  },
  activate: async () => {
    const results = await activateAll();
    const active = results.filter(item => item.state === 'active');
    const failures = results.filter(item => item.state !== 'active').map(item => ({id: item.id, listingId: item.listingId, state: item.state}));
    console.log(JSON.stringify({
      live: active.length,
      feesUsd: (active.length * 0.2).toFixed(2),
      shop: 'https://www.etsy.com/shop/VermillionAurora',
      failures
    }, null, 2));
    if (failures.length) process.exitCode = 2;
  }
};

if (!handlers[command]) {
  console.error('Usage: sync | media | verify [--spot|--limit N] | activate');
  process.exit(1);
}
await handlers[command]();
