import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sanitizeDebugPatch} from '../neural-dance/debug-protocol.js';
import {applyDebugPatch, collectTelemetry} from '../neural-dance/live-debug.js';
import {DEFAULTS, createMarkerTracker, homographyFromNormalized, markersFromFrame, projectVideoPoint, toDancerMarkers} from '../neural-dance/camera-markers.js';
import {
  PERSON_CLEAR_MS,
  PERSON_PAUSE_NOTE,
  PERSON_STAY_RADIUS,
  createPersonOcclusion,
  gateStickerBlobs,
  isSkinTone,
  personInFrame,
  stickerStagePoints,
  stickersThatStayed,
  syncPersonNote
} from '../neural-dance/src/person-occlusion.js';
import {
  MANUAL_HIT_RADIUS,
  createManualStickers,
  mergeLatchedStickers,
  resolveStageTap
} from '../neural-dance/src/debug-manual-stickers.js';

const livePage = readFileSync(new URL('../src/pages/neural-dance/live/index.astro', import.meta.url), 'utf8');
const debugPage = readFileSync(new URL('../src/pages/neural-dance/debug/index.astro', import.meta.url), 'utf8');
const camera = readFileSync(new URL('../neural-dance/camera-markers.js', import.meta.url), 'utf8');
const viewer = readFileSync(new URL('../neural-dance/debug-viewer.js', import.meta.url), 'utf8');
const publisher = readFileSync(new URL('../neural-dance/live-debug.js', import.meta.url), 'utf8');

function paint(width, height, pixel) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rgb = pixel(x, y);
      const i = (y * width + x) * 4;
      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
      data[i + 3] = 255;
    }
  }
  return data;
}

function fillRect(data, width, x0, y0, w, h, rgb) {
  const height = data.length / 4 / width;
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const i = (y * width + x) * 4;
      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
    }
  }
}

test('a person pauses sticker detection, and only stickers that stayed are latched after the clear wait', () => {
  assert.equal(PERSON_PAUSE_NOTE, 'person in frame, detection paused');
  assert.ok(PERSON_CLEAR_MS >= 1000 && PERSON_CLEAR_MS <= 2000);
  assert.equal(PERSON_STAY_RADIUS, 80);

  const wall = [170, 165, 160];
  const width = 80;
  const height = 60;
  const plain = paint(width, height, () => wall);
  assert.equal(personInFrame(plain, width, height).present, false);

  const sticker = plain.slice();
  fillRect(sticker, width, 10, 10, 6, 6, [20, 18, 16]);
  assert.equal(personInFrame(sticker, width, height).present, false, 'a vinyl-sized dark blob is not a person');

  const note = plain.slice();
  fillRect(note, width, 8, 8, 18, 14, [240, 80, 150]);
  assert.equal(personInFrame(note, width, height).present, false, 'a pink note is not a person');
  assert.equal(isSkinTone(240, 80, 150), false);
  assert.equal(isSkinTone(255, 146, 125), false);

  const dancer = plain.slice();
  fillRect(dancer, width, 20, 10, 30, 30, [255, 146, 125]);
  assert.equal(personInFrame(dancer, width, height).present, false, 'a neon dancer does not pause detection');

  const body = plain.slice();
  fillRect(body, width, 26, 8, 28, 42, [40, 36, 34]);
  const seen = personInFrame(body, width, height);
  assert.equal(seen.present, true);
  assert.ok(seen.bodyFraction >= 0.08);

  const face = plain.slice();
  fillRect(face, width, 30, 16, 14, 16, [200, 150, 120]);
  assert.equal(isSkinTone(200, 150, 120), true);
  assert.equal(personInFrame(face, width, height).present, true, 'a skin-toned face pauses detection');

  const hidden = personInFrame(body, width, height, {
    inside(x, y) { return !(x >= 26 && x < 54 && y >= 8 && y < 50); }
  });
  assert.equal(hidden.present, false, 'a body outside the projection quad is ignored');

  const occlusion = createPersonOcclusion();
  const before = [{x: 100, y: 200}, {x: 400, y: 80}];
  assert.equal(occlusion.observe({person: false, stickers: before, now: 0}).paused, false);
  const paused = occlusion.observe({person: true, stickers: [{x: 10, y: 10}, {x: 900, y: 500}], now: 50});
  assert.equal(paused.paused, true);
  assert.equal(paused.note, PERSON_PAUSE_NOTE);
  assert.equal(paused.rescan, false);
  const settling = occlusion.observe({person: false, stickers: before, now: 200});
  assert.equal(settling.paused, true);
  assert.equal(settling.settling, true);
  assert.equal(settling.note, null);
  assert.equal(occlusion.observe({person: false, stickers: before, now: 200 + PERSON_CLEAR_MS - 1}).rescan, false);
  occlusion.observe({person: true, stickers: [], now: 400});
  const still = occlusion.observe({person: false, stickers: before, now: 500});
  assert.equal(still.settling, true);
  assert.equal(occlusion.observe({person: false, stickers: before, now: 500 + PERSON_CLEAR_MS - 1}).rescan, false);
  const rescanned = occlusion.observe({
    person: false,
    stickers: [{x: 120, y: 210}, {x: 700, y: 400}],
    now: 500 + PERSON_CLEAR_MS
  });
  assert.equal(rescanned.rescan, true);
  assert.equal(rescanned.paused, false);
  assert.equal(rescanned.latch.length, 1);
  assert.equal(rescanned.latch[0].x, 120);
  assert.equal(rescanned.latch[0].y, 210);
  assert.deepEqual(stickersThatStayed([{x: 0, y: 0}], [{x: PERSON_STAY_RADIUS + 1, y: 0}]), []);
  assert.equal(stickersThatStayed([{x: 0, y: 0}], [{x: PERSON_STAY_RADIUS, y: 0}]).length, 1);

  const dropped = gateStickerBlobs(
    [{x: 1, y: 2, kind: 'pink'}, {x: 3, y: 4, kind: 'sticker'}],
    {paused: true, rescan: false}
  );
  assert.deepEqual(dropped.map(blob => blob.kind), ['pink']);
  const kept = gateStickerBlobs(
    [{x: 3, y: 4, kind: 'sticker'}, {x: 30, y: 4, kind: 'sticker'}],
    {paused: false, rescan: true, latch: [{x: 12, y: 8}]},
    (blob) => (blob.x === 3 ? {x: 12, y: 8} : {x: 400, y: 8})
  );
  assert.equal(kept.length, 1);
  assert.equal(kept[0].x, 3);

  const noteEl = {hidden: true, textContent: ''};
  const doc = {querySelector(sel) { return sel === '[data-person-note]' ? noteEl : null; }};
  assert.equal(syncPersonNote(doc, true), true);
  assert.equal(noteEl.hidden, false);
  assert.equal(noteEl.textContent, PERSON_PAUSE_NOTE);
  syncPersonNote(doc, false);
  assert.equal(noteEl.hidden, true);
});

