#!/usr/bin/env node
// Create PayPal-hosted links from the live catalog's product-page prices.
// No links are published to the website by this command.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('./generated-links.local', import.meta.url);
const read = async path => readFile(new URL(path, root), 'utf8');
const titleText = text => text.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function paypalFetch(url, options) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url, options);
    if (response.status !== 429 && response.status !== 503) return response;
    if (attempt === 4) return response;
    const header = response.headers.get('retry-after');
    const seconds = Number(header);
    const dateMs = Date.parse(header ?? '');
    const backoff = Number.isFinite(seconds) && header !== null ? seconds * 1000 :
      Number.isFinite(dateMs) ? dateMs - Date.now() : 30000 * 2 ** attempt;
    await pause(Math.min(120000, Math.max(5000, backoff)));
  }
}

export async function candidates() {
  const inventory = JSON.parse(await read('gallery/inventory.json')).paintings;
  const published = JSON.parse(await read('payments/paypal-links.json'));
  const rows = [];
  for (const p of inventory) {
    if (p.E !== 'Available' || published[p.A]) continue;
    const slug = p.A;
    if (!/^[a-z0-9-]+$/.test(slug) || p.D !== 'USD') throw new Error(`Invalid product ${slug}`);
    const page = await read(`products/${slug}/index.html`);
    const name = titleText(page.match(/<h1>([^<]+)<\/h1>/)?.[1] ?? '');
    const price = page.match(/<p class="product-detail-price">\$([\d,]+(?:\.\d{2})?) USD<\/p>/)?.[1];
    if (name !== p.B || !price || Number(price.replaceAll(',', '')) !== Number(p.C) ||
        !page.includes('<p class="product-availability">Available</p>') || Number(p.C) <= 0) {
      throw new Error(`Product page and inventory disagree for ${slug}`);
    }
    const artist = slug.startsWith('paul-murphy-') ? 'Paul Murphy' : 'TJ Murphy';
    rows.push({ slug, title: name, paypalTitle: name, amount: Number(p.C).toFixed(2), currency: 'USD', artist,
      productPage: `https://vermillionaurora.com/products/${slug}/` });
  }
  // PayPal's IPN identifies a product by its item name; make repeated titles unique.
  const counts = new Map();
  for (const row of rows) counts.set(row.title, (counts.get(row.title) ?? 0) + 1);
  for (const row of rows) {
    if (counts.get(row.title) > 1) row.paypalTitle = `${row.title} (${row.slug})`;
  }
  return rows;
}

