// Imported only by the isolated sandbox entry point. This sample order does not
// call PayPal, publish inventory, or write a Stripe tax transaction.
import { DurableObject } from 'cloudflare:workers';
import { priceOrder } from './checkout-pricing.mjs';
import { newShippingJob, fulfillSale } from './shipping-fulfillment.mjs';

const slug = 'honeybadger-and-cub-with-genesis-block';
// A new sample after UPS setup was corrected; preserve the failed v1 record.
const sample = {state:'sold',slug,order_id:'SHIPPINGCHECKV2',capture_id:'SHIPPINGCHECKV2',integrationTest:true};
const isolated = env => env.PAYPAL_MODE === 'sandbox' && !env.GITHUB_TOKEN &&
  env.SHIPPO_TOKEN?.startsWith('shippo_test_') && /^[sr]k_test_/.test(env.STRIPE_SECRET_KEY || '');

export async function shippingCheck(request, env) {
  if (!isolated(env) || !env.SHIPPING_CHECK_TOKEN ||
      request.headers.get('Authorization') !== `Bearer ${env.SHIPPING_CHECK_TOKEN}`) {
    return new Response('Not found',{status:404});
  }
  const stub = env.SHIPPING_CHECK.getByName('label-email-v2');
  if (!['GET','POST'].includes(request.method)) return new Response('Method not allowed',{status:405});
  const result = request.method === 'POST' ? await stub.start() : await stub.status();
  return Response.json(result,{headers:{'Cache-Control':'no-store'}});
}

export class ShippingCheck extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS check_state (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT NOT NULL)');
  }
  read() { const row = this.ctx.storage.sql.exec('SELECT data FROM check_state WHERE id=1').toArray()[0]; return row ? JSON.parse(row.data) : null; }
  async save(data) {
    this.ctx.storage.sql.exec('INSERT OR REPLACE INTO check_state (id,data) VALUES (1,?)',JSON.stringify(data));
    await this.ctx.storage.sync();
  }
  async status() {
    const data = this.read();
    const result = {test:true,status:data?.job?.status || (data ? 'quoting' : 'not-started'),
      transactionCreated:!!data?.job?.transactionId,emailAccepted:!!data?.job?.emailId,
      pdfAttached:data?.job?.pdfAttached === true,attachmentError:data?.job?.attachmentError || null,
      reason:data?.job?.reason || null,error:data?.error || null};
    // Read the existing failed test transaction only; never purchase again.
    // Provider message text can contain addresses, so expose codes and fixed
    // keyword hints instead of logging the raw response in public CI logs.
    if (isolated(this.env) && data?.job?.status === 'review' && data.job.transactionId) {
      const response = await fetch(`https://api.goshippo.com/transactions/${encodeURIComponent(data.job.transactionId)}/`, {
        headers:{Authorization:`ShippoToken ${this.env.SHIPPO_TOKEN}`,'SHIPPO-API-VERSION':'2018-02-08'},
        signal:AbortSignal.timeout(20_000)
      });
      result.providerLookupStatus = response.status;
      if (response.ok) {
        const transaction = await response.json();
        if (transaction.object_id === data.job.transactionId && transaction.test === true) {
          const safeCode = value => typeof value === 'string' && /^[a-zA-Z0-9_.:-]{1,80}$/.test(value) ? value : null;
          result.providerMessages = (Array.isArray(transaction.messages) ? transaction.messages : []).slice(0,10).map(message => ({
            code:safeCode(message.code),source:safeCode(message.source),
            hints:['phone','email','address','street','zip','postal','state','country','origin','destination','sender','recipient',
              'billing','payment','card','balance','account','activation','verification','authentication','permission','test',
              'rate','expired','service','carrier','parcel','weight','dimension','insurance','required','missing','invalid','unavailable']
              .filter(word => new RegExp(`\\b${word}\\b`,'i').test(String(message.text || '')))
          }));
        }
      }
    }
    return result;
  }
  async start() {
    if (!isolated(this.env) || this.env.SHIPPO_AUTO_LABEL_ENABLED !== 'true') throw new Error('Sandbox shipping is not enabled');
    if (!this.read()) this.ctx.storage.sql.exec('INSERT INTO check_state (id,data) VALUES (1,?)',JSON.stringify({createdAt:Date.now()}));
    let data = this.read();
    // One deliberate email-only retry for this sandbox sample. Preserve the
    // existing successful transaction and original email for auditability.
    if (data.job?.status === 'ready' && data.job.emailId && !data.job.pdfAttached && !data.attachmentRetried) {
      data = {...data,attachmentRetried:true,job:{...data.job,previousEmailId:data.job.emailId,emailId:null}};
      await this.save(data);
    }
    if (!data.job?.emailId) {
      this.ctx.storage.sql.exec('UPDATE check_state SET data=? WHERE id=1',JSON.stringify({...data,error:null}));
      await this.ctx.storage.setAlarm(Date.now()+1000);
    }
    return this.status();
  }
  async alarm() {
    if (!isolated(this.env)) return;
    let data = this.read();
    if (!data || data.job?.emailId) return;
    try {
      if (!data.job) {
        const quote = await priceOrder(this.env,slug,{name:'Shippo Integration Test',street1:'1600 Amphitheatre Pkwy',city:'Mountain View',state:'CA',zip:'94043'});
        quote.title = 'Shippo email integration test';
        data = {...data,job:newShippingJob(this.env,sample.order_id,quote)};
        await this.save(data);
      }
      const done = await fulfillSale(this.env,sample,data.job,async job => {
        data = {...data,job,error:null};
        await this.save(data);
      });
      if (!done) await this.ctx.storage.setAlarm(Date.now()+5000);
    } catch (error) {
      // Preserve any purchased transaction. An authenticated POST can resume an
      // email/configuration failure without buying a second label.
      await this.save({...data,error:error.message});
    }
  }
}
