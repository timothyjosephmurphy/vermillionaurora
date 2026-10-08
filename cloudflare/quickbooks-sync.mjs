import { DurableObject } from 'cloudflare:workers';
import { sellerMailToken } from './shipping-email.mjs';
import {
  QboError, QBO_ORIGINS, environment, configured, syncEnabled, discover, authorizationUrl, exchangeCode, refreshTokens, revokeToken,
  accountingClient, signState, verifyState, seal, unseal, randomToken, sha256Hex, qboString, qboName, salesReceiptPayload,
  validateReceipt, depositAccountKey, docNumberFor, accountName, itemName, ACCOUNT_DEFAULTS, ITEM_DEFAULTS, queueDelayMs,
  costSyncEnabled, vendorName, VENDOR_DEFAULTS, costDocNumber, costId, validateCost, purchasePayload
} from './quickbooks-core.mjs';
import { resolveCost, CostPending } from './quickbooks-costs.mjs';

const OWNER = 'tj@vermillionaurora.com';
const STATE_TTL = 10 * 60 * 1000;
const REFRESH_MARGIN = 5 * 60 * 1000;
const DISCOVERY_TTL = 24 * 3600 * 1000;
const LOG_LIMIT = 5000;
const BATCH = 10;

export const quickbooksFor = env => env.QUICKBOOKS.getByName(environment(env));

// Queue a completed website sale. Never throws for a disabled sync; callers treat errors as retryable.
export async function queueQuickbooks(env, receipt) {
  if (!syncEnabled(env) || !env.QUICKBOOKS) return { queued: false, reason: 'disabled' };
  return quickbooksFor(env).enqueue(receipt);
}
// Queue the production cost of a synced sale (print lab or shipping labels). Idempotent per order and vendor.
export async function queueQuickbooksCost(env, cost) {
  if (!costSyncEnabled(env) || !env.QUICKBOOKS) return { queued: false, reason: 'disabled' };
  return quickbooksFor(env).enqueueCost(cost);
}
const COST_PENDING_RETRY = 3600e3;

