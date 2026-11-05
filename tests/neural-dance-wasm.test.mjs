import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const wasm = readFileSync(new URL('../neural-dance/neural-dance.wasm', import.meta.url));
const page = readFileSync(new URL('../src/pages/neural-dance/index.astro', import.meta.url), 'utf8');
const copier = readFileSync(new URL('../scripts/copy-assets.mjs', import.meta.url), 'utf8');

function load() {
  return WebAssembly.instantiate(wasm).then(({instance}) => instance.exports);
}

function floats(api) {
  return new Float32Array(api.memory.buffer);
}

function dancers(api) {
  const f = floats(api);
  const base = api.nd_dancers() >>> 2;
  const stride = api.nd_dancer_stride();
  const out = [];
  for (let i = 0; i < api.nd_count(); i++) {
    const o = base + i * stride;
    out.push({x: f[o], y: f[o + 1], a: f[o + 2], rest: f[o + 3], k: f[o + 4], id: f[o + 5]});
  }
  return out;
}

function levels(api) {
  const f = floats(api);
  const base = api.nd_levels() >>> 2;
  return [0, 1, 2, 3].map(i => f[base + i]);
}

function writeSpectrum(api, fill) {
  const u = new Uint8Array(api.memory.buffer, api.nd_spectrum(), api.nd_spectrum_cap());
  for (let i = 0; i < u.length; i++) u[i] = fill(i);
  return u;
}

function range(api, band, sampleRate = 44100, fft = 2048, bins = 1024) {
  const packed = api.nd_band_range(band, sampleRate, fft, bins);
  if (packed < 0) return null;
  return [packed & 0xffff, packed >>> 16];
}

function fillBand(api, band, value, sampleRate = 44100, fft = 2048, bins = 1024) {
  const span = range(api, band, sampleRate, fft, bins);
  writeSpectrum(api, i => (span && i >= span[0] && i <= span[1] ? value : 0));
}

const SR = 44100, FFT = 2048, BINS = 1024;

test('wasm exports the mural runtime', async () => {
  const api = await load();
  assert.equal(api.nd_api(), 1);
  assert.equal(api.nd_dancer_stride(), 6);
  assert.equal(api.nd_pulse_stride(), 28);
  assert.equal(api.nd_spectrum_cap(), 2048);
  assert.equal(typeof api.nd_hit, 'function');
  assert.equal(typeof api.nd_set_stickers, 'function');
  assert.ok(api.nd_sticker_in() > 0);
  assert.ok(api.nd_spectrum() > 0);
  assert.ok(api.memory.buffer.byteLength >= api.nd_spectrum() + api.nd_spectrum_cap());
});

test('band edges do not overlap and treble drops out under Nyquist', async () => {
  const api = await load();
  const spans = [0, 1, 2, 3].map(b => range(api, b));
  assert.ok(spans.every(Boolean));
  for (let i = 0; i < 3; i++) assert.ok(spans[i][1] < spans[i + 1][0], `band ${i} overlaps ${i + 1}`);
  assert.equal(range(api, 3, 8000, 2048, 1024), null);
});

test('placement, cap, move, and remove', async () => {
  const api = await load();
  api.nd_clear();
  const ids = [];
  for (let i = 0; i < 48; i++) ids.push(api.nd_add(i, 10, i % 4));
  assert.equal(api.nd_count(), 48);
  assert.equal(api.nd_add(1, 1, 0), 0);
  assert.ok(ids.every(id => id > 0));
  api.nd_move(ids[3], 12.5, 40);
  assert.equal(dancers(api)[3].x, 12.5);
  assert.equal(dancers(api)[3].y, 40);
  api.nd_remove(ids[0]);
  assert.equal(api.nd_count(), 47);
  assert.equal(dancers(api)[0].id, ids[1]);
  api.nd_remove(9999);
  assert.equal(api.nd_count(), 47);
});

test('synthetic beats still arm kick dancers and throw pulses', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_set_bpm(120);
  api.nd_set_low(0);
  const kick = api.nd_add(100, 100, 0);
  api.nd_add(140, 100, 1);
  let heard = 0;
  let peak = 0;
  for (let i = 0; i < 20; i++) {
    heard |= api.nd_update(0.05, 0, 0, SR, FFT, i * 50);
    peak = Math.max(peak, dancers(api).find(d => d.id === kick).a);
  }
  assert.ok(heard & 1, 'kick tone');
  assert.ok(peak > 0.9);
  assert.ok(api.nd_pulse_count() > 0);
});

