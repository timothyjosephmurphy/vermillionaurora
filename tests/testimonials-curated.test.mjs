import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CSP_REPORT_ONLY} from '../worker/security-headers.mjs';
import {curateTestimonials, receivedLabel, renderCuratedTestimonial, testimonials, testimonialPins} from '../src/data/testimonials.mjs';

const CHRIS_VIDEO = 'https://img.tjm.art/testimonials/chris-flanders/chris-flanders-720p.mp4';
const CHRIS_POSTER = 'https://img.tjm.art/testimonials/chris-flanders/chris-flanders-poster.jpg';

const consent = (extra = {}) => ({publish: true, name: true, photo: false, selfie: false, city: false, map: false, video: false, ...extra});

test('Chris Flanders is a landscape video card with no quote, city or map pin', () => {
  assert.equal(testimonials.length, 1);
  const chris = testimonials[0];
  assert.equal(chris.id, '2026-11-chris-flanders');
  assert.equal(chris.name, 'Chris Flanders');
  assert.equal(chris.received, '2026-11-08');
  assert.equal(receivedLabel(chris.received), 'November 8, 2026');
  assert.equal(chris.quote, '');
  assert.equal(chris.city, '');
  assert.equal(chris.pin, null);
  assert.equal(chris.painting, '');
  assert.deepEqual(chris.video, {src: CHRIS_VIDEO, type: 'video/mp4', poster: CHRIS_POSTER, width: 1280, height: 720});
  assert.deepEqual(testimonialPins, []);

  const html = renderCuratedTestimonial(chris);
  const video = html.match(/<video\b[^>]*>/)[0];
  assert.match(video, /\bcontrols\b/);
  assert.match(video, /\bplaysinline\b/);
  assert.match(video, /\bpreload="metadata"/);
  assert.match(video, /\bwidth="1280"/);
  assert.match(video, /\bheight="720"/);
  assert.match(video, new RegExp(`poster="${CHRIS_POSTER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  assert.doesNotMatch(video, /\bautoplay\b/);
  assert.doesNotMatch(video, /\bmuted\b/);
  assert.match(html, /class="testimonial-video testimonial-video-landscape"/);
  assert.match(html, new RegExp(`<source src="${CHRIS_VIDEO.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" type="video/mp4">`));
  assert.match(html, /<strong>Chris Flanders<\/strong><br><time datetime="2026-11-08">November 8, 2026<\/time>/);
  assert.equal(html.includes('<blockquote>'), false);
  assert.equal(html.includes('·'), false);
  assert.match(html, /aria-label="Video from Chris Flanders"/);

  const page = readFileSync(new URL('../src/pages/testimonials.astro', import.meta.url), 'utf8');
  assert.match(page, /testimonials\.map\(renderCuratedTestimonial\)/);
  assert.match(page, /\.testimonial-video\.testimonial-video-landscape video\{[^}]*aspect-ratio:16\/9/);
});

test('curated entries keep quote cards and refuse a video without consent or an off-host file', () => {
  const quote = {
    id: '2026-10-jane-portrait',
    name: 'Jane Doe',
    quote: 'It captures her exactly & <brightly>.',
    painting: 'Portrait of Jane\'s grandmother',
    paintingHref: '/commissions/#portrait',
    photo: '/testimonials/images/jane-painting.webp',
    city: 'Tacoma, WA, USA',
    lat: 47.25,
    lng: -122.44,
    received: '2026-10-06',
    consent: consent({photo: true, city: true, map: true}),
  };
  const [jane] = curateTestimonials([quote]);
  assert.equal(jane.quote, 'It captures her exactly & <brightly>.');
  assert.equal(jane.city, 'Tacoma, WA, USA');
  assert.deepEqual(jane.pin, [47.25, -122.44]);
  assert.equal(jane.video, null);
  assert.equal(jane.received, '2026-10-06');
  const card = renderCuratedTestimonial(jane);
  assert.match(card, /<blockquote><p>“It captures her exactly &amp; &lt;brightly&gt;.”<\/p><\/blockquote>/);
  assert.match(card, /href="\/commissions\/#portrait"/);
  assert.match(card, /<time datetime="2026-10-06">October 6, 2026<\/time>/);
  assert.equal(card.includes('<video'), false);

  const hiddenPlace = curateTestimonials([{...quote, consent: consent({photo: true})}])[0];
  assert.equal(hiddenPlace.city, '');
  assert.equal(hiddenPlace.pin, null);
  assert.equal(hiddenPlace.photo, '/testimonials/images/jane-painting.webp');

  const baseVideo = {src: CHRIS_VIDEO, type: 'video/mp4', poster: CHRIS_POSTER, width: 1280, height: 720};
  const unpublished = curateTestimonials([{id: '2026-11-chris-flanders', name: 'Chris Flanders', video: baseVideo, consent: consent({publish: false, video: true})}]);
  assert.deepEqual(unpublished, []);
  const noVideoConsent = curateTestimonials([{id: '2026-11-chris-flanders', name: 'Chris Flanders', video: baseVideo, consent: consent()}]);
  assert.deepEqual(noVideoConsent, []);
  const offHost = curateTestimonials([{id: '2026-11-chris-flanders', name: 'Chris Flanders', video: {...baseVideo, src: 'https://evil.example/a.mp4'}, consent: consent({video: true})}]);
  assert.deepEqual(offHost, []);
  const anonymous = curateTestimonials([{id: '2026-11-chris-flanders', anonymous: true, name: 'Chris Flanders', video: baseVideo, consent: consent({video: true})}])[0];
  assert.equal(anonymous.name, 'A collector');
  assert.equal(anonymous.video.src, CHRIS_VIDEO);
});

test('report-only CSP allows testimonials media and posters from img.tjm.art', () => {
  const directive = name => CSP_REPORT_ONLY.split(';').map(part => part.trim()).find(part => part.startsWith(`${name} `));
  for (const name of ['media-src', 'img-src']) {
    const part = directive(name);
    assert.ok(part, name);
    assert.ok(part.includes('https://img.tjm.art'), part);
  }
  const headers = readFileSync(new URL('../static/_headers', import.meta.url), 'utf8');
  assert.ok(headers.includes(`Content-Security-Policy-Report-Only: ${CSP_REPORT_ONLY}`));
  assert.equal(headers.includes('Content-Security-Policy:'), false);
});
