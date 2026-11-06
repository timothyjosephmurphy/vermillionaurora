// Neural Dance sound-wave rings (studio-tracker #799).
// Each dancer's bloom is a circle whose radius follows the time-domain
// waveform of that dancer's band: kick, bass, snare, or hi-hat.
// The page taps the live source (room microphone, or the mural tone bus)
// through a highpass/lowpass pair into an AnalyserNode. Meter AGC is not
// applied here; it still scales only the Room music spectrum bars.
(function (root) {
  const BAND_HZ = [[40, 120], [120, 300], [300, 2500], [5000, 14000]];

  // Room-mic bands sit around RMS 0.001–0.015 after the 4th-order filters.
  // A non-gated source (synthetic oscillator, mural tone bus) is open.
  // Listen passes the silence gate: a closed gate, or a band at the hiss
  // floor, draws a calm circle instead of jitter.
  function ringGateOpen(options) {
    const opts = options || {};
    if (opts.gateOpen === false) return false;
    if (opts.gate && opts.gate.open !== true) return false;
    return true;
  }

  function ringSens(options) {
    const opts = options || {};
    if (opts.sens == null && opts.bandSens == null) return 1;
    const raw = opts.sens != null ? +opts.sens : +opts.bandSens;
    if (!Number.isFinite(raw) || !(raw > 0)) return 0;
    return raw > 3 ? 3 : raw;
  }

  function ringGain(env, options) {
    if (!ringGateOpen(options)) return 0;
    if (!(env > 0.0005)) return 0;
    const sens = ringSens(options);
    if (!(sens > 0)) return 0;
    return Math.min(75, 0.78 / env) * sens;
  }

  // Soft-limit each sample so a clap cannot invert the ring or leave the stage.
  function waveExcursion(sample, gain) {
    const x = (+sample || 0) * (+gain || 0);
    if (!Number.isFinite(x) || x === 0) return 0;
    const y = 0.85 * Math.tanh(x / 0.85);
    return Math.max(-0.85, Math.min(0.85, y));
  }

  // Additive bloom for any closed or open Path2D. Waveform rings use it.
  // Silhouette pulses should build a Path2D of the offset contour and call
  // NeuralDanceRings.bloomStroke(ctx, path, color, lowPower). No shadow blur.
  function bloomStroke(ctx, path, color, low) {
    if (!ctx || !path) return;
    ctx.save();
    ctx.strokeStyle = color || '#fff';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = low ? 6 : 11;
    ctx.stroke(path);
    ctx.globalAlpha = 0.92;
    ctx.lineWidth = 2.5;
    ctx.stroke(path);
    ctx.restore();
  }

  function radialWavePoint(cx, cy, radius, angle, sample) {
    const s = sample > 1 ? 1 : sample < -1 ? -1 : sample;
    const r = radius * (1 + s * 0.85);
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  }

  function createSession() {
    const waves = [0, 1, 2, 3].map(() => new Float32Array(512));
    const env = [0, 0, 0, 0];
    let nodes = [];
    let analysers = [null, null, null, null];
    let bound = null;

    function release() {
      for (const node of nodes) {
        try { node.disconnect(); } catch (e) {}
      }
      nodes = [];
      analysers = [null, null, null, null];
      bound = null;
      for (let k = 0; k < 4; k++) {
        waves[k].fill(0);
        env[k] = 0;
      }
    }

    function connect(ac, source) {
      if (!ac || !source) {
        release();
        return;
      }
      if (bound === source) return;
      release();
      const nyq = ac.sampleRate * 0.49;
      for (let k = 0; k < 4; k++) {
        let lo = BAND_HZ[k][0];
        let hi = BAND_HZ[k][1];
        if (!(lo < nyq)) continue;
        if (hi > nyq) hi = nyq;
        const hp = ac.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = lo;
        hp.Q.value = 0.7071;
        const hp2 = ac.createBiquadFilter();
        hp2.type = 'highpass';
        hp2.frequency.value = lo;
        hp2.Q.value = 0.7071;
        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = Math.max(lo + 1, hi);
        lp.Q.value = 0.7071;
        const lp2 = ac.createBiquadFilter();
        lp2.type = 'lowpass';
        lp2.frequency.value = Math.max(lo + 1, hi);
        lp2.Q.value = 0.7071;
        const an = ac.createAnalyser();
        an.fftSize = 512;
        an.smoothingTimeConstant = 0;
        source.connect(hp);
        hp.connect(hp2);
        hp2.connect(lp);
        lp.connect(lp2);
        lp2.connect(an);
        nodes.push(hp, hp2, lp, lp2, an);
        analysers[k] = an;
      }
      bound = source;
    }

    function sample(dt) {
      const step = Math.max(0.001, Math.min(0.1, dt || 0.033));
      for (let k = 0; k < 4; k++) {
        const an = analysers[k];
        const w = waves[k];
        if (!an) {
          w.fill(0);
          env[k] = 0;
          continue;
        }
        an.getFloatTimeDomainData(w);
        let sum = 0;
        for (let i = 0; i < w.length; i++) sum += w[i] * w[i];
        const rms = Math.sqrt(sum / w.length);
        const tau = rms > env[k] ? 0.08 : 0.45;
        env[k] += (rms - env[k]) * (1 - Math.exp(-step / tau));
      }
    }

    function stroke(ctx, x, y, radius, band, color, low) {
      const w = waves[band];
      if (!w || !(radius > 0)) {
        session.rippling = false;
        return;
      }
      const sens = typeof session.sensAt === 'function' ? session.sensAt(band) : undefined;
      const gain = ringGain(env[band] || 0, {gate: session.gate, sens});
      const rippling = !low && gain > 0;
      session.rippling = rippling;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = color || '#fff';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      if (!rippling) {
        ctx.lineWidth = 1.6;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return;
      }
      const n = w.length;
      const stepN = low ? Math.max(1, Math.floor(n / 48)) : Math.max(1, Math.floor(n / 96));
      const path = new Path2D();
      for (let i = 0; i < n; i += stepN) {
        const excursion = waveExcursion(w[i], gain);
        const p = radialWavePoint(x, y, radius, (i / n) * Math.PI * 2, excursion / 0.85);
        if (i) path.lineTo(p[0], p[1]);
        else path.moveTo(p[0], p[1]);
      }
      path.closePath();
      ctx.restore();
      bloomStroke(ctx, path, color, low);
    }

    const session = {connect, release, sample, stroke, gate: null, sensAt: null, rippling: false};
    return session;
  }

  root.NeuralDanceRings = {BAND_HZ, ringGain, ringSens, waveExcursion, radialWavePoint, bloomStroke, createSession};
})(typeof window !== 'undefined' ? window : globalThis);