test('listening to silence does not arm dancers, then the clock returns', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_set_bpm(180);
  const id = api.nd_add(10, 10, 0);
  writeSpectrum(api, () => 0);
  let heard = 0;
  for (let i = 0; i < 40; i++) heard |= api.nd_update(0.05, 1, BINS, SR, FFT, i * 50);
  assert.equal(heard, 0);
  assert.ok(dancers(api).find(d => d.id === id).a < 0.2);
  let later = 0;
  for (let i = 0; i < 30; i++) later |= api.nd_update(0.05, 0, 0, SR, FFT, 5000 + i * 50);
  assert.ok(later & 1);
});

test('each band onset arms only that dancer type', async () => {
  const api = await load();
  for (const band of [0, 1, 2, 3]) {
    api.nd_clear();
    api.nd_set_bpm(120);
    const ids = [0, 1, 2, 3].map(k => api.nd_add(k * 400, 0, k));
    writeSpectrum(api, () => 0);
    for (let frame = 0; frame < 10; frame++) api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
    fillBand(api, band, 200);
    let heard = 0;
    let peak = 0;
    for (let frame = 10; frame < 14; frame++) {
      const mask = api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
      heard |= mask;
      if (mask & (1 << band)) peak = Math.max(peak, dancers(api).find(d => d.id === ids[band]).a);
    }
    assert.ok(heard & (1 << band), `band ${band} tone ${heard}`);
    assert.equal(heard & ~(1 << band), 0, `band ${band} leaked ${heard}`);
    assert.ok(peak > 0.9, `band ${band} activation ${peak}`);
    const set = dancers(api);
    for (const other of [0, 1, 2, 3].filter(k => k !== band)) {
      assert.ok(set.find(d => d.id === ids[other]).a < 0.2, `type ${other} rose on band ${band}`);
    }
    assert.ok(levels(api)[band] > 0.5);
  }
});

test('a held tone and a slow ramp do not keep firing', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_add(0, 0, 0);
  writeSpectrum(api, () => 0);
  for (let frame = 0; frame < 10; frame++) api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
  fillBand(api, 0, 180);
  let fires = 0;
  for (let frame = 10; frame < 40; frame++) {
    const mask = api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
    if (mask & 1) fires++;
  }
  assert.equal(fires, 1);

  api.nd_clear();
  api.nd_add(0, 0, 1);
  let value = 0;
  fires = 0;
  for (let frame = 0; frame < 40; frame++) {
    if (frame > 10) value = Math.min(80, value + 2);
    fillBand(api, 1, value);
    const mask = api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
    if (mask & 2) fires++;
  }
  assert.equal(fires, 0);
});

test('refractory blocks a second attack, then a later one lands', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_add(0, 0, 0);
  const times = [];
  for (let frame = 0; frame < 30; frame++) {
    const t = frame * 33;
    const loud = frame === 12 || frame === 14 || frame === 22;
    fillBand(api, 0, loud ? 200 : 0);
    const mask = api.nd_update(0.033, 1, BINS, SR, FFT, t);
    if (mask & 1) times.push(t);
  }
  assert.deepEqual(times, [12 * 33, 22 * 33]);
});

test('flat noise does not arm dancers', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_add(0, 0, 0);
  api.nd_add(400, 0, 3);
  let seed = 99;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  let heard = 0;
  for (let frame = 0; frame < 50; frame++) {
    writeSpectrum(api, () => 12 + Math.floor(rand() * 4));
    heard |= api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
  }
  assert.equal(heard, 0);
  assert.ok(dancers(api).every(d => d.a < 0.2));
});

test('a close pair sprouts a pulse on a kick hit and removal drops it', async () => {
  const api = await load();
  api.nd_clear();
  const kick = api.nd_add(0, 0, 0);
  const bass = api.nd_add(40, 0, 1);
  writeSpectrum(api, () => 0);
  for (let frame = 0; frame < 10; frame++) api.nd_update(0.033, 1, BINS, SR, FFT, frame * 33);
  fillBand(api, 0, 200);
  api.nd_update(0, 1, BINS, SR, FFT, 400);
  assert.ok(api.nd_pulse_count() >= 1);
  const set = dancers(api);
  assert.ok(set.find(d => d.id === kick).a > 0.9);
  assert.ok(set.find(d => d.id === bass).a < 1.4);
  api.nd_remove(kick);
  assert.equal(api.nd_pulse_count(), 0);
  assert.equal(api.nd_count(), 1);
});

