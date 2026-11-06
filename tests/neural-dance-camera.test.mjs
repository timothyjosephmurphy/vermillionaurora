import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  acquireCameraStream,
  armPreviewElement,
  drawVideoFrame,
  playPreview,
  videoConstraints,
  videoFrameReady,
  APPEAR_MS,
  CALIBRATION_MARKERS,
  CANVAS_H,
  CANVAS_W,
  CLEAR_MS,
  CORNER_STEPS,
  DEFAULTS,
  DETECT_WIDTH,
  PINK_HUE,
  PROJECTION_CORNERS,
  STORAGE_KEY,
  applyHomography,
  blobSettings,
  cameraChoices,
  clientToNormalized,
  cornersFromMarkerCenters,
  DEFAULT_QUAD,
  isValidAlignmentQuad,
  sanitizeSettings,
  createMarkerTracker,
  detectPinkBlobs,
  detectPinkMarkers,
  detectStickerBlobs,
  areaScaleFor,
  stickerDarkRatio,
  detectionSize,
  downsampleRgba,
  findCalibrationMarkers,
  homographyFromNormalized,
  isPink,
  markersFromFrame,
  pickCamera,
  projectVideoPoint,
  readCameraSettings,
  rgbToHsv,
  saturationFloor,
  greenAbsorption,
  solveHomography,
  toDancerMarkers,
  writeCameraSettings
} from '../neural-dance/camera-markers.js';

const page = readFileSync(new URL('../src/pages/neural-dance/index.astro', import.meta.url), 'utf8');
const camera = readFileSync(new URL('../neural-dance/camera-markers.js', import.meta.url), 'utf8');
const roomJs = readFileSync(new URL('../neural-dance/room-lab.js', import.meta.url), 'utf8');

function close(actual, expected, eps, label) {
  assert.ok(Math.abs(actual - expected) <= eps, `${label || ''} ${actual} vs ${expected}`);
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs(hp % 2 - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function paint(width, height, fn) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = fn(x, y);
      const i = (y * width + x) * 4;
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
  return data;
}

function rect(x, y, w, h) {
  return (px, py) => px >= x && px < x + w && py >= y && py < y + h;
}

function memoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
}

test('homography maps the calibration corners and preserves straight edges', () => {
  const src = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 50}, {x: 0, y: 50}];
  const dst = PROJECTION_CORNERS;
  const H = solveHomography(src, dst);
  assert.ok(H);
  src.forEach((corner, i) => {
    const p = applyHomography(H, corner.x, corner.y);
    close(p.x, dst[i].x, 1e-4, 'corner x');
    close(p.y, dst[i].y, 1e-4, 'corner y');
  });
  const mid = applyHomography(H, 50, 25);
  close(mid.x, CANVAS_W / 2, 1e-4, 'center x');
  close(mid.y, CANVAS_H / 2, 1e-4, 'center y');
  const identity = solveHomography(src, src);
  const same = applyHomography(identity, 20, 10);
  close(same.x, 20, 1e-6, 'identity x');
  close(same.y, 10, 1e-6, 'identity y');
});

test('homography recovers a perspective warp', () => {
  const src = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}];
  const known = [1, 0, 0, 0, 1, 0, 0.005, 0, 1];
  const dst = src.map(p => applyHomography(known, p.x, p.y));
  const solved = solveHomography(src, dst);
  for (const probe of [{x: 50, y: 50}, {x: 20, y: 80}, {x: 0, y: 40}]) {
    const want = applyHomography(known, probe.x, probe.y);
    const got = applyHomography(solved, probe.x, probe.y);
    close(got.x, want.x, 1e-4, 'warp x');
    close(got.y, want.y, 1e-4, 'warp y');
  }
});