const csv = value => `"${String(value).replaceAll('"', '""')}"`;
async function main() {
  const [command = 'plan', ...args] = process.argv.slice(2);
  const requestIndex = args.indexOf('--request');
  let requestPath;
  if (requestIndex !== -1) {
    requestPath = args[requestIndex + 1];
    if (!requestPath || requestPath.startsWith('--')) throw new Error('--request requires a JSON file');
    args.splice(requestIndex, 2);
  }
  if (!['plan', 'create'].includes(command) || args.some(x => !['--sandbox', '--live', '--ack-reusable'].includes(x))) {
    throw new Error('Usage: node payments/bulk-links.mjs plan | create (--sandbox | --live) --ack-reusable [--request payments/batch-request.json]');
  }
  let rows = await candidates();
  if (requestPath) {
    if (command !== 'create' || requestPath !== 'payments/batch-request.json') throw new Error('Only the catalog batch-request.json is accepted for create');
    const request = JSON.parse(await read(requestPath));
    if (!/^[a-zA-Z0-9_-]{8,80}$/.test(request.batchId) || !Array.isArray(request.slugs) ||
        !request.slugs.length || new Set(request.slugs).size !== request.slugs.length ||
        request.slugs.some(x => typeof x !== 'string')) throw new Error('Invalid batch request');
    const selection = new Set(request.slugs);
    rows = rows.filter(row => selection.has(row.slug));
    if (rows.length !== selection.size) throw new Error('Batch contains a sold, linked, missing, or otherwise ineligible painting');
  }
  if (command === 'plan') {
    console.log(['slug', 'artist', 'site title', 'PayPal item name', 'USD price', 'product page'].map(csv).join(','));
    for (const r of rows) console.log([r.slug, r.artist, r.title, r.paypalTitle, r.amount, r.productPage].map(csv).join(','));
    console.error(`${rows.length} available paintings need links. The existing Warsaw link and sold paintings are excluded.`);
    return;
  }
  const live = args.includes('--live');
  if (live === args.includes('--sandbox') || !args.includes('--ack-reusable')) {
    throw new Error('Choose exactly one of --sandbox or --live and acknowledge reusable links with --ack-reusable');
  }
  const { PAYPAL_CLIENT_ID: id, PAYPAL_CLIENT_SECRET: secret } = process.env;
  if (!id || !secret) throw new Error('Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in your shell (never in this repository).');
  const api = live ? 'https://api.paypal.com' : 'https://api-m.sandbox.paypal.com';
  const existing = await readFile(output, 'utf8').then(JSON.parse, e => e.code === 'ENOENT' ? {} : Promise.reject(e));
  const key = live ? 'live' : 'sandbox';
  existing[key] ??= {};
  // Acquire the bearer token without ever logging the client secret or access token.
  const tokenResponse = await fetch(`${api}/v1/oauth2/token`, {
    method: 'POST', headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded' }, body: 'grant_type=client_credentials'
  });
  if (!tokenResponse.ok) throw new Error(`PayPal OAuth returned HTTP ${tokenResponse.status}`);
  const token = (await tokenResponse.json()).access_token;
  if (!token) throw new Error('PayPal OAuth response did not include an access token');

  // Find earlier API-created resources by stable product ID. This prevents a
  // second workflow run from creating another link after its artifact expires.
  const remote = new Map();
  let next = `${api}/v1/checkout/payment-resources?page_size=100`;
  for (let pages = 0; next && pages < 100; pages++) {
    const listed = await paypalFetch(next, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
    if (!listed.ok) throw new Error(`PayPal list returned HTTP ${listed.status}`);
    const result = await listed.json();
    for (const item of result.resources ?? []) {
      const productId = item.line_items?.[0]?.product_id;
      if (item.status === 'ACTIVE' && productId && item.line_items?.length === 1) {
        if (remote.has(productId)) throw new Error(`Multiple active PayPal links use product ID ${productId}; resolve this in PayPal first`);
        remote.set(productId, item);
      }
    }
    const url = result.links?.find(x => x.rel === 'next')?.href;
    if (url && new URL(url).origin !== api) throw new Error('Unexpected PayPal pagination URL');
    next = url;
    if (next && pages === 99) throw new Error('PayPal link list exceeded 100 pages');
  }

  for (const row of rows) {
    if (existing[key][row.slug]) {
      const old = existing[key][row.slug];
      if (old.amount !== row.amount || old.title !== row.title || old.paypalTitle !== row.paypalTitle) {
        throw new Error(`Existing ${row.slug} link has stale catalog details; review it before continuing`);
      }
      continue;
    }
    const previous = remote.get(row.slug);
    if (previous) {
      const line = previous.line_items[0];
      if (line.name !== row.paypalTitle || line.unit_amount?.value !== row.amount ||
          line.unit_amount?.currency_code !== 'USD') throw new Error(`Existing PayPal link differs from catalog for ${row.slug}`);
      const url = previous.payment_link ?? previous.links?.find(x => x.rel === 'payment_link')?.href;
      if (!url) throw new Error(`No URL returned for existing PayPal link ${row.slug}`);
      existing[key][row.slug] = { ...row, id: previous.id, url, stockVerified: false };
      await writeFile(output, JSON.stringify(existing, null, 2) + '\n', { mode: 0o600 });
      console.log(`${row.slug}: existing PayPal resource recorded`);
      continue;
    }
    const requestId = createHash('sha256').update(`${key}:${row.slug}:${row.paypalTitle}:${row.amount}`).digest('hex');
    // Stay well below PayPal's observed creation rate limit.
    await pause(5000);
    const response = await paypalFetch(`${api}/v1/checkout/payment-resources`, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json',
        'Content-Type': 'application/json', 'PayPal-Request-Id': requestId },
      body: JSON.stringify({ integration_mode: 'LINK', type: 'BUY_NOW', reusable: 'MULTIPLE',
        line_items: [{ name: row.paypalTitle, product_id: row.slug,
          unit_amount: { currency_code: 'USD', value: row.amount }, collect_shipping_address: true }] })
    });
    if (!response.ok) throw new Error(`PayPal create failed for ${row.slug} (HTTP ${response.status}). ${Object.keys(existing[key]).length} links recorded; rerun after resolving the error.`);
    const result = await response.json();
    const url = result.links?.find(x => x.rel === 'payment_link')?.href ?? result.payment_link;
    const expectedHost = live ? 'www.paypal.com' : 'www.sandbox.paypal.com';
    if (!result.id || !url || new URL(url).hostname !== expectedHost || !/^\/ncp\/payment\/[A-Za-z0-9-]+\/?$/.test(new URL(url).pathname)) {
      throw new Error(`Unexpected link response for ${row.slug}; check PayPal by product ID before retrying`);
    }
    existing[key][row.slug] = { ...row, id: result.id, url, stockVerified: false };
    await writeFile(output, JSON.stringify(existing, null, 2) + '\n', { mode: 0o600 });
    console.log(`${row.slug}: ${url}`);
  }
  console.log(`Recorded ${Object.keys(existing[key]).length} ${key} links in payments/generated-links.local. Set stock to 1 and block out-of-stock purchases in PayPal before publishing any links.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(e => { console.error(e.message); process.exitCode = 1; });
}
