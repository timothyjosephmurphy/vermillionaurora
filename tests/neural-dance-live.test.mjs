import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readRoomSettings, writeRoomSettings, ROOM_KEY, formatDancerCount, paintStageMarkers, combineDancerStickers, markerStickerId} from '../neural-dance/room-lab.js';
import {applyLiveShow, readLiveShow, writeLiveShow, LIVE_KEY, LIVE_DEFAULTS, ALIGN_SETTLE_MS} from '../neural-dance/live-show.js';

const page = readFileSync(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8');
const studio = readFileSync(new URL('../src/pages/neural-dance/index.astro', import.meta.url), 'utf8');
const show = readFileSync(new URL('../neural-dance/live-show.js', import.meta.url), 'utf8');
const roomJs = readFileSync(new URL('../neural-dance/room-lab.js', import.meta.url), 'utf8');

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
  assert.match(page, /Hue range \(higher = wider color match\)/);
  assert.match(page, /Note sensitivity \(higher = fainter notes\)/);
  assert.match(page, /Smallest note size \(lower = detects smaller notes\)/);
  assert.match(page, /data-camera-flip/);
  assert.match(page, /Reset defaults/);
  assert.match(page, /data-mode="both"/);
  assert.match(page, /Dancer stickers/);
  assert.match(page, /Sticker sensitivity \(higher = fainter stickers\)/);
  assert.match(page, /data-align-banner/);
  assert.match(page, /data-align-lock-outline/);
  assert.match(page, /data-live="fullscreen"/);
  assert.match(page, /data-live="hide"/);
  assert.match(page, /data-live="collapse"/);
  assert.match(page, /data-live="preview"/);
  assert.match(page, /data-live="reveal"/);
  assert.match(page, /data-live="exit-align"/);
  assert.match(page, /Exit align/);
  assert.match(page, /data-cal-pattern/);
  assert.match(page, /Fine-tune corners/);
  assert.match(page, /position:fixed;inset:0/);
  assert.doesNotMatch(page, /grid-template-areas:"tools tools" "camera stage" "sliders sliders"/);
  assert.match(page, /background-color:transparent/);
  assert.doesNotMatch(page, /\.nd-cal-pattern\{[^}]*background:#fff/);
  assert.match(show, /findCalibrationMarkers/);
  assert.match(show, /stopImmediatePropagation/);
  assert.match(page, /Quiet threshold/);
  assert.match(page, /data-control="quiet"/);
  assert.match(page, /aria-label="Quiet threshold"/);
  assert.match(page, /data-floor/);
  assert.match(page, /noise floor/);
  assert.doesNotMatch(page, /class="mural-help"/);
  assert.doesNotMatch(page, /The dancers fill the screen/);
  assert.doesNotMatch(page, /Continuity Camera shows up/);
  assert.match(page, /safe-area-inset-top/);
  assert.match(page, /data-marker-clear/);
  assert.match(page, /Clear markers/);
  assert.match(page, /data-camera-tune/);
  assert.match(page, />Tune</);
  assert.match(page, /nd-live-collapsed/);
  assert.match(page, /height:78px/);
  assert.match(page, /#nd-camera-mode \.viz-controls\{display:none\}/);
  assert.match(studio, /class="mural-help"/);
  assert.match(page, /\/neural-dance\/silence-gate\.js/);
  assert.match(page, /\/neural-dance\/wave-ring\.js/);
  assert.match(page, /\/neural-dance\/room-lab\.js/);
  assert.match(page, /\/neural-dance\/camera-markers\.js/);
  assert.match(page, /\/neural-dance\/live-show\.js/);
  assert.match(page, /maptastic\.js/);
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

test('room status names simulated dancers and camera stickers on both pages', () => {
  assert.equal(formatDancerCount(25, 0), '25 dancers (25 sim, 0 stickers)');
  assert.equal(formatDancerCount(25, 1), '25 dancers (24 sim, 1 sticker)');
  assert.equal(formatDancerCount(25, 2), '25 dancers (23 sim, 2 stickers)');
  assert.equal(formatDancerCount(1, 1), '1 dancers (0 sim, 1 sticker)');
  assert.equal(formatDancerCount(3, 5), '3 dancers (0 sim, 5 stickers)');
  const listening = 'Listening · ' + formatDancerCount(25, 1) + ' · 37 pulses';
  assert.equal(listening, 'Listening · 25 dancers (24 sim, 1 sticker) · 37 pulses');
  assert.match(listening, /Listening · /);
  assert.match(listening, /25 dancers/);
  assert.match(listening, /pulses/);
  assert.match(roomJs, /formatDancerCount\(api\.nd_count\(\),markerCount\(\)\)/);
  assert.match(roomJs, /'Listening · '/);
  assert.match(roomJs, /rings\.gate=gate/);
  assert.match(roomJs, /rings\.rippling/);
  assert.match(roomJs, /rings\.stroke\(ctx,p\.x,p\.y,radius\*2\.15,k,colors\[k\],low\)/);
  assert.match(roomJs, /#5ce1e6/);
  assert.match(roomJs, /#ffd166/);
  assert.match(roomJs, /#7fe8b3/);
  assert.match(roomJs, /#81b7fc/);
  assert.match(roomJs, /#080910/);
  assert.match(roomJs, /kind==='sticker'/);
  assert.match(roomJs, /createRadialGradient/);
  assert.match(roomJs, /12\*scale/);
  assert.match(roomJs, /paintStageMarkers\(ctx,root\._markers,xy,scale\)/);
  assert.match(roomJs, /setMarkers\(list\)\{[\s\S]*still\(\)/);
  assert.equal(LIVE_DEFAULTS.collapsed, true);
  const fills = [];
  const strokes = [];
  const ctx = {
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    createRadialGradient() { return {addColorStop() {}}; },
    beginPath() {},
    arc() {},
    fill() { fills.push(this.fillStyle); },
    stroke() { strokes.push(this.strokeStyle); }
  };
  paintStageMarkers(ctx, [{x: 10, y: 20, kind: 'sticker'}, {x: 40, y: 50, kind: 'pink'}], (x, y) => ({x, y}), 1);
  assert.ok(fills.includes('#ffe7b0'), 'sticker dot is visible');
  assert.ok(fills.includes('#f4fbff'), 'post-it dot is visible');
  assert.equal(fills.includes('#080910'), false);
  assert.equal(strokes.length, 2);
  assert.equal(ALIGN_SETTLE_MS, 280);
  assert.match(page, /data-action="sim-dancers"/);
  assert.match(page, /data-action="sim-seed"/);
  assert.match(page, /Clear sim dancers/);
  assert.match(page, /Seed 24 sim dancers/);
  assert.match(studio, /data-action="sim-dancers"/);
  assert.match(studio, /Seed 24 sim dancers/);
  assert.match(roomJs, /combineDancerStickers/);
  assert.match(roomJs, /addSimAt\(p\.x,p\.y,kind\)/);
  assert.match(show, /findCalibrationMarkers\(frame\.data, frame\.width, frame\.height, undefined, null\)/);
  const sim = [{id: 7, x: 12, y: 34, type: 1}];
  const markers = [{id: 1, x: 400, y: 200, type: 0, kind: 'sticker'}, {id: 2, x: 610, y: 300, type: 2, kind: 'pink'}];
  const merged = combineDancerStickers(sim, markers);
  assert.equal(merged.length, 3);
  assert.equal(merged.find(dancer => dancer.id === 7).x, 12);
  assert.equal(merged.find(dancer => dancer.id === markerStickerId(1)).x, 400);
  const moved = combineDancerStickers(sim, markers.map(marker => marker.id === 1 ? {...marker, x: 440} : marker));
  assert.equal(moved.find(dancer => dancer.id === 7).x, 12);
  assert.equal(moved.find(dancer => dancer.id === markerStickerId(1)).x, 440);
  assert.equal(combineDancerStickers([], markers).length, 2);
  assert.equal(combineDancerStickers(sim, []).length, 1);
  const box = memory();
  assert.equal(writeRoomSettings(box, {
    gravity: 2.5, wander: 0.25, threshold: 1.4, peak: 2.8, type: 1, quiet: 0.08, sens: [1, 1, 1, 1], sim: []
  }), true);
  const empty = readRoomSettings(box);
  assert.deepEqual(empty.sim, []);
  assert.equal(empty.simDancers, false);
  assert.equal(writeRoomSettings(box, {
    gravity: 2.5, wander: 0.25, threshold: 1.4, peak: 2.8, type: 1, quiet: 0.08, sens: [1, 1, 1, 1],
    sim: [{id: 3, x: 11, y: 22, type: 2}]
  }), true);
  const kept = readRoomSettings(box);
  assert.equal(kept.sim.length, 1);
  assert.equal(kept.sim[0].x, 11);
  assert.equal(kept.simDancers, true);
  for (const source of [page, studio]) {
    assert.match(source, /\/neural-dance\/room-lab\.js/);
    assert.match(source, /\/neural-dance\/wave-ring\.js/);
    assert.match(source, /id="nd-room-lab"/);
    assert.match(source, /data-status/);
  }
});