test('a keystone of the wall lands on the projection and a bad quad is rejected', () => {
  const src = [{x: 400, y: 200}, {x: 1500, y: 180}, {x: 1600, y: 900}, {x: 300, y: 880}];
  const H = solveHomography(src, PROJECTION_CORNERS);
  assert.ok(H);
  src.forEach((corner, i) => {
    const p = applyHomography(H, corner.x, corner.y);
    close(p.x, PROJECTION_CORNERS[i].x, 0.05, 'keystone x');
    close(p.y, PROJECTION_CORNERS[i].y, 0.05, 'keystone y');
  });
  const edge = applyHomography(H, (src[0].x + src[1].x) / 2, (src[0].y + src[1].y) / 2);
  const a = PROJECTION_CORNERS[0];
  const b = PROJECTION_CORNERS[1];
  const cross = (b.x - a.x) * (edge.y - a.y) - (b.y - a.y) * (edge.x - a.x);
  close(cross / CANVAS_W, 0, 0.05, 'top edge');
  assert.equal(solveHomography(src.slice(0, 3), PROJECTION_CORNERS), null);
  assert.equal(solveHomography(
    [{x: 0, y: 0}, {x: 10, y: 0}, {x: 20, y: 0}, {x: 30, y: 0}],
    PROJECTION_CORNERS
  ), null);
  const normalized = [
    {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}
  ];
  const fromPreview = homographyFromNormalized(normalized, 200, 100);
  const center = projectVideoPoint(fromPreview, 100, 50);
  close(center.x, CANVAS_W / 2, 1e-4, 'normalized x');
  close(center.y, CANVAS_H / 2, 1e-4, 'normalized y');
});

test('pink blobs use hue tolerance, saturation sensitivity, and minimum size', () => {
  const pink = hsvToRgb(PINK_HUE, 0.8, 0.9);
  const round = rgbToHsv(...pink);
  close(round.h, PINK_HUE, 2, 'hue');
  assert.ok(isPink(...pink, blobSettings(DEFAULTS)));
  const pale = hsvToRgb(PINK_HUE, 0.3, 0.9);
  assert.equal(isPink(...pale, blobSettings({saturationSensitivity: 0})), false);
  assert.equal(isPink(...pale, blobSettings({saturationSensitivity: 1})), true);
  assert.ok(saturationFloor(1) < saturationFloor(0));
  const dark = hsvToRgb(PINK_HUE, 0.9, 0.1);
  assert.equal(isPink(...dark, blobSettings(DEFAULTS)), false);
  const off = hsvToRgb((PINK_HUE + 35) % 360, 0.9, 0.9);
  assert.equal(isPink(...off, blobSettings({hueTolerance: 28})), false);
  assert.equal(isPink(...off, blobSettings({hueTolerance: 40})), true);
  assert.equal(isPink(136, 110, 139, blobSettings(DEFAULTS)), false);
  assert.equal(isPink(253, 169, 155, blobSettings({...DEFAULTS, hueTolerance: 40})), true);
  assert.equal(isPink(127, 132, 152, blobSettings(DEFAULTS)), false);
  assert.equal(isPink(180, 154, 130, blobSettings(DEFAULTS)), false);
  assert.equal(isPink(90, 180, 220, blobSettings(DEFAULTS)), false);
  assert.equal(isPink(120, 130, 210, blobSettings(DEFAULTS)), false);

  const width = 48;
  const height = 36;
  const big = rect(8, 6, 8, 6);
  const speck = rect(30, 4, 2, 2);
  const data = paint(width, height, (x, y) => big(x, y) || speck(x, y) ? pink : [8, 10, 16]);
  const found = detectPinkBlobs(data, width, height, {hueTolerance: 28, saturationSensitivity: 0.55, minBlobSize: 18});
  assert.equal(found.length, 1);
  close(found[0].x, 11.5, 0.01, 'blob x');
  close(found[0].y, 8.5, 0.01, 'blob y');
  assert.equal(found[0].area, 48);
  assert.equal(detectPinkBlobs(data, width, height, {minBlobSize: 100}).length, 0);

  const second = rect(30, 20, 8, 6);
  const pair = paint(width, height, (x, y) => big(x, y) || second(x, y) ? pink : [0, 0, 0]);
  const both = detectPinkBlobs(pair, width, height, {minBlobSize: 18});
  assert.equal(both.length, 2);
});

