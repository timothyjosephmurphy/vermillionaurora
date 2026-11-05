// A Nostr note that announces a story already on the blog index is not a second card.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { posts } from '../nostr-publisher/src/posts.mjs';
import { mergeJournalEntries } from '../src/pages/blog/journal-feed.mjs';

const index = readFileSync(new URL('../src/pages/blog/index.astro', import.meta.url), 'utf8');
const feed = readFileSync(new URL('../src/pages/blog/journal-feed.mjs', import.meta.url), 'utf8');

function indexedStories(html = index) {
  const stories = [];
  for (const block of html.split('<article class="journal-entry" data-static-story>').slice(1)) {
    const chunk = block.split('</article>')[0];
    stories.push({
      href: chunk.match(/href="(\/blog\/[^"]+)"/)?.[1] || '',
      datetime: chunk.match(/<time datetime="([^"]+)"/)?.[1] || '',
      title: chunk.match(/<h2><a[^>]*>([^<]*)<\/a>/)?.[1] || '',
    });
  }
  return stories;
}

function titles(entries) {
  return entries.map(entry => entry.story?.title || entry.post?.title);
}

test('the 3D gallery story leads with the play link and its index card keeps both links', () => {
  const post = readFileSync(new URL('../static/blog/walk-my-paintings-3d-gallery/index.html', import.meta.url), 'utf8');
  const main = post.slice(post.indexOf('<main class="article">'));
  const cta = main.indexOf('class="walk-cta"');
  const figure = main.indexOf('<figure');
  const firstParagraph = main.indexOf('<p>I set up a 3D gallery');
  assert.ok(cta >= 0 && cta < figure && figure < firstParagraph);
  const lead = main.slice(cta, figure);
  assert.match(lead, /href="https:\/\/tjm\.art\/play"/);
  assert.match(lead, /Walk the gallery now: tjm\.art\/play/);
  const court = main.slice(figure, firstParagraph);
  assert.match(court, /alt="Bitcoiner walls in the 3D gallery"/);
  assert.match(court, /walk-206-btc-court-282d150e11-960\.webp/);
  assert.match(court, /You can pay with Bitcoin/);
  const card = index.split('<article class="journal-entry" data-static-story>')[1];
  assert.match(card, /href="\/blog\/walk-my-paintings-3d-gallery\/">Read the story →/);
  assert.match(card, /href="\/play\/">Walk the gallery now →/);
});

test('the blog index merges the Nostr feed through the dedupe', () => {
  assert.match(index, /import \{ startJournalFeed \} from '\.\/journal-feed\.mjs'/);
  assert.match(index, /startJournalFeed\(\)/);
  assert.match(feed, /vermillion-nostr-publisher\.timothyjosephmurphy\.workers\.dev\/blog/);
  assert.match(feed, /dedupeNostrAnnouncements|nostrPostAnnouncesStory/);
  assert.equal(indexedStories().some(story => story.href === '/blog/walk-my-paintings-3d-gallery/'), true);
});

test('the indexed 3D gallery story absorbs its Nostr announcement', () => {
  const merged = mergeJournalEntries(indexedStories(), posts);
  const walk = merged.filter(entry => (entry.story?.title || entry.post?.title) === 'Walk My 206 Paintings in 3D');
  assert.equal(walk.length, 1);
  assert.equal(walk[0].story.href, '/blog/walk-my-paintings-3d-gallery/');
  assert.equal(merged.some(entry => entry.post?.id === 'campaign-walk-my-paintings-3d-gallery-2026-11-04'), false);
  assert.equal(merged.some(entry => entry.post?.id === 'campaign-layers-of-sound-live-looping-2026-10-27'), false);
  assert.equal(titles(merged).filter(title => title === 'Layers of Sound: My Live Looping Guitar Setup').length, 1);
  assert.equal(merged.some(entry => entry.post?.id === 'launch-warszawska-syrenka-2026-10-03'), true);
});

test('a blog URL in the note, a /blog/ link, or a matching campaign slug each drop the duplicate', () => {
  const stories = [{ href: '/blog/walk-my-paintings-3d-gallery/', datetime: '2026-11-04', title: 'Walk My 206 Paintings in 3D' }];
  const painting = {
    id: 'launch-warszawska-syrenka-2026-10-03',
    title: 'Warszawska Syrenka',
    text: 'Visit tjm.art.',
    productUrl: '/products/warszawska-syrenka/',
    publishedAt: '2026-10-03T23:00:00-07:00',
  };
  const cases = [
    {
      id: 'note-text',
      text: 'Wrote it up: https://tjm.art/blog/walk-my-paintings-3d-gallery/',
      productUrl: '/play/',
    },
    {
      id: 'legacy-host',
      text: 'See https://vermillionaurora.com/blog/walk-my-paintings-3d-gallery/?utm_source=nostr',
      productUrl: '/play/',
    },
    {
      id: 'www-host',
      text: 'See https://www.tjm.art/blog/walk-my-paintings-3d-gallery/#start',
      productUrl: '/play/',
    },
    {
      id: 'relative-link',
      text: 'Also https://tjm.art/play',
      productUrl: '/blog/walk-my-paintings-3d-gallery/',
    },
    {
      id: 'campaign-walk-my-paintings-3d-gallery-2026-11-04',
      text: 'Also https://tjm.art/play',
      productUrl: '/play/',
    },
  ];
  for (const post of cases) {
    const merged = mergeJournalEntries(stories, [{ ...post, title: 'Walk My 206 Paintings in 3D', publishedAt: '2026-11-05T03:25:47.623Z' }, painting]);
    assert.deepEqual(titles(merged), ['Walk My 206 Paintings in 3D', 'Warszawska Syrenka'], post.id);
    assert.equal(merged[0].story.href, '/blog/walk-my-paintings-3d-gallery/');
    assert.equal(merged[1].post.id, painting.id);
  }
});

test('painting notes, image paths, and unmatched campaign slugs stay on the index', () => {
  const stories = [{ href: '/blog/live-looping-guitar/', datetime: '2026-10-26', title: 'Layers of Sound: My Live Looping Guitar Setup' }];
  const kept = [
    {
      id: 'campaign-layers-of-sound-live-looping-2026-10-27',
      title: 'Not the story',
      text: 'Poster https://img.tjm.art/blog/live-looping-guitar/live-looping-guitar-poster.jpg',
      productUrl: '/products/something/',
      publishedAt: '2026-10-27T17:00:00.000Z',
    },
    {
      id: 'campaign-future-story-2026-12-01',
      title: 'Future story',
      text: 'https://tjm.art/blog/not-on-the-index/',
      productUrl: '/blog/not-on-the-index/',
      publishedAt: '2026-12-01T18:00:00.000Z',
    },
  ];
  const merged = mergeJournalEntries(stories, kept);
  assert.deepEqual(merged.map(entry => entry.post?.id || entry.story.title), [
    'campaign-future-story-2026-12-01',
    'campaign-layers-of-sound-live-looping-2026-10-27',
    'Layers of Sound: My Live Looping Guitar Setup',
  ]);
});
