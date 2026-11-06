var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// neural-dance/debug-protocol.js
var DEBUG_IDLE_MS = 30 * 60 * 1e3;
var DEBUG_RING = 10;
var ROOM_RE = /^ND-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/;
var SECRET_RE = /^[A-Za-z0-9_-]{16,128}$/;
function validSecret(value) {
  return typeof value === "string" && SECRET_RE.test(value);
}
__name(validSecret, "validSecret");
function sameSecret(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length || !a.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
__name(sameSecret, "sameSecret");
var DEBUG_ACTIONS = /* @__PURE__ */ new Set([
  "align",
  "cancel-align",
  "clear-sim",
  "sim-off",
  "sim-seed",
  "sim-on",
  "add-sim",
  "clear-markers",
  "start",
  "pause",
  "markers-on",
  "markers-off",
  "hide-controls",
  "show-controls",
  "reset-camera"
]);
function sanitizeDebugPatch(input) {
  if (!input || typeof input !== "object") return null;
  const out = {};
  if (input.markerMode === "both" || input.markerMode === "pink" || input.markerMode === "stickers") out.markerMode = input.markerMode;
  const num = /* @__PURE__ */ __name((key, lo, hi) => {
    const value = +input[key];
    if (!Number.isFinite(value)) return;
    out[key] = Math.min(hi, Math.max(lo, value));
  }, "num");
  num("noteSensitivity", 0.25, 1);
  num("stickerSensitivity", 0, 1);
  num("hueTolerance", 18, 80);
  num("minBlobSize", 4, 200);
  num("maxBlobSize", 16, 400);
  num("quietThreshold", 0, 0.4);
  num("gravity", 0, 6);
  num("wander", 0, 0.8);
  num("threshold", 1, 1.9);
  num("peak", 1, 6);
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
  ["kickSensitivity", "bassSensitivity", "snareSensitivity", "hatSensitivity"].forEach((key, i) => {
    const value = +input[key];
    if (!Number.isFinite(value)) return;
    sens[i] = Math.min(3, Math.max(0, value));
    anySens = true;
  });
  if (anySens) out.sens = sens;
  if (input.action === "add-sim") {
    const x = +input.x;
    const y = +input.y;
    if (Number.isFinite(x) && Number.isFinite(y)) {
      out.action = "add-sim";
      out.x = Math.min(1e3, Math.max(0, x));
      out.y = Math.min(620, Math.max(0, y));
      if (Number.isFinite(+input.type)) out.type = Math.min(3, Math.max(0, Math.round(+input.type)));
    }
  } else if (DEBUG_ACTIONS.has(input.action)) out.action = input.action;
  return Object.keys(out).length ? out : null;
}
__name(sanitizeDebugPatch, "sanitizeDebugPatch");

// worker/neural-dance-debug.mjs
var NEURAL_DANCE_DEBUG_API = "/api/neural-dance/debug/";
var PRIVATE = { "Cache-Control": "no-store" };
function json(data, status = 200) {
  return Response.json(data, { status, headers: PRIVATE });
}
__name(json, "json");
function forbid() {
  return json({ error: "Forbidden" }, 403);
}
__name(forbid, "forbid");
function debugAction(pathname) {
  const path = String(pathname || "").replace(/\/+$/, "");
  if (path === "/api/neural-dance/debug/claim") return "claim";
  if (path === "/api/neural-dance/debug/frame") return "frame";
  if (path === "/api/neural-dance/debug/snapshot") return "snapshot";
  if (path === "/api/neural-dance/debug/camera.jpg") return "camera";
  if (path === "/api/neural-dance/debug/stage.jpg") return "stage";
  if (path === "/api/neural-dance/debug/patch") return "patch";
  if (path === "/api/neural-dance/debug/result") return "result";
  if (path === "/api/neural-dance/debug/ws") return "ws";
  return "";
}
__name(debugAction, "debugAction");
function readJson(sql, key) {
  const rows = sql.exec("SELECT v FROM nd_debug WHERE k = ?", key).toArray();
  if (!rows.length || rows[0].v == null) return null;
  try {
    return JSON.parse(rows[0].v);
  } catch {
    return null;
  }
}
__name(readJson, "readJson");
function writeJson(sql, key, value) {
  if (value == null) {
    sql.exec("DELETE FROM nd_debug WHERE k = ?", key);
    return;
  }
  sql.exec("INSERT INTO nd_debug (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v", key, JSON.stringify(value));
}
__name(writeJson, "writeJson");
function normalizeJpeg(value) {
  if (typeof value !== "string" || !value) return null;
  let b64 = value.trim();
  const wrapped = /^data:image\/jpe?g;base64,([A-Za-z0-9+/=\s]+)$/i.exec(b64);
  if (wrapped) b64 = wrapped[1];
  else if (b64.startsWith("data:")) return null;
  b64 = b64.replace(/\s+/g, "");
  if (b64.length < 8 || b64.length > 2e5) return null;
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) return null;
  return b64;
}
__name(normalizeJpeg, "normalizeJpeg");
function base64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
__name(base64ToBytes, "base64ToBytes");
function cleanTelemetry(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  let copy;
  try {
    copy = JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
  delete copy.cameraJpeg;
  delete copy.stageJpeg;
  if (JSON.stringify(copy).length > 48e3) return null;
  return copy;
}
__name(cleanTelemetry, "cleanTelemetry");
function presented(request) {
  const url = new URL(request.url);
  return {
    secret: request.headers.get("x-nd-secret") || url.searchParams.get("secret") || "",
    key: request.headers.get("x-nd-key") || url.searchParams.get("key") || "",
    role: url.searchParams.get("role") || ""
  };
}
__name(presented, "presented");
var NeuralDanceDebugRoom = class {
  static {
    __name(this, "NeuralDanceDebugRoom");
  }
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.secrets = null;
    this.telemetry = null;
    this.ring = [];
    this.pending = null;
    this.patchSeq = 0;
    this.updatedAt = null;
    this.camera = null;
    this.stage = null;
    this.publisher = null;
    this.viewers = /* @__PURE__ */ new Set();
    this.ready = ctx.blockConcurrencyWhile(async () => {
      ctx.storage.sql.exec("CREATE TABLE IF NOT EXISTS nd_debug (k TEXT PRIMARY KEY, v TEXT NOT NULL)");
      const state = readJson(ctx.storage.sql, "state");
      if (state) {
        this.secrets = state.secrets || null;
        this.telemetry = state.telemetry || null;
        this.ring = Array.isArray(state.ring) ? state.ring.slice(-DEBUG_RING) : [];
        this.pending = state.pending || null;
        this.patchSeq = state.patchSeq || 0;
        this.updatedAt = state.updatedAt || null;
        this.camera = state.camera || null;
        this.stage = state.stage || null;
      }
      if (typeof ctx.getWebSockets === "function") {
        for (const ws of ctx.getWebSockets()) {
          const tags = typeof ctx.getTags === "function" ? ctx.getTags(ws) : [];
          this.attachSocket(ws, tags && tags.includes("publisher") ? "publisher" : "viewer", true);
        }
      }
    });
  }
  sql() {
    return this.ctx.storage.sql;
  }
  persist() {
    writeJson(this.sql(), "state", {
      secrets: this.secrets,
      telemetry: this.telemetry,
      ring: this.ring,
      pending: this.pending,
      patchSeq: this.patchSeq || 0,
      updatedAt: this.updatedAt,
      camera: this.camera,
      stage: this.stage
    });
  }
  async touch() {
    if (this.ctx.storage && typeof this.ctx.storage.setAlarm === "function") {
      await this.ctx.storage.setAlarm(Date.now() + DEBUG_IDLE_MS);
    }
  }
  auth(request) {
    if (!this.secrets) return { ok: false };
    const { secret, key, role } = presented(request);
    const publisher = !!(secret && sameSecret(secret, this.secrets.publisherSecret));
    const viewer = !!(key && sameSecret(key, this.secrets.viewerKey));
    if (role === "publisher") return publisher ? { ok: true, role: "publisher" } : { ok: false };
    if (role === "viewer") return viewer ? { ok: true, role: "viewer" } : { ok: false };
    if (publisher && !viewer) return { ok: true, role: "publisher" };
    if (viewer && !publisher) return { ok: true, role: "viewer" };
    return { ok: false };
  }
  attachSocket(ws, role, restoring = false) {
    if (!ws) return;
    ws.__ndRole = role;
    if (role === "publisher") {
      if (!restoring && this.publisher && this.publisher !== ws) {
        try {
          this.publisher.close(4e3, "replaced");
        } catch {
        }
      }
      this.publisher = ws;
      return;
    }
    this.viewers.add(ws);
  }
  detach(ws) {
    if (this.publisher === ws) this.publisher = null;
    this.viewers.delete(ws);
  }
  send(ws, message) {
    if (!ws) return;
    if (ws.readyState != null && ws.readyState !== 1) return;
    try {
      ws.send(JSON.stringify(message));
    } catch {
    }
  }
  finishUpgrade(client) {
    return new Response(null, { status: 101, webSocket: client });
  }
  openSocket(role) {
    if (typeof WebSocketPair !== "function") return json({ error: "WebSocket unavailable" }, 426);
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    if (typeof this.ctx.acceptWebSocket === "function") this.ctx.acceptWebSocket(server, [role]);
    this.attachSocket(server, role);
    this.send(server, {
      type: "hello",
      role,
      room: this.secrets.room,
      pendingPatch: role === "publisher" ? this.pending : null
    });
    return this.finishUpgrade(client);
  }
  async claim(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    let body;
    try {
      body = await request.json();
    } catch {
      return forbid();
    }
    const room = new URL(request.url).searchParams.get("room") || "";
    if (!ROOM_RE.test(room) || !body || body.room !== room) return forbid();
    if (!validSecret(body.publisherSecret) || !validSecret(body.viewerKey)) return forbid();
    if (body.publisherSecret === body.viewerKey) return forbid();
    if (this.secrets) {
      const same = sameSecret(body.publisherSecret, this.secrets.publisherSecret) && sameSecret(body.viewerKey, this.secrets.viewerKey);
      if (!same) return forbid();
      await this.touch();
      return json({ ok: true, created: false });
    }
    this.secrets = { room, publisherSecret: body.publisherSecret, viewerKey: body.viewerKey, createdAt: Date.now() };
    this.persist();
    await this.touch();
    return json({ ok: true, created: true });
  }
  acceptFrame(body) {
    if (!body || typeof body !== "object") return false;
    const telemetry = body.telemetry == null ? null : cleanTelemetry(body.telemetry);
    if (body.telemetry != null && !telemetry) return false;
    const camera = body.cameraJpeg == null ? null : normalizeJpeg(body.cameraJpeg);
    if (body.cameraJpeg != null && !camera) return false;
    const stage = body.stageJpeg == null ? null : normalizeJpeg(body.stageJpeg);
    if (body.stageJpeg != null && !stage) return false;
    if (camera) this.camera = camera;
    if (stage) this.stage = stage;
    if (telemetry) {
      this.telemetry = telemetry;
      this.ring.push(telemetry);
      if (this.ring.length > DEBUG_RING) this.ring = this.ring.slice(-DEBUG_RING);
    }
    this.updatedAt = Date.now();
    if (body.patchResult === "applied" || body.patchResult === "dismissed" || body.type === "patch_result") {
      const status = body.patchResult || body.status;
      if (status === "applied" || status === "dismissed") this.pending = null;
    }
    this.persist();
    this.sendViewersFrame();
    return true;
  }
  sendViewersFrame() {
    const message = {
      type: "frame",
      telemetry: this.telemetry,
      cameraJpeg: this.camera ? "data:image/jpeg;base64," + this.camera : null,
      stageJpeg: this.stage ? "data:image/jpeg;base64," + this.stage : null,
      pendingPatch: this.pending,
      updatedAt: this.updatedAt
    };
    for (const ws of this.viewers) this.send(ws, message);
  }
  async frame(request, auth) {
    if (request.method !== "POST" || auth.role !== "publisher") return forbid();
    let body;
    try {
      body = await request.json();
    } catch {
      return forbid();
    }
    if (!this.acceptFrame(body)) return json({ error: "Bad frame" }, 400);
    return json({ ok: true, pendingPatch: this.pending, updatedAt: this.updatedAt });
  }
  snapshot(auth) {
    if (auth.role !== "viewer") return forbid();
    const room = this.secrets.room;
    return json({
      ok: true,
      room,
      updatedAt: this.updatedAt,
      telemetry: this.telemetry,
      pendingPatch: this.pending,
      ring: this.ring,
      camera: "/api/neural-dance/debug/camera.jpg?room=" + encodeURIComponent(room),
      stage: "/api/neural-dance/debug/stage.jpg?room=" + encodeURIComponent(room)
    });
  }
  image(auth, which) {
    if (auth.role !== "viewer") return forbid();
    const b64 = which === "camera" ? this.camera : this.stage;
    if (!b64) return json({ error: "No frame yet" }, 404);
    return new Response(base64ToBytes(b64), { status: 200, headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store" } });
  }
  propose(patch) {
    const clean = sanitizeDebugPatch(patch);
    if (!clean) return null;
    this.patchSeq = (this.patchSeq || 0) + 1;
    const id = this.patchSeq;
    this.pending = { id, patch: clean, at: Date.now() };
    this.persist();
    this.send(this.publisher, { type: "propose_patch", patch: clean, patchId: id, pendingPatch: this.pending });
    return this.pending;
  }
  async patch(request, auth) {
    if (request.method !== "POST" || auth.role !== "viewer") return forbid();
    let body;
    try {
      body = await request.json();
    } catch {
      return forbid();
    }
    const pending = this.propose(body.patch || body);
    if (!pending) return json({ error: "Empty patch" }, 400);
    return json({ ok: true, pendingPatch: pending });
  }
  clearPending(status) {
    if (status !== "applied" && status !== "dismissed") return false;
    this.pending = null;
    this.persist();
    return true;
  }
  async result(request, auth) {
    if (request.method !== "POST" || auth.role !== "publisher") return forbid();
    let body;
    try {
      body = await request.json();
    } catch {
      return forbid();
    }
    if (!this.clearPending(body && (body.status || body.patchResult))) return json({ error: "Empty patch" }, 400);
    return json({ ok: true, pendingPatch: null });
  }
  async fetch(request) {
    await this.ready;
    const url = new URL(request.url);
    const upgrade = (request.headers.get("Upgrade") || "").toLowerCase() === "websocket";
    const action = upgrade ? "ws" : debugAction(url.pathname);
    if (action === "claim") return this.claim(request);
    if (!action) return forbid();
    const auth = this.auth(request);
    if (!auth.ok) return forbid();
    await this.touch();
    if (action === "ws") return this.openSocket(auth.role);
    if (action === "frame") return this.frame(request, auth);
    if (action === "snapshot") return this.snapshot(auth);
    if (action === "camera") return this.image(auth, "camera");
    if (action === "stage") return this.image(auth, "stage");
    if (action === "patch") return this.patch(request, auth);
    if (action === "result") return this.result(request, auth);
    return forbid();
  }
  async webSocketMessage(ws, message) {
    await this.ready;
    if (!this.secrets) return;
    let text = message;
    if (typeof text !== "string") {
      try {
        text = new TextDecoder().decode(text);
      } catch {
        return;
      }
    }
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return;
    }
    if (!body || typeof body !== "object") return;
    const role = this.roleOf(ws);
    if (role !== "publisher" && role !== "viewer") return;
    await this.touch();
    if (role === "publisher" && (body.type === "frame" || body.telemetry || body.cameraJpeg || body.stageJpeg)) {
      this.acceptFrame(body);
      return;
    }
    if (role === "publisher" && body.type === "patch_result") {
      this.clearPending(body.status);
      return;
    }
    if (role === "viewer" && body.type === "propose_patch") this.propose(body.patch || body);
  }
  roleOf(ws) {
    if (ws && (ws.__ndRole === "publisher" || ws.__ndRole === "viewer")) return ws.__ndRole;
    if (ws && this.ctx && typeof this.ctx.getTags === "function") {
      const tags = this.ctx.getTags(ws) || [];
      if (tags.includes("publisher")) return "publisher";
      if (tags.includes("viewer")) return "viewer";
    }
    return "";
  }
  async webSocketClose(ws) {
    await this.ready;
    this.detach(ws);
  }
  async webSocketError(ws) {
    await this.ready;
    this.detach(ws);
  }
  async alarm() {
    await this.ready;
    this.sql().exec("DELETE FROM nd_debug");
    this.secrets = null;
    this.telemetry = null;
    this.ring = [];
    this.pending = null;
    this.updatedAt = null;
    this.camera = null;
    this.stage = null;
    const sockets = typeof this.ctx.getWebSockets === "function" ? this.ctx.getWebSockets() : [this.publisher, ...this.viewers].filter(Boolean);
    for (const ws of sockets) {
      try {
        ws.close(4e3, "idle");
      } catch {
      }
    }
    this.publisher = null;
    this.viewers.clear();
  }
};
async function handleNeuralDanceDebug(request, env) {
  const url = new URL(request.url);
  const room = url.searchParams.get("room") || "";
  if (!ROOM_RE.test(room)) return forbid();
  const namespace = env && env.NEURAL_DANCE_DEBUG;
  if (!namespace || typeof namespace.getByName !== "function") return json({ error: "Live debug is temporarily unavailable." }, 503);
  const stub = namespace.getByName(room);
  return stub.fetch(request);
}
__name(handleNeuralDanceDebug, "handleNeuralDanceDebug");

// worker/index.mjs
var PRIVATE2 = { "Cache-Control": "no-store" };
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith(NEURAL_DANCE_DEBUG_API)) {
      if (!env.NEURAL_DANCE_DEBUG) {
        return Response.json({ error: "Live debug is temporarily unavailable." }, { status: 503, headers: PRIVATE2 });
      }
      return handleNeuralDanceDebug(request, env);
    }
    if (!env.ASSETS) return new Response("Neural Dance assets are not configured.", { status: 500, headers: PRIVATE2 });
    return env.ASSETS.fetch(request);
  }
};
export {
  NeuralDanceDebugRoom,
  index_default as default
};
//# sourceMappingURL=index.js.map