test('a marker appears after about 1.5s and clears once the note is gone', () => {
  const tracker = createMarkerTracker();
  assert.equal(APPEAR_MS, 1500);
  assert.ok(CLEAR_MS > 0 && CLEAR_MS < 1000);
  assert.deepEqual(tracker.update([{x: 10, y: 10}], 0), []);
  assert.deepEqual(tracker.update([{x: 10, y: 12}], 1499), []);
  const up = tracker.update([{x: 12, y: 11}], 1500);
  assert.equal(up.length, 1);
  assert.equal(up[0].id, 1);
  close(up[0].x, 12, 1e-9, 'tracked x');

  const gone = tracker.update([], 1600);
  assert.equal(gone.length, 1, 'a missed frame keeps the marker');
  assert.equal(gone[0].id, 1);
  const held = tracker.update([], 1600 + CLEAR_MS - 1);
  assert.equal(held.length, 1);
  assert.deepEqual(tracker.update([], 1600 + CLEAR_MS), []);

  assert.deepEqual(tracker.update([{x: 12, y: 11}], 2000), []);
  const again = tracker.update([{x: 14, y: 11}], 2000 + APPEAR_MS);
  assert.equal(again.length, 1);
  assert.notEqual(again[0].id, 1);

  const pair = createMarkerTracker();
  pair.update([{x: 0, y: 0}], 0);
  const first = pair.update([{x: 0, y: 0}, {x: 90, y: 0}], APPEAR_MS);
  assert.equal(first.length, 1);
  const second = pair.update([{x: 1, y: 0}, {x: 92, y: 2}], APPEAR_MS * 2);
  assert.deepEqual(second.map(m => m.id), [1, 2]);
  const fading = pair.update([{x: 92, y: 2}], APPEAR_MS * 2 + 10);
  assert.deepEqual(fading.map(m => m.id), [1, 2]);
  const oneLeft = pair.update([{x: 92, y: 2}], APPEAR_MS * 2 + 10 + CLEAR_MS);
  assert.deepEqual(oneLeft.map(m => m.id), [2]);
});

test('downscaled frames project a stable pink note onto the room canvas', () => {
  const pink = hsvToRgb(330, 0.85, 0.95);
  const srcW = 320;
  const srcH = 180;
  const full = paint(srcW, srcH, (x, y) => x >= 92 && x < 108 && y >= 52 && y < 68 ? pink : [6, 8, 12]);
  const scale = detectionSize(srcW, srcH);
  assert.equal(scale.width, Math.min(DETECT_WIDTH, srcW));
  assert.ok(scale.height <= srcH);
  assert.equal(detectionSize(1920, 1080).width, 480);
  assert.equal(detectionSize(1920, 1080).height, 270);
  const small = downsampleRgba(full, srcW, srcH, scale.width, scale.height);
  const H = homographyFromNormalized(CORNER_STEPS.map((_, i) => PROJECTION_CORNERS[i] && [
    {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}
  ][i]), srcW, srcH);
  const tracker = createMarkerTracker();
  const frame = {data: small, width: scale.width, height: scale.height};
  const early = markersFromFrame(frame, DEFAULTS, H, scale, tracker, 0);
  assert.equal(early.blobs.length, 1);
  assert.deepEqual(early.markers, []);
  const late = markersFromFrame(frame, DEFAULTS, H, scale, tracker, APPEAR_MS);
  assert.equal(late.markers.length, 1);
  const marker = late.markers[0];
  assert.equal(marker.type, 0);
  close(marker.x, (early.blobs[0].x / srcW) * CANVAS_W, 1.5, 'projected x');
  close(marker.y, (early.blobs[0].y / srcH) * CANVAS_H, 1.5, 'projected y');
  assert.ok(marker.x > 200 && marker.x < 450);
  assert.ok(marker.y > 100 && marker.y < 320);
});

