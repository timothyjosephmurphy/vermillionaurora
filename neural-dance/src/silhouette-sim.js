// Stand-in dancers for the silhouette demo. No camera and no microphone.
// Three copies of the jointed outline step on a steady beat. A short synthesized
// waveform rides the expanding pulse so the bloom is visible without a live input.
// The dot / silhouette toggle is the same light mode the room renderer uses.

import {createSilhouetteShow, placeContour} from './silhouette.js';
import {dancerSilhouette} from './silhouette-dance.js';

const PLACEMENTS = [
  {id: 1, x: 280, y: 360, type: 0, scale: 1.2},
  {id: 2, x: 500, y: 300, type: 1, scale: 1.45},
  {id: 3, x: 740, y: 370, type: 3, scale: 1.05}
];

export function synthWave(beatIndex) {
  const samples = new Float32Array(64);
  const cycles = 2 + ((beatIndex | 0) % 3);
  for (let i = 0; i < samples.length; i++) {
    const t = i / samples.length;
    samples[i] = Math.sin(t * Math.PI * 2 * cycles) * (1 - t) * 0.9;
  }
  return samples;
}

export function createSimState() {
  const body = dancerSilhouette();
  return {
    bpm: 104,
    started: 0,
    beatIndex: -1,
    wave: synthWave(0),
    show: createSilhouetteShow(),
    style: null,
    markers: PLACEMENTS.map(dancer => ({
      id: dancer.id,
      x: dancer.x,
      y: dancer.y,
      type: dancer.type,
      kind: 'sticker',
      scale: dancer.scale,
      contour: placeContour(body, dancer.x, dancer.y, dancer.scale)
    }))
  };
}

export function advanceSim(state, now) {
  const period = 60000 / state.bpm;
  if (!state.started) state.started = now;
  const index = Math.floor((now - state.started) / period);
  if (index !== state.beatIndex) {
    state.beatIndex = index;
    state.wave = synthWave(index);
    state.show.beat(now, index % 4);
  }
  return state;
}

function paintDemoDots(ctx, markers) {
  for (const marker of markers || []) {
    if (!marker || !Number.isFinite(+marker.x) || !Number.isFinite(+marker.y)) continue;
    ctx.beginPath();
    ctx.fillStyle = '#ffe7b0';
    ctx.arc(marker.x, marker.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 196, 110, 0.95)';
    ctx.lineWidth = 2.5;
    ctx.arc(marker.x, marker.y, 18, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function paintSim(ctx, state, now) {
  const width = ctx.canvas ? ctx.canvas.width : 1000;
  const height = ctx.canvas ? ctx.canvas.height : 620;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#080910';
  ctx.fillRect(0, 0, width, height);
  state.show.paint(ctx, state.markers, {
    xy: (x, y) => ({x, y}),
    now,
    waveform: () => state.wave,
    style: state.style,
    paintDots: (list) => paintDemoDots(ctx, list)
  });
}

export function createSimDemo(doc) {
  const root = doc || (typeof document !== 'undefined' ? document : null);
  if (!root) return null;
  const canvas = root.querySelector('[data-sim-stage]');
  const toggle = root.querySelector('[data-light-mode]');
  const status = root.querySelector('[data-sim-status]');
  if (!canvas || !toggle || !canvas.getContext) return null;
  const ctx = canvas.getContext('2d');
  const state = createSimState();
  state.show.setMode('silhouette');
  let frameId = 0;

  function label() {
    const mode = state.show.mode();
    toggle.textContent = mode === 'silhouette' ? 'Light: silhouette' : 'Light: dot';
    toggle.setAttribute('aria-pressed', mode === 'silhouette' ? 'true' : 'false');
    if (status) {
      const beat = state.beatIndex < 0 ? 0 : state.beatIndex;
      status.textContent = mode + ' · ' + state.markers.length + ' dancers · beat ' + beat;
    }
  }

  toggle.addEventListener('click', () => {
    state.show.toggle();
    label();
  });

  function frame(now) {
    advanceSim(state, now);
    paintSim(ctx, state, now);
    label();
    frameId = requestAnimationFrame(frame);
  }

  label();
  frameId = requestAnimationFrame(frame);
  return {
    state,
    stop() {
      cancelAnimationFrame(frameId);
    }
  };
}
