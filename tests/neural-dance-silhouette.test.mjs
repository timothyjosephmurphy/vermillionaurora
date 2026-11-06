import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {applyHomography as cameraHomography, createMarkerTracker, detectStickerBlobs, homographyFromNormalized, markersFromFrame} from '../neural-dance/camera-markers.js';
import {createSilhouetteShow, applyHomography, defaultBloomStyle, offsetContour, paintBloom, projectContour, traceContour, waveformContour} from '../neural-dance/src/silhouette.js';
import {beatEnvelope, dancerSilhouette, deformSilhouette, regionWeights, variationFor} from '../neural-dance/src/silhouette-dance.js';
import {advanceSim, createSimState, paintSim} from '../neural-dance/src/silhouette-sim.js';

const roomJs = readFileSync(new URL('../neural-dance/room-lab.js', import.meta.url), 'utf8');
const ringJs = readFileSync(new URL('../neural-dance/wave-ring.js', import.meta.url), 'utf8');
const demoHtml = readFileSync(new URL('../neural-dance/silhouette-demo.html', import.meta.url), 'utf8');

function circle(count, radius) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    points.push({x: Math.cos(angle) * radius, y: Math.sin(angle) * radius});
  }
  return points;
}

function meanRadius(points) {
  let sum = 0;
  for (const point of points) sum += Math.hypot(point.x, point.y);
  return sum / points.length;
}

function areaOf(points) {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length];
    area += points[i].x * next.y - next.x * points[i].y;
  }
  return Math.abs(area) / 2;
}

function mockCtx() {
  const paths = [];
  let path = null;
  const ctx = {
    canvas: {width: 1000, height: 620},
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    lineJoin: '',
    globalCompositeOperation: 'source-over',
    paths,
    save() {},
    restore() {},
    clearRect() {},
    fillRect() { paths.push({kind: 'rect', fill: ctx.fillStyle}); },
    beginPath() { path = {moves: [], fill: null, stroke: null}; paths.push(path); },
    moveTo(x, y) { path.moves.push([x, y]); },
    lineTo(x, y) { path.moves.push([x, y]); },
    closePath() {},
    arc() { path.moves.push('arc'); },
    fill() { path.fill = {style: ctx.fillStyle, alpha: ctx.globalAlpha, composite: ctx.globalCompositeOperation}; },
    stroke() { path.stroke = {style: ctx.strokeStyle, alpha: ctx.globalAlpha, width: ctx.lineWidth, composite: ctx.globalCompositeOperation}; }
  };
  return ctx;
}

test('homography matches the camera mapper and carries a whole contour', () => {
  const H = [2, 0, 10, 0, 3, -5, 0, 0, 1];
  const camera = cameraHomography(H, 4, 6);
  const local = applyHomography(H, 4, 6);
  assert.ok(Math.abs(camera.x - local.x) < 1e-9);
  assert.ok(Math.abs(camera.y - local.y) < 1e-9);
  assert.deepEqual(local, {x: 18, y: 13});
  const projected = projectContour([{x: 0, y: 0}, {x: 4, y: 0}, {x: 4, y: 6}], H);
  assert.deepEqual(projected, [{x: 10, y: -5}, {x: 18, y: -5}, {x: 18, y: 13}]);
  assert.equal(projectContour([{x: 0, y: 0}], H), null);
  assert.equal(applyHomography(null, 1, 1), null);
});

test('a filled blob traces its own edge, not a dot', () => {
  const width = 8;
  const height = 6;
  const mask = new Uint8Array(width * height);
  for (let y = 1; y <= 3; y++) {
    for (let x = 2; x <= 5; x++) mask[y * width + x] = 1;
  }
  const contour = traceContour(mask, width, height, {x: 4, y: 2});
  assert.ok(contour.length >= 4);
  for (const point of contour) {
    assert.equal(mask[point.y * width + point.x], 1);
    assert.ok(point.x === 2 || point.x === 5 || point.y === 1 || point.y === 3);
  }
});

