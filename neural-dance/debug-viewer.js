// Desktop viewer for one Neural Dance debug room (studio-tracker #824).
// The page is unlisted. Nothing is drawn or requested until the URL carries
// the room code and the viewer key.

import {sanitizeDebugPatch} from './debug-protocol.js';
import {resolveStageTap} from './src/debug-manual-stickers.js';
import {syncPersonNote} from './src/person-occlusion.js';
import {formatDancerCount} from './room-lab.js';

const STAGE_W = 1000;
const STAGE_H = 620;

function qs(name) {
  return new URLSearchParams(location.search).get(name) || '';
}

function paintMeters(root, audio) {
  const bands = [
    ['kick', audio && audio.kick],
    ['bass', audio && audio.bass],
    ['snare', audio && audio.snare],
    ['hat', audio && audio.hat]
  ];
  for (const [name, value] of bands) {
    const bar = root.querySelector('[data-debug-meter="' + name + '"]');
    if (bar) bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, +value || 0)).toFixed(3) + ')';
  }
  const gate = root.querySelector('[data-debug-gate]');
  if (gate) {
    const closed = !audio || audio.silenceGate !== false;
    gate.textContent = closed ? 'Silence gate closed' : 'Silence gate open';
  }
  const floor = root.querySelector('[data-debug-floor]');
  if (floor) floor.textContent = 'noise floor ' + ((audio && +audio.noiseFloor) || 0).toFixed(2);
  const source = root.querySelector('[data-debug-source]');
  if (source) source.textContent = audio && audio.source ? audio.source : 'silent';
}

function fillTable(table, telemetry) {
  const body = table.querySelector('tbody');
  if (!body) return;
  body.replaceChildren();
  const rows = [];
  for (const blob of (telemetry && telemetry.pink) || []) rows.push(['pink', blob]);
  for (const blob of (telemetry && telemetry.stickers) || []) rows.push(['sticker', blob]);
  if (!rows.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.textContent = 'No blobs in the latest frame.';
    tr.appendChild(td);
    body.appendChild(tr);
    return;
  }
  for (const [kind, blob] of rows) {
    const tr = document.createElement('tr');
    const cells = [
      kind,
      blob.grid ? blob.grid.map(n => Math.round(n)).join(', ') : '—',
      blob.stage ? blob.stage.map(n => Math.round(n)).join(', ') : '—',
      blob.area != null ? String(Math.round(blob.area)) : '—',
      blob.rgb ? blob.rgb.join(' ') : '—',
      blob.luminanceRatio != null ? String(blob.luminanceRatio) : '—'
    ];
    for (const text of cells) {
      const td = document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    }
    body.appendChild(tr);
  }
}

function drawOverlay(ctx, telemetry, width, height) {
  const quad = telemetry && telemetry.quad;
  if (quad && quad.length) {
    ctx.strokeStyle = '#ff7ad9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    quad.forEach((corner, index) => {
      const x = corner.x * width;
      const y = corner.y * height;
      if (index) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    });
    if (quad.length === 4) ctx.closePath();
    ctx.stroke();
  }
  const mark = (blob, color) => {
    if (!blob.grid) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(blob.grid[0], blob.grid[1], 10, 0, Math.PI * 2);
    ctx.stroke();
  };
  for (const blob of (telemetry && telemetry.pink) || []) mark(blob, '#ffd1ec');
  for (const blob of (telemetry && telemetry.stickers) || []) mark(blob, '#7fe8b3');
}

export function stageMarkPlan(telemetry) {
  const raw = [];
  const latched = [];
  for (const blob of (telemetry && telemetry.pink) || []) if (blob.stage) raw.push({at: blob.stage, kind: 'pink'});
  for (const blob of (telemetry && telemetry.stickers) || []) if (blob.stage) raw.push({at: blob.stage, kind: 'sticker'});
  for (const marker of (telemetry && telemetry.markers) || []) {
    latched.push({at: [marker.x, marker.y], kind: marker.kind === 'sticker' ? 'sticker' : 'pink'});
  }
  return {raw, latched};
}