test('camera list keeps an iPhone Camera and settings round-trip', () => {
  const devices = [
    {kind: 'audioinput', deviceId: 'mic', label: 'Microphone'},
    {kind: 'videoinput', deviceId: 'facetime', label: 'FaceTime HD Camera'},
    {kind: 'videoinput', deviceId: 'phone', label: 'iPhone Camera'},
    {kind: 'videoinput', deviceId: 'blank', label: '   '}
  ];
  const choices = cameraChoices(devices);
  assert.deepEqual(choices.map(c => c.label), ['FaceTime HD Camera', 'iPhone Camera', 'Camera']);
  assert.equal(pickCamera(choices, null).label, 'iPhone Camera');
  assert.equal(pickCamera(choices, {deviceId: 'facetime'}).deviceId, 'facetime');
  assert.equal(pickCamera(choices, {deviceId: 'gone', deviceLabel: 'iPhone Camera'}).deviceId, 'phone');
  const continuity = cameraChoices([
    {kind: 'videoinput', deviceId: 'facetime', label: 'FaceTime HD Camera'},
    {kind: 'videoinput', deviceId: 'phone3', label: 'iPhone (3) Camera'}
  ]);
  assert.equal(pickCamera(continuity, null).deviceId, 'phone3');

  const storage = memoryStorage();
  assert.equal(readCameraSettings(storage), null);
  const corners = [{x: 0.1, y: 0.2}, {x: 0.8, y: 0.15}, {x: 0.86, y: 0.9}, {x: 0.12, y: 0.88}];
  assert.equal(writeCameraSettings(storage, {
    deviceId: 'phone',
    deviceLabel: 'iPhone Camera',
    userSelected: true,
    corners,
    hueTolerance: 40,
    saturationSensitivity: 0.7,
    minBlobSize: 24
  }), true);
  const saved = readCameraSettings(storage);
  assert.equal(saved.deviceLabel, 'iPhone Camera');
  assert.equal(saved.hueTolerance, 40);
  assert.equal(saved.saturationSensitivity, 0.7);
  assert.equal(saved.minBlobSize, 24);
  assert.deepEqual(saved.corners, corners);
  storage.setItem(STORAGE_KEY, '{');
  assert.equal(readCameraSettings(storage), null);
  storage.setItem(STORAGE_KEY, JSON.stringify({hueTolerance: 999, saturationSensitivity: -2, minBlobSize: 1, corners: [{x: 1, y: 1}]}));
  const clamped = readCameraSettings(storage);
  assert.equal(clamped.hueTolerance, 80);
  assert.equal(clamped.saturationSensitivity, DEFAULTS.saturationSensitivity);
  assert.equal(clamped.minBlobSize, 4);
  assert.equal(clamped.deviceId, '');
  const poisoned = memoryStorage();
  poisoned.setItem('nd.camera.v1', JSON.stringify({deviceId: 'front', deviceLabel: 'Front Camera', hueTolerance: 5, saturationSensitivity: 0}));
  const migrated = readCameraSettings(poisoned);
  assert.equal(migrated.deviceId, '');
  assert.equal(migrated.deviceLabel, '');
  assert.equal(migrated.hueTolerance, DEFAULTS.hueTolerance);
  assert.equal(migrated.saturationSensitivity, DEFAULTS.saturationSensitivity);
  const ios = [
    {deviceId: 'front', label: 'Front Camera'},
    {deviceId: 'ultra', label: 'Back Ultra Wide Camera'},
    {deviceId: 'back', label: 'Back Camera'},
    {deviceId: 'tele', label: 'Back Telephoto Camera'}
  ];
  assert.equal(pickCamera(ios, null).label, 'Back Camera');
  assert.equal(pickCamera(ios, migrated).label, 'Back Camera');
  const mac = [
    {deviceId: 'face', label: 'FaceTime HD Camera'},
    {deviceId: 'tj', label: 'TJ iPhone Camera'}
  ];
  assert.equal(pickCamera(mac, null).label, 'TJ iPhone Camera');
  assert.deepEqual(clamped.corners, DEFAULT_QUAD);
  const click = clientToNormalized(25, 75, {left: 0, top: 0, width: 100, height: 100});
  close(click.x, 0.25, 1e-9, 'click x');
  close(click.y, 0.75, 1e-9, 'click y');
  const dancers = toDancerMarkers([{id: 2, x: 10, y: 20}, {id: 0, x: 1, y: 1}]);
  assert.deepEqual(dancers, [{id: 2, x: 10, y: 20, type: 1, kind: 'pink'}]);
});