test('sticker detection keeps a contour and the homography projects it', () => {
  const width = 160;
  const height = 120;
  const wall = [146, 139, 126];
  const vinyl = [48, 50, 44];
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const bar = (x >= 70 && x < 86 && y >= 28 && y < 92) || (x >= 58 && x < 100 && y >= 52 && y < 68);
      const i = (y * width + x) * 4;
      const color = bar ? vinyl : wall;
      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
      data[i + 3] = 255;
    }
  }
  const found = detectStickerBlobs(data, width, height, {stickerSensitivity: 0.5});
  assert.equal(found.length, 1);
  assert.ok(found[0].contour.length >= 8);
  const H = homographyFromNormalized([{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}], width, height);
  const tracker = createMarkerTracker({appearMs: 0});
  const seen = markersFromFrame({data, width, height}, {detectionMode: 'stickers', stickerSensitivity: 0.5, minBlobSize: 8}, H, {scaleX: 1, scaleY: 1}, tracker, 0);
  assert.equal(seen.markers.length, 1);
  const marker = seen.markers[0];
  assert.equal(marker.kind, 'sticker');
  assert.ok(marker.contour.length >= 8);
  const span = marker.contour.reduce((box, point) => ({
    minX: Math.min(box.minX, point.x),
    maxX: Math.max(box.maxX, point.x),
    minY: Math.min(box.minY, point.y),
    maxY: Math.max(box.maxY, point.y)
  }), {minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity});
  assert.ok(span.maxX - span.minX > 40, 'projected contour keeps the sticker width');
  assert.ok(span.maxY > span.minY);
  assert.ok(span.minX > 200 && span.maxX < 800);
});

test('pulses leave the outline, grow, and carry the waveform', () => {
  const body = circle(32, 40);
  const quiet = waveformContour(body, 0, null, 0);
  assert.ok(Math.abs(meanRadius(quiet) - 40) < 0.05);
  const grown = waveformContour(body, 12, null, 0);
  assert.ok(meanRadius(grown) > meanRadius(quiet) + 10);
  const wave = new Float32Array(32);
  for (let i = 0; i < wave.length; i++) wave[i] = i % 2 === 0 ? 1 : -1;
  const rippled = waveformContour(body, 12, wave, 8);
  let differ = 0;
  for (let i = 0; i < rippled.length; i++) {
    differ = Math.max(differ, Math.hypot(rippled[i].x - grown[i].x, rippled[i].y - grown[i].y));
  }
  assert.ok(differ > 4, 'the waveform moves the offset contour');
  const flat = offsetContour(body, 0);
  assert.ok(Math.abs(flat[0].x - body[0].x) < 1e-9);
});

test('the bloom style hook replaces the default without a second look', () => {
  const defaults = defaultBloomStyle({t: 0, color: null});
  assert.ok(defaults.alpha > 0.2 && defaults.alpha < 0.5);
  assert.equal(defaults.composite, 'lighter');
  const seen = [];
  const ctx = mockCtx();
  const points = circle(8, 20);
  paintBloom(ctx, points, {t: 0.25, age: 10, duration: 40, expansion: 4, band: 1, onset: 4, color: null, points}, (pulse, base) => {
    seen.push(pulse.band, pulse.onset, base.composite);
    return {alpha: 0.05, stroke: '#123456'};
  });
  assert.deepEqual(seen, [1, 4, 'lighter']);
  const bloom = ctx.paths.find(path => path.stroke && path.stroke.style === '#123456');
  assert.ok(bloom);
  assert.equal(bloom.stroke.alpha, 0.05);
  assert.equal(bloom.fill.composite, 'lighter');
  assert.equal(bloom.fill.style, defaults.fill);
});

