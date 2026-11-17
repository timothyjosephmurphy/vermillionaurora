import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { exhibitions, upcoming } from '../src/data/exhibitions.mjs';
import { BUTTONDOWN_USERNAME, newsletterAction } from '../src/data/newsletter.mjs';

const page = fs.readFileSync('src/pages/exhibitions/index.astro', 'utf8');
const signup = fs.readFileSync('src/components/EmailSignup.astro', 'utf8');

test('no show is listed as upcoming after WAA Sip & Stroll', () => {
  assert.deepEqual(upcoming, []);

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

test('the exhibitions page lists past shows and a Buttondown form, with no upcoming show', () => {
  const formAt = page.indexOf('id="exhibitions-email"');
  const pastAt = page.indexOf('id="past-shows-heading"');
  const gridAt = page.indexOf('exhibition-index-grid');
  assert.ok(formAt > 0 && pastAt > formAt && gridAt > pastAt);
  assert.match(page, /upcoming\.length>0/);
  assert.match(page, /exhibitions\.map/);
  assert.match(page, /<EmailSignup id="exhibitions-email"/);
  assert.match(signup, /<label for=\{id\}>Email address<\/label>/);
  assert.match(signup, /type="email"/);
  assert.match(signup, /autocomplete="email"/);
  assert.match(signup, /required/);
  assert.match(page, /One print at cost when you join/);
  assert.doesNotMatch(page, /Sip & Stroll|pick up November/);
  assert.match(page, /Bitcoin Film Festival Warsaw, Victrola, and more/);
  assert.doesNotMatch(page, /Ghost Gallery|Carré|carre-dartistes|ghost-gallery-minis/);
  assert.equal(BUTTONDOWN_USERNAME, 'timothyjosephmurphy');
  assert.equal(newsletterAction, '/newsletter/subscribe');
  assert.match(signup, /action=\{newsletterAction\}/);
  assert.doesNotMatch(signup, /name="embed"/);
});