test('white balance finds the post-it in both of TJ\'s rooms and ignores the wall', () => {
  function frame(bg, note, nx, ny) {
    const width = 48;
    const height = 32;
    const data = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const on = x >= nx && x < nx + 12 && y >= ny && y < ny + 12;
        const c = on ? note : bg;
        const i = (y * width + x) * 4;
        data[i] = c[0];
        data[i + 1] = c[1];
        data[i + 2] = c[2];
        data[i + 3] = 255;
      }
    }
    return detectPinkMarkers(data, width, height, DEFAULTS);
  }
  const cool = frame([127, 132, 152], [235, 115, 155], 6, 6);
  assert.equal(cool.length, 1, 'cool projector post-it');
  assert.equal(frame([127, 132, 152], [136, 110, 139], 6, 6).length, 0, 'gray cool-wall sample is not a note');
  const warm = frame([180, 154, 130], [253, 169, 155], 24, 12);
  assert.equal(warm.length, 1, 'warm 2700K post-it');
  assert.ok(Math.abs(greenAbsorption(0.45) - 0.24) < 0.01);
  assert.equal(greenAbsorption(1), 0.16);
  assert.ok(greenAbsorption(0) > 0.3);
  assert.ok(Math.abs(saturationFloor(0.75) - 0.14) < 0.02);
  assert.ok(saturationFloor(1) < 0.08);
  assert.ok(saturationFloor(0) > 0.4);
});

test('a dark dancer sticker is darker than the local screen and both kinds stay in range', () => {
  assert.equal(DETECT_WIDTH, 480);
  assert.equal(areaScaleFor(160), 1);
  assert.equal(areaScaleFor(48), 1);
  assert.ok(Math.abs(areaScaleFor(480) - 9) < 0.01);
  assert.ok(Math.abs(stickerDarkRatio(0.5) - 0.84) < 0.001);
  const note = 0.299 * 124 + 0.587 * 91 + 0.114 * 68;
  const wall = 0.299 * 157 + 0.587 * 117 + 0.114 * 96;
  assert.ok(note / wall <= stickerDarkRatio(0.5));
  const width = 160;
  const height = 120;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 157;
    data[i + 1] = 117;
    data[i + 2] = 96;
    data[i + 3] = 255;
  }
  const paint = (x, y) => {
    const i = (y * width + x) * 4;
    data[i] = 124;
    data[i + 1] = 91;
    data[i + 2] = 68;
  };
  for (let y = 40; y < 52; y++) paint(80, y);
  for (let x = 74; x < 87; x++) paint(x, 46);
  for (let y = 52; y < 70; y++) { paint(76, y); paint(84, y); }
  const found = detectStickerBlobs(data, width, height, {stickerSensitivity: 0.5});
  assert.equal(found.length, 1);
  assert.equal(found[0].kind, 'sticker');
  assert.equal(DEFAULTS.detectionMode, 'both');
  assert.equal(DEFAULTS.markerMode, 'both');
});