test('the silhouette eases back to itself and is not a stick figure', () => {
  const body = dancerSilhouette();
  assert.ok(body.length > 12);
  const variation = variationFor(1);
  const other = variationFor(2);
  assert.ok(variation.stepScale !== other.stepScale || variation.swayScale !== other.swayScale || variation.lead !== other.lead);
  const rest = deformSilhouette(body, {envelope: 0, variation, beatIndex: 0});
  for (let i = 0; i < body.length; i++) {
    assert.equal(rest[i].x, body[i].x);
    assert.equal(rest[i].y, body[i].y);
  }
  assert.equal(beatEnvelope(0, 500), 1);
  assert.equal(beatEnvelope(500, 500), 0);
  assert.ok(beatEnvelope(250, 500) > 0.4 && beatEnvelope(250, 500) < 0.6);
  const eased = deformSilhouette(body, {envelope: beatEnvelope(500, 500), variation, beatIndex: 1});
  for (let i = 0; i < body.length; i++) {
    assert.equal(eased[i].x, body[i].x);
    assert.equal(eased[i].y, body[i].y);
  }
  const full = deformSilhouette(body, {envelope: 1, variation, beatIndex: 0});
  const mid = deformSilhouette(body, {envelope: 0.5, variation, beatIndex: 0});
  assert.equal(full.length, body.length);
  assert.ok(areaOf(full) > areaOf(body) * 0.65);
  let arm = 0;
  for (let i = 1; i < body.length; i++) if (body[i].x < body[arm].x) arm = i;
  const armFull = Math.hypot(full[arm].x - rest[arm].x, full[arm].y - rest[arm].y);
  const armMid = Math.hypot(mid[arm].x - rest[arm].x, mid[arm].y - rest[arm].y);
  assert.ok(armFull > 1, 'the arm contour moves');
  assert.ok(armMid > 0.2 && armMid < armFull);
  const feet = body.map((point, index) => ({index, ...point})).sort((a, b) => b.y - a.y).slice(0, 6);
  const leftFoot = feet.filter(point => point.x < 0).sort((a, b) => a.x - b.x)[0];
  const rightFoot = feet.filter(point => point.x > 0).sort((a, b) => b.x - a.x)[0];
  const leftShift = full[leftFoot.index].x - rest[leftFoot.index].x;
  const rightShift = full[rightFoot.index].x - rest[rightFoot.index].x;
  assert.ok(leftShift * rightShift < 0, 'the feet step in opposite directions');
  const nextBeat = deformSilhouette(body, {envelope: 1, variation, beatIndex: 1});
  assert.ok(Math.abs(nextBeat[leftFoot.index].x - full[leftFoot.index].x) > 0.5);
  const again = deformSilhouette(body, {envelope: 1, variation: other, beatIndex: 0});
  let differ = false;
  for (let i = 0; i < full.length; i++) {
    if (Math.abs(full[i].x - again[i].x) > 0.05 || Math.abs(full[i].y - again[i].y) > 0.05) differ = true;
  }
  assert.equal(differ, true);
  const hand = regionWeights(0, 0.43);
  assert.ok(hand.leftArm > hand.torso);
  const foot = regionWeights(0.2, 0.95);
  assert.ok(foot.leftLeg > foot.leftArm);
});

