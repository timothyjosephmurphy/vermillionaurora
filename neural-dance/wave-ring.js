// Neural Dance sound-wave rings (studio-tracker #799).
// Each dancer's bloom is a circle whose radius follows the time-domain
// waveform of that dancer's band: kick, bass, snare, or hi-hat.
// The page taps the live source (room microphone, or the mural tone bus)
// through a highpass/lowpass pair into an AnalyserNode. Meter AGC is not
// applied here; it still scales only the Room music spectrum bars.
(function (root) {
  const BAND_HZ = [[40, 120], [120, 300], [300, 2500], [5000, 14000]];

  function ringGain(env) {
    if (!(env > 0.02)) return 0;
    return Math.min(3.5, 0.7 / env);
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
      if (!w || !(radius > 0)) return;
      const gain = ringGain(env[band] || 0);
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = color || '#fff';
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      if (low || gain === 0) {
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return;
      }
      const n = w.length;
      const stepN = Math.max(1, Math.floor(n / 96));
      for (let i = 0; i < n; i += stepN) {
        const p = radialWavePoint(x, y, radius, (i / n) * Math.PI * 2, w[i] * gain);
        if (i) ctx.lineTo(p[0], p[1]);
        else ctx.moveTo(p[0], p[1]);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    return {connect, release, sample, stroke};
  }

  root.NeuralDanceRings = {BAND_HZ, ringGain, radialWavePoint, createSession};
})(typeof window !== 'undefined' ? window : globalThis);