test('calibration markers recover the stage corners from a white field', () => {
  const width = 160;
  const height = 90;
  const data = new Uint8ClampedArray(width * height * 4);
  data.fill(255);
  const marks = CALIBRATION_MARKERS.map((marker, i) => ({
    x: marker.x,
    y: marker.y,
    rgb: [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]][i]
  }));
  for (const mark of marks) {
    const cx = Math.round(mark.x * width);
    const cy = Math.round(mark.y * height);
    for (let y = cy - 4; y <= cy + 4; y++) {
      for (let x = cx - 4; x <= cx + 4; x++) {
        const i = (y * width + x) * 4;
        data[i] = mark.rgb[0];
        data[i + 1] = mark.rgb[1];
        data[i + 2] = mark.rgb[2];
      }
    }
  }
  const centers = findCalibrationMarkers(data, width, height);
  assert.ok(centers);
  const missing = data.slice();
  for (let i = 0; i < missing.length; i += 4) if (missing[i] === 255 && missing[i + 1] === 255 && missing[i + 2] === 0) missing[i + 2] = 255;
  assert.equal(findCalibrationMarkers(missing, width, height), null);
  const corners = cornersFromMarkerCenters(centers.map(c => ({x: c.x + 0.5, y: c.y + 0.5})), width, height);
  assert.ok(corners);
  close(corners[0].x, 0, 0.04, 'tl x');
  close(corners[0].y, 0, 0.04, 'tl y');
  close(corners[1].x, 1, 0.04, 'tr x');
  close(corners[1].y, 0, 0.04, 'tr y');
  close(corners[2].x, 1, 0.04, 'br x');
  close(corners[2].y, 1, 0.04, 'br y');
  close(corners[3].x, 0, 0.04, 'bl x');
  close(corners[3].y, 1, 0.04, 'bl y');
  assert.equal(isValidAlignmentQuad(DEFAULT_QUAD), true);
  assert.equal(isValidAlignmentQuad(corners), true);
  const bowtie = [{x: 0.2, y: 0.2}, {x: 0.8, y: 0.8}, {x: 0.8, y: 0.2}, {x: 0.2, y: 0.8}];
  assert.equal(isValidAlignmentQuad(bowtie), false);
  assert.equal(cornersFromMarkerCenters(bowtie.map(p => ({x: p.x * width, y: p.y * height})), width, height), null);
  const crossed = [{x: 30, y: 20}, {x: 40, y: 70}, {x: 120, y: 24}, {x: 110, y: 76}];
  assert.equal(isValidAlignmentQuad(crossed, {normalized: false}), false);
  assert.equal(cornersFromMarkerCenters(crossed, width, height), null);
  assert.deepEqual(sanitizeSettings({corners: bowtie}).corners, DEFAULT_QUAD);
  assert.equal(sanitizeSettings({deviceId: 'back'}).deviceId, 'back');
});

test('a warm projector wall and indigo controls are not pink, and a real note still is', () => {
  const bg = [122, 102, 81];
  const decoys = [
    [122, 102, 81],
    [157, 117, 96],
    [215, 222, 205],
    [49, 88, 184],
    [92, 110, 220],
    [84, 148, 104],
    [142, 98, 74]
  ];
  for (const color of decoys) {
    assert.equal(isPink(...color, blobSettings({...DEFAULTS, bg: {r: bg[0], g: bg[1], b: bg[2]}})), false, color.join(','));
  }
  const width = 80;
  const height = 60;
  const data = paint(width, height, () => bg);
  const patches = [
    {at: [4, 4], color: [157, 117, 96]},
    {at: [28, 4], color: [215, 222, 205]},
    {at: [52, 4], color: [49, 88, 184]},
    {at: [4, 28], color: [92, 110, 220]},
    {at: [28, 28], color: [84, 148, 104]},
    {at: [52, 28], color: [142, 98, 74]}
  ];
  for (const patch of patches) {
    for (let y = patch.at[1]; y < patch.at[1] + 12; y++) {
      for (let x = patch.at[0]; x < patch.at[0] + 12; x++) {
        const i = (y * width + x) * 4;
        data[i] = patch.color[0];
        data[i + 1] = patch.color[1];
        data[i + 2] = patch.color[2];
      }
    }
  }
  assert.equal(detectPinkMarkers(data, width, height, DEFAULTS).length, 0);
  const notes = [[235, 115, 155], [210, 110, 128]];
  for (const note of notes) {
    assert.equal(isPink(...note, blobSettings(DEFAULTS)), true, note.join(','));
    const found = detectPinkMarkers(paint(48, 32, (x, y) => x >= 8 && x < 20 && y >= 8 && y < 20 ? note : [140, 112, 88]), 48, 32, DEFAULTS);
    assert.equal(found.length, 1, note.join(','));
  }
});