test('debug light mode draws the silhouette or the dot, and pink notes stay dots', () => {
  const show = createSilhouetteShow();
  assert.equal(show.mode(), 'dot');
  assert.equal(show.setMode('nope'), 'dot');
  assert.equal(show.toggle(), 'silhouette');
  const body = dancerSilhouette();
  const markers = [
    {id: 4, x: 0, y: 0, type: 2, kind: 'sticker', contour: body},
    {id: 5, x: 30, y: 10, type: 0, kind: 'pink'}
  ];
  const dots = [];
  const ctx = mockCtx();
  show.paint(ctx, markers, {
    now: 0,
    paintDots(list) { dots.push(...list); }
  });
  assert.equal(dots.length, 1);
  assert.equal(dots[0].kind, 'pink');
  assert.ok(ctx.paths.some(path => path.fill && path.moves.length > 4));
  show.setMode('dot');
  const all = [];
  show.paint(mockCtx(), markers, {paintDots(list) { all.push(...list); }});
  assert.equal(all.length, 2);
  show.setMode('silhouette');
  show.beat(1000, 4);
  const ctxBeat = mockCtx();
  const styled = [];
  show.paint(ctxBeat, markers, {
    now: 1000,
    waveform: () => null,
    style(pulse, defaults) {
      styled.push({band: pulse.band, onset: pulse.onset, alpha: defaults.alpha});
      return null;
    },
    paintDots() {}
  });
  assert.equal(styled[0].band, 2);
  assert.equal(styled[0].onset, 4);
  const filled = ctxBeat.paths.filter(path => path.fill && path.moves.length > 4);
  assert.ok(filled.length >= 2);
  const bodyPath = filled[0].moves;
  const pulsePath = filled[1].moves;
  for (let i = 0; i < bodyPath.length; i++) {
    assert.ok(Math.abs(bodyPath[i][0] - pulsePath[i][0]) < 1e-6);
    assert.ok(Math.abs(bodyPath[i][1] - pulsePath[i][1]) < 1e-6);
  }
  show.clearPulses();
  show.beat(2000, 1);
  const later = mockCtx();
  show.paint(later, [markers[0]], {now: 2500, waveform: () => null, paintDots() {}});
  const laterFill = later.paths.filter(path => path.fill && path.moves.length > 4);
  const restRadius = meanRadius(laterFill[0].moves.map(pair => ({x: pair[0], y: pair[1]})));
  const grownRadius = meanRadius(laterFill[1].moves.map(pair => ({x: pair[0], y: pair[1]})));
  assert.ok(grownRadius > restRadius + 5);
});

test('the sim demo steps three dancers and the room only adds hook points', () => {
  const state = createSimState();
  assert.equal(state.markers.length, 3);
  assert.ok(state.markers.every(marker => marker.kind === 'sticker' && marker.contour.length > 12));
  state.show.setMode('silhouette');
  advanceSim(state, 1000);
  assert.equal(state.beatIndex, 0);
  advanceSim(state, 1000 + 60000 / state.bpm);
  assert.equal(state.beatIndex, 1);
  const ctx = mockCtx();
  paintSim(ctx, state, 1000 + 60000 / state.bpm);
  assert.ok(ctx.paths.some(path => path.moves && path.fill && path.moves.length > 8));
  assert.equal(ctx.paths.some(path => path.moves && path.moves.includes('arc')), false);
  state.show.setMode('dot');
  const dotted = mockCtx();
  paintSim(dotted, state, 1000);
  assert.ok(dotted.paths.some(path => path.moves && path.moves.includes('arc')));
  assert.match(demoHtml, /data-light-mode/);
  assert.match(demoHtml, /data-sim-stage/);
  assert.match(demoHtml, /silhouette-sim\.js/);
  assert.match(roomJs, /createSilhouetteShow/);
  assert.match(roomJs, /silhouetteShow\.paint\(ctx,root\._markers,/);
  assert.match(roomJs, /paintStageMarkers\(ctx,root\._markers,xy,scale\)/);
  assert.match(roomJs, /setLightMode\(mode\)/);
  assert.match(roomJs, /setSilhouetteStyle\(style\)/);
  assert.match(roomJs, /root\._silhouetteStyle/);
  assert.match(roomJs, /sanitizeContour\(m\.contour\)/);
  assert.match(roomJs, /if\(tones\)silhouetteShow\.beat\(now,tones\)/);
  assert.match(roomJs, /rings\.waveform\(band\)/);
  assert.match(ringJs, /function waveform\(band\)/);
  new Function(ringJs)();
  const session = globalThis.NeuralDanceRings.createSession();
  assert.equal(typeof session.waveform, 'function');
  assert.equal(session.waveform(0).length, 512);
  assert.equal(session.waveform(4), null);
});
