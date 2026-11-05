import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function loadGate() {
  const src = readFileSync(new URL('../neural-dance/silence-gate.js', import.meta.url), 'utf8');
  const sandbox = {};
  new Function('globalThis', src)(sandbox);
  return sandbox.ndSilenceGate;
}

const gateApi = loadGate();
const wasm = readFileSync(new URL('../neural-dance/neural-dance.wasm', import.meta.url));

function fresh(quiet) {
  const state = gateApi.create();
  if (quiet != null) gateApi.setQuiet(state, quiet);
  return state;
}

function run(state, raw, seconds) {
  let levels = raw;
  const frames = Math.max(1, Math.round(seconds / 0.033));
  for (let i = 0; i < frames; i++) levels = gateApi.scale(state, raw, 0.033);
  return levels;
}

test('the noise floor is a low percentile of the input level', () => {
  assert.ok(gateApi.FLOOR_PERCENTILE > 0 && gateApi.FLOOR_PERCENTILE <= 0.2);
  assert.equal(gateApi.QUIET_DEFAULT, 0.08);
});

test('auto-gain still centers a loud signal and leaves silence alone', () => {
  const loud = fresh();
  const pegged = run(loud, [1, 1, 1, 0.02], 2);
  const mean = pegged.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  assert.ok(mean > 0.42 && mean < 0.58, `pegged mean ${mean}`);
  assert.ok(Math.max(...pegged) < 0.65);
  assert.ok(pegged[3] < 0.05);

  const slew = fresh();
  const first = gateApi.scale(slew, [1, 1, 1, 0], 0.033);
  assert.ok(Math.min(...first.slice(0, 3)) > 0.7, 'gain slews instead of jumping');
  assert.ok(Math.max(...first) < 0.98, 'soft knee, not a hard clip at 1');

  const silent = fresh();
  const silence = run(silent, [0.02, 0.01, 0, 0.015], 2);
  assert.ok(Math.max(...silence) < 0.05);
  assert.equal(silent.open, false);
  assert.ok(silent.gain <= 1.05);
});

test('gain stays capped when the input sits on the noise floor', () => {
  const state = fresh();
  const levels = run(state, [0.12, 0.1, 0.11, 0.09], 2);
  assert.equal(state.open, false);
  assert.equal(state.gainCapped, true);
  assert.ok(state.gain <= 1.05, `gain ${state.gain}`);
  assert.ok(state.noiseFloor > 0.08 && state.noiseFloor < 0.14, `floor ${state.noiseFloor}`);
  const mean = levels.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  assert.ok(mean > 0.08 && mean < 0.2, `quiet mean ${mean} was boosted`);
  assert.ok(Math.max(...levels) < 0.2);
});

test('a signal above the learned floor opens the gate and may boost', () => {
  const state = fresh();
  run(state, [0.03, 0.02, 0.025, 0.01], 0.6);
  assert.equal(state.open, false);
  assert.ok(state.noiseFloor < 0.06, `floor before music ${state.noiseFloor}`);
  const levels = run(state, [0.22, 0.18, 0.2, 0.04], 2);
  assert.equal(state.open, true);
  assert.ok(state.noiseFloor < 0.08, `floor rose into the music ${state.noiseFloor}`);
  assert.ok(state.gain > 1.4, `gain ${state.gain}`);
  const mean = levels.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  assert.ok(mean > 0.35 && mean < 0.7, `musical mean ${mean}`);
});

test('the quiet threshold widens and narrows the gate', () => {
  const state = fresh(0.2);
  run(state, [0.05, 0.05, 0.04, 0.02], 0.6);
  gateApi.scale(state, [0.15, 0.14, 0.13, 0.04], 0.033);
  assert.equal(state.open, false, 'a moderate rise stays inside a high quiet threshold');
  gateApi.setQuiet(state, 0.02);
  gateApi.scale(state, [0.15, 0.14, 0.13, 0.04], 0.033);
  assert.equal(state.open, true, 'lowering the quiet threshold lets the same rise through');
});