test('nd.camera.v2 migrates a back camera and drops a bowtie quad and loose defaults', () => {
  const box = new Map();
  const legacy = {
    getItem(key) { return box.has(key) ? box.get(key) : null; },
    setItem(key, value) { box.set(key, String(value)); },
    removeItem(key) { box.delete(key); }
  };
  legacy.setItem('nd.camera.v2', JSON.stringify({
    deviceId: 'back',
    deviceLabel: 'Back Camera',
    userSelected: true,
    hueTolerance: 48,
    saturationSensitivity: 0.75,
    minBlobSize: 18,
    corners: [{x: 0.15, y: 0.7}, {x: 0.85, y: 0.82}, {x: 0.7, y: 0.2}, {x: 0.2, y: 0.18}]
  }));
  const migrated = readCameraSettings(legacy);
  assert.equal(migrated.deviceId, 'back');
  assert.equal(migrated.deviceLabel, 'Back Camera');
  assert.equal(migrated.hueTolerance, DEFAULTS.hueTolerance);
  assert.equal(migrated.saturationSensitivity, DEFAULTS.saturationSensitivity);
  assert.equal(migrated.minBlobSize, DEFAULTS.minBlobSize);
  assert.deepEqual(migrated.corners, DEFAULT_QUAD);
  assert.equal(legacy.getItem('nd.camera.v2'), null);
  assert.equal(JSON.parse(legacy.getItem(STORAGE_KEY)).v, 3);
  const custom = {
    getItem(key) { return box.has('custom:' + key) ? box.get('custom:' + key) : null; },
    setItem(key, value) { box.set('custom:' + key, String(value)); },
    removeItem(key) { box.delete('custom:' + key); }
  };
  custom.setItem('nd.camera.v2', JSON.stringify({
    deviceId: 'front',
    deviceLabel: 'Front Camera',
    hueTolerance: 40,
    saturationSensitivity: 0.62,
    minBlobSize: 30,
    corners: DEFAULT_QUAD
  }));
  const kept = readCameraSettings(custom);
  assert.equal(kept.deviceId, '');
  assert.equal(kept.hueTolerance, 40);
  assert.equal(kept.saturationSensitivity, 0.62);
  assert.equal(kept.minBlobSize, 30);
  assert.deepEqual(kept.corners, DEFAULT_QUAD);
  assert.doesNotMatch(camera, /#ff7ad9|#ffd1ec/);
  assert.doesNotMatch(camera, /detected ✓/);
  assert.match(page, /value="32"/);
  assert.match(page, /value="0.45"/);
  assert.match(page, /value="22"/);
  assert.match(page, /accent-color:#38bdf8/);
});

test('Continuity Camera constraints omit resolution and play after loadedmetadata', async () => {
  const exact = videoConstraints('phone-3', 'exact');
  assert.deepEqual(exact, {deviceId: {exact: 'phone-3'}});
  assert.equal('width' in exact || 'height' in exact, false);
  const ideal = videoConstraints('phone-3', 'ideal');
  assert.deepEqual(ideal, {deviceId: {ideal: 'phone-3'}});
  assert.deepEqual(videoConstraints(''), {facingMode: {ideal: 'environment'}});
  assert.doesNotMatch(camera, /ideal:\s*1280/);
  assert.doesNotMatch(camera, /ideal:\s*720/);
  assert.match(camera, /loadedmetadata/);
  assert.match(camera, /playsInline/);
  assert.match(camera, /drawVideoFrame/);

  const calls = [];
  const track = {getSettings() { return {deviceId: 'phone-3'}; }, muted: false, readyState: 'live', addEventListener() {}};
  const stream = {getVideoTracks() { return [track]; }, getTracks() { return [track]; }};
  const md = {
    async getUserMedia(constraints) {
      calls.push(constraints);
      if (constraints.video && constraints.video.deviceId && constraints.video.deviceId.exact === 'missing') {
        throw Object.assign(new Error('over'), {name: 'OverconstrainedError'});
      }
      if (constraints.audio !== false) throw new Error('audio should stay off');
      return stream;
    }
  };
  const opened = await acquireCameraStream(md, 'phone-3');
  assert.equal(opened, stream);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], {video: {deviceId: {exact: 'phone-3'}}, audio: false});
  calls.length = 0;
  await acquireCameraStream(md, 'missing');
  assert.equal(calls[0].video.deviceId.exact, 'missing');
  assert.deepEqual(calls[1].video.deviceId, {ideal: 'missing'});
  assert.equal('width' in calls[1].video, false);
  await assert.rejects(
    () => acquireCameraStream({
      getUserMedia: async () => { throw Object.assign(new Error('no'), {name: 'NotAllowedError'}); }
    }, 'phone-3'),
    err => err.name === 'NotAllowedError'
  );

  let played = false;
  const listeners = {};
  const video = {
    readyState: 0,
    videoWidth: 0,
    videoHeight: 0,
    paused: true,
    ended: false,
    setAttribute() {},
    addEventListener(name, fn) { listeners[name] = fn; },
    removeEventListener(name) { delete listeners[name]; },
    play() {
      assert.equal(this.readyState >= 1, true, 'play() waits for loadedmetadata');
      assert.equal(this.videoWidth > 0, true);
      played = true;
      this.paused = false;
      return Promise.resolve();
    }
  };
  const pending = playPreview(video, stream);
  assert.equal(video.srcObject, stream);
  assert.equal(video.muted, true);
  assert.equal(video.playsInline, true);
  assert.equal(video.autoplay, true);
  assert.equal(played, false);
  assert.equal(videoFrameReady(video), false);
  video.readyState = 1;
  video.videoWidth = 320;
  video.videoHeight = 180;
  listeners.loadedmetadata();
  await pending;
  assert.equal(played, true);
  video.readyState = 2;
  assert.equal(videoFrameReady(video), true);
  const drawn = [];
  assert.equal(drawVideoFrame(video, {drawImage(...args) { drawn.push(args); }}, 160, 90), true);
  assert.deepEqual(drawn[0], [video, 0, 0, 160, 90]);
  video.paused = true;
  assert.equal(drawVideoFrame(video, {drawImage() {}}, 160, 90), false);
  armPreviewElement(video);
  assert.equal(video.defaultMuted, true);
});

