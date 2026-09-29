import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applySale, handlePaypalIpn } from './paypal-inventory.mjs';

const slug = 'painting-portrait-in-green';
const paths = ['gallery/inventory.json', 'payments/paypal-links.json', 'index.html', 'gallery/index.html', `products/${slug}/index.html`];
// Chase has already sold in production. Reconstruct its pre-sale state only
// inside the test, so IPN regression checks do not depend on live stock.
const files = Object.fromEntries(paths.map(path => [path, readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')]));
const inventory = JSON.parse(files['gallery/inventory.json']);
const painting = inventory.paintings.find(p => p.A === slug);
painting.C = '20.0'; painting.E = 'Available';
files['gallery/inventory.json'] = JSON.stringify(inventory);
const links = JSON.parse(files['payments/paypal-links.json']);
const item = {title:'Chase Toole',paypalTitle:'Chase Toole Portrait',amount:'20.00',currency:'USD',autoInventory:true};
links[slug] = item;
files['payments/paypal-links.json'] = JSON.stringify(links);
files[`products/${slug}/index.html`] = files[`products/${slug}/index.html`].replace('<p class="product-availability">Sold</p>','<p class="product-availability">Available</p>');
for (const path of ['index.html','gallery/index.html']) {
  files[path] = files[path].replace(/<article\b[^>]*>[\s\S]*?<\/article>/g, article =>
    article.includes(`/products/${slug}/`) ? article.replace('$20 USD · Sold','$20 USD · Available')
      .replace('data-availability="Sold"','data-availability="Available"')
      .replaceAll(`/products/${slug}/`,`/?buy=${slug}#contact`) : article);
}

test('a completed sale updates every public listing in one tree', () => {
  const changed = applySale(files, slug, item);
  const painting = JSON.parse(changed['gallery/inventory.json']).paintings.find(p => p.A === slug);
  assert.equal(painting.C, '0');
  assert.equal(painting.E, 'Sold');
  assert.equal(JSON.parse(changed['payments/paypal-links.json'])[slug], undefined);
  assert.match(changed[`products/${slug}/index.html`], /class="product-availability">Sold/);
  for (const path of ['index.html', 'gallery/index.html']) {
    const card = changed[path].match(new RegExp(`<article[^>]*>[^]*?${slug}[^]*?</article>`))?.[0];
    assert.match(card, /\$20 USD · Sold/);
  }
  assert.match(changed['gallery/index.html'], /data-availability="Sold"[^]*?painting-portrait-in-green/);
  assert.doesNotMatch(changed['gallery/index.html'], /\?buy=painting-portrait-in-green/);
});

test('a stale price or status cannot silently mark an unrelated item sold', () => {
  assert.throws(() => applySale(files, slug, { ...item, amount: '200.00' }), /Inventory mismatch/);
  const sold = structuredClone(files);
  const soldInventory = JSON.parse(sold['gallery/inventory.json']);
  const soldPainting = soldInventory.paintings.find(p => p.A === slug);
  soldPainting.C = '0'; soldPainting.E = 'Sold';
  sold['gallery/inventory.json'] = JSON.stringify(soldInventory);
  assert.throws(() => applySale(sold, slug, item), /Inventory mismatch/);
});

test('IPN ignores incomplete payment and refuses unverified or wrong-merchant messages', async () => {
  const oldFetch = globalThis.fetch;
  const env = { PAYPAL_IPN_ENABLED: 'true', PAYPAL_MERCHANT_ID: 'MERCHANT12345', GITHUB_TOKEN: 'test', SALES_LEDGER:{getByName:()=>({record:async()=>({recorded:true})})} };
  let calls = [];
  try {
    globalThis.fetch = async url => { calls.push(String(url)); return new Response('VERIFIED'); };
    const pending = await handlePaypalIpn(ipn({ payment_status: 'Pending' }), env);
    assert.equal(pending.status, 200);
    assert.equal(calls.length, 1);
    const wrong = await handlePaypalIpn(ipn({ receiver_id: 'OTHER' }), env);
    assert.equal(wrong.status, 400);
    assert.equal(calls.length, 2);
    globalThis.fetch = async () => new Response('INVALID');
    const invalid = await handlePaypalIpn(ipn(), env);
    assert.equal(invalid.status, 400);
    const disabled = await handlePaypalIpn(ipn(), { ...env, PAYPAL_IPN_ENABLED: 'false' });
    assert.equal(disabled.status, 503);
  } finally {
    globalThis.fetch = oldFetch;
  }
});

test('verified completed payment commits only after matching merchant, item and amount', async () => {
  const oldFetch = globalThis.fetch;
  const env = { PAYPAL_IPN_ENABLED: 'true', PAYPAL_MERCHANT_ID: 'MERCHANT12345', GITHUB_TOKEN: 'test', SALES_LEDGER:{getByName:()=>({record:async()=>({recorded:true})})} };
  const writes = [];
  try {
    globalThis.fetch = async (url, options = {}) => {
      const path = String(url);
      if (path.includes('ipnpb.paypal.com')) return new Response('VERIFIED');
      if (path.endsWith('/git/ref/heads/main')) return Response.json({ object: { sha: 'base' } });
      if (path.endsWith('/git/commits/base')) return Response.json({ tree: { sha: 'treebase' } });
      if (path.includes('/contents/')) {
        const name = path.split('/contents/')[1].split('?')[0];
        return Response.json({ encoding: 'base64', content: Buffer.from(files[name]).toString('base64') });
      }
      if (options.method !== 'GET') writes.push({ path, body: JSON.parse(options.body) });
      if (path.endsWith('/git/trees')) return Response.json({ sha: 'newtree' });
      if (path.endsWith('/git/commits')) return Response.json({ sha: 'newcommit' });
      if (path.endsWith('/git/refs/heads/main')) return Response.json({});
      throw new Error(path);
    };
    assert.equal((await handlePaypalIpn(ipn({ mc_gross: '19.99' }), env)).status, 400);
    assert.equal(writes.length, 0);
    assert.equal((await handlePaypalIpn(ipn({ mc_gross: '25.00' }), env)).status, 200);
    assert.deepEqual(writes.map(x => x.path.split('/').slice(-2).join('/')), ['git/trees', 'git/commits', 'heads/main']);
    assert.equal(writes[0].body.tree.length, 5);
    assert.equal(writes[2].body.force, false);
    // PayPal Payment Links send a one-item cart: item_name1, not item_name.
    assert.equal((await handlePaypalIpn(cartIpn(), env)).status, 200);
    assert.equal(writes.length, 6);
  } finally {
    globalThis.fetch = oldFetch;
  }
});

function ipn(overrides = {}) {
  const fields = new URLSearchParams({
    payment_status: 'Completed', receiver_id: 'MERCHANT12345', txn_id: 'TX-123',
    item_name: 'Chase Toole Portrait', mc_currency: 'USD', mc_gross: '20.00', quantity: '1',
    ...overrides
  });
  return new Request('https://example.com/paypal-ipn', { method: 'POST', body: fields });
}

function cartIpn() {
  return new Request('https://example.com/paypal-ipn', {
    method: 'POST',
    body: new URLSearchParams({
      txn_type: 'cart', num_cart_items: '1', item_name1: 'Chase Toole Portrait',
      payment_status: 'Completed', receiver_id: 'MERCHANT12345', txn_id: 'TX-CART-123',
      mc_currency: 'USD', mc_gross: '20.00', mc_gross_1: '20.00', quantity1: '1'
    })
  });
}