test('UV sticker map keeps activation and an external hit uses the same arm path', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_set_bpm(120);
  const kick = api.nd_add(10, 20, 0);
  api.nd_add(400, 20, 1);
  api.nd_hit(0);
  const mask = api.nd_update(0.05, 1, 0, 44100, 2048, 1000);
  assert.ok(mask & 1);
  assert.equal(mask & ~1, 0);
  const armed = dancers(api).find(d => d.id === kick);
  assert.ok(armed.a > 0.9);
  const view = new Float32Array(api.memory.buffer, api.nd_sticker_in(), 8);
  view[0] = kick;
  view[1] = 250;
  view[2] = 90;
  view[3] = 0;
  view[4] = 0;
  view[5] = 12;
  view[6] = 40;
  view[7] = 3;
  assert.equal(api.nd_set_stickers(2), 2);
  const moved = dancers(api);
  assert.equal(moved.find(d => d.id === kick).x, 250);
  assert.ok(moved.find(d => d.id === kick).a > 0.9);
  assert.equal(moved.find(d => d.id !== kick).k, 3);
  api.nd_hit(3);
  const again = api.nd_update(0.033, 1, 0, 44100, 2048, 1200);
  assert.ok(again & 8);
  assert.equal(api.nd_set_stickers(1), 1);
  assert.equal(dancers(api)[0].id, kick);
});

test('the built-in clock can be forced off, and listening clears synthetic pulses', async () => {
  const api = await load();
  api.nd_clear();
  api.nd_set_bpm(180);
  api.nd_add(0, 0, 0);
  api.nd_add(40, 0, 1);
  api.nd_set_clock(0);
  let heard = 0;
  for (let i = 0; i < 40; i++) heard |= api.nd_update(0.05, 0, 0, 44100, 2048, i * 50);
  assert.equal(heard, 0);
  assert.ok(dancers(api)[0].a < 0.2);
  api.nd_set_clock(1);
  for (let i = 0; i < 20 && api.nd_pulse_count() === 0; i++) api.nd_update(0.05, 0, 0, 44100, 2048, 3000 + i * 50);
  assert.ok(api.nd_pulse_count() > 0);
  const cleared = api.nd_update(0.05, 1, 0, 44100, 2048, 9000);
  assert.equal(cleared, 0);
  assert.equal(api.nd_pulse_count(), 0);
  assert.ok(dancers(api).every(d => d.a < 0.2));
  let still = 0;
  for (let i = 0; i < 30; i++) still |= api.nd_update(0.05, 1, 0, 44100, 2048, 9100 + i * 50);
  assert.equal(still, 0);
});

test('the mural page keeps its controls and loads the wasm core', () => {
  const mural = page.slice(page.indexOf('id="nd-mural-mapped"'), page.indexOf('</section>', page.indexOf('id="nd-mural-mapped"')));
  assert.doesNotMatch(mural, /data-action="listen"/);
  assert.doesNotMatch(mural, /data-action="align"/);
  assert.doesNotMatch(mural, /id="nd-projector"/);
  assert.match(page, /id="nd-room-lab"/);
  assert.match(page, /Room music/);
  assert.match(page, /id="nd-room-projector"/);
  assert.match(page, /data-spectrum/);
  assert.match(page, /nd_set_clock/);
  assert.match(page, /\/neural-dance\/neural-dance\.wasm/);
  assert.match(page, /data-action="play"/);
  assert.match(page, /data-action="audio"/);
  assert.match(page, /data-action="reset"/);
  assert.match(page, /data-action="listen"/);
  assert.match(page, />Listen</);
  assert.match(page, /Listening/);
  assert.match(page, /Muted/);
  assert.match(page, /No mic/);
  assert.match(page, /Align projector/);
  assert.match(page, /id="nd-room-projector"/);
  assert.match(page, /maptastic\.js/);
  assert.match(page, /setStickerFeed/);
  assert.match(page, /UV camera/);
  assert.match(page, /iPhone/);
  assert.match(page, /Start audio/);
  assert.match(copier, /wasm/);
  assert.doesNotMatch(page, /getUserMedia[\s\S]{0,80}video:\s*true/);
});

