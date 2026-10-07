import { env } from 'cloudflare:workers';
import { runInDurableObject, runDurableObjectAlarm, evictDurableObject } from 'cloudflare:test';
import { beforeEach, afterEach, it, expect, vi } from 'vitest';
import { fulfillSale, newShippingJob } from '../shipping-fulfillment.mjs';
import { shippingCheck } from '../shipping-check.mjs';
import { sellerMailToken } from '../shipping-email.mjs';
import { priceOrder } from '../checkout-pricing.mjs';

const slug = 'honeybadger-and-cub-with-genesis-block';
const quote = () => ({title:'Honeybadger and Cub with Genesis Block',base:'1200.00',shipping:'12.00',tax:'9.00',total:'1221.00',
  taxCalculationId:'taxcalc_TEST',rateId:'RATE1',quotedAt:Date.now(),carrier:'USPS',service:'Ground Advantage',packaging:'tube',
  parcel:{length:28,width:4,height:4,weight:2},
  address:{name:'Test Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122',country:'US'}});
const sale = {state:'sold',order_id:'ORDER1',capture_id:'CAPTURE1',slug};
const success = {object_id:'TX1',test:true,status:'SUCCESS',label_url:'https://deliver.goshippo.com/label.pdf',
  tracking_number:'TRACK1',tracking_url_provider:'https://tools.usps.com/track/TRACK1'};
let calls, transaction, pollTransaction, failEmail, failPurchase, failTax, failPdf, pdfRedirect;
let objects, insuredRate, insuredShipment;
beforeEach(() => {
  calls = []; objects = []; transaction = success; pollTransaction = success;
  insuredRate = {object_id:'INS_RATE',shipment:'INS_SHIPMENT',currency:'USD',amount:'5.75',included_insurance_price:'0.75',provider:'USPS',servicelevel:{name:'Ground Advantage'}};
  insuredShipment = {object_id:'INS_SHIPMENT',extra:{insurance:{amount:'200.00',currency:'USD',content:'Original painting: Chase Toole'}}};
  failEmail = failPurchase = failTax = failPdf = false;
  pdfRedirect = null;
  vi.stubGlobal('fetch', vi.fn(async (url, options = {}) => {
    calls.push({url:String(url),...options});
    if (url === 'https://oauth2.googleapis.com/token') return Response.json({access_token:'EMAIL_TOKEN'});
    if (url === 'https://api.goshippo.com/shipments/') return JSON.parse(options.body).extra?.insurance
      ? Response.json({...insuredShipment,rates:[{object_id:'CHEAPER_UNINSURED',currency:'USD',amount:'1.00'},insuredRate]})
      : Response.json({rates:[{object_id:'RATE1',currency:'USD',amount:'12.00',provider:'USPS',servicelevel:{name:'Ground'}}]});
    if (url === 'https://api.goshippo.com/rates/INS_RATE/') return Response.json(insuredRate);
    if (url === 'https://api.goshippo.com/shipments/INS_SHIPMENT/') return Response.json(insuredShipment);
    if (url === 'https://api.stripe.com/v1/tax/calculations') return Response.json({id:'taxcalc_TEST',currency:'usd',amount_total:Number(options.body.get('line_items[0][amount]'))+Number(options.body.get('shipping_cost[amount]'))+900});
    if (url === 'https://api.goshippo.com/transactions/') {
      if (failPurchase) throw new Error('Connection lost after request was accepted');
      return Response.json(transaction);
    }
    if (url === 'https://api.goshippo.com/transactions/TX1/') return Response.json(pollTransaction);
    if (url === success.label_url) return pdfRedirect ? new Response(null,{status:302,headers:{Location:pdfRedirect}}) : failPdf ? new Response('expired',{status:403}) : new Response('%PDF-1.4\nTest label');
    if (url === 'https://labels.example.test/final.pdf') return new Response('%PDF-1.4\nRedirected test label');
    if (url === 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send') {
      return failEmail ? Response.json({error:'Unavailable'},{status:503}) : Response.json({id:'EMAIL1'});
    }
    if (url === 'https://api.stripe.com/v1/tax/transactions/create_from_calculation') {
      return failTax ? new Response('Unavailable',{status:503}) : Response.json({id:'TAX1'});
    }
    throw new Error(`Unexpected external request: ${url}`);
  }));
});
afterEach(async () => {
  for (const stub of objects) await runInDurableObject(stub, (_,ctx) => ctx.storage.deleteAlarm());
  vi.unstubAllGlobals();
});
const purchases = () => calls.filter(c => c.url === 'https://api.goshippo.com/transactions/');
const emails = () => calls.filter(c => c.url.includes('/messages/send'));
const emailMime = () => atob(JSON.parse(emails().at(-1).body).raw.replaceAll('-','+').replaceAll('_','/'));
const readJob = stub => runInDurableObject(stub, (_,ctx) => JSON.parse(ctx.storage.sql.exec('SELECT data FROM shipping_job WHERE id=1').one().data));
async function soldObject() {
  const stub = env.PAINTING_STOCK.getByName(crypto.randomUUID()); objects.push(stub);
  await stub.initialize(slug);
  expect(await stub.reserve('HOLD1')).toBe(true);
  expect(await stub.bindOrder('HOLD1',sale.order_id,quote())).toBe(true);
  expect(await stub.complete(sale.order_id,sale.capture_id)).toBe(true);
  return stub;
}
async function runJob(config = env, changes = {}, saleChanges = {}) {
  let job = {...newShippingJob(config, sale.order_id, quote()),...changes};
  const save = async value => { job = structuredClone(value); };
  const run = () => fulfillSale(config,{...sale,...saleChanges},job,save);
  await run();
  return {get job() { return job; },run};
}

