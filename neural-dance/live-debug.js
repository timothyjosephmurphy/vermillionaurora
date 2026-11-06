// Copyright (c) 2026 TJ Murphy / Vermillion Aurora Productions
// All rights reserved. No use, copying, modification, or distribution
// without a written license. Contact tj@tjm.art.
// License: neural-dance/LICENSE

// Opt-in publisher for /neural-dance/live/ (studio-tracker #824).
// Off by default: no socket, no timer, no frames. On, a room code and viewer
// link stay in this tab, and a ~750ms relay sends the camera, the stage, and
// telemetry. Suggested tuning arrives as a banner unless auto-apply is on.

import {detectionSize} from './camera-markers.js';
import {DEBUG_INTERVAL_MS, DEBUG_SESSION_KEY, ROOM_RE, createDebugCredentials, sanitizeDebugPatch, validSecret, viewerPath} from './debug-protocol.js';
import {beginAlign, cancelAlign} from './live-show.js';

export {DEBUG_INTERVAL_MS, viewerPath};
export const CAMERA_JPEG_QUALITY = 0.62;
export const STAGE_JPEG_QUALITY = 0.6;
export const STAGE_JPEG_W = 480;
export const STAGE_JPEG_H = 270;

export function readDebugSession(storage) {
  if (!storage) return null;
  try {
    const data = JSON.parse(storage.getItem(DEBUG_SESSION_KEY) || '');
    if (!data || !ROOM_RE.test(data.room) || !validSecret(data.secret) || !validSecret(data.key) || data.secret === data.key) return null;
    return {room: data.room, secret: data.secret, key: data.key, autoApply: data.autoApply === true};
  } catch {
    return null;
  }
}

export function writeDebugSession(storage, session) {
  if (!storage || !session) return false;
  try {
    storage.setItem(DEBUG_SESSION_KEY, JSON.stringify({
      room: session.room,
      secret: session.secret,
      key: session.key,
      autoApply: session.autoApply === true
    }));
    return true;
  } catch {
    return false;
  }
}

export function ensureDebugSession(storage) {
  const existing = readDebugSession(storage);
  if (existing) return existing;
  const created = createDebugCredentials();
  writeDebugSession(storage, created);
  return created;
}

function controlNumber(root, name) {
  const input = root && root.querySelector('[data-control="' + name + '"]');
  if (!input) return null;
  const value = +input.value;
  return Number.isFinite(value) ? value : null;
}

export function collectTelemetry(doc, now = Date.now()) {
  const cameraRoot = doc.getElementById('nd-camera-mode');
  const room = doc.getElementById('nd-room-lab');
  const vision = cameraRoot && cameraRoot.neuralDanceCamera && typeof cameraRoot.neuralDanceCamera.debugState === 'function'
    ? cameraRoot.neuralDanceCamera.debugState()
    : {};
  const audio = room && room.neuralDance && typeof room.neuralDance.debugAudio === 'function'
    ? room.neuralDance.debugAudio()
    : {source: 'silent', kick: 0, bass: 0, snare: 0, hat: 0, envelopes: {kick: 0, bass: 0, snare: 0, hat: 0}, silenceGate: true, noiseFloor: 0, open: false, micGain: 0};
  const controls = vision.controls || {};
  const envelopes = audio.envelopes || {kick: audio.kick || 0, bass: audio.bass || 0, snare: audio.snare || 0, hat: audio.hat || 0};
  const roomState = room && room.neuralDance && typeof room.neuralDance.debugRoom === 'function' ? room.neuralDance.debugRoom() : {};
  const bodyHas = (name) => !!(doc.body && doc.body.classList && doc.body.classList.contains(name));
  const sens = [0, 1, 2, 3].map(band => {
    const input = room && room.querySelector && room.querySelector('[data-control="sens"][data-band="' + band + '"]');
    if (!input) return null;
    const value = +input.value;
    return Number.isFinite(value) ? value : null;
  });
  return {
    t: now,
    fps: +vision.fps || 0,
    videoWidth: vision.videoWidth || 0,
    videoHeight: vision.videoHeight || 0,
    detectWidth: vision.detectWidth || 0,
    detectHeight: vision.detectHeight || 0,
    cameraLabel: vision.cameraLabel || '',
    facingMode: vision.facingMode || '',
    quad: vision.quad || null,
    aligned: !!vision.aligned,
    quadMedianRgb: vision.quadMedianRgb || null,
    pink: vision.pink || [],
    stickers: vision.stickers || [],
    markers: vision.markers || [],
    audio: {
      source: audio.source === 'mic' || audio.source === 'track' ? audio.source : 'silent',
      kick: +audio.kick || 0,
      bass: +audio.bass || 0,
      snare: +audio.snare || 0,
      hat: +audio.hat || 0,
      envelopes,
      silenceGate: audio.silenceGate !== false,
      noiseFloor: +audio.noiseFloor || 0,
      open: !!audio.open,
      micGain: +audio.micGain || 0
    },
    controls: {
      markerMode: controls.markerMode || controls.detectionMode || 'both',
      noteSensitivity: controls.saturationSensitivity ?? controlNumber(cameraRoot, 'sat'),
      stickerSensitivity: controls.stickerSensitivity ?? controlNumber(cameraRoot, 'sticker'),
      hueTolerance: controls.hueTolerance ?? controlNumber(cameraRoot, 'hue'),
      minBlobSize: controls.minBlobSize ?? controlNumber(cameraRoot, 'size'),
      maxBlobSize: controls.maxBlobSize ?? 160,
      quietThreshold: controlNumber(room, 'quiet'),
      micGain: +audio.micGain || 0,
      gravity: controlNumber(room, 'gravity'),
      wander: controlNumber(room, 'wander'),
      threshold: controlNumber(room, 'threshold'),
      peak: controlNumber(room, 'peak'),
      type: controlNumber(room, 'type'),
      sens,
      simDancers: roomState.simDancers === true,
      simCount: +roomState.simCount || 0
    },
    stage: {
      dancers: +roomState.dancers || 0,
      pulses: +roomState.pulses || 0,
      stickers: roomState.stickers != null ? +roomState.stickers : ((vision.markers || []).length),
      simCount: +roomState.simCount || 0,
      simDancers: roomState.simDancers === true,
      running: !!roomState.running,
      markersLive: !!roomState.markersLive,
      aligning: bodyHas('nd-live-aligning'),
      hidden: bodyHas('nd-live-hidden')
    }
  };
}

