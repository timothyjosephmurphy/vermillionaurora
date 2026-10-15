import test from 'node:test';
import assert from 'node:assert/strict';
import {ownerPrintOrder} from './owner-print-order.mjs';
const req=(auth,body={})=>new Request('https://x/checkout/owner/print-order',{method:'POST',headers:auth?{Authorization:auth}:{},body:JSON.stringify(body)});
test('owner print order fails closed without the owner password',async()=>{
  assert.equal((await ownerPrintOrder(req('Bearer x'),{})).status,503);
  assert.equal((await ownerPrintOrder(req('Bearer wrong'),{CATALOG_ADMIN_PASSWORD:'pw'})).status,404);
  assert.equal((await ownerPrintOrder(req(null),{CATALOG_ADMIN_PASSWORD:'pw'})).status,404);
  assert.equal((await ownerPrintOrder(req('Bearer pw',{replaces:'nothex'}),{CATALOG_ADMIN_PASSWORD:'pw'})).status,400);
  assert.equal((await ownerPrintOrder(req('Bearer pw',{replaces:'66ad9cd1',printId:'nope'}),{CATALOG_ADMIN_PASSWORD:'pw'})).status,400);
});