it('purchases the saved rate, emails its PDF, and survives duplicate captures, alarms and eviction', async () => {
  const stub = await soldObject();
  expect(await runDurableObjectAlarm(stub)).toBe(true);
  expect(purchases()).toHaveLength(1);
  expect(JSON.parse(purchases()[0].body)).toEqual({rate:'RATE1',async:false,label_file_type:'PDF',metadata:'paypal-CAPTURE1'});
  expect(emails()).toHaveLength(1);
  expect(emailMime()).toContain('To: tj@vermillionaurora.com');
  expect(emailMime()).toContain('filename="shipping-label.pdf"');
  expect((await readJob(stub)).emailId).toBe('EMAIL1');
  expect((await readJob(stub)).pdfAttached).toBe(true);
  expect(await runInDurableObject(stub, (_,ctx) => ctx.storage.getAlarm())).toBeNull();
  await evictDurableObject(stub);
  expect(await stub.complete(sale.order_id,sale.capture_id)).toBe(true);
  expect(await stub.complete(sale.order_id,'WRONG_CAPTURE')).toBe(false);
  await runInDurableObject(stub, instance => instance.alarm());
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(1);
  expect(await stub.status()).toBe('sold');
});

it('retries email after eviction without buying the label again', async () => {
  failEmail = true;
  const stub = await soldObject();
  await runDurableObjectAlarm(stub);
  expect((await readJob(stub)).status).toBe('ready');
  expect(await runInDurableObject(stub, (_,ctx) => ctx.storage.getAlarm())).toBeGreaterThan(Date.now());
  await evictDurableObject(stub);
  failEmail = false;
  await runDurableObjectAlarm(stub);
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(2);
  expect((await readJob(stub)).emailId).toBe('EMAIL1');
});

it('keeps shipping independent of a tax service outage', async () => {
  failTax = true;
  const stub = await soldObject();
  await runDurableObjectAlarm(stub);
  expect((await readJob(stub)).emailId).toBe('EMAIL1');
  failTax = false;
  await runDurableObjectAlarm(stub);
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(1);
  expect(await runInDurableObject(stub, (_,ctx) => ctx.storage.getAlarm())).toBeNull();
});

it('polls an asynchronous transaction without a second purchase', async () => {
  transaction = {object_id:'TX1',test:true,status:'QUEUED'};
  const stub = await soldObject();
  await runDurableObjectAlarm(stub);
  expect((await readJob(stub)).status).toBe('waiting');
  expect(emails()).toHaveLength(0);
  await evictDurableObject(stub);
  await runDurableObjectAlarm(stub);
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(1);
});

it('alerts once after an uncertain purchase and never repeats it', async () => {
  failPurchase = true;
  const result = await runJob();
  expect(result.job.status).toBe('review');
  expect(result.job.reason).toMatch(/may already have been purchased/);
  await result.run();
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(1);
});