test('the neural dance page keeps room controls and adds camera mode', () => {
  const cameraAt = page.indexOf('id="nd-camera-mode"');
  const roomAt = page.indexOf('id="nd-room-lab"');
  const roomScriptEnd = page.indexOf('</script>', roomAt);
  assert.ok(cameraAt > roomScriptEnd, 'camera mode follows the room music script');
  assert.match(page, /Camera mode/);
  assert.match(page, /iPhone Camera/);
  assert.match(page, /Hue range \(higher = wider color match\)/);
  assert.match(page, /Note sensitivity \(higher = fainter notes\)/);
  assert.match(page, /Smallest note size \(lower = detects smaller notes\)/);
  assert.match(page, /data-camera-flip/);
  assert.match(page, /Reset defaults/);
  assert.match(page, /data-mode="both"/);
  assert.match(page, /Dancer stickers/);
  assert.match(page, /Sticker sensitivity \(higher = fainter stickers\)/);
  assert.match(page, /data-preview/);
  assert.match(page, /data-action="calibrate"/);
  assert.match(page, /\/neural-dance\/camera-markers\.js/);
  assert.match(page, /Calibrate wall/);
  assert.match(page, /Gravity/);
  assert.match(page, /Wander/);
  assert.match(page, /Threshold/);
  assert.match(page, /Peak hold/);
  assert.match(page, /Kick sensitivity/);
  assert.match(page, /data-action="listen"/);
  assert.match(page, />Listen</);
  assert.match(page, /Room music/);
  assert.doesNotMatch(page, /getUserMedia[\s\S]{0,80}video:\s*true/);
  assert.match(camera, /enumerateDevices/);
  assert.match(camera, /getUserMedia/);
  assert.match(camera, /setMarkers/);
  assert.match(camera, /localStorage/);
  assert.match(camera, /nd-camera-mode/);
  assert.match(camera, /studio-tracker #793/);
  assert.doesNotMatch(camera, /video:\s*true/);
  const room = page.slice(roomAt, page.indexOf('id="nd-camera-mode"')) + roomJs;
  assert.match(room, /setMarkers/);
  assert.match(room, /function consumeFeed/);
  assert.match(room, /poke\(\)/);
  assert.match(room, /nd_set_gravity/);
  assert.match(room, /nd_set_band_sens/);
  assert.equal(CORNER_STEPS.length, 4);
});
