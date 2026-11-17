import test from 'node:test';
import assert from 'node:assert/strict';
import {alertOwner,alertFinerWorksPriceMismatch,OWNER_ALERT_EMAIL} from './owner-alert.mjs';

test('owner alert reuses Gmail seller credentials and dedupes by key', async t => {
  const mails = [];
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    if (String(url).includes('oauth2.googleapis.com/token')) {
      return Response.json({access_token: 'tok'});
    }
    if (String(url).includes('gmail.googleapis.com')) {
      mails.push(JSON.parse(init.body));
      return Response.json({id: 'm1'});
    }
    throw Error('Unexpected ' + url);
  });
  const env = {GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 's', GOOGLE_REFRESH_TOKEN: 'r', CHECKOUT_MODE: 'live'};
  const state = {alerts: {}};
  const first = await alertOwner(env, 'finerworks-price:SKU1', 'Subject one', 'Body', {state});
  const second = await alertOwner(env, 'finerworks-price:SKU1', 'Subject one again', 'Body', {state});
  assert.deepEqual(first, {sent: true});
  assert.deepEqual(second, {sent: false, throttled: true});
  assert.equal(mails.length, 1);
  const raw = atob(mails[0].raw.replace(/-/g, '+').replace(/_/g, '/'));
  assert.match(raw, new RegExp(`To: ${OWNER_ALERT_EMAIL}`));
  assert.match(raw, /Subject: =\?UTF-8\?B\?U3ViamVjdCBvbmU=\?=/);
});

test('price mismatch alert logs structured fields and emails once per product code', async t => {
  const mails = [];
  const logs = [];
  const original = console.error;
  console.error = (...args) => logs.push(args.map(String).join(' '));
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    if (String(url).includes('oauth2.googleapis.com/token')) return Response.json({access_token: 'tok'});
    if (String(url).includes('gmail.googleapis.com')) { mails.push(1); return Response.json({id: 'm1'}); }
    throw Error('Unexpected');
  });
  try {
    const env = {GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 's', GOOGLE_REFRESH_TOKEN: 'r', CHECKOUT_MODE: 'sandbox'};
    const mismatch = {status: 'confirm', productCode: '5M144M8S7.5X6', id: 'print-x', storedAmount: '25.00', liveCost: '8.00', amount: '30.00'};
    await alertFinerWorksPriceMismatch(env, mismatch);
    await alertFinerWorksPriceMismatch(env, mismatch);
    assert.equal(mails.length, 1);
    assert.ok(logs.some(line => line.includes('finerworks_price_mismatch') && line.includes('5M144M8S7.5X6')));
  } finally {
    console.error = original;
  }
});
