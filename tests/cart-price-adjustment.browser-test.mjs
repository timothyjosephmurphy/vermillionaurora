// Checkout shows a corrected print price and asks the buyer to confirm it.
// A negative-margin block uses the friendly message and never a 422.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const origin = 'https://vermillionaurora.com';
const printId = 'print-el-zonte-at-sunrise-full';
const blockMessage = "This size needs a fresh price, we've been notified, please try another size or check back soon";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']} : {}),
});
const page = await browser.newPage({viewport: {width: 1280, height: 900}});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
let mode = 'adjust';
await page.route('**/*', async route => {
  const request = route.request();
  const url = new URL(request.url());
  if (request.method() === 'OPTIONS') return route.fulfill({status: 204, headers: {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}});
  if (url.pathname.startsWith('/checkout/cart/')) {
    const action = url.pathname.split('/').at(-1);
    const body = request.method() === 'POST' ? request.postDataJSON() : null;
    if (action === 'catalog') return route.fulfill({headers: {'Access-Control-Allow-Origin': origin}, json: {enabled: true, version: 'test', products: [{id: printId, type: 'print', title: 'Sunrise from Punta El Zonte Hostel — Large print', amount: '150.00', imageSize: {width: 11.99, height: 23.6}, paperSize: {width: 13.99, height: 25.6}, productId: 'el-zonte-at-sunrise', methods: ['square'], status: 'available'}], square: {applicationId: 'sq0idp-test', locationId: 'LOCATION', mode: 'live'}}});
    if (action === 'hold') return route.fulfill({headers: {'Access-Control-Allow-Origin': origin}, json: {orderId: body.holdId, status: 'holding', heldIds: [], expiresAt: Date.now() + 15 * 60 * 1000}});
    if (action === 'quote' && mode === 'block') return route.fulfill({status: 409, headers: {'Access-Control-Allow-Origin': origin}, json: {error: blockMessage, code: 'PRINT_PRICE_BLOCKED'}});
    if (action === 'quote') {
      assert.equal(body.catalogVersion, 'test');
      return route.fulfill({headers: {'Access-Control-Allow-Origin': origin}, json: {
        orderId: body.holdId, key: body.key, status: 'quoted', methods: ['square'], expiresAt: Date.now() + 10 * 60 * 1000,
        quote: {
          items: [{id: printId, type: 'print', title: 'Sunrise from Punta El Zonte Hostel — Large print', amount: '155.00', quantity: 1}],
          base: '155.00', shipping: '12.00', tax: '0.00', total: '167.00',
          priceAdjustments: [{id: printId, title: 'Sunrise from Punta El Zonte Hostel — Large print', previousAmount: '150.00', amount: '155.00'}],
          shipments: [{id: 'prints', title: 'Fine-art prints', shipping: '12.00', carrier: 'UPS', service: 'Ground'}],
        },
      }});
    }
    return route.fulfill({status: 404, headers: {'Access-Control-Allow-Origin': origin}, json: {error: 'Not found'}});
  }
  if (url.hostname === 'web.squarecdn.com') return route.fulfill({contentType: 'application/javascript', body: 'window.Square={payments:()=>({card:async()=>({attach:async()=>{},tokenize:async()=>({status:\'OK\',token:\'cnon:test\'})})})};'});
  if (url.hostname === 'img.tjm.art') return route.fulfill({status: 404});
  if (url.hostname !== new URL(origin).hostname) return route.abort();
  const file = path.join(root, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    const type = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2'}[path.extname(file)] || 'application/octet-stream';
    return route.fulfill({body: fs.readFileSync(file), contentType: type});
  }
  return route.fulfill({status: 404});
});

try {
  await page.goto(origin + '/cart/');
  await page.evaluate(id => localStorage.setItem('va-cart-v1', JSON.stringify([{id, quantity: 1}])), printId);
  await page.reload();
  await page.locator('.cart-line-price').waitFor();
  assert.match(await page.locator('.cart-line-price').textContent(), /150\.00/);
  for (const [name, value] of Object.entries({email: 'buyer@example.test', name: 'Test Buyer', street1: '123 Main St', city: 'Seattle', state: 'WA', zip: '98122'})) {
    await page.locator(`[name="${name}"]`).fill(value);
  }
  await page.getByRole('button', {name: 'Calculate shipping & tax'}).click();
  await page.getByRole('button', {name: 'Confirm updated prices'}).waitFor();
  assert.match(await page.locator('.cart-line-price').textContent(), /155\.00/);
  assert.match(await page.locator('[data-cart-total]').textContent(), /167\.00/);
  assert.match(await page.locator('[data-cart-quote-feedback]').textContent(), /was \$150\.00, now \$155\.00/);
  assert.equal(await page.getByRole('button', {name: 'Pay with credit card'}).isDisabled(), true);
  await page.getByRole('button', {name: 'Confirm updated prices'}).click();
  await page.getByRole('button', {name: 'Pay with credit card'}).waitFor();
  assert.equal(await page.getByRole('button', {name: 'Pay with credit card'}).isEnabled(), true);

  mode = 'block';
  await page.locator('[name="street1"]').fill('124 Main St');
  await page.getByRole('button', {name: 'Calculate shipping & tax'}).click();
  await page.locator('[data-cart-quote-feedback]').getByText(blockMessage).waitFor();
  assert.equal(await page.getByRole('button', {name: 'Pay with credit card'}).isDisabled(), true);
  assert.equal((await page.locator('[data-cart-quote-feedback]').textContent()).includes('422'), false);
  assert.deepEqual(errors, []);
  console.log('PASS: corrected print price is shown for confirmation, and a negative margin blocks with a friendly message.');
} finally {
  await browser.close();
}
