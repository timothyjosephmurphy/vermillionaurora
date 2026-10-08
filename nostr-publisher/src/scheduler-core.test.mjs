import test from 'node:test';
import assert from 'node:assert/strict';
import { posts, testPost } from './posts.mjs';
import { duePosts, pendingPosts, eventContent, scheduledSeconds } from './scheduler-core.mjs';

const fixture = [
  { id: 'early', scheduledAt: '2026-10-06T10:00:00-07:00' },
  { id: 'due', scheduledAt: '2026-10-08T18:00:00-07:00' },
  { id: 'future', scheduledAt: '2026-10-11T10:00:00-07:00' }
];

const PUBLISHED = ['launch-warszawska-syrenka-2026-10-03', 'launch-honeybadger-cub-2026-10-06'];
const EL_ZONTE = 'launch-sunrise-el-zonte-bitcoin-beach-2026-10-08';
// Pacific wall-clock slots matching the Buffer schedule (Sun Oct 11, then Tue 7 AM / Thu 6 PM / Sat 10 AM).
const SLOTS = ['2026-10-03 23:00', '2026-10-06 07:00', '2026-10-11 10:00', '2026-10-13 07:00', '2026-10-15 18:00', '2026-10-17 10:00',
  '2026-10-20 07:00', '2026-10-22 18:00', '2026-10-24 10:00', '2026-10-27 07:00', '2026-10-29 18:00', '2026-10-31 10:00',
  '2026-11-03 07:00', '2026-11-05 18:00', '2026-11-07 10:00'];
const pacific = (ms) => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date(ms)).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
};

test('campaign queue follows the Buffer schedule in Pacific time, with DST-correct offsets', () => {
  assert.equal(posts.length, SLOTS.length);
  assert.deepEqual(posts.map(post => pacific(Date.parse(post.scheduledAt))), SLOTS);
  for (const post of posts) {
    const expected = Date.parse(post.scheduledAt) < Date.parse('2026-11-01T09:00:00Z') ? '-07:00' : '-08:00';
    assert.ok(post.scheduledAt.endsWith(expected), `${post.id} offset`);
  }
  assert.equal(new Set(posts.map(post => post.id)).size, posts.length);
  assert.deepEqual(posts.slice(0, 2).map(post => post.id), PUBLISHED);
  assert.deepEqual(posts.slice(0, 2).map(post => post.scheduledAt), ['2026-10-03T23:00:00-07:00', '2026-10-06T07:00:00-07:00']);
  assert.equal(duePosts(posts, Date.parse('2026-10-04T05:00:00Z'), Date.parse('2026-10-03T20:00:00Z')).length, 0);
});

test('El Zonte keeps its id (at most one El Zonte note) and moved from Oct 8, 11 PM to Sun Oct 11, 10 AM', () => {
  const elZonte = posts.find(post => post.id === EL_ZONTE);
  assert.equal(elZonte.scheduledAt, '2026-10-11T10:00:00-07:00');
  assert.equal(elZonte.title, 'El Zonte at Dawn');
  assert.equal(elZonte.imageUrl, 'https://tjm.art/gallery-images/el-zonte-at-dawn-2026.jpg');
  assert.match(elZonte.text, /^Before dawn at the Punta El Zonte hostel/);
  assert.ok(elZonte.text.endsWith('original and prints:'));
  assert.equal(elZonte.productUrl, '/products/painting-shoreline-at-dusk/');
  assert.ok(!posts.some(post => post.scheduledAt.startsWith('2026-10-08')));
});

test('after deploy: published entries never repeat and nothing publishes before its slot', () => {
  const activatedAt = Date.parse('2026-10-03T20:00:00Z');
  const delivered = new Set([...PUBLISHED, testPost.id]);
  for (const now of ['2026-10-08T12:00:00-07:00', '2026-10-08T23:05:00-07:00', '2026-10-11T09:59:59-07:00'])
    assert.deepEqual(pendingPosts(posts, testPost, Date.parse(now), activatedAt, delivered), [], now);
  for (const [index, post] of posts.entries()) {
    if (index < 2) continue;
    const at = Date.parse(post.scheduledAt);
    const sent = new Set([...delivered, ...posts.slice(2, index).map(entry => entry.id)]);
    assert.deepEqual(duePosts(posts, at - 1, activatedAt, sent), [], `${post.id} early`);
    assert.deepEqual(duePosts(posts, at, activatedAt, sent).map(entry => entry.id), [post.id]);
  }
});

test('notes use tjm.art links and images, no X handles, and no duplicated link', () => {
  for (const post of posts) {
    assert.match(post.imageUrl, /^https:\/\/tjm\.art\/[^\s]+\.(jpe?g|webp)$/);
    assert.match(post.productUrl, /^\/[a-z0-9/-]+\/$/);
    const content = eventContent(post);
    assert.ok(!/vermillionaurora\.com/.test(content), post.id);
    assert.ok(!/(^|\s)@\w/.test(post.text), `${post.id} has an X handle`);
    assert.equal(content.split(/\s+/).filter(word => word.replace(/[.,:;)]+$/, '') === `https://tjm.art${post.productUrl}`).length, 1, `${post.id} link once`);
    assert.ok(content.endsWith(post.imageUrl));
  }
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
  assert.ok(content.includes('https://tjm.art/products/warszawska-syrenka/'));
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
