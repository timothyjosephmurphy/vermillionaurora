import { DurableObject } from 'cloudflare:workers';
import catalog from './checkout-catalog.mjs';
import { commitCheckoutSale } from './paypal-inventory.mjs';
import { recordTax } from './checkout-pricing.mjs';
import { newShippingJob, fulfillSale } from './shipping-fulfillment.mjs';

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
    // Separate table adds fulfillment without altering existing stock records.
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS shipping_job (id INTEGER PRIMARY KEY CHECK (id=1), data TEXT NOT NULL)');
  }

  row() { return this.ctx.storage.sql.exec('SELECT * FROM stock WHERE id = 1').toArray()[0]; }
  status() {
    const row = this.row();
    if (!row || (row.state === 'held' && row.expires_at <= Date.now())) return 'available';
    return row.state === 'sold' ? 'sold' : 'reserved';
  }
  reserve(holdId) {
    if (this.status() !== 'available') return false;
    this.ctx.storage.sql.exec(`INSERT INTO stock (id,state,hold_id,expires_at,order_id,capture_id,published)
      VALUES (1,'held',?,?,NULL,NULL,0)
      ON CONFLICT(id) DO UPDATE SET state='held',hold_id=excluded.hold_id,expires_at=excluded.expires_at,order_id=NULL,capture_id=NULL,published=0,tax_recorded=0,total=NULL,shipping=NULL,tax=NULL,tax_calc_id=NULL,destination=NULL`,
      holdId, Date.now() + 20 * 60_000);
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
  async complete(orderId, captureId) {
    const row = this.row();
    if (!row || row.order_id !== orderId || !['held','capturing','sold'].includes(row.state)) return false;
    if (row.state === 'sold') return row.capture_id === captureId;
    this.ctx.storage.sql.exec("UPDATE stock SET state='sold',capture_id=?,expires_at=NULL WHERE id=1", captureId);
    await this.ctx.storage.setAlarm(Date.now() + 1000);
    return true;
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
  order() { const row = this.row(); return row ? {orderId:row.order_id,state:row.state,published:!!row.published,total:row.total,shipping:row.shipping,tax:row.tax,destination:row.destination ? JSON.parse(row.destination) : null} : null; }
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
    if (!row || row.state !== 'sold') return;
    // Schedule recovery before external I/O, including a process crash during purchase.
    await this.ctx.storage.setAlarm(Date.now() + 60_000);
    let finished = true;
    // Sandbox captures use test services and may send explicitly marked test emails.
    // A sandbox Worker must never publish inventory into the production repository.
    if (this.env.PAYPAL_MODE === 'sandbox' && !row.published) this.markPublished(row.order_id);
    // The object name is the painting slug; the first hold stores it for alarms.
    const slug = this.ctx.storage.sql.exec('SELECT slug FROM painting WHERE id=1').toArray()[0]?.slug;
    try {
      if (this.env.PAYPAL_MODE !== 'sandbox' && !row.published) {
        if (!slug || !catalog[slug] || !this.env.GITHUB_TOKEN) throw new Error('Inventory publication is not configured');
        await commitCheckoutSale(this.env, slug, catalog[slug]);
        this.markPublished(row.order_id);
      }
    } catch (error) {
      finished = false;
      console.error('Checkout inventory publication failed:', slug, error.message);
    }
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
    if (finished) await this.ctx.storage.deleteAlarm();
  }
  initialize(slug) {
    this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS painting (id INTEGER PRIMARY KEY CHECK (id=1), slug TEXT NOT NULL)');
    this.ctx.storage.sql.exec('INSERT OR IGNORE INTO painting (id,slug) VALUES (1,?)', slug);
  }
}
