// Imported only by the isolated sandbox entry point. This sample order does not
// call PayPal, publish inventory, or write a Stripe tax transaction.
import { DurableObject } from 'cloudflare:workers';
import { priceOrder } from './checkout-pricing.mjs';
import { newShippingJob, fulfillSale } from './shipping-fulfillment.mjs';

const slug = 'honeybadger-and-cub-with-genesis-block';
const sample = {state:'sold',slug,order_id:'SHIPPINGCHECKV1',capture_id:'SHIPPINGCHECKV1',integrationTest:true};
const isolated = env => env.PAYPAL_MODE === 'sandbox' && !env.GITHUB_TOKEN &&
  env.SHIPPO_TOKEN?.startsWith('shippo_test_') && /^[sr]k_test_/.test(env.STRIPE_SECRET_KEY || '');

export async function shippingCheck(request, env) {
  if (!isolated(env) || !env.SHIPPING_CHECK_TOKEN ||
      request.headers.get('Authorization') !== `Bearer ${env.SHIPPING_CHECK_TOKEN}`) {
    return new Response('Not found',{status:404});
  }
  const stub = env.SHIPPING_CHECK.getByName('label-email-v1');
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
  status() {
    const data = this.read();
    return {test:true,status:data?.job?.status || (data ? 'quoting' : 'not-started'),
      transactionCreated:!!data?.job?.transactionId,emailAccepted:!!data?.job?.emailId,
      pdfAttached:data?.job?.pdfAttached === true,reason:data?.job?.reason || null,error:data?.error || null};
  }
  async start() {
    if (!isolated(this.env) || this.env.SHIPPO_AUTO_LABEL_ENABLED !== 'true') throw new Error('Sandbox shipping is not enabled');
    if (!this.read()) this.ctx.storage.sql.exec('INSERT INTO check_state (id,data) VALUES (1,?)',JSON.stringify({createdAt:Date.now()}));
    const data = this.read();
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
