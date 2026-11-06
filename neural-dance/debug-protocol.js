// Shared Neural Dance live-debug protocol (studio-tracker #824).
// Pure helpers so the phone, the viewer page, and the Durable Object agree
// on room codes, secrets, and the tuning fields a viewer is allowed to suggest.

export const DEBUG_SESSION_KEY = 'nd.liveDebug.v1';
export const DEBUG_INTERVAL_MS = 750;
export const DEBUG_IDLE_MS = 30 * 60 * 1000;
export const DEBUG_RING = 10;
export const ROOM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const ROOM_RE = /^ND-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/;
const SECRET_RE = /^[A-Za-z0-9_-]{16,128}$/;

export function validSecret(value) {
  return typeof value === 'string' && SECRET_RE.test(value);
}

export function sameSecret(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length || !a.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function randomRoomCode(random = crypto.getRandomValues.bind(crypto)) {
  const bytes = new Uint8Array(6);
  random(bytes);
  let code = 'ND-';
  for (const byte of bytes) code += ROOM_ALPHABET[byte % ROOM_ALPHABET.length];
  return code;
}

export function randomSecret(random = crypto.getRandomValues.bind(crypto)) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const bytes = new Uint8Array(32);
  random(bytes);
  let out = '';
  for (const byte of bytes) out += alphabet[byte % alphabet.length];
  return out;
}

export function createDebugCredentials(random) {
  const room = randomRoomCode(random);
  const secret = randomSecret(random);
  let key = randomSecret(random);
  if (key === secret) key = secret.slice(0, -1) + (secret.endsWith('a') ? 'b' : 'a');
  return {room, secret, key, autoApply: true};
}

const DEBUG_ACTIONS = new Set([
  'align', 'cancel-align',
  'clear-sim', 'sim-off', 'sim-seed', 'sim-on',
  'add-sim',
  'clear-markers',
  'start', 'pause',
  'markers-on', 'markers-off',
  'hide-controls', 'show-controls',
  'reset-camera'
]);

export function viewerPath(session) {
  return '/neural-dance/debug/?room=' + encodeURIComponent(session.room) + '&key=' + encodeURIComponent(session.key);
}

// Remote tuning. Numbers are clamped to the sliders on /neural-dance/live/.
export function sanitizeDebugPatch(input) {
  if (!input || typeof input !== 'object') return null;
  const out = {};
  if (input.markerMode === 'both' || input.markerMode === 'pink' || input.markerMode === 'stickers') out.markerMode = input.markerMode;
  const num = (key, lo, hi) => {
    const value = +input[key];
    if (!Number.isFinite(value)) return;
    out[key] = Math.min(hi, Math.max(lo, value));
  };
  num('noteSensitivity', 0.25, 1);
  num('stickerSensitivity', 0, 1);
  num('hueTolerance', 18, 80);
  num('minBlobSize', 4, 200);
  num('maxBlobSize', 16, 400);
  num('quietThreshold', 0, 0.4);
  num('gravity', 0, 6);
  num('wander', 0, 0.8);
  num('threshold', 1, 1.9);
  num('peak', 1, 6);
  if (input.type != null && Number.isFinite(+input.type)) out.type = Math.min(3, Math.max(0, Math.round(+input.type)));
  const sens = [null, null, null, null];
  let anySens = false;
  if (Array.isArray(input.sens)) {
    for (let i = 0; i < 4; i++) {
      const value = +input.sens[i];
      if (!Number.isFinite(value)) continue;
      sens[i] = Math.min(3, Math.max(0, value));
      anySens = true;
    }
  }
  ['kickSensitivity', 'bassSensitivity', 'snareSensitivity', 'hatSensitivity'].forEach((key, i) => {
    const value = +input[key];
    if (!Number.isFinite(value)) return;
    sens[i] = Math.min(3, Math.max(0, value));
    anySens = true;
  });
  if (anySens) out.sens = sens;
  if (input.action === 'add-sim') {
    const x = +input.x;
    const y = +input.y;
    if (Number.isFinite(x) && Number.isFinite(y)) {
      out.action = 'add-sim';
      out.x = Math.min(1000, Math.max(0, x));
      out.y = Math.min(620, Math.max(0, y));
      if (Number.isFinite(+input.type)) out.type = Math.min(3, Math.max(0, Math.round(+input.type)));
    }
  } else if (input.action === 'add-manual-sticker') {
    const x = +input.x;
    const y = +input.y;
    if (Number.isFinite(x) && Number.isFinite(y)) {
      out.action = 'add-manual-sticker';
      out.x = Math.min(1000, Math.max(0, x));
      out.y = Math.min(620, Math.max(0, y));
      const id = input.id | 0;
      if (id > 0 && id < 2147483647) out.id = id;
    }
  } else if (input.action === 'remove-manual-sticker') {
    const id = input.id | 0;
    if (id > 0 && id < 2147483647) {
      out.action = 'remove-manual-sticker';
      out.id = id;
      const x = +input.x;
      const y = +input.y;
      if (Number.isFinite(x)) out.x = Math.min(1000, Math.max(0, x));
      if (Number.isFinite(y)) out.y = Math.min(620, Math.max(0, y));
    }
  } else if (DEBUG_ACTIONS.has(input.action)) out.action = input.action;
  return Object.keys(out).length ? out : null;
}
