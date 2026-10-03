import test from 'node:test';
import assert from 'node:assert/strict';
import { posts } from './posts.mjs';
import { duePosts, eventContent, scheduledSeconds } from './scheduler-core.mjs';

test('campaign contains the 12 scheduled X captions in chronological order', () => {
  assert.equal(posts.length, 12);
  const dates = posts.map((post) => Date.parse(post.scheduledAt));
  assert.deepEqual(dates, [...dates].sort((a, b) => a - b));
});

test('only due, not-yet-sent posts after activation are selected', () => {
  const activation = Date.parse('2026-10-03T12:00:00-07:00');
  const now = Date.parse('2026-10-13T10:05:00-07:00');
  const selected = duePosts(posts, now, activation, new Set(['meet-tj', 'limited-palette']));
  assert.deepEqual(selected.map((post) => post.id), ['shore-print', 'sucia-light']);
});

test('activation skips campaign items whose scheduled time has already passed', () => {
  const activation = Date.parse('2026-10-13T12:00:00-07:00');
  const selected = duePosts(posts, activation, activation);
  assert.deepEqual(selected.map((post) => post.id), []);
});

test('note text uses Nostr attribution and includes its approved public image URL', () => {
  const content = eventContent(posts[0]);
  assert.match(content, /utm_source=nostr/);
  assert.match(content, /https:\/\/vermillionaurora\.com\/about\/images\/tj-murphy-portrait\.jpg$/);
  assert.doesNotMatch(content, /utm_source=x/);
  assert.equal(scheduledSeconds(posts[0]), Math.floor(Date.parse(posts[0].scheduledAt) / 1000));
});
