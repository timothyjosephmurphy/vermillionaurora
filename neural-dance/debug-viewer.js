// Desktop viewer for one Neural Dance debug room (studio-tracker #824).
// The page is unlisted. Nothing is drawn or requested until the URL carries
// the room code and the viewer key.

import {sanitizeDebugPatch} from './debug-protocol.js';

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

function drawStage(ctx, image, telemetry) {
  ctx.clearRect(0, 0, STAGE_W, STAGE_H);
  ctx.fillStyle = '#080910';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  if (image) ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
  const scaleX = ctx.canvas.width / STAGE_W;
  const scaleY = ctx.canvas.height / STAGE_H;
  const marks = [];
  for (const blob of (telemetry && telemetry.pink) || []) if (blob.stage) marks.push({at: blob.stage, color: '#ffd1ec'});
  for (const blob of (telemetry && telemetry.stickers) || []) if (blob.stage) marks.push({at: blob.stage, color: '#7fe8b3'});
  for (const marker of (telemetry && telemetry.markers) || []) marks.push({at: [marker.x, marker.y], color: marker.kind === 'sticker' ? '#7fe8b3' : '#ffd1ec'});
  for (const mark of marks) {
    ctx.strokeStyle = mark.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(mark.at[0] * scaleX, mark.at[1] * scaleY, 8, 0, Math.PI * 2);
    ctx.stroke();
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

  const send = doc.querySelector('[data-debug-send]');
  if (send) send.addEventListener('click', () => {
    const patch = sanitizeDebugPatch({
      markerMode: doc.querySelector('[data-debug-mode] [aria-pressed="true"]')?.dataset.mode,
      noteSensitivity: +doc.querySelector('[data-debug-control="note"]').value,
      stickerSensitivity: +doc.querySelector('[data-debug-control="sticker"]').value,
      hueTolerance: +doc.querySelector('[data-debug-control="hue"]').value,
      minBlobSize: +doc.querySelector('[data-debug-control="size"]').value,
      quietThreshold: +doc.querySelector('[data-debug-control="quiet"]').value
    });
    if (!patch) return;
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
    if (note) note.textContent = 'Tuning sent';
  });
  doc.querySelectorAll('[data-debug-mode] [data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      doc.querySelectorAll('[data-debug-mode] [data-mode]').forEach(other => other.setAttribute('aria-pressed', other === button ? 'true' : 'false'));
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