it('recovers a persisted purchasing marker after eviction without repeating the POST', async () => {
  const stub = await soldObject();
  await runInDurableObject(stub, (_,ctx) => {
    const job = JSON.parse(ctx.storage.sql.exec('SELECT data FROM shipping_job WHERE id=1').one().data);
    ctx.storage.sql.exec('UPDATE shipping_job SET data=? WHERE id=1',JSON.stringify({...job,status:'purchasing',metadata:'paypal-CAPTURE1'}));
  });
  await evictDurableObject(stub);
  await runDurableObjectAlarm(stub);
  expect(purchases()).toHaveLength(0);
  expect((await readJob(stub)).status).toBe('review');
  expect(emails()).toHaveLength(1);
});

it.each([
  ['disabled', {SHIPPO_AUTO_LABEL_ENABLED:'false'}, {}, {}],
  ['unpaid', {}, {}, {state:'held'}],
  ['wrong order', {}, {}, {order_id:'OTHER'}]
])('does nothing for %s orders', async (_, config, job, sold) => {
  await runJob({...env,...config},job,sold);
  expect(calls).toHaveLength(0);
});

it.each([
  ['test/live token mismatch',{SHIPPO_TOKEN:'shippo_live_fake'},{}],
  ['expired rate',{}, {quote:{...quote(),quotedAt:Date.now()-8*86400_000}}],
  ['missing rate',{}, {quote:{...quote(),rateId:null}}],
  ['invalid format',{SHIPPING_LABEL_FORMAT:'ZPLII'},{}]
])('sends an actionable alert without buying for %s', async (_, config, job) => {
  const result = await runJob({...env,...config},job);
  expect(result.job.status).toBe('review');
  expect(purchases()).toHaveLength(0);
  expect(emails()).toHaveLength(1);
});

it('does not purchase when Gmail is unconfigured', async () => {
  await expect(runJob({...env,GOOGLE_REFRESH_TOKEN:''})).rejects.toThrow('not configured');
  expect(purchases()).toHaveLength(0);
});

it('normalizes whitespace from pasted Google credentials', async () => {
  await sellerMailToken({...env,GOOGLE_CLIENT_ID:' fake\n',GOOGLE_CLIENT_SECRET:' fake\n',GOOGLE_REFRESH_TOKEN:' fake\n'});
  const form = calls[0].body;
  expect(form.get('client_id')).toBe('fake');
  expect(form.get('client_secret')).toBe('fake');
  expect(form.get('refresh_token')).toBe('fake');
});

it('reports the Google error code without exposing its response or credentials', async () => {
  vi.stubGlobal('fetch',vi.fn(async()=>Response.json({error:'invalid_client',error_description:'private response'},{status:401})));
  await expect(sellerMailToken(env)).rejects.toThrow('Seller email authorization failed (401: invalid_client)');
});

it('emails the download link when the PDF cannot be attached', async () => {
  failPdf = true;
  const result = await runJob();
  expect(result.job.emailId).toBe('EMAIL1');
  expect(result.job.pdfAttached).toBe(false);
  expect(result.job.attachmentError).toBe('Label HTTP 403');
  expect(emailMime()).not.toContain('filename="shipping-label.pdf"');
  const encodedBody = emailMime().split('Content-Transfer-Encoding: base64\r\n\r\n')[1].split('\r\n--')[0];
  expect(atob(encodedBody.replaceAll('\r\n',''))).toContain(success.label_url);
});

it('attaches a PDF served through an HTTPS redirect without forwarding provider credentials', async () => {
  pdfRedirect = 'https://labels.example.test/final.pdf';
  const result = await runJob();
  expect(result.job.pdfAttached).toBe(true);
  expect(calls.find(call=>call.url===pdfRedirect).headers).toBeUndefined();
});

it('rejects an insecure label redirect and keeps the download-link email', async () => {
  pdfRedirect = 'http://labels.example.test/final.pdf';
  const result = await runJob();
  expect(result.job.pdfAttached).toBe(false);
  expect(result.job.attachmentError).toBe('Label URL is not HTTPS');
  expect(calls.some(call=>call.url===pdfRedirect)).toBe(false);
});

