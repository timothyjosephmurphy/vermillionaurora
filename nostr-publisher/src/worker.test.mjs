import test from 'node:test';
import assert from 'node:assert/strict';
import { SimplePool } from 'nostr-tools/pool';
import { verifyEvent } from 'nostr-tools/pure';
import worker, { NostrSchedule } from './worker.mjs';
import { posts, testPost } from './posts.mjs';

// Exercise delivery decisions with deterministic transport and a storage double.
// Production storage and relay acceptance are verified by the live test receipt.
function storageDouble() {
  const data = new Map();
  let lock = Promise.resolve();
  const storage = {
    async get(key) { return structuredClone(data.get(key)); },
    async put(key, value) { data.set(key, structuredClone(value)); },
    async delete(key) { data.delete(key); },
    async list({ prefix }) { return new Map([...data].filter(([key]) => key.startsWith(prefix))); },
    transaction(callback) {
      const result = lock.then(() => callback(storage));
      lock = result.catch(() => {});
      return result;
    }
  };
  return storage;
}
const env = { NOSTR_PUBLISH_ENABLED: 'true', NOSTR_NSEC: '01'.repeat(32), NOSTR_RELAYS: 'wss://relay.example' };
const run = (instance, nowMs) => instance.fetch(new Request('https://internal/run', {
  method: 'POST', body: JSON.stringify({ nowMs })
}));

test('failed attempt retries the same signed event, then subsequent runs stay idle', async () => {
  const original = SimplePool.prototype.publish;
  const events = [];
  SimplePool.prototype.publish = function (relays, event) {
    events.push(structuredClone(event));
    return [events.length === 1 ? Promise.reject(new Error('simulated timeout')) : Promise.resolve('accepted')];
  };
  try {
    const state = { storage: storageDouble() };
    const now = Date.parse('2026-10-03T20:00:00Z');
    const first = new NostrSchedule(state, env);
    assert.equal((await (await run(first, now)).json()).sent, 0);
    const restarted = new NostrSchedule(state, env);
    assert.equal((await (await run(restarted, now + 300000)).json()).sent, 1);
    assert.deepEqual(events[0], events[1]);
    assert.equal(verifyEvent(events[1]), true);
    assert.match(events[1].content, /Warszawska Syrenka/);
    assert.equal((await (await run(restarted, now + 600000)).json()).status, 'idle');
    assert.equal(events.length, 2);
    const status = await (await restarted.fetch(new Request('https://internal/status'))).json();
    assert.equal(status.scheduledPosts, 3);
    assert.equal(status.test.status, 'published');
    assert.equal(status.test.eventId, events[1].id);
    assert.ok(status.test.noteUrl.startsWith('https://njump.me/note1'));
  } finally { SimplePool.prototype.publish = original; }
});

test('overlapping scheduler calls send one test only', async () => {
  const original = SimplePool.prototype.publish;
  let sent = 0;
  SimplePool.prototype.publish = function () { sent++; return [Promise.resolve('accepted')]; };
  try {
    const state = { storage: storageDouble() };
    const instance = new NostrSchedule(state, env);
    const now = Date.parse('2026-10-03T20:00:00Z');
    await Promise.all([run(instance, now), run(instance, now)]);
    assert.equal(sent, 1);
    assert.ok(await state.storage.get('nostr:sent:' + testPost.id));
  } finally { SimplePool.prototype.publish = original; }
});

test('public blog feed shows only entries with a Nostr delivery receipt', async () => {
  const state = { storage: storageDouble() };
  const instance = new NostrSchedule(state, env);
  const acceptedAt = Date.parse('2026-10-06T17:00:02Z');
  await state.storage.put(`nostr:sent:${posts[0].id}`, { eventId: 'ab'.repeat(32), acceptedAt, relay: 'wss://relay.example' });
  const response = await instance.fetch(new Request('https://internal/blog'));
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://vermillionaurora.com');
  const result = await response.json();
  assert.deepEqual(result.posts.map(post => post.id), [posts[0].id]);
  assert.equal(result.posts[0].publishedAt, new Date(acceptedAt).toISOString());
  assert.ok(result.posts[0].noteUrl.startsWith('https://njump.me/note1'));
});

test('pause and missing key prevent delivery; public requests cannot trigger sending', async () => {
  const state = { storage: storageDouble() };
  assert.equal((await (await run(new NostrSchedule(state, { ...env, NOSTR_PUBLISH_ENABLED: 'false' }), Date.now())).json()).status, 'paused');
  assert.equal((await run(new NostrSchedule(state, { ...env, NOSTR_NSEC: '' }), Date.now())).status, 503);
  const response = await worker.fetch(new Request('https://public/run', { method: 'POST' }), {});
  assert.equal(response.status, 404);
  assert.equal((await state.storage.list({ prefix: 'nostr:sent:' })).size, 0);
});