test('the noise floor follows the room down while the gate is closed', () => {
  const state = fresh();
  run(state, [0.2, 0.18, 0.19, 0.16], 0.6);
  assert.ok(state.noiseFloor > 0.15, `high floor ${state.noiseFloor}`);
  assert.equal(state.open, false);
  run(state, [0.02, 0.015, 0.01, 0.02], 1);
  assert.ok(state.noiseFloor < 0.08, `floor did not fall ${state.noiseFloor}`);
  assert.equal(state.open, false);
});

test('mask withholds the spectrum while closed and passes it while open', () => {
  const state = fresh();
  const noise = Uint8Array.from({length: 64}, () => 8);
  run(state, gateApi.bandPeaks(noise, 44100, 2048), 0.6);
  assert.equal(state.open, false);
  const held = gateApi.mask(state, noise);
  assert.equal(held.length, noise.length);
  assert.ok(held.every(v => v === 0));
  run(state, [0.9, 0.2, 0.1, 0], 0.4);
  assert.equal(state.open, true);
  const live = Uint8Array.from({length: 8}, (_, i) => 40 + i);
  const passed = gateApi.mask(state, live);
  assert.equal(passed, live);
});

test('dancers stay still on noise the detector would otherwise arm', async () => {
  const {instance} = await WebAssembly.instantiate(wasm);
  const api = instance.exports;
  const sr = 44100;
  const fft = 2048;
  const bins = 1024;
  api.nd_clear();
  api.nd_set_clock(0);
  api.nd_set_band_sens(0, 1);
  api.nd_add(0, 0, 0);
  const packed = api.nd_band_range(0, sr, fft, bins);
  assert.ok(packed >= 0);
  const i0 = packed & 0xffff;
  const i1 = packed >>> 16;

  function activity() {
    const f = new Float32Array(api.memory.buffer);
    const base = api.nd_dancers() >>> 2;
    return f[base + 2];
  }

  function write(bytes) {
    new Uint8Array(api.memory.buffer, api.nd_spectrum(), bins).set(bytes.subarray(0, bins));
  }

  function bandBytes(value) {
    const bytes = new Uint8Array(bins);
    for (let i = i0; i <= i1; i++) bytes[i] = value;
    return bytes;
  }

  const bed = bandBytes(8);
  const spike = bandBytes(26);
  let heard = 0;
  for (let frame = 0; frame < 12; frame++) {
    write(bed);
    heard |= api.nd_update(0.033, 1, bins, sr, fft, frame * 33);
  }
  write(spike);
  heard |= api.nd_update(0.033, 1, bins, sr, fft, 12 * 33);
  assert.ok(heard & 1, 'ungated near-floor spike should arm the kick dancer');

  api.nd_clear();
  api.nd_set_clock(0);
  api.nd_add(0, 0, 0);
  const gate = fresh(0.4);
  heard = 0;
  for (let frame = 0; frame < 24; frame++) {
    gateApi.scale(gate, gateApi.bandPeaks(bed, sr, fft), 0.033);
    write(gateApi.mask(gate, bed));
    heard |= api.nd_update(0.033, 1, bins, sr, fft, 1000 + frame * 33);
  }
  gateApi.scale(gate, gateApi.bandPeaks(spike, sr, fft), 0.033);
  assert.equal(gate.open, false, 'spike still inside the quiet threshold');
  assert.ok(gate.gainCapped, 'auto-gain is capped on the noise bed');
  assert.ok(gate.gain <= 1.05, `gated gain ${gate.gain}`);
  write(gateApi.mask(gate, spike));
  heard |= api.nd_update(0.033, 1, bins, sr, fft, 2000);
  assert.equal(heard, 0);
  assert.ok(activity() < 0.2, `noise moved a dancer ${activity()}`);

  const hit = bandBytes(220);
  let armed = 0;
  let peak = 0;
  for (let frame = 0; frame < 4; frame++) {
    gateApi.scale(gate, gateApi.bandPeaks(hit, sr, fft), 0.033);
    assert.equal(gate.open, true);
    write(gateApi.mask(gate, hit));
    armed |= api.nd_update(0.033, 1, bins, sr, fft, 4000 + frame * 33);
    peak = Math.max(peak, activity());
  }
  assert.ok(armed & 1, 'a hit above the noise floor still arms the dancer');
  assert.ok(peak > 0.9, `activity ${peak}`);
});