// One instance per QuickBooks environment: the connection (encrypted tokens), the sales queue and the API log.
export class QuickbooksSync extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const sql = ctx.storage.sql;
    sql.exec('CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    sql.exec(`CREATE TABLE IF NOT EXISTS queue (order_id TEXT PRIMARY KEY, receipt TEXT NOT NULL, status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0,
      next_at INTEGER NOT NULL DEFAULT 0, qbo_id TEXT, doc_number TEXT, last_error TEXT, last_tid TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`);
    sql.exec(`CREATE TABLE IF NOT EXISTS costs (cost_id TEXT PRIMARY KEY, order_id TEXT NOT NULL, type TEXT NOT NULL, source TEXT NOT NULL, resolved TEXT,
      status TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, next_at INTEGER NOT NULL DEFAULT 0, qbo_id TEXT, doc_number TEXT, amount TEXT, amount_source TEXT,
      last_error TEXT, last_tid TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`);
    sql.exec(`CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, level TEXT NOT NULL, op TEXT NOT NULL, status INTEGER,
      intuit_tid TEXT, order_id TEXT, attempt INTEGER, fault_type TEXT, fault_code TEXT, message TEXT, ms INTEGER)`);
  }
  get(key) { const row = this.ctx.storage.sql.exec('SELECT value FROM kv WHERE key=?', key).toArray()[0]; return row ? JSON.parse(row.value) : null; }
  set(key, value) {
    if (value === null || value === undefined) this.ctx.storage.sql.exec('DELETE FROM kv WHERE key=?', key);
    else this.ctx.storage.sql.exec('INSERT INTO kv (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value', key, JSON.stringify(value));
  }
  // Durable API log: every Intuit call with its intuit_tid. Also mirrored to Workers logs (no tokens or bodies).
  log = entry => {
    const row = { at: new Date().toISOString(), level: entry.level || 'info', op: String(entry.op || '').slice(0, 80), status: entry.status ?? null, intuit_tid: entry.tid || '',
      order_id: entry.orderId || '', attempt: entry.attempt ?? null, fault_type: entry.faultType || '', fault_code: entry.faultCode || '', message: String(entry.message || '').slice(0, 500), ms: entry.ms ?? null };
    this.ctx.storage.sql.exec('INSERT INTO log (at,level,op,status,intuit_tid,order_id,attempt,fault_type,fault_code,message,ms) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      row.at, row.level, row.op, row.status, row.intuit_tid, row.order_id, row.attempt, row.fault_type, row.fault_code, row.message, row.ms);
    this.ctx.storage.sql.exec('DELETE FROM log WHERE id <= (SELECT max(id) FROM log) - ?', LOG_LIMIT);
    (row.level === 'error' ? console.error : console.log)('QuickBooks', JSON.stringify({ op: row.op, status: row.status, intuit_tid: row.intuit_tid, order: row.order_id, fault: row.fault_code, message: row.message }));
    if (row.level === 'error') this.ctx.waitUntil(this.archiveError(row).catch(() => {}));
  };
  // Shareable error records in the private accounting bucket (one object per error).
  async archiveError(row) {
    if (!this.env.SALES_ARCHIVE) return;
    await this.env.SALES_ARCHIVE.put(`quickbooks/${environment(this.env)}/errors/${row.at.replace(/[:.]/g, '-')}-${crypto.randomUUID().slice(0, 8)}.json`, JSON.stringify(row, null, 2),
      { httpMetadata: { contentType: 'application/json' } });
  }
  async endpoints() {
    const cached = this.get('discovery');
    if (cached && Date.now() - cached.fetchedAt < DISCOVERY_TTL) return cached;
    const fresh = await discover(this.env, { log: this.log });
    this.set('discovery', fresh); return fresh;
  }
  async connection() { const sealed = this.get('connection'); return sealed ? unseal(this.env, sealed) : null; }
  async saveConnection(value) { this.set('connection', value ? await seal(this.env, value) : null); }

  async beginConnect() {
    if (!configured(this.env)) throw new QboError('QuickBooks credentials are missing from this Worker', { kind: 'config' });
    const nonce = randomToken(), expiresAt = Date.now() + STATE_TTL;
    this.set('pending', { nonce: await sha256Hex(nonce), expiresAt });
    const state = await signState(this.env, nonce, expiresAt);
    return { url: authorizationUrl(this.env, await this.endpoints(), state), nonce };
  }
  async completeConnect({ state, code, realmId, cookieNonce }) {
    const nonce = await verifyState(this.env, state);
    const pending = this.get('pending');
    // Single use: consume before any network call.
    this.set('pending', null);
    if (!nonce || nonce !== cookieNonce || !pending || pending.expiresAt <= Date.now() || pending.nonce !== await sha256Hex(nonce)) return { result: 'expired' };
    if (typeof code !== 'string' || !code || code.length > 2048 || !/^\d{1,30}$/.test(realmId || '')) return { result: 'failed' };
    let tokens;
    try { tokens = await exchangeCode(this.env, await this.endpoints(), code, { log: this.log }); } catch { return { result: 'token-failed' }; }
    const client = accountingClient(this.env, { realmId, accessToken: () => tokens.accessToken, log: this.log });
    let company, preferences;
    try {
      company = await client.read(`companyinfo/${realmId}`, 'CompanyInfo');
      preferences = await client.read('preferences', 'Preferences');
    } catch { return { result: 'company-failed' }; }
    const homeCurrency = preferences?.CurrencyPrefs?.HomeCurrency?.value || 'USD';
    if (homeCurrency !== 'USD') {
      try { await revokeToken(this.env, await this.endpoints(), tokens.refreshToken, { log: this.log }); } catch {}
      this.log({ level: 'error', op: 'connect', message: `Company home currency ${homeCurrency} is not USD; not connected` });
      return { result: 'not-usd' };
    }
    await this.saveConnection({ realmId, companyName: qboName(company?.CompanyName || company?.LegalName || ''), connectedAt: new Date().toISOString(), ...tokens });
    this.set('refs', null);
    this.set('disconnected', null);
    this.log({ level: 'info', op: 'connect', message: 'Connected' });
    await this.scheduleNext(1000);
    return { result: 'connected' };
  }
  async disconnect(reason = 'owner') {
    const current = await this.connection();
    if (current) {
      try { await revokeToken(this.env, await this.endpoints(), current.refreshToken, { log: this.log }); }
      catch (error) { this.log({ level: 'warn', op: 'disconnect', message: `Revoke did not complete: ${error.message}` }); }
    }
    await this.saveConnection(null);
    this.set('refs', null);
    this.set('disconnected', { at: new Date().toISOString(), reason });
    this.log({ level: 'info', op: 'disconnect', message: `Disconnected (${reason})` });
    return { disconnected: true };
  }
  // Access token, refreshed when close to expiry. Refresh tokens rotate: the new pair is saved before use.
  async accessToken(force = false) {
    if (this.refreshing) return this.refreshing;
    const current = await this.connection();
    if (!current) throw new QboError('QuickBooks is not connected', { kind: 'config' });
    if (!force && current.accessExpiresAt - REFRESH_MARGIN > Date.now()) return current.accessToken;
    this.refreshing = (async () => {
      try {
        const tokens = await refreshTokens(this.env, await this.endpoints(), current.refreshToken, { log: this.log });
        await this.saveConnection({ ...current, ...tokens, refreshedAt: new Date().toISOString() });
        return tokens.accessToken;
      } catch (error) {
        if (error.kind === 'invalid_grant') await this.markExpired();
        throw error;
      } finally { this.refreshing = null; }
    })();
    return this.refreshing;
  }
  async markExpired() {
    await this.saveConnection(null);
    this.set('refs', null);
    this.set('disconnected', { at: new Date().toISOString(), reason: 'authorization expired or revoked' });
    this.log({ level: 'error', op: 'token refresh', message: 'Refresh token rejected (invalid_grant); marked disconnected' });
    await this.alert('reconnect', 'QuickBooks needs to be reconnected',
      'QuickBooks rejected the saved authorization (expired or revoked), so website sales are no longer being recorded in QuickBooks.\n\n' +
      `Reconnect here: ${this.connectPage()}\n\nSales completed meanwhile stay queued and will be recorded after you reconnect.`);
  }
  connectPage() { return `${QBO_ORIGINS[environment(this.env)]}/quickbooks/connect`; }
  async alert(kind, subject, text) {
    const last = this.get(`alert:${kind}`);
    if (last && Date.now() - last < 24 * 3600 * 1000) return;
    this.set(`alert:${kind}`, Date.now());
    try {
      const token = await sellerMailToken(this.env);
      const encode = value => { let s = ''; for (const b of new TextEncoder().encode(value)) s += String.fromCharCode(b); return btoa(s); };
      const prefix = environment(this.env) === 'sandbox' ? '[TEST] ' : '';
      const mime = [`From: Vermillion Aurora <${OWNER}>`, `To: ${OWNER}`, `Subject: =?UTF-8?B?${encode(prefix + subject)}?=`, 'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', encode(`${text}\n\nQuickBooks integration: ${this.connectPage()}`)].join('\r\n');
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', { method: 'POST', signal: AbortSignal.timeout(20000),
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ raw: encode(mime).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') }) });
      if (!response.ok) throw Error(`Gmail HTTP ${response.status}`);
      this.log({ level: 'info', op: 'alert', message: `Emailed owner: ${subject}` });
    } catch (error) { this.log({ level: 'warn', op: 'alert', message: `Owner alert not sent: ${error.message}` }); }
  }

  async enqueue(receipt) {
    validateReceipt(receipt);
    const now = new Date().toISOString();
    const inserted = this.ctx.storage.sql.exec(`INSERT INTO queue (order_id,receipt,status,attempts,next_at,doc_number,created_at,updated_at)
      VALUES (?,?,'queued',0,0,?,?,?) ON CONFLICT(order_id) DO NOTHING`, receipt.orderId, JSON.stringify(receipt), docNumberFor(receipt.orderId), now, now).rowsWritten;
    if (inserted) await this.scheduleNext(1000);
    return { queued: true, duplicate: !inserted };
  }
  async enqueueCost(cost) {
    validateCost(cost);
    const now = new Date().toISOString(), id = costId(cost.orderId, cost.type);
    const inserted = this.ctx.storage.sql.exec(`INSERT INTO costs (cost_id,order_id,type,source,status,attempts,next_at,doc_number,created_at,updated_at)
      VALUES (?,?,?,?,'queued',0,0,?,?,?) ON CONFLICT(cost_id) DO NOTHING`, id, cost.orderId, cost.type, JSON.stringify(cost), costDocNumber(cost.orderId, cost.type), now, now).rowsWritten;
    if (inserted) { this.log({ level: 'info', op: 'queue Purchase', orderId: cost.orderId, message: `Production cost queued (${cost.type}, ${cost.vendor})` }); await this.scheduleNext(1000); }
    return { queued: true, duplicate: !inserted };
  }
  async scheduleNext(delay) {
    if (!syncEnabled(this.env) || !this.get('connection')) return;
    const sales = this.ctx.storage.sql.exec("SELECT min(next_at) AS t FROM queue WHERE status IN ('queued','sending')").one().t ?? Infinity;
    const costs = costSyncEnabled(this.env) ? this.ctx.storage.sql.exec("SELECT min(next_at) AS t FROM costs WHERE status IN ('queued','sending')").one().t ?? Infinity : Infinity;
    const due = delay ?? Math.max(1000, Math.min(sales, costs) - Date.now());
    if (Number.isFinite(due)) await this.ctx.storage.setAlarm(Date.now() + due);
  }
  async alarm() { await this.processQueue(); }
  async processQueue() {
    if (this.processing) return this.processing;
    this.processing = this.drain().finally(() => { this.processing = null; });
    return this.processing;
  }
  async drain() {
    if (!syncEnabled(this.env) || !this.get('connection')) return { processed: 0 };
    const rows = this.ctx.storage.sql.exec("SELECT order_id FROM queue WHERE status IN ('queued','sending') AND next_at <= ? ORDER BY created_at LIMIT ?", Date.now(), BATCH).toArray();
    let processed = 0;
    for (const { order_id } of rows) {
      const outcome = await this.syncOne(order_id);
      processed++;
      if (outcome === 'stop') { await this.scheduleNext(); return { processed }; }
    }
    if (costSyncEnabled(this.env)) {
      const due = this.ctx.storage.sql.exec("SELECT cost_id FROM costs WHERE status IN ('queued','sending') AND next_at <= ? ORDER BY created_at LIMIT ?", Date.now(), BATCH).toArray();
      for (const { cost_id } of due) {
        const outcome = await this.syncCost(cost_id);
        processed++;
        if (outcome === 'stop') break;
      }
    }
    await this.scheduleNext();
    return { processed };
  }
  update(orderId, fields) {
    const keys = Object.keys(fields);
    this.ctx.storage.sql.exec(`UPDATE queue SET ${keys.map(k => `${k}=?`).join(',')}, updated_at=? WHERE order_id=?`, ...keys.map(k => fields[k]), new Date().toISOString(), orderId);
  }
  async syncOne(orderId) {
    const row = this.ctx.storage.sql.exec('SELECT * FROM queue WHERE order_id=?', orderId).toArray()[0];
    if (!row || !['queued', 'sending'].includes(row.status)) return 'skip';
    const attempts = row.attempts + 1;
    this.update(orderId, { status: 'sending', attempts });
    try {
      const qboId = await this.createSalesReceipt(JSON.parse(row.receipt));
      this.update(orderId, { status: 'synced', qbo_id: qboId, last_error: null });
      return 'ok';
    } catch (error) {
      const kind = error instanceof QboError ? error.kind : 'transient';
      this.update(orderId, { last_error: String(error.message).slice(0, 500), last_tid: error.tid || null,
        ...(kind === 'transient' || kind === 'auth' ? { status: 'queued', next_at: Date.now() + queueDelayMs(attempts) } : { status: 'review' }) });
      if (kind === 'invalid_grant' || kind === 'config') { this.update(orderId, { status: 'queued', next_at: 0 }); return 'stop'; }
      if (kind === 'validation' || kind === 'error') await this.alert(`review:${orderId}`, 'QuickBooks could not record a website sale',
        `Order ${orderId} was not recorded in QuickBooks: ${error.message}${error.tid ? `\nintuit_tid: ${error.tid}` : ''}\n\nFix the cause in QuickBooks, then use “Retry” on the connection page.`);
      return 'continue';
    }
  }
  updateCost(id, fields) {
    const keys = Object.keys(fields);
    this.ctx.storage.sql.exec(`UPDATE costs SET ${keys.map(k => `${k}=?`).join(',')}, updated_at=? WHERE cost_id=?`, ...keys.map(k => fields[k]), new Date().toISOString(), id);
  }
  // One production-cost Purchase. Waits for its sale to be recorded, resolves the vendor's charged amount once
  // (stored, so retries post the same numbers), then creates the Purchase idempotently.
  async syncCost(id) {
    const row = this.ctx.storage.sql.exec('SELECT * FROM costs WHERE cost_id=?', id).toArray()[0];
    if (!row || !['queued', 'sending'].includes(row.status)) return 'skip';
    const sale = this.ctx.storage.sql.exec('SELECT status FROM queue WHERE order_id=?', row.order_id).toArray()[0];
    if (sale?.status !== 'synced') { this.updateCost(id, { status: 'queued', next_at: Date.now() + 300e3 }); return 'continue'; }
    const cost = JSON.parse(row.source), attempts = row.attempts + 1;
    this.updateCost(id, { status: 'sending', attempts });
    try {
      let resolved = row.resolved ? JSON.parse(row.resolved) : null;
      if (!resolved) {
        try { resolved = await resolveCost(this.env, cost); }
        catch (error) {
          if (!(error instanceof CostPending)) throw error;
          this.log({ level: 'info', op: 'resolve cost', orderId: cost.orderId, message: `Waiting for the vendor charge: ${error.message}` });
          this.updateCost(id, { status: 'queued', attempts: row.attempts, next_at: Date.now() + COST_PENDING_RETRY, last_error: String(error.message).slice(0, 500) });
          return 'continue';
        }
        this.updateCost(id, { resolved: JSON.stringify(resolved), amount: (resolved.totalCents / 100).toFixed(2), amount_source: resolved.amountSource });
      }
      const qboId = await this.createPurchase(cost, resolved);
      this.updateCost(id, { status: 'synced', qbo_id: qboId, last_error: null });
      this.log({ level: 'info', op: 'Purchase recorded', orderId: cost.orderId,
        message: `${costDocNumber(cost.orderId, cost.type)} id ${qboId}: $${(resolved.totalCents / 100).toFixed(2)} to ${vendorName(this.env, cost.vendor)} (${resolved.amountSource}) for ${cost.saleDocNumber}` });
      return 'ok';
    } catch (error) {
      const kind = error instanceof QboError ? error.kind : 'transient';
      this.updateCost(id, { last_error: String(error.message).slice(0, 500), last_tid: error.tid || null,
        ...(kind === 'transient' || kind === 'auth' ? { status: 'queued', next_at: Date.now() + queueDelayMs(attempts) } : { status: 'review' }) });
      if (kind === 'invalid_grant' || kind === 'config') { this.updateCost(id, { status: 'queued', next_at: 0 }); return 'stop'; }
      if (kind === 'validation' || kind === 'error') await this.alert(`review:${id}`, 'QuickBooks could not record a production cost',
        `The production cost (${cost.type}) for order ${cost.orderId} was not recorded in QuickBooks: ${error.message}${error.tid ? `\nintuit_tid: ${error.tid}` : ''}\n\nFix the cause in QuickBooks, then use “Retry” on the connection page.`);
      return 'continue';
    }
  }
  async createPurchase(cost, resolved) {
    return this.withClient(cost.orderId, async (client, current) => {
      const docNumber = costDocNumber(cost.orderId, cost.type);
      const existing = await client.query(`select Id, DocNumber, PrivateNote from Purchase where DocNumber = ${qboString(docNumber)}`, 'Purchase');
      const match = existing.find(r => String(r.PrivateNote || '').includes(cost.orderId));
      if (match) return String(match.Id);
      const refs = await this.costReferences(client, current.realmId, cost, resolved);
      const payload = purchasePayload(cost, resolved, refs);
      const requestId = (await sha256Hex(`va-qbo-cost:${environment(this.env)}:${current.realmId}:${cost.orderId}:${cost.type}`)).slice(0, 36);
      let created;
      try { created = await client.create('Purchase', payload, requestId); }
      catch (error) {
        if (error.kind === 'validation' && ['2500', '610', '2020'].includes(error.faultCode)) { this.set('refs', null); throw new QboError(error.message, { ...error, kind: 'transient' }); }
        throw error;
      }
      if (!created?.Id) throw new QboError('Purchase response had no Id', { kind: 'transient' });
      return String(created.Id);
    });
  }
  // Find-or-create (by name, overridable via env) for accounts; vendors likewise.
  async accountRef(client, refs, key) {
    if (refs.accounts[key]) return refs.accounts[key];
    const spec = ACCOUNT_DEFAULTS[key], name = accountName(this.env, key);
    const found = await client.query(`select Id, Name, AccountType from Account where Name = ${qboString(name)}`, 'Account');
    const id = found[0]?.Id || (await client.create('Account', { Name: name, AccountType: spec.type, AccountSubType: spec.subType })).Id;
    refs.accounts[key] = String(id); return refs.accounts[key];
  }
  async vendorRef(client, refs, key) {
    refs.vendors ||= {};
    if (refs.vendors[key]) return refs.vendors[key];
    const name = vendorName(this.env, key);
    const found = await client.query(`select Id, DisplayName, Active from Vendor where DisplayName = ${qboString(name)} and Active in (true, false)`, 'Vendor');
    if (found[0] && found[0].Active === false) throw new QboError(`Vendor "${name}" is inactive in QuickBooks; reactivate it or set another vendor name`, { kind: 'validation' });
    let id = found[0]?.Id;
    if (!id) {
      try { id = (await client.create('Vendor', { DisplayName: name, CompanyName: name })).Id; }
      catch (error) {
        if (error.faultCode === '6240') throw new QboError(`The name "${name}" is already used by a customer or employee in QuickBooks; set QBO_${key === 'shippo' ? 'LABEL' : 'PRINT'}_VENDOR to another name`, { kind: 'validation', tid: error.tid });
        throw error;
      }
    }
    refs.vendors[key] = String(id); return refs.vendors[key];
  }
  async costReferences(client, realmId, cost, resolved) {
    const cache = this.get('refs');
    const refs = cache?.realmId === realmId ? cache : { realmId, accounts: {}, items: {} };
    const accounts = {};
    for (const key of new Set(resolved.lines.map(l => l.account))) accounts[key] = await this.accountRef(client, refs, key);
    const cardAccountId = await this.accountRef(client, refs, 'vendorCard');
    const vendorId = await this.vendorRef(client, refs, cost.vendor);
    this.set('refs', refs);
    return { accounts, cardAccountId, vendorId };
  }
  costRows(limit = 200) {
    return this.ctx.storage.sql.exec('SELECT cost_id, order_id, type, status, attempts, next_at, qbo_id, doc_number, amount, amount_source, last_error, last_tid, created_at, updated_at FROM costs ORDER BY created_at DESC LIMIT ?', Math.min(limit | 0, 1000)).toArray();
  }
  // Read-only: what the production-cost Purchases for one synced order would contain. Vendor reads and QuickBooks queries only.
  async previewCosts(orderId) {
    const id = String(orderId || '');
    const sale = this.ctx.storage.sql.exec('SELECT status, doc_number, qbo_id FROM queue WHERE order_id=?', id).toArray()[0];
    if (!sale) return { orderId: id, error: 'This order is not in the QuickBooks sales queue.' };
    const sources = await this.env.CART_ORDERS.getByName(id.replace(/^cart:/, '')).quickbooksCostSources();
    const purchases = [];
    for (const cost of sources) {
      const queued = this.ctx.storage.sql.exec('SELECT status, qbo_id, amount, amount_source FROM costs WHERE cost_id=?', costId(cost.orderId, cost.type)).toArray()[0] || null;
      let resolved;
      try { resolved = await resolveCost(this.env, cost); }
      catch (error) { purchases.push({ type: cost.type, vendor: vendorName(this.env, cost.vendor), docNumber: costDocNumber(cost.orderId, cost.type), queued, pending: error.message }); continue; }
      const existing = await this.withClient('preview', client => client.query(`select Id, DocNumber, TotalAmt, PrivateNote from Purchase where DocNumber = ${qboString(costDocNumber(cost.orderId, cost.type))}`, 'Purchase'));
      purchases.push({ type: cost.type, vendor: vendorName(this.env, cost.vendor), paymentAccount: accountName(this.env, 'vendorCard'), docNumber: costDocNumber(cost.orderId, cost.type),
        txnDatePT: purchasePayload(cost, resolved, { cardAccountId: '0', vendorId: '0', accounts: Object.fromEntries(resolved.lines.map(l => [l.account, '0'])) }).TxnDate,
        total: (resolved.totalCents / 100).toFixed(2), amountSource: resolved.amountSource, memo: resolved.memo,
        lines: resolved.lines.map(l => ({ account: accountName(this.env, l.account), amount: (l.cents / 100).toFixed(2), description: l.description })),
        queued, alreadyInQuickBooks: existing.filter(r => String(r.PrivateNote || '').includes(cost.orderId)).map(r => ({ id: String(r.Id), total: r.TotalAmt })) });
    }
    return { orderId: id, sale: { status: sale.status, docNumber: sale.doc_number, qboId: sale.qbo_id }, purchases, costSyncEnabled: costSyncEnabled(this.env) };
  }
  // Owner-requested backfill for already-synced sales (listed explicitly). Queues through the same idempotent path.
  async backfillCosts(orderIds) {
    if (!costSyncEnabled(this.env)) return { error: 'Production-cost sync is disabled (QBO_COST_SYNC_ENABLED).' };
    const results = [];
    for (const id of [...new Set((Array.isArray(orderIds) ? orderIds : []).map(String))].slice(0, 10)) {
      const sale = this.ctx.storage.sql.exec('SELECT status FROM queue WHERE order_id=?', id).toArray()[0];
      if (sale?.status !== 'synced') { results.push({ orderId: id, error: 'sale is not recorded in QuickBooks' }); continue; }
      results.push({ orderId: id, ...(await this.env.CART_ORDERS.getByName(id.replace(/^cart:/, '')).queueQuickbooksCosts()) });
    }
    await this.scheduleNext(1000);
    return { results };
  }
  // Calls with a 401 refresh the access token once and retry.
  async withClient(orderId, work) {
    const current = await this.connection();
    if (!current) throw new QboError('QuickBooks is not connected', { kind: 'config' });
    let token = await this.accessToken();
    const client = accountingClient(this.env, { realmId: current.realmId, accessToken: () => token, log: this.log, orderId });
    try { return await work(client, current); }
    catch (error) {
      if (error.kind !== 'auth') throw error;
      token = await this.accessToken(true);
      return work(client, current);
    }
  }
  async createSalesReceipt(receipt) {
    return this.withClient(receipt.orderId, async (client, current) => {
      const docNumber = docNumberFor(receipt.orderId);
      // Idempotency: an earlier attempt may have succeeded after its response was lost.
      const existing = await client.query(`select Id, DocNumber, PrivateNote from SalesReceipt where DocNumber = ${qboString(docNumber)}`, 'SalesReceipt');
      const match = existing.find(r => String(r.PrivateNote || '').includes(receipt.orderId));
      if (match) return String(match.Id);
      const refs = await this.references(client, current.realmId, receipt);
      const payload = salesReceiptPayload(receipt, refs);
      // requestid makes Intuit return the original result for a retried create.
      const requestId = (await sha256Hex(`va-qbo:${environment(this.env)}:${current.realmId}:${receipt.orderId}`)).slice(0, 36);
      let created;
      try { created = await client.create('SalesReceipt', payload, requestId); }
      catch (error) {
        // Stale cached reference (deleted item/account): clear the cache so the next attempt looks them up again.
        if (error.kind === 'validation' && ['2500', '610', '2020'].includes(error.faultCode)) { this.set('refs', null); throw new QboError(error.message, { ...error, kind: 'transient' }); }
        throw error;
      }
      if (!created?.Id) throw new QboError('SalesReceipt response had no Id', { kind: 'transient' });
      return String(created.Id);
    });
  }
  async references(client, realmId, receipt) {
    const cache = this.get('refs');
    const refs = cache?.realmId === realmId ? cache : { realmId, accounts: {}, items: {} };
    const account = key => this.accountRef(client, refs, key);
    const item = async key => {
      if (refs.items[key]) return refs.items[key];
      const name = itemName(this.env, key);
      const found = await client.query(`select Id, Name from Item where Name = ${qboString(name)}`, 'Item');
      const id = found[0]?.Id || (await client.create('Item', { Name: name, Type: 'Service', IncomeAccountRef: { value: await account(ITEM_DEFAULTS[key].account) } })).Id;
      refs.items[key] = String(id); return refs.items[key];
    };
    const needed = new Set(receipt.items.map(i => i.type === 'print' ? 'print' : i.type === 'deposit' ? 'deposit' : 'original'));
    if (receipt.items.some(i => i.listAmount && Number(i.listAmount) > Number(i.amount))) needed.add('discount');
    if (Number(receipt.shipping) > 0) needed.add('shipping');
    if (Number(receipt.tax) > 0) needed.add('tax');
    const items = {};
    for (const key of needed) items[key] = await item(key);
    const depositAccountId = await account(depositAccountKey(receipt));
    this.set('refs', refs);
    return { items, depositAccountId, customerId: await this.customer(client, receipt) };
  }
  async customer(client, receipt) {
    const email = String(receipt.buyerEmail || '').trim().slice(0, 100);
    if (email) {
      const found = await client.query(`select Id, DisplayName from Customer where PrimaryEmailAddr = ${qboString(email)}`, 'Customer');
      if (found[0]?.Id) return String(found[0].Id);
    }
    const name = qboName(receipt.buyerName) || 'Website customer';
    const displayName = qboName(email ? `${name} (${email})` : `${name} (${docNumberFor(receipt.orderId)})`);
    const [given, ...rest] = name.split(' ');
    const address = receipt.shippingAddress || {};
    try {
      const created = await client.create('Customer', { DisplayName: displayName, GivenName: given.slice(0, 100), ...(rest.length ? { FamilyName: rest.join(' ').slice(0, 100) } : {}),
        ...(email ? { PrimaryEmailAddr: { Address: email } } : {}),
        ...(address.street1 ? { BillAddr: { Line1: address.street1, City: address.city, CountrySubDivisionCode: address.state, PostalCode: address.zip, Country: address.country || 'US' } } : {}) });
      return String(created.Id);
    } catch (error) {
      // 6240: duplicate name (including an inactive customer). Reuse that record.
      if (error.faultCode !== '6240') throw error;
      const found = await client.query(`select Id from Customer where DisplayName = ${qboString(displayName)} and Active in (true, false)`, 'Customer');
      if (!found[0]?.Id) throw error;
      return String(found[0].Id);
    }
  }

  async status() {
    const current = await this.connection().catch(() => null);
    const counts = Object.fromEntries(this.ctx.storage.sql.exec('SELECT status, count(*) AS n FROM queue GROUP BY status').toArray().map(r => [r.status, r.n]));
    const lastError = this.ctx.storage.sql.exec("SELECT at, op, status, intuit_tid, message FROM log WHERE level='error' ORDER BY id DESC LIMIT 1").toArray()[0] || null;
    return { environment: environment(this.env), configured: configured(this.env), syncEnabled: syncEnabled(this.env), connected: Boolean(current),
      ...(current ? { companyName: current.companyName, realmIdSuffix: String(current.realmId).slice(-4), connectedAt: current.connectedAt,
        refreshExpiresAt: current.refreshExpiresAt ? new Date(current.refreshExpiresAt).toISOString() : null } : {}),
      disconnected: this.get('disconnected'), queue: counts, costSyncEnabled: costSyncEnabled(this.env),
      costs: Object.fromEntries(this.ctx.storage.sql.exec('SELECT status, count(*) AS n FROM costs GROUP BY status').toArray().map(r => [r.status, r.n])), lastError };
  }
  logs(limit = 500) {
    return this.ctx.storage.sql.exec('SELECT * FROM log ORDER BY id DESC LIMIT ?', Math.min(Math.max(1, limit | 0), LOG_LIMIT)).toArray();
  }
  queueRows(limit = 200) {
    return this.ctx.storage.sql.exec("SELECT order_id, status, attempts, next_at, qbo_id, doc_number, last_error, last_tid, created_at, updated_at, json_extract(receipt,'$.paidAt') AS paid_at, json_extract(receipt,'$.provider') AS provider, json_extract(receipt,'$.gross') AS gross FROM queue ORDER BY created_at DESC LIMIT ?", Math.min(limit | 0, 1000)).toArray();
  }
  async retry(orderId) {
    const changed = this.ctx.storage.sql.exec("UPDATE queue SET status='queued', next_at=0 WHERE order_id=? AND status IN ('review','queued')", String(orderId)).rowsWritten +
      this.ctx.storage.sql.exec("UPDATE costs SET status='queued', next_at=0, resolved=CASE WHEN status='review' THEN NULL ELSE resolved END WHERE (cost_id=? OR order_id=?) AND status IN ('review','queued')", String(orderId), String(orderId)).rowsWritten;
    if (changed) await this.scheduleNext(1000);
    return { retried: Boolean(changed) };
  }
  async syncNow() { return this.processQueue(); }
  // Read-only setup check: which accounts and items the sync would use, or create on the first sale, in the
  // connected company, plus the currency and sales-tax preferences. Queries only; never writes to QuickBooks.
  async preflight() {
    return this.withClient('preflight', async (client, current) => {
      const preferences = await client.read('preferences', 'Preferences');
      const accounts = {}, items = {};
      for (const [key, spec] of Object.entries(ACCOUNT_DEFAULTS)) {
        const name = accountName(this.env, key);
        const found = (await client.query(`select Id, Name, AccountType, AccountSubType, Active from Account where Name = ${qboString(name)} and Active in (true, false)`, 'Account'))[0];
        accounts[key] = { name, expectedType: spec.type, ...(found ? { id: String(found.Id), type: found.AccountType, subType: found.AccountSubType, active: found.Active !== false } : {}),
          action: !found ? `will be created (${spec.type})` : found.Active === false ? 'PROBLEM: inactive account with this name; reactivate it or set another name' : found.AccountType !== spec.type ? `CHECK: existing account is ${found.AccountType}` : 'use existing' };
      }
      for (const [key, spec] of Object.entries(ITEM_DEFAULTS)) {
        const name = itemName(this.env, key);
        const found = (await client.query(`select Id, Name, Type, Active, IncomeAccountRef from Item where Name = ${qboString(name)} and Active in (true, false)`, 'Item'))[0];
        items[key] = { name, ...(found ? { id: String(found.Id), type: found.Type, active: found.Active !== false, incomeAccount: found.IncomeAccountRef?.name || null } : { incomeAccount: accounts[spec.account].name }),
          action: !found ? `will be created (Service item posting to ${accounts[spec.account].name})` : found.Active === false ? 'PROBLEM: inactive item with this name; reactivate it or set another name' : !['Service', 'NonInventory', 'Inventory'].includes(found.Type) ? `PROBLEM: existing item type ${found.Type} cannot be used` : 'use existing' };
      }
      const vendors = {};
      for (const key of ['finerworks', 'shippo']) {
        const name = vendorName(this.env, key);
        const found = (await client.query(`select Id, DisplayName, Active from Vendor where DisplayName = ${qboString(name)} and Active in (true, false)`, 'Vendor'))[0];
        vendors[key] = { name, ...(found ? { id: String(found.Id), active: found.Active !== false } : {}),
          action: !found ? 'will be created (Vendor)' : found.Active === false ? 'PROBLEM: inactive vendor with this name; reactivate it or set another name' : 'use existing' };
      }
      const problems = [...Object.values(accounts), ...Object.values(items), ...Object.values(vendors)].filter(e => e.action.startsWith('PROBLEM')).length;
      return { company: current.companyName, homeCurrency: preferences?.CurrencyPrefs?.HomeCurrency?.value || null, multiCurrency: Boolean(preferences?.CurrencyPrefs?.MultiCurrencyEnabled),
        salesTax: { usingSalesTax: preferences?.TaxPrefs?.UsingSalesTax ?? null, automatedSalesTax: preferences?.TaxPrefs?.PartnerTaxEnabled ?? null },
        customTxnNumbers: preferences?.SalesFormsPrefs?.CustomTxnNumbers ?? null, depositTo: { square: accounts.square.name, btcpay: accounts.bitcoin.name },
        productionCosts: { enabled: costSyncEnabled(this.env), paidFrom: accounts.vendorCard.name, printVendor: vendors.finerworks.name, labelVendor: vendors.shippo.name },
        accounts, items, vendors, problems };
    });
  }
}
