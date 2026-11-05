import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readRoomSettings, writeRoomSettings, ROOM_KEY} from '../neural-dance/room-lab.js';
import {applyLiveShow, readLiveShow, writeLiveShow, LIVE_KEY, LIVE_DEFAULTS} from '../neural-dance/live-show.js';

const page = readFileSync(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8');
const show = readFileSync(new URL('../neural-dance/live-show.js', import.meta.url), 'utf8');

function memory() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
}

test('the live page is a full-screen stage with room music and camera, and no site chrome', () => {
  assert.match(page, /<meta name="robots" content="noindex"/);
  assert.doesNotMatch(page, /SiteHeader|site-header|SiteFooter|<footer|class="main-nav"/);
  assert.match(page, /id="nd-room-lab"/);
  assert.match(page, /id="nd-room-projector"/);
  assert.match(page, /id="nd-camera-mode"/);
  assert.match(page, /data-action="listen"/);
  assert.match(page, />Listen</);
  assert.match(page, /data-action="play"/);
  assert.match(page, /Align projector/);
  assert.match(page, /data-add-dancer/);
  assert.match(page, /width="1000" height="620"/);
  assert.match(page, /Kick sensitivity/);
  assert.match(page, /Bass sensitivity/);
  assert.match(page, /Snare sensitivity/);
  assert.match(page, /Hi-hat sensitivity/);
  assert.match(page, /Gravity/);
  assert.match(page, /Wander/);
  assert.match(page, /Threshold/);
  assert.match(page, /Peak hold/);
  assert.match(page, /data-spectrum/);
  assert.match(page, /data-preview/);
  assert.match(page, /playsinline/);
  assert.match(page, /data-action="calibrate"/);
  assert.match(page, /data-action="camera"/);
  assert.match(page, /Hue tolerance/);
  assert.match(page, /Saturation sensitivity/);
  assert.match(page, /Minimum blob size/);
  assert.match(page, /data-live="fullscreen"/);
  assert.match(page, /data-live="hide"/);
  assert.match(page, /data-live="collapse"/);
  assert.match(page, /data-live="preview"/);
  assert.match(page, /data-live="reveal"/);
  assert.match(page, /Quiet threshold/);
  assert.match(page, /data-control="quiet"/);
  assert.match(page, /aria-label="Quiet threshold"/);
  assert.match(page, /data-floor/);
  assert.match(page, /noise floor/);
  assert.match(page, /live waveform of the band it dances to/);
  assert.match(page, /\/neural-dance\/silence-gate\.js/);
  assert.match(page, /\/neural-dance\/wave-ring\.js/);
  assert.match(page, /\/neural-dance\/room-lab\.js/);
  assert.match(page, /\/neural-dance\/camera-markers\.js/);
  assert.match(page, /\/neural-dance\/live-show\.js/);
  assert.match(page, /maptastic\.js/);
  assert.match(page, /iPhone \(3\) Camera/);
  assert.doesNotMatch(page, /getUserMedia[\s\S]{0,80}video:\s*true/);
  assert.match(show, /requestFullscreen/);
  assert.match(show, /localStorage/);
  const room = page.indexOf('id="nd-room-lab"');
  const camera = page.indexOf('id="nd-camera-mode"');
  assert.ok(room > 0 && camera > room);
  assert.ok(page.indexOf('id="nd-room-projector"') < page.indexOf('id="nd-live-dock"'));
});

test('room sliders and the live chrome round-trip through localStorage', () => {
  const storage = memory();
  assert.equal(readRoomSettings(storage), null);
  assert.equal(writeRoomSettings(storage, {
    gravity: 4.2,
    wander: 0.4,
    threshold: 1.2,
    peak: 3.5,
    type: 2,
    quiet: 0.2,
    sens: [0.5, 1, 2.5, 0]
  }), true);
  const saved = readRoomSettings(storage);
  assert.equal(saved.gravity, 4.2);
  assert.equal(saved.wander, 0.4);
  assert.equal(saved.threshold, 1.2);
  assert.equal(saved.peak, 3.5);
  assert.equal(saved.type, 2);
  assert.equal(saved.quiet, 0.2);
  assert.deepEqual(saved.sens, [0.5, 1, 2.5, 0]);
  storage.setItem(ROOM_KEY, JSON.stringify({gravity: 99, wander: -1, threshold: 0, peak: 12, type: 8, quiet: 2, sens: [9, -1]}));
  const clamped = readRoomSettings(storage);
  assert.equal(clamped.gravity, 6);
  assert.equal(clamped.wander, 0);
  assert.equal(clamped.threshold, 1);
  assert.equal(clamped.peak, 6);
  assert.equal(clamped.type, 3);
  assert.equal(clamped.quiet, 0.4);
  assert.deepEqual(clamped.sens, [3, 0, 1, 1]);
  storage.setItem(ROOM_KEY, '{');
  assert.equal(readRoomSettings(storage), null);

  assert.deepEqual(readLiveShow(storage), LIVE_DEFAULTS);
  assert.equal(writeLiveShow(storage, {collapsed: true, hidden: true, preview: false}), true);
  assert.deepEqual(readLiveShow(storage), {collapsed: true, hidden: true, preview: false});
  assert.equal(storage.getItem(LIVE_KEY).includes('"preview":false'), true);
  const classes = new Set();
  const texts = {};
  const doc = {
    body: {classList: {toggle(name, on) { if (on) classes.add(name); else classes.delete(name); }}},
    querySelector(sel) {
      const key = sel.match(/data-live="([^"]+)"/)[1];
      texts[key] = texts[key] || {hidden: true, setAttribute(n, v) { this[n] = v; }, textContent: ''};
      return texts[key];
    }
  };
  applyLiveShow(doc, readLiveShow(storage));
  assert.equal(classes.has('nd-live-collapsed'), true);
  assert.equal(classes.has('nd-live-hidden'), true);
  assert.equal(classes.has('nd-live-preview-off'), true);
  assert.equal(texts.collapse.textContent, 'Show controls');
  assert.equal(texts.collapse['aria-expanded'], 'false');
  assert.equal(texts.preview.textContent, 'Preview off');
  assert.equal(texts.reveal.hidden, false);
});
