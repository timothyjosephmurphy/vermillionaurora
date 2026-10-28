import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { exhibitions, upcoming } from '../src/data/exhibitions.mjs';
import { BUTTONDOWN_USERNAME, newsletterAction } from '../src/data/newsletter.mjs';

const page = fs.readFileSync('src/pages/exhibitions/index.astro', 'utf8');
const signup = fs.readFileSync('src/components/EmailSignup.astro', 'utf8');

test('upcoming shows are the known calendar, soonest first, without invented street addresses', () => {
  assert.deepEqual(upcoming.map(show => show.id), ['carre-dartistes', 'ghost-gallery-minis', 'waa-sip-and-stroll']);
  assert.deepEqual(upcoming.map(show => show.start), ['2026-10-30', '2026-11-02', '2026-11-13']);

  const carre = upcoming[0];
  assert.equal(carre.title, "Carré d'artistes");
  assert.match(carre.dates, /Pieces ready by October 30, 2026/);
  assert.equal(carre.venue, 'Venue to be confirmed');

  const ghost = upcoming[1];
  assert.equal(ghost.title, 'Ghost Gallery minis');
  assert.match(ghost.dates, /November 2[–-]5, 2026/);
  assert.equal(ghost.end, '2026-11-05');
  assert.match(ghost.venue, /Ghost Gallery, Seattle/);

  const waa = upcoming[2];
  assert.equal(waa.title, 'WAA Sip & Stroll');
  assert.match(waa.dates, /Deliver November 13, 2026/);
  assert.match(waa.dates, /pick up November 14, 2026/);
  assert.equal(waa.end, '2026-11-14');
  assert.match(waa.venue, /The Winemakers Reserve, Woodinville, Washington/);
  assert.match(waa.note, /Woodinville Arts Alliance/);

  for (const show of upcoming) {
    assert.doesNotMatch(`${show.venue} ${show.note || ''}`, /\d{2,}/, show.id);
    assert.doesNotMatch(`${show.venue} ${show.note || ''}`, /Sedona|Pine St|Pacific Place|98072/i, show.id);
  }

  assert.ok(exhibitions.some(show => show.slug === 'bitcoin-film-festival-warsaw'));
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

test('the exhibitions page lists upcoming shows and a Buttondown form above past shows', () => {
  const upcomingAt = page.indexOf('id="upcoming-heading"');
  const formAt = page.indexOf('id="exhibitions-email"');
  const pastAt = page.indexOf('id="past-shows-heading"');
  const gridAt = page.indexOf('exhibition-index-grid');
  assert.ok(upcomingAt > 0 && formAt > upcomingAt && pastAt > formAt && gridAt > pastAt);
  assert.match(page, /upcoming\.map/);
  assert.match(page, /exhibitions\.map/);
  assert.match(page, /<EmailSignup id="exhibitions-email"/);
  assert.match(page, /aria-labelledby="upcoming-heading"/);
  assert.match(page, /<time datetime=\{show\.start\}>/);
  assert.match(signup, /<label for=\{id\}>Email address<\/label>/);
  assert.match(signup, /type="email"/);
  assert.match(signup, /autocomplete="email"/);
  assert.match(signup, /required/);
  assert.match(page, /One print at cost when you join/);
  assert.equal(BUTTONDOWN_USERNAME, 'timothyjosephmurphy');
  assert.equal(newsletterAction, '/newsletter/subscribe');
  assert.match(signup, /action=\{newsletterAction\}/);
  assert.doesNotMatch(signup, /name="embed"/);
});