function setControl(root, selector, value, eventName) {
  if (!root || typeof root.querySelector !== 'function' || value == null || !Number.isFinite(+value)) return;
  const input = root.querySelector(selector);
  if (!input) return;
  input.value = String(value);
  if (typeof input.dispatchEvent === 'function') input.dispatchEvent(new Event(eventName || 'input', {bubbles: true}));
}

function clickControl(doc, selector, label) {
  if (!doc || typeof doc.querySelector !== 'function') return;
  const node = doc.querySelector(selector);
  if (!node || typeof node.click !== 'function') return;
  if (label && String(node.textContent || '').trim() !== label) return;
  node.click();
}

function applyDebugAction(doc, clean) {
  if (!clean || !clean.action) return;
  const room = doc.getElementById && doc.getElementById('nd-room-lab');
  const nd = room && room.neuralDance;
  const camRoot = doc.getElementById && doc.getElementById('nd-camera-mode');
  const camera = camRoot && camRoot.neuralDanceCamera;
  const action = clean.action;
  if (action === 'align' && doc.body && !doc.body.classList.contains('nd-live-aligning')) beginAlign(doc);
  else if (action === 'cancel-align' && doc.body && doc.body.classList.contains('nd-live-aligning')) cancelAlign(doc);
  else if ((action === 'clear-sim' || action === 'sim-off') && nd && typeof nd.clearSim === 'function') nd.clearSim();
  else if ((action === 'sim-seed' || action === 'sim-on') && nd && typeof nd.seedSim === 'function') nd.seedSim();
  else if (action === 'add-sim' && nd && typeof nd.addSim === 'function') nd.addSim(clean.x, clean.y, clean.type);
  else if (action === 'clear-markers') clickControl(doc, '[data-marker-clear]');
  else if (action === 'start') clickControl(doc, '#nd-room-lab [data-action="play"]', 'Start');
  else if (action === 'pause') clickControl(doc, '#nd-room-lab [data-action="play"]', 'Pause');
  else if (action === 'markers-on' && camera && typeof camera.setMarkersEnabled === 'function') camera.setMarkersEnabled(true);
  else if (action === 'markers-off' && camera && typeof camera.setMarkersEnabled === 'function') camera.setMarkersEnabled(false);
  else if (action === 'hide-controls') clickControl(doc, '[data-live="hide"]');
  else if (action === 'show-controls') clickControl(doc, '[data-live="reveal"]');
  else if (action === 'reset-camera') clickControl(doc, '[data-marker-reset]');
}

