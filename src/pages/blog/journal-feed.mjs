// The blog index mixes hand-written stories with notes from the Nostr publisher.
// A note that announces a story already on the index is the same post, so it is
// left off the index. The story card stays.

const FEED_URL = 'https://vermillion-nostr-publisher.timothyjosephmurphy.workers.dev/blog';
const BLOG_HOSTS = new Set(['tjm.art', 'vermillionaurora.com']);
const CAMPAIGN_ID = /^campaign-(.+)-\d{4}-\d{2}-\d{2}$/;

export function blogSlugFromUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  let url;
  try {
    url = new URL(raw, 'https://tjm.art');
  } catch {
    return '';
  }
  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  if (!BLOG_HOSTS.has(host)) return '';
  const match = url.pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
  return match ? match[1].toLowerCase() : '';
}

function blogSlugsInText(value) {
  const slugs = [];
  const text = String(value || '');
  for (const match of text.matchAll(/https?:\/\/(?:www\.)?(?:tjm\.art|vermillionaurora\.com)\/blog\/([a-z0-9-]+)\/?/gi)) {
    slugs.push(match[1].toLowerCase());
  }
  return slugs;
}

export function campaignSlug(id) {
  const match = String(id || '').match(CAMPAIGN_ID);
  return match ? match[1] : '';
}

function storySlugs(staticStories) {
  const slugs = new Set();
  for (const story of staticStories || []) {
    if (story?.slug) slugs.add(String(story.slug).toLowerCase());
    const hrefs = story?.hrefs || (story?.href ? [story.href] : []);
    for (const href of hrefs) {
      const slug = blogSlugFromUrl(href);
      if (slug) slugs.add(slug);
    }
  }
  return slugs;
}

// A note announces an indexed story when its content or link points at that
// story's tjm.art/blog/<slug> URL, or when its campaign id is campaign-<slug>-date.
export function nostrPostAnnouncesStory(post, slugs) {
  const known = slugs instanceof Set ? slugs : new Set(slugs || []);
  if (!known.size || !post) return false;
  for (const field of [post.productUrl, post.link, post.url]) {
    const slug = blogSlugFromUrl(field);
    if (slug && known.has(slug)) return true;
  }
  for (const field of [post.text, post.xText, post.facebookText, post.instagramText, post.content]) {
    for (const slug of blogSlugsInText(field)) {
      if (known.has(slug)) return true;
    }
  }
  const slug = campaignSlug(post.id);
  return Boolean(slug && known.has(slug));
}

export function dedupeNostrAnnouncements(posts, slugs) {
  return (Array.isArray(posts) ? posts : []).filter(post => !nostrPostAnnouncesStory(post, slugs));
}

// Newest first. Static story cards stay; announcing notes are omitted.
export function mergeJournalEntries(staticStories, nostrPosts) {
  const stories = staticStories || [];
  const incoming = dedupeNostrAnnouncements(nostrPosts, storySlugs(stories));
  return [
    ...stories.map(story => ({ story, time: Date.parse(story.datetime || '') || 0 })),
    ...incoming.map(post => ({ post, time: Date.parse(post.publishedAt) || 0 })),
  ].sort((a, b) => b.time - a.time);
}

function makeEntry(post) {
  const article = document.createElement('article');
  article.className = 'journal-entry';
  const header = document.createElement('header');
  const title = document.createElement('h2');
  title.textContent = post.title;
  const date = document.createElement('time');
  date.dateTime = post.publishedAt;
  date.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(post.publishedAt));
  header.append(title, date);
  const imageLink = document.createElement('a');
  imageLink.className = 'journal-image-link';
  imageLink.href = post.productUrl || post.imageUrl;
  imageLink.setAttribute('aria-label', 'View ' + post.title);
  const image = document.createElement('img');
  image.src = post.imageUrl;
  image.alt = post.title;
  image.loading = 'lazy';
  image.decoding = 'async';
  imageLink.append(image);
  const story = document.createElement('div');
  story.className = 'journal-copy';
  // Compact card: a short description only; the full text lives on the painting page / Nostr note.
  const firstParagraph = (post.text.split(/\n\s*\n/).find(Boolean) || '').trim();
  const summary = document.createElement('p');
  summary.textContent = firstParagraph.length > 180 ? firstParagraph.slice(0, 177).replace(/\s+\S*$/, '') + '…' : firstParagraph;
  story.append(summary);
  const links = document.createElement('div');
  links.className = 'journal-links';
  const product = document.createElement('a');
  product.href = post.productUrl;
  product.textContent = 'View this painting →';
  links.append(product);
  if (post.noteUrl) {
    const note = document.createElement('a');
    note.href = post.noteUrl;
    note.target = '_blank';
    note.rel = 'noopener noreferrer';
    note.textContent = 'Read the Nostr post ↗';
    links.append(note);
  }
  article.append(header, imageLink, story, links);
  return article;
}

export function startJournalFeed() {
  const statusNode = document.getElementById('journal-status');
  const entriesNode = document.getElementById('journal-entries');
  if (!statusNode || !entriesNode) return;
  fetch(FEED_URL, { headers: { Accept: 'application/json' } })
    .then(response => {
      if (!response.ok) throw new Error('feed unavailable');
      return response.json();
    })
    .then(data => {
      const stories = Array.isArray(data.posts) ? data.posts : [];
      const staticStories = Array.from(entriesNode.querySelectorAll('[data-static-story]')).map(node => ({
        node,
        hrefs: [...node.querySelectorAll('a[href]')].map(anchor => anchor.getAttribute('href')),
        datetime: node.querySelector('time')?.getAttribute('datetime') || '',
      }));
      const merged = mergeJournalEntries(staticStories, stories);
      entriesNode.replaceChildren(...merged.map(entry => entry.story ? entry.story.node : makeEntry(entry.post)));
      statusNode.textContent = stories.length || staticStories.length ? '' : 'New stories are on the way. Please check back soon.';
    })
    .catch(() => {
      statusNode.textContent = entriesNode.querySelector('[data-static-story]') ? '' : 'The story feed is temporarily unavailable. Please check back shortly.';
    });
}
