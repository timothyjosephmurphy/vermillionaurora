import test from 'node:test';
import assert from 'node:assert/strict';
import { posts, testPost } from './posts.mjs';
import { duePosts, pendingPosts, eventContent, scheduledSeconds } from './scheduler-core.mjs';

const fixture = [
  { id: 'early', scheduledAt: '2026-10-06T10:00:00-07:00' },
  { id: 'due', scheduledAt: '2026-10-08T18:00:00-07:00' },
  { id: 'future', scheduledAt: '2026-10-11T10:00:00-07:00' }
];

test('campaign queue contains the three approved stories in the Pacific-time slots', () => {
  assert.deepEqual(posts.map(post => post.id), ['launch-warszawska-syrenka-2026-10-03', 'launch-honeybadger-cub-2026-10-06', 'launch-sunrise-el-zonte-bitcoin-beach-2026-10-08']);
  assert.deepEqual(posts.map(post => post.scheduledAt), ['2026-10-03T23:00:00-07:00', '2026-10-06T07:00:00-07:00', '2026-10-08T23:00:00-07:00']);
  assert.equal(duePosts(posts, Date.parse('2026-10-04T05:00:00Z'), Date.parse('2026-10-03T20:00:00Z')).length, 0);
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

test('campaign event content includes its product link and image after the story', () => {
  const content = eventContent(posts[0]);
  assert.ok(content.includes('https://vermillionaurora.com/products/warszawska-syrenka/'));
  assert.ok(content.endsWith(posts[0].imageUrl));
});

test('test note includes painting link, Nostr attribution and image', () => {
  const content = eventContent(testPost);
  assert.match(content, /test post/);
  assert.ok(content.includes('/products/warszawska-syrenka/'));
  assert.match(content, /utm_source=nostr/);
  assert.ok(content.endsWith(testPost.imageUrl));
  assert.equal(scheduledSeconds(fixture[0]), Math.floor(Date.parse(fixture[0].scheduledAt) / 1000));
});
