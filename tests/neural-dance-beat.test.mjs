import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beatFlash, beatLabel, createBeatClock} from '../neural-dance/beat-clock.js';

test('each band owns one beat in the bar', () => {
  assert.deepEqual([0, 1, 2, 3].map(beatLabel), ['1', '2', '3', '4']);
  assert.equal(beatFlash(1, 0, 0), 1);
  assert.equal(beatFlash(1, 0.3, 0), 0);
  assert.equal(beatFlash(1, 0, 2), 0);
  assert.ok(beatFlash(2, 0.1, 1) > 0.5);
  assert.equal(beatFlash(4, 0, 3), 1);
  assert.equal(beatFlash(3, 0, 3), 0);
});

test('kick onsets set the tempo and lock beat 1', () => {
  const clock = createBeatClock({bpm: 100, now: 0});
  clock.onset(0, 1000);
  clock.onset(0, 1500);
  clock.onset(0, 2000);
  assert.equal(clock.bpm(), 120);
  assert.equal(clock.at(2000).beat, 1);
  assert.ok(clock.at(2000).frac < 0.001);
  assert.equal(clock.flash(0, 2000), 1);
  assert.equal(clock.flash(1, 2000), 0);
  assert.equal(clock.readout(2000), '120 BPM · 1');
  const beat2 = 2000 + 60000 / 120;
  assert.equal(clock.at(beat2).beat, 2);
  assert.equal(clock.flash(1, beat2), 1);
  assert.equal(clock.label(1), '2');
});

test('a quiet clock still counts, and a later band can start the bar', () => {
  const clock = createBeatClock({bpm: 120, now: 0});
  assert.equal(clock.readout(0), '120 BPM · 1');
  clock.onset(2, 5000);
  assert.equal(clock.at(5000).beat, 3);
  assert.equal(clock.flash(2, 5000), 1);
});

test('the live dock shows the beat and the ring keeps an additive waveform', () => {
  const page = readFileSync(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8');
  const room = readFileSync(new URL('../neural-dance/room-lab.js', import.meta.url), 'utf8');
  const ring = readFileSync(new URL('../neural-dance/wave-ring.js', import.meta.url), 'utf8');
  const dock = page.slice(page.indexOf('id="nd-live-dock"'), page.indexOf('data-live-details'));
  assert.match(dock, /data-beat/);
  assert.match(dock, /120 BPM/);
  assert.match(room, /beatClock\.flash/);
  assert.match(room, /beatClock\.label/);
  assert.match(room, /data-beat/);
  assert.match(ring, /function bloomStroke/);
  assert.match(ring, /NeuralDanceRings = \{[^}]*bloomStroke/);
  assert.match(ring, /globalCompositeOperation = 'lighter'/);
  assert.match(ring, /lineWidth = 2\.5/);
  assert.match(ring, /new Path2D/);
  assert.doesNotMatch(ring, /shadowBlur/);
  new Function(ring)();
  assert.equal(typeof globalThis.NeuralDanceRings.bloomStroke, 'function');
});