test('the camera hook rescans after a person leaves and permanently latches only stickers that stayed', () => {
  const wall = [157, 117, 96];
  const ink = [100, 104, 93];
  const width = 160;
  const height = 120;
  const cross = (x, y, cx, cy) => (y >= cy && y < cy + 14 && x === cx + 6) || (x >= cx && x < cx + 14 && y === cy + 6);
  const frameOf = (origins) => paint(width, height, (x, y) => origins.some(([cx, cy]) => cross(x, y, cx, cy)) ? ink : wall);
  const H = homographyFromNormalized([{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}], width, height);
  const tracker = createMarkerTracker();
  const occlusion = createPersonOcclusion();
  const settings = {...DEFAULTS, minBlobSize: 8, detectionMode: 'stickers'};
  const scale = {scaleX: 1, scaleY: 1};
  const project = (blob) => projectVideoPoint(H, blob.x, blob.y);
  const home = frameOf([[40, 40]]);
  const preview = markersFromFrame({data: home, width, height}, settings, H, scale, createMarkerTracker(), 0, {latch: false});
  const previewStickers = preview.blobs.filter(blob => blob.kind === 'sticker');
  assert.equal(previewStickers.length, 1, 'the home cross is one sticker');
  function step(data, now, person, book = occlusion, marks = tracker) {
    let decision = null;
    const result = markersFromFrame({data, width, height}, settings, H, scale, marks, now, {
      latch: true,
      beforeLatch(blobs) {
        decision = book.observe({
          person,
          stickers: stickerStagePoints(blobs, project),
          now
        });
        return gateStickerBlobs(blobs, decision, project);
      }
    });
    if (decision && decision.rescan) marks.commitStage((decision.latch || []).map(spot => ({x: spot.x, y: spot.y, kind: 'sticker'})));
    return {
      decision,
      markers: decision && decision.rescan ? toDancerMarkers(marks.stage()) : result.markers
    };
  }
  const first = step(home, 0, false);
  assert.equal(first.decision.paused, false);
  assert.equal(first.markers.length, 0, 'the sticker is seen but not latched before the person arrives');
  const blocked = step(home, 80, true);
  assert.equal(blocked.decision.note, PERSON_PAUSE_NOTE);
  assert.equal(blocked.markers.length, 0);
  const waiting = step(home, 120, false);
  assert.equal(waiting.decision.settling, true);
  assert.equal(waiting.decision.rescan, false);
  const both = frameOf([[40, 40], [110, 78]]);
  const done = step(both, 120 + PERSON_CLEAR_MS, false);
  assert.equal(done.decision.rescan, true);
  assert.equal(done.decision.latch.length, 1, JSON.stringify(done.decision.latch));
  assert.equal(done.markers.length, 1);
  assert.equal(done.markers[0].kind, 'sticker');

  const moved = createPersonOcclusion();
  const movedTracker = createMarkerTracker();
  movedStep(home, 0, false);
  movedStep(home, 10, true);
  const leaving = movedStep(frameOf([[110, 78]]), 40, false);
  assert.equal(leaving.decision.rescan, false);
  assert.equal(leaving.decision.settling, true);
  const shifted = movedStep(frameOf([[110, 78]]), 40 + PERSON_CLEAR_MS, false);
  assert.equal(shifted.decision.rescan, true);
  assert.equal(shifted.decision.latch.length, 0);
  assert.equal(movedTracker.stage().length, 0);

  function movedStep(data, now, person) {
    return step(data, now, person, moved, movedTracker);
  }
});

