import test from 'node:test';
import assert from 'node:assert/strict';
import { readStockStatus } from './sales-maintenance.mjs';

const noWait=async()=>{};
const stockFailing=(failures,error)=>{let calls=0;return {get calls(){return calls;},getByName(){return {async status(){calls++;if(calls<=failures)throw error;return 'sold';}};}};};

test('retries a status read when the Durable Object was replaced by a deploy', async()=>{
  const stock=stockFailing(2,new Error('Connection closed: this Durable Object instance is no longer active. Reconnect or retry the request.'));
  assert.equal(await readStockStatus(stock,'x',3,noWait),'sold');
  assert.equal(stock.calls,3);
});

test('gives up after the attempt limit', async()=>{
  const stock=stockFailing(5,new Error('Connection closed: this Durable Object instance is no longer active.'));
  await assert.rejects(readStockStatus(stock,'x',3,noWait),/no longer active/);
  assert.equal(stock.calls,3);
});

test('does not retry other errors', async()=>{
  const stock=stockFailing(1,new Error('boom'));
  await assert.rejects(readStockStatus(stock,'x',3,noWait),/boom/);
  assert.equal(stock.calls,1);
});
