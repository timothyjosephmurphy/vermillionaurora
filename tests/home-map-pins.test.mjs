import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projectPin, readApprovedPins, placeTestimonialPins} from '../exhibitions/world-map/live-pins.js';

test('approved pins keep only approximate coordinates and a city label', () => {
  const pins = readApprovedPins({testimonials: [
    {id: 't1', name: 'Jane', email: 'jane@example.com', quote: 'Secret words', city: 'Tokyo', pin: [35.68, 139.76], photos: ['/private']},
    {id: 't2', city: 'Seattle', pin: null},
    {id: 't3', city: 'Nope', pin: [91, 0]},
    {city: 'Lisbon', pin: [38.72, -9.14]},
  ]});
  assert.deepEqual(pins, [
    {id: 't1', city: 'Tokyo', lat: 35.68, lng: 139.76},
    {id: '', city: 'Lisbon', lat: 38.72, lng: -9.14},
  ]);
  assert.equal(JSON.stringify(pins).includes('Secret'), false);
  assert.equal(JSON.stringify(pins).includes('jane@'), false);
});

test('testimonial dots merge when they would overlap and step aside from exhibition pins', () => {
  const tokyo = projectPin(35.68, 139.76);
  assert.ok(Math.abs(tokyo.x - 1047.2) < 0.2 && Math.abs(tokyo.y - 203.8) < 0.2);
  const [one] = placeTestimonialPins([
    {id: 'a', city: 'Tokyo', lat: 35.68, lng: 139.76},
    {id: 'a', city: 'Tokyo', lat: 35.68, lng: 139.76},
    {id: 'b', city: 'Tokyo', lat: 35.70, lng: 139.78},
  ]);
  assert.equal(one.ids.length, 2);
  assert.deepEqual(one.cities, ['Tokyo']);
  const seattle = projectPin(47.6062, -122.3321);
  const [nudged] = placeTestimonialPins(
    [{id: 's', city: 'Seattle', lat: 47.6062, lng: -122.3321}],
    [{x: seattle.x, y: seattle.y}],
  );
  const distance = Math.hypot(nudged.x - seattle.x, nudged.y - seattle.y);
  assert.ok(distance >= 15 && distance <= 17, distance);
  const far = placeTestimonialPins([
    {id: 'm', city: 'Melbourne, Florida', lat: 28.08, lng: -80.61},
    {id: 'n', city: 'St Anthony, MN', lat: 45.69, lng: -94.61},
  ]);
  assert.equal(far.length, 2);
});

test('the exhibitions map and the public list stay fresh enough for a new approval', () => {
  const map = readFileSync(new URL('../exhibitions/world-map/map.js', import.meta.url), 'utf8');
  const live = readFileSync(new URL('../exhibitions/world-map/live-pins.js', import.meta.url), 'utf8');
  const api = readFileSync(new URL('../cloudflare/testimonials.mjs', import.meta.url), 'utf8');
  assert.match(map, /\/testimonials\/api\/approved/);
  assert.match(map, /cache:\s*'no-store'/);
  assert.match(live, /cache:\s*'no-store'/);
  assert.match(api, /max-age=60, must-revalidate/);
  assert.match(api, /rebuildIndex/);
});
