import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CALIBRATION_MARKERS} from '../neural-dance/camera-markers.js';
import {beginAlign} from '../neural-dance/live-show.js';

function calibrationFrame() {
  const width = 160;
  const height = 90;
  const data = new Uint8ClampedArray(width * height * 4);
  data.fill(30);
  const colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]];
  CALIBRATION_MARKERS.forEach((marker, index) => {
    const cx = Math.round(marker.x * width);
    const cy = Math.round(marker.y * height);
    for (let y = cy - 4; y <= cy + 4; y++) {
      for (let x = cx - 4; x <= cx + 4; x++) {
        const i = (y * width + x) * 4;
        data[i] = colors[index][0];
        data[i + 1] = colors[index][1];
        data[i + 2] = colors[index][2];
        data[i + 3] = 255;
      }
    }
  });
  return {data, width, height, scale: {scaleX: 1, scaleY: 1}, videoWidth: width, videoHeight: height};
}

test('Align projector starts the camera, enables markers, and keeps the banner outside the dock', async () => {
  const frame = calibrationFrame();
  let grabs = 0;
  const cam = {
    started: false,
    markers: false,
    async ensureCamera() { this.started = true; },
    grabFrame() {
      grabs += 1;
      return grabs === 1 ? null : frame;
    },
    setNormalizedCorners() { return true; },
    setMarkersEnabled(on) { this.markers = on; return on; },
    cancelCalibration() {}
  };
  const classes = new Set();
  const banner = {hidden: true, textContent: '', dataset: {}};
  const outline = {hidden: true};
  const pattern = {hidden: true};
  const align = {textContent: 'Align projector', setAttribute() {}, getAttribute() { return null; }};
  const status = {textContent: ''};
  const doc = {
    body: {classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); }
    }},
    getElementById(id) {
      if (id === 'nd-room-lab') return {querySelector(sel) { return sel.includes('align') ? align : status; }};
      if (id === 'nd-camera-mode') return {neuralDanceCamera: cam};
      return null;
    },
    querySelector(sel) {
      if (sel.includes('data-align-banner')) return banner;
      if (sel.includes('cal-pattern')) return pattern;
      if (sel.includes('lock-outline')) return outline;
      if (sel.includes('exit-align')) return {hidden: true};
      return null;
    }
  };
  const queued = [];
  const original = global.setTimeout;
  global.setTimeout = (fn) => { queued.push(fn); return queued.length; };
  try {
    await beginAlign(doc);
    assert.equal(cam.started, true);
    assert.equal(pattern.hidden, false);
    assert.match(banner.textContent, /Aligning camera to projector grid/);
    assert.equal(banner.hidden, false);
    const tick = queued.shift();
    assert.equal(typeof tick, 'function');
    tick();
  } finally {
    global.setTimeout = original;
  }
  assert.equal(cam.markers, true);
  assert.match(banner.textContent, /Camera aligned to grid/);
  const page = readFileSync(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8');
  const bannerAt = page.indexOf('data-align-banner');
  const dockAt = page.indexOf('id="nd-live-dock"');
  assert.ok(bannerAt > 0 && bannerAt < dockAt, 'the banner is not inside the dock');
  assert.match(page, /\[data-align-banner\]\{position:fixed/);
  assert.doesNotMatch(page, /nd-live-hidden \[data-align-banner\]/);
  const show = readFileSync(new URL('../neural-dance/live-show.js', import.meta.url), 'utf8');
  const camera = readFileSync(new URL('../neural-dance/camera-markers.js', import.meta.url), 'utf8');
  assert.match(show, /ensureCamera/);
  assert.match(camera, /facingMode: \{ideal: 'environment'\}/);
  assert.match(camera, /nd\.camera\.v2/);
});