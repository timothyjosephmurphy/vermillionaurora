// Copyright (c) 2026 TJ Murphy / Vermillion Aurora Productions
// All rights reserved. No use, copying, modification, or distribution
// without a written license. Contact tj@tjm.art.
// License: neural-dance/LICENSE

// Neural Dance silence gate (studio-tracker #800).
// The noise floor is the low percentile of recent input level, measured only
// while the gate is closed so a song cannot become the floor. Near that floor
// the auto-gain cap stays at 1: silence and background noise are not boosted
// into dancer motion. Listen (the mic) and Room music both use this gate.
// Above the quiet threshold the live spectrum is passed through unchanged.
(function (root) {
  var FLOOR_PERCENTILE = 0.1;
  var WARMUP_FRAMES = 12;
  var HOLD_SECONDS = 0.28;
  var QUIET_DEFAULT = 0.08;
  var SAMPLE_CAP = 90;
  var BANDS = [[40, 120], [120, 300], [300, 2500], [5000, 14000]];

  function clamp(v, lo, hi) {
    if (!(v > lo)) return lo;
    if (v > hi) return hi;
    return v;
  }

  function create() {
    return {
      gain: 1,
      hist: [],
      samples: [],
      noiseFloor: 0,
      quiet: QUIET_DEFAULT,
      open: false,
      hold: 0,
      level: 0,
      gainCapped: false,
      headroom: 0
    };
  }

  function reset(state) {
    state.gain = 1;
    state.hist.length = 0;
    state.samples.length = 0;
    state.noiseFloor = 0;
    state.open = false;
    state.hold = 0;
    state.level = 0;
    state.gainCapped = false;
    state.headroom = 0;
  }

  function setQuiet(state, value) {
    state.quiet = clamp(+value || 0, 0, 0.5);
  }

  function knee(x) {
    if (!(x > 0)) return 0;
    if (x < 0.72) return x;
    return 0.72 + 0.24 * (1 - Math.exp(-(x - 0.72) / 0.28));
  }

  function percentile(values, p) {
    if (!values.length) return 0;
    var sorted = values.slice().sort(function (a, b) { return a - b; });
    var idx = (sorted.length - 1) * p;
    var lo = Math.floor(idx);
    var hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo];
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
  }

  function pushSample(state, level) {
    state.samples.push(level);
    if (state.samples.length > SAMPLE_CAP) state.samples.shift();
    state.noiseFloor = percentile(state.samples, FLOOR_PERCENTILE);
  }

  function updateOpen(state, level, dt, warming) {
    var margin = state.quiet;
    var head = level - state.noiseFloor;
    state.headroom = head;
    if (warming) {
      state.open = false;
      state.hold = 0;
      return;
    }
    if (head > margin) {
      state.open = true;
      state.hold = HOLD_SECONDS;
      return;
    }
    state.hold = Math.max(0, state.hold - (dt > 0 ? dt : 0));
    if (state.hold <= 0) state.open = false;
  }

  function maxLevel(raw) {
    var peak = 0;
    for (var k = 0; k < 4; k++) {
      var v = Math.max(0, +raw[k] || 0);
      if (v > peak) peak = v;
    }
    return peak;
  }

  // Returns the four display levels. Updates state.noiseFloor, state.gain,
  // state.gainCapped, and state.open. Callers feed the mic to the onset
  // detector only while state.open is true.
  function scale(state, raw, dt) {
    var step = Math.max(0.001, Math.min(0.1, dt || 0.033));
    var level = maxLevel(raw);
    state.level = level;
    var warming = state.samples.length < WARMUP_FRAMES;
    if (warming) pushSample(state, level);
    updateOpen(state, level, step, warming);
    if (!warming && !state.open) pushSample(state, level);

    var sum = 0;
    var n = 0;
    var peak = 0;
    for (var k = 0; k < 4; k++) {
      var v = Math.max(0, +raw[k] || 0);
      if (v > peak) peak = v;
      if (v >= 0.06) { sum += v * v; n++; }
    }
    var rms = n ? Math.sqrt(sum / n) : 0;
    state.hist.push({dt: step, rms: rms, peak: peak});
    var span = 0;
    for (var i = state.hist.length - 1; i >= 0; i--) {
      span += state.hist[i].dt;
      if (span > 1.25) { state.hist.splice(0, i); break; }
    }
    var rSum = 0;
    var rW = 0;
    var pMax = 0;
    for (var h = 0; h < state.hist.length; h++) {
      var s = state.hist[h];
      if (s.peak > pMax) pMax = s.peak;
      if (s.rms > 0) { rSum += s.rms * s.dt; rW += s.dt; }
    }
    var winRms = rW ? rSum / rW : 0;
    var ref = winRms > 0 ? winRms : (pMax > 0.06 ? pMax * 0.5 : 0);
    var head = level - state.noiseFloor;
    var maxGain = 1;
    if (head > state.quiet) {
      var t = Math.min(1, (head - state.quiet) / Math.max(state.quiet, 0.02));
      maxGain = 1 + t * 5;
    }
    var uncapped = ref < 0.05 ? 1 : Math.max(0.25, Math.min(6, 0.5 / ref));
    var desired = Math.min(uncapped, maxGain);
    state.gainCapped = uncapped - desired > 1e-4;
    var tau = desired < state.gain ? 0.22 : 0.8;
    state.gain += (desired - state.gain) * (1 - Math.exp(-step / tau));
    return [0, 1, 2, 3].map(function (band) {
      return knee((+raw[band] || 0) * state.gain);
    });
  }

  function bandPeaks(bytes, sampleRate, fftSize) {
    var peaks = [0, 0, 0, 0];
    if (!bytes || !(sampleRate > 0) || !(fftSize > 0)) return peaks;
    var hz = sampleRate / fftSize;
    for (var b = 0; b < 4; b++) {
      var i0 = Math.ceil(BANDS[b][0] / hz - 1e-4);
      var i1 = Math.ceil(BANDS[b][1] / hz - 1e-4) - 1;
      if (i0 < 1) i0 = 1;
      if (i1 > bytes.length - 1) i1 = bytes.length - 1;
      var loud = 0;
      if (i1 >= i0) {
        for (var i = i0; i <= i1; i++) if (bytes[i] > loud) loud = bytes[i];
      }
      // Same 56-count unit as the wasm meters, without the display clamp,
      // so a hit can still rise above a loud bed.
      peaks[b] = loud / 56;
    }
    return peaks;
  }

  // Closed gate: a zero spectrum, so noise-floor jitter cannot onset.
  // Open gate: the live analyser bytes, unchanged.
  function mask(state, bytes) {
    var length = bytes ? bytes.length : 0;
    if (state.open && bytes) {
      if (bytes instanceof Uint8Array) return bytes;
      return Uint8Array.from(bytes);
    }
    return new Uint8Array(length);
  }

  root.ndSilenceGate = {
    create: create,
    reset: reset,
    setQuiet: setQuiet,
    knee: knee,
    scale: scale,
    bandPeaks: bandPeaks,
    mask: mask,
    FLOOR_PERCENTILE: FLOOR_PERCENTILE,
    QUIET_DEFAULT: QUIET_DEFAULT
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