it('retries only the sandbox attachment once and reuses its existing label', async () => {
  failPdf = true;
  const stub = env.SHIPPING_CHECK.getByName(crypto.randomUUID()); objects.push(stub);
  await stub.start();
  await runDurableObjectAlarm(stub);
  expect(await stub.status()).toMatchObject({status:'ready',emailAccepted:true,pdfAttached:false});
  failPdf = false;
  await stub.start();
  await runDurableObjectAlarm(stub);
  expect(await stub.status()).toMatchObject({status:'ready',emailAccepted:true,pdfAttached:true});
  await stub.start();
  expect(await runDurableObjectAlarm(stub)).toBe(false);
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(2);
});

it('runs a sample shipping check once without a PayPal purchase or inventory mutation', async () => {
  const stub = env.SHIPPING_CHECK.getByName(crypto.randomUUID()); objects.push(stub);
  await stub.start();
  await runDurableObjectAlarm(stub);
  expect(await stub.status()).toMatchObject({test:true,status:'ready',transactionCreated:true,emailAccepted:true,pdfAttached:true});
  const encodedBody = emailMime().split('Content-Transfer-Encoding: base64\r\n\r\n')[1].split('\r\n--')[0];
  expect(atob(encodedBody.replaceAll('\r\n',''))).toContain('sample order, no PayPal charge');
  await stub.start();
  expect(await runDurableObjectAlarm(stub)).toBe(false);
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(1);
  expect(calls.some(c=>c.url.includes('paypal.com') || c.url.includes('api.github.com') || c.url.includes('tax/transactions'))).toBe(false);
});

it('keeps the insured Chase diagnostic separate and confirms its coverage without a PayPal purchase', async () => {
  transaction = {...success,rate:'INS_RATE'};
  const stub = env.SHIPPING_CHECK.getByName(crypto.randomUUID()); objects.push(stub);
  await stub.start('chase-insurance');
  await runDurableObjectAlarm(stub);
  expect(await stub.status()).toMatchObject({status:'ready',insuranceRequested:true,insuranceConfirmed:true,insuranceAmount:'200.00',pdfAttached:true});
  await stub.start('chase-insurance');
  expect(await runDurableObjectAlarm(stub)).toBe(false);
  expect(purchases()).toHaveLength(1);
  expect(calls.some(c=>c.url.includes('paypal.com') || c.url.includes('api.github.com') || c.url.includes('tax/transactions'))).toBe(false);
});

it('diagnoses a failed test transaction without exposing private message text or purchasing again', async () => {
  transaction = {object_id:'TX1',test:true,status:'ERROR'};
  pollTransaction = {...transaction,messages:[{source:'UPS',code:'120100',text:'Sender phone is missing: private buyer details'}]};
  const stub = env.SHIPPING_CHECK.getByName(crypto.randomUUID()); objects.push(stub);
  await stub.start();
  await runDurableObjectAlarm(stub);
  const result = await stub.status();
  expect(result).toMatchObject({status:'review',emailAccepted:true,providerMessages:[{source:'UPS',code:'120100',hints:['phone','sender','missing']}]});
  expect(JSON.stringify(result)).not.toContain('private buyer details');
  await stub.start();
  expect(await runDurableObjectAlarm(stub)).toBe(false);
  expect(purchases()).toHaveLength(1);
  expect(emails()).toHaveLength(1);
});

it.each([
  ['no diagnostic token',{}],
  ['wrong diagnostic token',{SHIPPING_CHECK_TOKEN:'different'}],
  ['live PayPal mode',{SHIPPING_CHECK_TOKEN:'test',PAYPAL_MODE:'live'}],
  ['live Shippo key',{SHIPPING_CHECK_TOKEN:'test',SHIPPO_TOKEN:'shippo_live_fake'}],
  ['live Stripe key',{SHIPPING_CHECK_TOKEN:'test',STRIPE_SECRET_KEY:'sk_live_fake'}],
  ['production inventory credential',{SHIPPING_CHECK_TOKEN:'test',GITHUB_TOKEN:'fake'}]
])('blocks shipping diagnostics with %s',async (_, overrides) => {
  const response = await shippingCheck(new Request('https://sandbox.example/checkout/shipping-check',{method:'POST',headers:{Authorization:'Bearer test'}}),{...env,...overrides});
  expect(response.status).toBe(404);
  expect(calls).toHaveLength(0);
});