test('room music is a mic-only prototype stage after the original simulation', () => {
  const muralAt = page.indexOf('id="nd-mural-mapped"');
  const originalAt = page.indexOf('id="original-simulation"');
  const canvasAt = page.indexOf('id="canvas"');
  const roomAt = page.indexOf('id="nd-room-lab"');
  const originalEnd = page.indexOf('</section>', canvasAt);
  assert.ok(muralAt >= 0 && originalAt > muralAt && canvasAt > originalAt);
  assert.ok(originalEnd > canvasAt && roomAt > originalEnd, 'room music follows the original prototype');

  const room = page.slice(roomAt, page.indexOf('</script>', roomAt) + '</script>'.length);
  assert.doesNotMatch(room, /mural-with-silhouettes/);
  assert.doesNotMatch(room, /data-mural/);
  assert.doesNotMatch(room, /data-action="audio"/);
  assert.doesNotMatch(room, /createOscillator/);
  assert.doesNotMatch(room, /createGain/);
  assert.doesNotMatch(room, /\.destination/);
  assert.doesNotMatch(room, /Audio off|Audio on/);
  assert.doesNotMatch(room, /nd_set_clock\(1\)/);
  assert.doesNotMatch(room, /setClock\(/);
  assert.match(room, /nd_set_clock\(0\)/);
  assert.match(room, /#080910/);
  assert.match(room, /fillRect/);
  assert.match(room, /width="1000" height="620"/);
  assert.match(room, /\[105,185,265\]/);
  assert.match(room, /rgba\(145,150,180,\.22\)/);
  assert.doesNotMatch(room, /122\.8/);
  assert.doesNotMatch(room, /mural-with-silhouettes|1764/);
  assert.match(room, /data-action="listen"/);
  assert.match(room, /getUserMedia/);
  assert.match(room, /Align projector/);

  const mural = page.slice(muralAt, page.indexOf('</section>', muralAt));
  assert.match(mural, /mural-with-silhouettes/);
  assert.match(mural, /data-action="audio"/);
  assert.match(page, /Room music<\/a> at the bottom of the page/);
  assert.doesNotMatch(page, /Room music<\/a> below/);
  assert.doesNotMatch(mural, /agcScale/);
});

test('room music AGC holds typical band levels near mid scale', () => {
  const roomAt = page.indexOf('id="nd-room-lab"');
  const room = page.slice(roomAt, page.indexOf('</script>', roomAt) + '</script>'.length);
  const start = room.indexOf('const agcState=');
  const end = room.indexOf('function rawLevels');
  assert.ok(start > 0 && end > start);
  const {agcScale, agcReset} = new Function(room.slice(start, end) + '\nreturn {agcScale, agcReset};')();
  const frameAt = room.indexOf('function frame');
  const frame = room.slice(frameAt, room.indexOf('function projectorLayout'));
  assert.ok(frame.indexOf('nd_update') < frame.indexOf('agcScale'));
  assert.match(frame, /paintMeters\(now,levels\)/);
  assert.match(frame, /drawSpectrum\(levels\)/);

  function settle(raw, seconds) {
    agcReset();
    let levels = raw;
    for (let t = 0; t < seconds; t += 0.033) levels = agcScale(raw, 0.033);
    return levels;
  }
  const pegged = settle([1, 1, 1, 0.02], 2);
  const loud = pegged.slice(0, 3);
  const loudMean = loud.reduce((a, b) => a + b, 0) / loud.length;
  assert.ok(loudMean > 0.42 && loudMean < 0.58, `pegged mean ${loudMean}`);
  assert.ok(Math.max(...pegged) < 0.65);
  assert.ok(pegged[3] < 0.05);

  agcReset();
  const first = agcScale([1, 1, 1, 0], 0.033);
  assert.ok(Math.min(...first.slice(0, 3)) > 0.7, 'gain slews instead of jumping');
  assert.ok(Math.max(...first) < 0.98, 'soft knee, not a hard clip at 1');

  const quiet = settle([0.1, 0.08, 0.12, 0.04], 2);
  const quietMean = quiet.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  assert.ok(quietMean > 0.35 && quietMean < 0.65, `quiet mean ${quietMean}`);

  const silence = settle([0.02, 0.01, 0, 0.015], 2);
  assert.ok(Math.max(...silence) < 0.05);
});
