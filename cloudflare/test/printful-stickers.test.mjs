import {env} from 'cloudflare:workers';
import {it, expect} from 'vitest';
import worker from '../commission-worker.js';

const order = {productId:'painting-shoreline-at-dusk',variantId:'3x3',quantity:1,recipient:{name:'A Collector',email:'collector@example.com',address1:'123 Test St',city:'Seattle',state:'WA',zip:'98122',country:'US'}};

it('serves a mock sticker preview and does not confirm a Printful order', async () => {
  const response = await worker.fetch(new Request('https://worker.test/checkout/stickers/order', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(order)}), env);
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body.mode).toBe('mock');
  expect(body.charged).toBe(false);
  expect(body.confirmed).toBe(false);
  expect(body.previewId).toMatch(/^tjm-sticker-/);
  const confirm = await worker.fetch(new Request('https://worker.test/checkout/stickers/order/confirm', {method:'POST'}), env);
  expect(confirm.status).toBe(404);
});