export function paintProjectedStage(ctx, telemetry, width, height) {
  const plan = stageMarkPlan(telemetry);
  const scaleX = width / STAGE_W;
  const scaleY = height / STAGE_H;
  for (const mark of plan.raw) {
    ctx.beginPath();
    ctx.strokeStyle = mark.kind === 'sticker' ? '#7fe8b3' : '#ffd1ec';
    ctx.lineWidth = 2;
    ctx.arc(mark.at[0] * scaleX, mark.at[1] * scaleY, 8, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (const mark of plan.latched) {
    const color = mark.kind === 'sticker' ? '#7fe8b3' : '#ffe7b0';
    const x = mark.at[0] * scaleX;
    const y = mark.at[1] * scaleY;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawStage(ctx, image, telemetry) {
  ctx.clearRect(0, 0, STAGE_W, STAGE_H);
  ctx.fillStyle = '#080910';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (image) ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
  paintProjectedStage(ctx, telemetry, ctx.canvas.width, ctx.canvas.height);
}

function tuningPatch(doc) {
  const mode = doc.querySelector('[data-debug-mode] [aria-pressed="true"]');
  const value = (name) => {
    const input = doc.querySelector('[data-debug-control="' + name + '"]');
    return input ? +input.value : undefined;
  };
  return {
    markerMode: mode && mode.dataset.mode,
    noteSensitivity: value('note'),
    stickerSensitivity: value('sticker'),
    hueTolerance: value('hue'),
    minBlobSize: value('size'),
    quietThreshold: value('quiet'),
    gravity: value('gravity'),
    wander: value('wander'),
    threshold: value('threshold'),
    peak: value('peak'),
    type: value('type'),
    kickSensitivity: value('sens-0'),
    bassSensitivity: value('sens-1'),
    snareSensitivity: value('sens-2'),
    hatSensitivity: value('sens-3')
  };
}

function assignControl(doc, name, value) {
  const input = doc.querySelector('[data-debug-control="' + name + '"]');
  if (!input || doc.activeElement === input || value == null || !Number.isFinite(+value)) return;
  input.value = String(value);
}

export function syncTuning(doc, telemetry) {
  if (!doc || !telemetry || !telemetry.controls) return;
  const controls = telemetry.controls;
  assignControl(doc, 'note', controls.noteSensitivity);
  assignControl(doc, 'sticker', controls.stickerSensitivity);
  assignControl(doc, 'hue', controls.hueTolerance);
  assignControl(doc, 'size', controls.minBlobSize);
  assignControl(doc, 'quiet', controls.quietThreshold);
  assignControl(doc, 'gravity', controls.gravity);
  assignControl(doc, 'wander', controls.wander);
  assignControl(doc, 'threshold', controls.threshold);
  assignControl(doc, 'peak', controls.peak);
  assignControl(doc, 'type', controls.type);
  const sens = Array.isArray(controls.sens) ? controls.sens : [];
  for (let i = 0; i < 4; i++) assignControl(doc, 'sens-' + i, sens[i]);
  const mode = controls.markerMode;
  const group = doc.querySelector('[data-debug-mode]');
  if (group && doc.activeElement !== group && !(group.contains && group.contains(doc.activeElement))) {
    group.querySelectorAll('[data-mode]').forEach(button => {
      button.setAttribute('aria-pressed', button.dataset.mode === mode ? 'true' : 'false');
    });
  }
}

export function attachDebugViewer(doc) {
  if (!doc || !doc.body || doc.body.dataset.viewerReady === '1') return;
  doc.body.dataset.viewerReady = '1';
  const room = qs('room');
  const key = qs('key');
  const gate = doc.querySelector('[data-debug-missing]');
  const app = doc.querySelector('[data-debug-app]');
  if (!room || !key) {
    if (gate) gate.hidden = false;
    if (app) app.hidden = true;
    return;
  }
  if (gate) gate.hidden = true;
  if (app) app.hidden = false;
  const roomLabel = doc.querySelector('[data-debug-room]');
  if (roomLabel) roomLabel.textContent = room;
  const camera = doc.querySelector('[data-debug-camera]');
  const stage = doc.querySelector('[data-debug-stage]');
  const hover = doc.querySelector('[data-debug-hover]');
  const summary = doc.querySelector('[data-debug-summary]');
  const table = doc.querySelector('[data-debug-table]');
  const cctx = camera.getContext('2d');
  const sctx = stage.getContext('2d');
  let telemetry = null;
  let cameraImage = null;
  let stageImage = null;
  let socket = null;
  let attempts = 0;

  function render() {
    const detectW = telemetry && telemetry.detectWidth || (cameraImage && cameraImage.naturalWidth) || 480;
    const detectH = telemetry && telemetry.detectHeight || (cameraImage && cameraImage.naturalHeight) || 253;
    camera.width = detectW;
    camera.height = detectH;
    cctx.fillStyle = '#05060a';
    cctx.fillRect(0, 0, detectW, detectH);
    if (cameraImage) cctx.drawImage(cameraImage, 0, 0, detectW, detectH);
    drawOverlay(cctx, telemetry, detectW, detectH);
    drawStage(sctx, stageImage, telemetry);
    const audio = telemetry && telemetry.audio;
    paintMeters(doc, audio);
    fillTable(table, telemetry);
    const dancersLine = doc.querySelector('[data-debug-dancers]');
    if (dancersLine) {
      const stage = telemetry && telemetry.stage || {};
      const dancers = +stage.dancers || 0;
      const stickers = stage.stickers != null ? +stage.stickers : ((telemetry && telemetry.markers) || []).length;
      const pulses = +stage.pulses || 0;
      dancersLine.textContent = [
        formatDancerCount(dancers, stickers),
        pulses + ' pulses',
        stage.simDancers ? 'sim dancers on' : 'sim dancers cleared',
        stickers + ' latched',
        telemetry && telemetry.aligned ? 'aligned' : 'not aligned',
        stage.aligning ? 'aligning' : 'not aligning',
        stage.running ? 'running' : 'paused',
        stage.hidden ? 'controls hidden' : 'controls visible'
      ].join(' · ');
    }
    syncPersonNote(doc, !!(telemetry && telemetry.occlusion && telemetry.occlusion.note));
    syncTuning(doc, telemetry);
    if (summary) {
      const rgb = telemetry && telemetry.quadMedianRgb;
      const controls = telemetry && telemetry.controls || {};
      summary.textContent = [
        telemetry && telemetry.cameraLabel ? telemetry.cameraLabel : 'No camera',
        telemetry && telemetry.facingMode ? telemetry.facingMode : 'facing —',
        (telemetry && telemetry.videoWidth ? telemetry.videoWidth : 0) + '×' + (telemetry && telemetry.videoHeight ? telemetry.videoHeight : 0),
        'detect ' + detectW + '×' + detectH,
        'fps ' + ((telemetry && +telemetry.fps) || 0).toFixed(1),
        telemetry && telemetry.aligned ? 'aligned' : 'not aligned',
        'quad RGB ' + (rgb ? rgb.join(' ') : '—'),
        'mode ' + (controls.markerMode || '—'),
        'note ' + (controls.noteSensitivity ?? '—'),
        'sticker ' + (controls.stickerSensitivity ?? '—'),
        'hue ' + (controls.hueTolerance ?? '—'),
        'min ' + (controls.minBlobSize ?? '—'),
        'quiet ' + (controls.quietThreshold ?? '—')
      ].join(' · ');
    }
  }

  function loadImage(url) {
    return new Promise(resolve => {
      if (!url) return resolve(null);
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = url;
    });
  }

  async function applyMessage(message) {
    if (!message || message.type === 'hello') return;
    if (message.telemetry) telemetry = message.telemetry;
    if (message.cameraJpeg) cameraImage = await loadImage(message.cameraJpeg);
    if (message.stageJpeg) stageImage = await loadImage(message.stageJpeg);
    render();
  }

  function connect() {
    const url = new URL('/api/neural-dance/debug/ws', location.href);
    url.protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    url.searchParams.set('room', room);
    url.searchParams.set('role', 'viewer');
    url.searchParams.set('key', key);
    let next;
    try { next = new WebSocket(url.href); } catch { schedule(); return; }
    socket = next;
    next.onmessage = (event) => {
      let message;
      try { message = JSON.parse(event.data); } catch { return; }
      applyMessage(message);
    };
    next.onopen = () => { attempts = 0; };
    next.onclose = () => { if (socket === next) socket = null; schedule(); };
  }
  function schedule() {
    const delay = Math.min(8000, 1000 * 2 ** attempts);
    attempts++;
    setTimeout(connect, delay);
  }

  camera.addEventListener('mousemove', event => {
    const rect = camera.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(0, Math.min(camera.width - 1, Math.floor((event.clientX - rect.left) * camera.width / rect.width)));
    const y = Math.max(0, Math.min(camera.height - 1, Math.floor((event.clientY - rect.top) * camera.height / rect.height)));
    let pixel = [0, 0, 0];
    try {
      const data = cctx.getImageData(x, y, 1, 1).data;
      pixel = [data[0], data[1], data[2]];
    } catch { /* canvas not readable yet */ }
    const med = telemetry && telemetry.quadMedianRgb || [32, 32, 32];
    const wb = pixel.map((channel, index) => (channel / Math.max(1, med[index])).toFixed(2));
    if (hover) hover.textContent = 'x ' + x + ' y ' + y + ' · RGB ' + pixel.join(' ') + ' · WB ' + wb.join(' ');
  });

  function sendPatch(raw, label) {
    const patch = sanitizeDebugPatch(raw);
    if (!patch) return false;
    const body = JSON.stringify({type: 'propose_patch', patch});
    let sent = false;
    if (socket && socket.readyState === 1) {
      try { socket.send(body); sent = true; } catch { sent = false; }
    }
    if (!sent) {
      const url = '/api/neural-dance/debug/patch?room=' + encodeURIComponent(room) + '&key=' + encodeURIComponent(key);
      fetch(url, {method: 'POST', headers: {'content-type': 'application/json'}, cache: 'no-store', body: JSON.stringify({patch})}).catch(() => {});
    }
    const note = doc.querySelector('[data-debug-sent]');
    if (note) note.textContent = label || 'Tuning sent';
    return true;
  }
  const send = doc.querySelector('[data-debug-send]');
  if (send) send.addEventListener('click', () => { sendPatch(tuningPatch(doc), 'Tuning sent'); });
  doc.querySelectorAll('[data-debug-control]').forEach(input => {
    input.addEventListener('change', () => { sendPatch(tuningPatch(doc), 'Tuning sent'); });
  });
  doc.querySelectorAll('[data-debug-action]').forEach(button => {
    button.addEventListener('click', () => {
      sendPatch({action: button.dataset.debugAction}, button.textContent.trim());
    });
  });
  if (stage) stage.addEventListener('click', event => {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width * STAGE_W;
    const y = (event.clientY - rect.top) / rect.height * STAGE_H;
    const patch = resolveStageTap(telemetry && telemetry.markers, x, y);
    const label = patch && patch.action === 'remove-manual-sticker' ? 'Manual sticker removed' : 'Manual sticker sent';
    sendPatch(patch, label);
  });
  doc.querySelectorAll('[data-debug-mode] [data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      doc.querySelectorAll('[data-debug-mode] [data-mode]').forEach(other => other.setAttribute('aria-pressed', other === button ? 'true' : 'false'));
      sendPatch(tuningPatch(doc), 'Tuning sent');
    });
  });

  render();
  connect();
}

if (typeof document !== 'undefined') {
  const boot = () => attachDebugViewer(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
