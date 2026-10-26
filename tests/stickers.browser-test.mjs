import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const origin = 'https://tjm.art';
const shots = '/opt/cursor/artifacts/stickers';
fs.mkdirSync(shots, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--no-zygote'] } : {}) });
const posted = [];
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', (error) => { throw error; });
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/checkout/stickers/order' && route.request().method() === 'POST') {
      const body = route.request().postDataJSON();
      posted.push(body);
      return route.fulfill({ json: { ok: true, mode: 'mock', charged: false, confirmed: false, message: 'Preview only. No sticker was ordered, Printful was not contacted, and you were not charged.' } });
    }
    if (url.hostname !== 'tjm.art') return route.abort();
    const file = path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      const type = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' }[path.extname(file)] || 'application/octet-stream';
      return route.fulfill({ body: fs.readFileSync(file), contentType: type });
    }
    return route.fulfill({ status: 404, body: 'missing' });
  });
  await page.goto(`${origin}/products/painting-shoreline-at-dusk/`);
  const purchase = page.locator('.product-purchase-actions');
  const print = purchase.locator('[data-print-open]');
  const sticker = purchase.locator('[data-sticker-open]');
  await sticker.waitFor();
  assert.equal(await print.textContent(), 'Buy a print');
  assert.equal(await sticker.textContent(), 'Order a sticker');
  const beside = await purchase.evaluate((section) => {
    const printButton = section.querySelector('[data-print-open]');
    const stickerButton = section.querySelector('[data-sticker-open]');
    const printBox = printButton.getBoundingClientRect();
    const stickerBox = stickerButton.getBoundingClientRect();
    return { sameRow: Math.abs(printBox.top - stickerBox.top) < 8, stickerAfter: stickerBox.left > printBox.right - 1 };
  });
  assert.equal(beside.sameRow, true);
  assert.equal(beside.stickerAfter, true);
  await purchase.screenshot({ path: path.join(shots, 'dawn-order-controls.png') });
  await sticker.click();
  const dialog = page.locator('[data-sticker-dialog]');
  await dialog.waitFor();
  assert.equal(await page.locator('[data-print-dialog]').evaluate((element) => element.open), false);
  await dialog.locator('input[name=name]').fill('A Collector');
  await dialog.locator('input[name=email]').fill('collector@example.com');
  await dialog.locator('input[name=address1]').fill('123 Test St');
  await dialog.locator('input[name=city]').fill('Seattle');
  await dialog.locator('select[name=state]').selectOption('WA');
  await dialog.locator('input[name=zip]').fill('98122');
  await dialog.screenshot({ path: path.join(shots, 'dawn-sticker-dialog.png') });
  await dialog.getByRole('button', { name: 'Preview sticker order' }).click();
  await page.getByText('Preview only. No sticker was ordered').waitFor();
  assert.equal(posted.length, 1);
  assert.equal(posted[0].productId, 'painting-shoreline-at-dusk');
  assert.equal(posted[0].variantId, '3x3');
  assert.equal(posted[0].recipient.country, 'US');
  assert.equal(posted[0].recipient.state, 'WA');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[data-sticker-dialog]').open);
  assert.equal(await sticker.evaluate((element) => element === document.activeElement), true);
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(`${origin}/products/honeybadger-and-cub-with-genesis-block/`);
  await page.locator('[data-sticker-open]').waitFor();
  const stacked = await page.locator('.product-purchase-actions').evaluate((section) => {
    const printBox = section.querySelector('[data-print-open]').getBoundingClientRect();
    const stickerBox = section.querySelector('[data-sticker-open]').getBoundingClientRect();
    return stickerBox.top > printBox.bottom - 1 && stickerBox.width > 200 && section.getBoundingClientRect().width <= window.innerWidth;
  });
  assert.equal(stacked, true);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
  await page.locator('.product-purchase-actions').screenshot({ path: path.join(shots, 'honeybadger-mobile.png') });
  await page.goto(`${origin}/products/warszawska-syrenka/`);
  await page.locator('[data-sticker-open]').waitFor();
  await page.goto(`${origin}/products/el-zonte-before-dawn/`);
  assert.equal(await page.locator('[data-sticker-open]').count(), 0);
  assert.equal(await page.locator('h1').textContent(), 'El Zonte Before Dawn');
  console.log('PASS: sticker order sits beside print order and the preview does not call Printful');
} finally {
  await browser.close();
}
