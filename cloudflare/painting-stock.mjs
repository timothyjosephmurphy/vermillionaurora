import { DurableObject } from 'cloudflare:workers';
import { recordTax } from './checkout-pricing.mjs';
import { newShippingJob, fulfillSale } from './shipping-fulfillment.mjs';
import { checkoutRecord, fulfillmentRecord, ledgerFor } from './sales-records.mjs';
import {stockStatus, nextManualRow, nextEtsySale} from './original-availability.mjs';

// One SQLite-backed object per original. All state changes happen on the same object.
export class PaintingStock extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.storage.sql.exec(`CREATE TABLE IF NOT EXISTS stock (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      state TEXT NOT NULL,
      hold_id TEXT,
      expires_at INTEGER,
      order_id TEXT,
      capture_id TEXT,
      published INTEGER NOT NULL DEFAULT 0,
      tax_recorded INTEGER NOT NULL DEFAULT 0,
      total TEXT,
      shipping TEXT,
      tax TEXT,
      tax_calc_id TEXT,
      destination TEXT
    )`);
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS sale_receipt (capture_id TEXT PRIMARY KEY, data TEXT NOT NULL)');
    // Separate table adds fulfillment without altering existing stock records.
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS shipping_job (id INTEGER PRIMARY KEY CHECK (id=1), data TEXT NOT NULL)');
    for (const sql of ['ALTER TABLE stock ADD COLUMN manual TEXT', 'ALTER TABLE stock ADD COLUMN note TEXT', 'ALTER TABLE stock ADD COLUMN manual_at TEXT']) {
      try { ctx.storage.sql.exec(sql); } catch { /* column already exists */ }
    }
  }

  row() { return this.ctx.storage.sql.exec('SELECT * FROM stock WHERE id = 1').toArray()[0]; }
  status() { return stockStatus(this.row()); }
  summary() { const row = this.row(); return row ? {state: row.state, manual: row.manual || null, note: row.note || '', at: row.manual_at || null, expires_at: row.expires_at, order_id: row.order_id, capture_id: row.capture_id} : null; }
  reserve(holdId) {
    if (this.status() !== 'available') return false;
    this.ctx.storage.sql.exec(`INSERT INTO stock (id,state,hold_id,expires_at,order_id,capture_id,published)
      VALUES (1,'held',?,?,NULL,NULL,0)
      ON CONFLICT(id) DO UPDATE SET state='held',hold_id=excluded.hold_id,expires_at=excluded.expires_at,order_id=NULL,capture_id=NULL,published=0,tax_recorded=0,total=NULL,shipping=NULL,tax=NULL,tax_calc_id=NULL,destination=NULL`,
      holdId, Date.now() + 20 * 60_000);
    return true;
  }
  reserveCart(orderId) {
    const row=this.row(),owner=`cart:${orderId}`;
    if(row?.state==='cart-held'&&row.order_id===owner)return true;
    if(this.status()!=='available')return false;
    // The coordinator owns expiry. Locks cannot time out while payment is uncertain.
    this.ctx.storage.sql.exec(`INSERT INTO stock(id,state,hold_id,order_id,expires_at) VALUES(1,'cart-held',?,?,NULL)
      ON CONFLICT(id) DO UPDATE SET state='cart-held',hold_id=excluded.hold_id,order_id=excluded.order_id,expires_at=NULL,capture_id=NULL,published=0,tax_recorded=0,total=NULL,shipping=NULL,tax=NULL,tax_calc_id=NULL,destination=NULL`,orderId,owner);
    this.ctx.storage.sql.exec('DELETE FROM shipping_job WHERE id=1');
    return true;
  }
  ownsCart(orderId) {const row=this.row();return row?.state==='cart-held'&&row.order_id===`cart:${orderId}`;}
  releaseCart(orderId) {
    if(!this.ownsCart(orderId))return false;
    this.ctx.storage.sql.exec('DELETE FROM stock WHERE id=1');return true;
  }
  completeCart(orderId,captureId) {
    const row=this.row();
    if(row?.state==='sold'&&row.order_id===`cart:${orderId}`&&row.capture_id===captureId)return true;
    if(!this.ownsCart(orderId))return false;
    this.ctx.storage.sql.exec("UPDATE stock SET state='sold',capture_id=?,published=1,expires_at=NULL WHERE id=1",captureId);
    this.queueEtsySync();
    // Payment receipt, tax and fulfillment belong to the coordinator, once per order.
    return true;
  }
  bindOrder(holdId, orderId, quote) {
    const row = this.row();
    if (row?.state !== 'held' || row.hold_id !== holdId || row.expires_at <= Date.now() || row.order_id) return false;
    this.ctx.storage.sql.exec('UPDATE stock SET order_id=?,total=?,shipping=?,tax=?,tax_calc_id=?,destination=? WHERE id=1',
      orderId,quote.total,quote.shipping,quote.tax,quote.taxCalculationId,JSON.stringify(quote.address));
    this.ctx.storage.sql.exec('INSERT OR REPLACE INTO shipping_job (id,data) VALUES (1,?)',
      JSON.stringify(newShippingJob(this.env, orderId, quote)));
    return true;
  }
  beginCapture(orderId, holdId) {
    const row = this.row();
    if (!row || row.order_id !== orderId || row.hold_id !== holdId) return 'invalid';
    if (row.state === 'sold') return 'sold';
    if (row.state === 'capturing') return 'pending';
    if (row.state !== 'held' || row.expires_at <= Date.now()) return 'expired';
    this.ctx.storage.sql.exec("UPDATE stock SET state='capturing' WHERE id=1");
    return 'ready';
  }
  bindBitcoinOrder(holdId,quote) {
    if (!this.bindOrder(holdId,`btcpay:${holdId}`,quote)) return false;
    // BitcoinOrder owns expiry/reconciliation. A timed local hold cannot release
    // an invoice while its Bitcoin transaction is still confirming.
    this.ctx.storage.sql.exec("UPDATE stock SET state='capturing',expires_at=NULL WHERE id=1");
    return true;
  }
  releaseBitcoinOrder(holdId) {
    const row=this.row();
    if(row?.state!=='capturing' || row.order_id!==`btcpay:${holdId}` || row.hold_id!==holdId)return false;
    this.ctx.storage.sql.exec('DELETE FROM stock WHERE id=1');
    this.ctx.storage.sql.exec('DELETE FROM shipping_job WHERE id=1');
    return true;
  }
  async complete(orderId, captureId, details={}) {
    let row = this.row();
    if (!row || row.order_id !== orderId || !['held','capturing','sold'].includes(row.state) || (row.state==='sold' && row.capture_id!==captureId)) return false;
    const existing=this.ctx.storage.sql.exec('SELECT data FROM sale_receipt WHERE capture_id=?',captureId).toArray()[0];
    if(row.state==='sold' && existing)return true;
    await this.ctx.storage.setAlarm(Date.now() + 1000);
    row=this.row();
    if(!row || row.order_id!==orderId || (row.state==='sold' && row.capture_id!==captureId))return false;
    const slug=this.ctx.storage.sql.exec('SELECT slug FROM painting WHERE id=1').toArray()[0]?.slug;
    const savedJob=this.ctx.storage.sql.exec('SELECT data FROM shipping_job WHERE id=1').toArray()[0];
    const receipt=checkoutRecord(this.env,{...row,capture_id:captureId},slug,savedJob?JSON.parse(savedJob.data):null,details);
    this.ctx.storage.transactionSync(()=>{
      this.ctx.storage.sql.exec("UPDATE stock SET state='sold',capture_id=?,expires_at=NULL WHERE id=1", captureId);
      this.ctx.storage.sql.exec('INSERT OR IGNORE INTO sale_receipt (capture_id,data) VALUES (?,?)',captureId,JSON.stringify(receipt));
    });
    this.queueEtsySync();
    return true;
  }
  recordExternalSale(transactionId) {
    const orderId=`ipn:${transactionId}`,row=this.row();
    if(row?.state==='sold')return row.order_id===orderId;
    if(this.status()!=='available')return false;
    this.ctx.storage.sql.exec(`INSERT INTO stock(id,state,order_id,capture_id,published,tax_recorded) VALUES(1,'sold',?,?,1,1)
      ON CONFLICT(id) DO UPDATE SET state='sold',order_id=excluded.order_id,capture_id=excluded.capture_id,expires_at=NULL,published=1,tax_recorded=1`,orderId,transactionId);
    this.queueEtsySync();
    return true;
  }
  applyRow(next, note, at) {
    this.ctx.storage.sql.exec(`INSERT INTO stock (id,state,hold_id,expires_at,order_id,capture_id,published,manual,note,manual_at)
      VALUES (1,?,NULL,?,?,?,1,?,?,?)
      ON CONFLICT(id) DO UPDATE SET state=excluded.state,hold_id=NULL,expires_at=excluded.expires_at,order_id=excluded.order_id,capture_id=excluded.capture_id,published=1,manual=excluded.manual,note=excluded.note,manual_at=excluded.manual_at`,
      next.state, next.expires_at, next.order_id, next.capture_id, next.manual, String(note || '').slice(0, 300), at);
  }
  setManual(status, note = '', at = new Date().toISOString()) {
    const next = nextManualRow(this.row(), status);
    if (next.error) return {ok: false, error: next.error};
    this.applyRow(next, note, at);
    if (status !== 'available' && !next.unchanged) this.queueEtsySync();
    return {ok: true, status: this.status(), unchanged: !!next.unchanged};
  }
  recordEtsySale(receiptId, at = new Date().toISOString()) {
    const next = nextEtsySale(this.row(), String(receiptId));
    if (next.duplicate) return {ok: true, duplicate: true, status: 'sold'};
    if (next.conflict) return {ok: false, conflict: true, status: this.status()};
    this.applyRow(next, 'Etsy receipt ' + receiptId, at);
    return {ok: true, status: 'sold', replacedHold: !!next.replacedHold};
  }
  queueEtsySync() {
    if (!this.env?.ETSY_KEYSTRING) return;
    const slug = this.etsySlug();
    if (!slug) return;
    const job = import('./etsy-original-sync.mjs').then(mod => mod.onSiteSold(this.env, slug)).catch(() => console.error('Etsy original sync failed:', slug));
    if (this.ctx.waitUntil) this.ctx.waitUntil(job);
  }
  etsySlug() {
    try { if (this.ctx.id?.name) return this.ctx.id.name; } catch { /* unnamed object */ }
    try { return this.ctx.storage.sql.exec('SELECT slug FROM painting WHERE id=1').toArray()[0]?.slug || ''; } catch { return ''; }
  }
  async archiveSale() {
    const row=this.row();
    if(row?.state!=='sold')return {recorded:false};
    if(row.order_id?.startsWith('cart:'))return this.env.CART_ORDERS.getByName(row.order_id.slice(5)).archiveSale();
    const saved=this.ctx.storage.sql.exec('SELECT data FROM sale_receipt WHERE capture_id=?',row.capture_id).toArray()[0];
    if(!saved)throw Error('Sale receipt needs backfill');
    if(!this.env.SALES_LEDGER)throw Error('Sales ledger is not configured');
    const job=this.ctx.storage.sql.exec('SELECT data FROM shipping_job WHERE id=1').toArray()[0];
    const receipt={...JSON.parse(saved.data),fulfillment:fulfillmentRecord(row,job?JSON.parse(job.data):null)};
    await ledgerFor(this.env,receipt).record(receipt);
    return {recorded:true,period:receipt.paidAt.slice(0,7)};
  }
  release(holdId) {
    const row = this.row();
    if (row?.state === 'held' && row.hold_id === holdId) {
      this.ctx.storage.sql.exec('DELETE FROM stock WHERE id=1');
      return true;
    }
    return false;
  }
  releaseOrder(orderId, holdId) {
    const row = this.row();
    if (row?.state === 'held' && row.order_id === orderId && row.hold_id === holdId) {
      this.ctx.storage.sql.exec('DELETE FROM stock WHERE id=1');
      return true;
    }
    return false;
  }
  // Relisting maintenance removes the current stock row while retaining the
  // sale_receipt and ledger history for any earlier completed payment.
  resetForRelisting() {
    const row = this.row();
    if (row?.state === 'held' || row?.state === 'capturing' || row?.state === 'cart-held') {
      throw new Error('Cannot relist a painting with an active checkout');
    }
    this.ctx.storage.sql.exec('DELETE FROM stock WHERE id=1');
    this.ctx.storage.sql.exec('DELETE FROM shipping_job WHERE id=1');
    return { reset: !!row, priorState: row?.state || 'available' };
  }
  order() { const row = this.row(); return row ? {orderId:row.order_id,state:row.state,published:!!row.published,captureId:row.capture_id,total:row.total,base:row.total ? ((Math.round(Number(row.total)*100)-Math.round(Number(row.shipping)*100)-Math.round(Number(row.tax)*100))/100).toFixed(2) : null,shipping:row.shipping,tax:row.tax,destination:row.destination ? JSON.parse(row.destination) : null} : null; }
  markPublished(orderId) {
    if (this.row()?.order_id === orderId && this.row()?.state === 'sold') this.ctx.storage.sql.exec('UPDATE stock SET published=1 WHERE id=1');
  }
  recordWebhook(orderId,captureId) {
    const row = this.row();
    if (row?.state !== 'sold' || row.order_id !== orderId || row.capture_id !== captureId) return false;
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS webhook_receipt (id INTEGER PRIMARY KEY CHECK(id=1), received_at INTEGER NOT NULL)');
    this.ctx.storage.sql.exec('INSERT OR REPLACE INTO webhook_receipt (id,received_at) VALUES (1,?)',Date.now());
    return true;
  }
  verification() {
    const row = this.row();
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS webhook_receipt (id INTEGER PRIMARY KEY CHECK(id=1), received_at INTEGER NOT NULL)');
    const receivedAt=this.ctx.storage.sql.exec('SELECT received_at FROM webhook_receipt WHERE id=1').toArray()[0]?.received_at||null;
    return {status:this.status(),taxRecorded:!!row?.tax_recorded,published:!!row?.published,
      webhookReceived:!!receivedAt,webhookReceivedAt:receivedAt};
  }
  async alarm() {
    const row = this.row();
    if (!row || row.state !== 'sold' || row.order_id?.startsWith('cart:')) return;
    // Schedule recovery before external I/O, including a process crash during purchase.
    await this.ctx.storage.setAlarm(Date.now() + 60_000);
    let finished = true;
    try { await this.archiveSale(); }
    catch { finished=false; console.error('Sales ledger needs retry'); }
    // The durable sold state is the public inventory authority. No GitHub write
    // or website rebuild is needed; retain the published field for old receipts.
    if (!row.published) this.markPublished(row.order_id);
    const slug = this.ctx.storage.sql.exec('SELECT slug FROM painting WHERE id=1').toArray()[0]?.slug;
    try {
      if (!row.tax_recorded) {
        await recordTax(this.env,row.tax_calc_id,row.capture_id);
        this.ctx.storage.sql.exec('UPDATE stock SET tax_recorded=1 WHERE id=1');
      }
    } catch (error) {
      finished = false;
      console.error('Checkout tax recording failed:', slug, error.message);
    }
    try {
      const storedJob = this.ctx.storage.sql.exec('SELECT data FROM shipping_job WHERE id=1').toArray()[0];
      const shipped = await fulfillSale(this.env, {...row,slug}, storedJob ? JSON.parse(storedJob.data) : null, async job => {
        this.ctx.storage.sql.exec('UPDATE shipping_job SET data=? WHERE id=1', JSON.stringify(job));
        await this.ctx.storage.sync();
      });
      if (!shipped) finished = false;
    } catch (error) {
      finished = false;
      console.error('Checkout shipping notification failed:', slug, error.message);
    }
    try { await this.archiveSale(); }
    catch { finished=false; console.error('Sales ledger update needs retry'); }
    if (finished) await this.ctx.storage.deleteAlarm();
  }
  initialize(slug) {
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS painting (id INTEGER PRIMARY KEY CHECK (id=1), slug TEXT NOT NULL)');
    this.ctx.storage.sql.exec('INSERT OR IGNORE INTO painting (id,slug) VALUES (1,?)', slug);
  }
}