test('debug stage taps add and remove manual stickers through the existing room patch', () => {
  assert.equal(MANUAL_HIT_RADIUS >= 24, true);
  const empty = resolveStageTap([{id: 3, x: 100, y: 200, kind: 'pink'}], 100, 200);
  assert.equal(empty.action, 'add-manual-sticker');
  assert.equal(empty.x, 100);
  assert.equal(empty.y, 200);
  const book = createManualStickers();
  const added = book.apply(empty);
  assert.equal(added.changed, true);
  assert.equal(added.stickers.length, 1);
  assert.equal(added.stickers[0].manual, true);
  assert.equal(added.stickers[0].kind, 'sticker');
  const near = resolveStageTap(added.stickers, 100 + MANUAL_HIT_RADIUS - 1, 200);
  assert.equal(near.action, 'remove-manual-sticker');
  assert.equal(near.id, added.stickers[0].id);
  const beside = resolveStageTap(added.stickers, 100 + MANUAL_HIT_RADIUS + 2, 200);
  assert.equal(beside.action, 'add-manual-sticker');
  book.apply(beside);
  assert.equal(book.list().length, 2);
  book.apply(near);
  assert.equal(book.list().length, 1);
  assert.equal(book.list()[0].x, beside.x);
  const merged = mergeLatchedStickers(
    [{id: 4, x: 10, y: 12, kind: 'pink'}],
    book.list()
  );
  assert.equal(merged.length, 2);
  assert.equal(merged.find(marker => marker.manual).kind, 'sticker');

  const sent = sanitizeDebugPatch({action: 'add-manual-sticker', x: 1400, y: -8});
  assert.equal(sent.action, 'add-manual-sticker');
  assert.equal(sent.x, 1000);
  assert.equal(sent.y, 0);
  const gone = sanitizeDebugPatch({action: 'remove-manual-sticker', id: added.stickers[0].id, x: 12, y: 900});
  assert.equal(gone.action, 'remove-manual-sticker');
  assert.equal(gone.id, added.stickers[0].id);
  assert.equal(gone.y, 620);
  assert.equal(sanitizeDebugPatch({action: 'add-manual-sticker'}), null);
  assert.equal(sanitizeDebugPatch({action: 'remove-manual-sticker'}), null);
  assert.equal(sanitizeDebugPatch({action: 'add-sim', x: 10, y: 12}).action, 'add-sim');

  const calls = [];
  const doc = {
    getElementById(id) {
      if (id !== 'nd-camera-mode') return null;
      return {
        querySelector() { return null; },
        neuralDanceCamera: {
          applyManualSticker(patch) { calls.push(patch); },
          debugState() {
            return {
              occlusion: {paused: true, settling: false, note: PERSON_PAUSE_NOTE},
              markers: [{id: 500001, x: 12, y: 20, kind: 'sticker', manual: true}]
            };
          }
        }
      };
    },
    querySelector() { return null; },
    body: {classList: {contains() { return false; }}}
  };
  assert.equal(applyDebugPatch(doc, {action: 'add-manual-sticker', x: 30, y: 40}), true);
  assert.equal(calls[0].action, 'add-manual-sticker');
  assert.equal(calls[0].x, 30);
  const telemetry = collectTelemetry(doc, 5);
  assert.equal(telemetry.occlusion.note, PERSON_PAUSE_NOTE);
  assert.equal(telemetry.occlusion.paused, true);
  assert.equal(telemetry.markers[0].manual, true);

  assert.match(livePage, /data-person-note hidden role="status">person in frame, detection paused/);
  assert.match(debugPage, /data-person-note hidden role="status">person in frame, detection paused/);
  assert.match(debugPage, /Tap the projected stage to add a latched sticker/);
  assert.match(camera, /from '\.\/src\/person-occlusion\.js'/);
  assert.match(camera, /beforeLatch\(videoBlobs\)/);
  assert.match(camera, /applyManualSticker\(patch\)/);
  assert.match(viewer, /resolveStageTap\(telemetry && telemetry\.markers/);
  assert.match(viewer, /syncPersonNote\(doc/);
  assert.match(publisher, /applyManualSticker\(clean\)/);
  assert.match(publisher, /occlusion: vision\.occlusion/);
});
