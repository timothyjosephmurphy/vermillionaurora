import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { exhibitions, upcoming } from '../src/data/exhibitions.mjs';
import { NEWSLETTER_ENABLED, newsletterAction } from '../src/data/newsletter.mjs';

const page = fs.readFileSync('src/pages/exhibitions/index.astro', 'utf8');
const signup = fs.readFileSync('src/components/EmailSignup.astro', 'utf8');

test('Ghost Gallery Holiday Mini Show is the one current show and Sip & Stroll stays one past show', () => {
  assert.deepEqual(upcoming.map(show => show.slug), ['ghost-gallery-holiday-mini']);
  const ghost = upcoming[0];
  assert.equal(ghost.title, 'Ghost Gallery Holiday Mini Show');
  assert.equal(ghost.start, '2026-11-27');
  assert.equal(ghost.dates, 'Reception Friday, November 27, 2026, 5–8 PM PT');
  assert.equal(ghost.venue, 'Ghost Gallery, 600 Pine St, Suite 253 (second floor of Pacific Place), Seattle');

  const ghostEntries = exhibitions.filter(show => show.slug === 'ghost-gallery-holiday-mini');
  assert.equal(ghostEntries.length, 1);
  assert.equal(ghostEntries[0].title, '20th Annual Holiday Mini Art Exhibit');
  assert.equal(ghostEntries[0].venue, 'Ghost Gallery, Pacific Place');

  assert.equal(exhibitions.some(show => show.slug === 'waa-sip-and-stroll'), false);
  const sipEntries = exhibitions.filter(show => show.slug === 'woodinville-sip-and-stroll');
  assert.equal(sipEntries.length, 1);
  const sip = sipEntries[0];
  assert.equal(sip.title, 'Woodinville Arts Alliance 2026 Sip & Stroll');
  assert.equal(sip.year, 'Nov 13–15, 2026');
  assert.equal(sip.href, undefined);
  assert.equal(sip.venue, 'The Winemakers Reserve');
  assert.equal(sip.location, 'Woodinville, Washington');
  assert.deepEqual(sip.related.map(item => [item.href, item.label]), [
    ['/products/strawberry-point-2/', 'Third Place Overall for the watercolor Strawberry Point Backpacking Trip #2'],
    ['/blog/third-place-sip-and-stroll-ghost-gallery/', 'Third Place at the Sip & Stroll'],
  ]);

  const pastSlugs = exhibitions.filter(show => !upcoming.some(item => item.slug === show.slug)).map(show => show.slug);
  assert.deepEqual(pastSlugs.filter(slug => slug === 'ghost-gallery-holiday-mini'), []);
  assert.deepEqual(pastSlugs.filter(slug => slug === 'woodinville-sip-and-stroll'), ['woodinville-sip-and-stroll']);
  assert.ok(pastSlugs.includes('bitcoin-film-festival-warsaw'));
  assert.ok(exhibitions.some(show => show.slug === 'victrola'));
  assert.ok(exhibitions.some(show => show.slug === 'living-room'));
});

test('homepage Studio 601 card shows the whole flyer', () => {
  const home = fs.readFileSync('src/pages/index.astro', 'utf8');
  const tag = home.match(/<img src="\/exhibitions\/studio-601-hero\.png"[^>]*>/);
  assert.ok(tag, 'homepage exhibitions carousel uses the Studio 601 flyer');
  assert.match(tag[0], /object-fit:\s*contain/);
  assert.match(tag[0], /object-position:\s*center/);
  // The exhibitions index card is a 4:3 room photograph (IMG_4532), already the
  // same shape as that grid. contain there would not fix the homepage crop.
  const studio = exhibitions.find(show => show.slug === 'studio-601');
  assert.equal(studio.image, 'https://media.vermillionaurora.com/images/Ex-Studio-601/IMG_4532.jpeg');
  assert.equal(studio.contain, undefined);
});

test('the exhibitions page lists past shows and an email signup form from exhibition data', () => {
  const formAt = page.indexOf('id="exhibitions-email"');
  const pastAt = page.indexOf('id="past-shows-heading"');
  const gridAt = page.indexOf('exhibition-index-grid');
  assert.ok(formAt > 0 && pastAt > formAt && gridAt > pastAt);
  assert.match(page, /upcoming\.length>0/);
  assert.match(page, /pastShows\.map/);
  assert.match(page, /upcoming\.some\(show => show\.slug === ex\.slug\)/);
  assert.match(page, /href=\{`\/exhibitions\/\$\{show\.slug\}\/`\}/);
  assert.doesNotMatch(page, /exhibitionHref|ex\.href/);
  assert.match(page, /<EmailSignup id="exhibitions-email"/);
  assert.match(signup, /<label for=\{id\}>Email address<\/label>/);
  assert.match(signup, /type="email"/);
  assert.match(signup, /autocomplete="email"/);
  assert.match(signup, /required/);
  assert.match(page, /One print at cost when you join/);
  assert.doesNotMatch(page, /Sip & Stroll|pick up November/);
  assert.match(page, /Bitcoin Film Festival Warsaw, Victrola, and more/);
  assert.doesNotMatch(page, /Ghost Gallery|Carré|carre-dartistes|ghost-gallery-minis/);
  assert.equal(NEWSLETTER_ENABLED, true);
  assert.equal(newsletterAction, '/newsletter/subscribe');
  assert.match(signup, /action=\{newsletterAction\}/);
  assert.doesNotMatch(signup, /name="embed"/);
});
