import test from 'node:test';
import assert from 'node:assert/strict';
import { posts, testPost } from './posts.mjs';
import { duePosts, pendingPosts, eventContent, scheduledSeconds } from './scheduler-core.mjs';

const fixture = [
  { id: 'early', scheduledAt: '2026-10-06T10:00:00-07:00' },
  { id: 'due', scheduledAt: '2026-10-08T18:00:00-07:00' },
  { id: 'future', scheduledAt: '2026-10-11T10:00:00-07:00' }
];

test('campaign queue is empty even after all former campaign dates', () => {
  assert.deepEqual(posts, []);
  assert.deepEqual(duePosts(posts, Date.parse('2026-12-01'), 0), []);
});

test('only due, not-yet-sent posts after activation are selected', () => {
  const selected = duePosts(fixture, Date.parse('2026-10-09T12:00:00Z'), Date.parse('2026-10-03'), new Set(['early']));
  assert.deepEqual(selected.map(post => post.id), ['due']);
});

test('activation skips campaign items whose scheduled time has passed', () => {
  const activation = Date.parse('2026-10-10');
  assert.deepEqual(duePosts(fixture, activation, activation), []);
});

test('single test is independent of campaign dates and stops after its receipt', () => {
  const now = Date.parse('2026-10-03T20:00:00Z');
  assert.deepEqual(pendingPosts(posts, testPost, now, now).map(post => post.id), [testPost.id]);
  assert.deepEqual(pendingPosts(posts, testPost, now + 300000, now, new Set([testPost.id])), []);
});

test('test note includes painting link, Nostr attribution and image', () => {
  const content = eventContent(testPost);
  assert.match(content, /test post/);
  assert.ok(content.includes('/products/warszawska-syrenka/'));
  assert.match(content, /utm_source=nostr/);
  assert.ok(content.endsWith(testPost.imageUrl));
  assert.equal(scheduledSeconds(fixture[0]), Math.floor(Date.parse(fixture[0].scheduledAt) / 1000));
});