export function applyDebugPatch(doc, patch) {
  const clean = sanitizeDebugPatch(patch);
  if (!clean || !doc) return false;
  const camera = doc.getElementById('nd-camera-mode');
  if (camera && camera.neuralDanceCamera && typeof camera.neuralDanceCamera.applyTuning === 'function') {
    camera.neuralDanceCamera.applyTuning(clean);
  }
  const room = doc.getElementById('nd-room-lab');
  setControl(room, '[data-control="quiet"]', clean.quietThreshold, 'input');
  setControl(room, '[data-control="gravity"]', clean.gravity, 'input');
  setControl(room, '[data-control="wander"]', clean.wander, 'input');
  setControl(room, '[data-control="threshold"]', clean.threshold, 'input');
  setControl(room, '[data-control="peak"]', clean.peak, 'input');
  setControl(room, '[data-control="type"]', clean.type, 'change');
  if (Array.isArray(clean.sens)) {
    clean.sens.forEach((value, band) => setControl(room, '[data-control="sens"][data-band="' + band + '"]', value, 'input'));
  }
  applyDebugAction(doc, clean);
  return true;
}

function jpegOf(canvas, source, width, height, quality) {
  if (!source || !canvas || !(width > 0) || !(height > 0)) return null;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', {alpha: false});
  if (!ctx) return null;
  ctx.drawImage(source, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', quality);
}

export function attachLiveDebug(doc) {
  if (!doc || !doc.body || doc.body.dataset.debugReady === '1') return;
  const share = doc.querySelector('[data-debug-share]');
  if (!share) return;
  doc.body.dataset.debugReady = '1';
  const panel = doc.querySelector('[data-debug-panel]');
  const codeEl = doc.querySelector('[data-debug-code]');
  const link = doc.querySelector('[data-debug-link]');
  const copy = doc.querySelector('[data-debug-copy]');
  const status = doc.querySelector('[data-debug-status]');
  const auto = doc.querySelector('[data-debug-auto]');
  const banner = doc.querySelector('[data-debug-banner]');
  const bannerText = doc.querySelector('[data-debug-banner-text]');
  const apply = doc.querySelector('[data-debug-apply]');
  const dismiss = doc.querySelector('[data-debug-dismiss]');
  const cameraRoot = doc.getElementById('nd-camera-mode');
  const storage = (() => { try { return doc.defaultView ? doc.defaultView.sessionStorage : sessionStorage; } catch { return null; } })();
  let sharing = false;
  let session = readDebugSession(storage);
  let socket = null;
  let timer = 0;
  let attempts = 0;
  let lastPatchId = null;
  let lastPatchAt = null;
  let pending = null;
  const cameraCanvas = doc.createElement('canvas');
  const stageCanvas = doc.createElement('canvas');
  if (auto && session) auto.checked = session.autoApply === true;

  function say(text) {
    if (status) status.textContent = text;
  }
  function showSession() {
    if (!session) return;
    if (codeEl) codeEl.textContent = session.room;
    if (link) link.href = viewerPath(session);
    if (panel) panel.hidden = false;
  }
  function notePatch(message) {
    const incoming = message && message.pendingPatch ? message.pendingPatch : message;
    const patch = incoming && incoming.patch ? incoming.patch : (message && message.patch);
    const id = incoming && incoming.id != null ? incoming.id : (message && message.patchId);
    const at = incoming && incoming.at;
    if (!patch) return;
    if (id != null && id === lastPatchId && at === lastPatchAt) return;
    lastPatchId = id;
    lastPatchAt = at;
    if (auto && auto.checked) {
      applyDebugPatch(doc, patch);
      reportPatch('applied');
      say('Applied live tuning');
      return;
    }
    pending = patch;
    if (bannerText) bannerText.textContent = 'Suggested tuning received';
    if (banner) banner.hidden = false;
  }
  function reportPatch(statusText) {
    const body = {type: 'patch_result', status: statusText};
    if (socket && socket.readyState === 1) {
      try { socket.send(JSON.stringify(body)); return; } catch { /* fall through to HTTP */ }
    }
    if (!session) return;
    const url = '/api/neural-dance/debug/result?room=' + encodeURIComponent(session.room) + '&secret=' + encodeURIComponent(session.secret);
    fetch(url, {method: 'POST', headers: {'content-type': 'application/json'}, cache: 'no-store', body: JSON.stringify(body)}).catch(() => {});
  }
  async function claim() {
    if (!session) return;
    const url = '/api/neural-dance/debug/claim?room=' + encodeURIComponent(session.room);
    try {
      await fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        cache: 'no-store',
        body: JSON.stringify({room: session.room, publisherSecret: session.secret, viewerKey: session.key})
      });
    } catch { /* the next frame retries */ }
  }
  function connect() {
    if (!sharing || !session) return;
    const origin = doc.defaultView && doc.defaultView.location ? doc.defaultView.location : location;
    const url = new URL('/api/neural-dance/debug/ws', origin.href);
    url.protocol = origin.protocol === 'https:' ? 'wss:' : 'ws:';
    url.searchParams.set('room', session.room);
    url.searchParams.set('role', 'publisher');
    url.searchParams.set('secret', session.secret);
    let next;
    try { next = new WebSocket(url.href); } catch { scheduleReconnect(); return; }
    socket = next;
    next.onmessage = (event) => {
      let message;
      try { message = JSON.parse(event.data); } catch { return; }
      if (message && (message.type === 'propose_patch' || message.pendingPatch)) notePatch(message);
    };
    next.onopen = () => { attempts = 0; say('Sharing ' + session.room); };
    next.onclose = () => {
      if (socket === next) socket = null;
      if (sharing) scheduleReconnect();
    };
  }
  function scheduleReconnect() {
    if (!sharing) return;
    const delay = Math.min(8000, 1000 * 2 ** attempts);
    attempts++;
    setTimeout(() => { if (sharing) { claim(); connect(); } }, delay);
  }
  async function publishFrame() {
    if (!sharing || !session) return;
    const telemetry = collectTelemetry(doc);
    const video = cameraRoot && cameraRoot.querySelector('[data-preview]');
    let cameraJpeg = null;
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const size = detectionSize(video.videoWidth, video.videoHeight);
      try { cameraJpeg = jpegOf(cameraCanvas, video, size.width, size.height, CAMERA_JPEG_QUALITY); } catch { cameraJpeg = null; }
    }
    const stage = doc.querySelector('#nd-room-lab [data-stage]');
    let stageJpeg = null;
    try { stageJpeg = jpegOf(stageCanvas, stage, STAGE_JPEG_W, STAGE_JPEG_H, STAGE_JPEG_QUALITY); } catch { stageJpeg = null; }
    const body = {type: 'frame', telemetry, cameraJpeg, stageJpeg};
    if (socket && socket.readyState === 1) {
      try { socket.send(JSON.stringify(body)); return; } catch { /* HTTP fallback */ }
    }
    const url = '/api/neural-dance/debug/frame?room=' + encodeURIComponent(session.room) + '&secret=' + encodeURIComponent(session.secret);
    try {
      const response = await fetch(url, {method: 'POST', headers: {'content-type': 'application/json'}, cache: 'no-store', body: JSON.stringify(body)});
      if (response.ok) {
        const data = await response.json();
        if (data && data.pendingPatch) notePatch(data);
      }
    } catch { /* keep the show running */ }
  }
  async function beat() {
    if (!sharing) return;
    try { await publishFrame(); } catch { /* one bad frame does not stop the relay */ }
    if (!sharing) return;
    timer = setTimeout(beat, DEBUG_INTERVAL_MS);
  }
  function start() {
    sharing = true;
    session = ensureDebugSession(storage);
    if (auto) session.autoApply = auto.checked === true;
    writeDebugSession(storage, session);
    share.setAttribute('aria-pressed', 'true');
    share.textContent = 'Sharing live debug';
    showSession();
    if (cameraRoot) cameraRoot.dataset.debugStream = '1';
    say('Sharing ' + session.room);
    claim();
    connect();
    beat();
  }
  function stop() {
    sharing = false;
    clearTimeout(timer);
    timer = 0;
    share.setAttribute('aria-pressed', 'false');
    share.textContent = 'Share live debug';
    if (panel) panel.hidden = true;
    if (cameraRoot) delete cameraRoot.dataset.debugStream;
    const current = socket;
    socket = null;
    if (current) {
      current.onclose = null;
      try { current.close(); } catch { /* already closed */ }
    }
    say('Debug sharing off');
  }
  share.addEventListener('click', () => { if (sharing) stop(); else start(); });
  if (auto) auto.addEventListener('change', () => {
    if (!session) return;
    session.autoApply = auto.checked === true;
    writeDebugSession(storage, session);
  });
  if (copy) copy.addEventListener('click', async () => {
    if (!session || !link) return;
    const absolute = new URL(link.getAttribute('href'), doc.defaultView ? doc.defaultView.location.href : 'https://tjm.art/').href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(absolute);
      say('Viewer link copied');
    } catch {
      say(absolute);
    }
  });
  if (apply) apply.addEventListener('click', () => {
    if (pending) applyDebugPatch(doc, pending);
    pending = null;
    if (banner) banner.hidden = true;
    reportPatch('applied');
  });
  if (dismiss) dismiss.addEventListener('click', () => {
    pending = null;
    if (banner) banner.hidden = true;
    reportPatch('dismissed');
  });
}

if (typeof document !== 'undefined') {
  const boot = () => attachLiveDebug(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}
