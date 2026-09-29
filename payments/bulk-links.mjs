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
  if (!['plan', 'create'].includes(command) || args.some(x => !['--sandbox', '--live', '--ack-reusable'].includes(x))) {
    throw new Error('Usage: node payments/bulk-links.mjs plan | create (--sandbox | --live) --ack-reusable');
  }
  const rows = await candidates();
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

  for (const row of rows) {
    if (existing[key][row.slug]) {
      const old = existing[key][row.slug];
      if (old.amount !== row.amount || old.title !== row.title || old.paypalTitle !== row.paypalTitle) {
        throw new Error(`Existing ${row.slug} link has stale catalog details; review it before continuing`);
      }
      continue;
    }
    const requestId = createHash('sha256').update(`${key}:${row.slug}:${row.paypalTitle}:${row.amount}`).digest('hex');
    const response = await fetch(`${api}/v1/checkout/payment-resources`, {
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
