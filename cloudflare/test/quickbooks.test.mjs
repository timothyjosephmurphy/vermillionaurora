import {env} from 'cloudflare:workers';
import {runInDurableObject,runDurableObjectAlarm} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {quickbooksApi} from '../quickbooks-api.mjs';

const origin='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const doc={authorization_endpoint:'https://appcenter.intuit.com/connect/oauth2',token_endpoint:'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',revocation_endpoint:'https://developer.api.intuit.com/v2/oauth2/tokens/revoke'};
let calls,mode,refreshCount,created,tid,purchases;
const sale=(id='0b0c0d0e-1111-4222-8333-444455556666')=>({kind:'sale',status:'COMPLETED',provider:'square',currency:'USD',orderId:`cart:${id}`,transactionId:'SQPAY1',paidAt:'2026-10-07T20:00:00.000Z',
  buyerName:'Test Buyer',buyerEmail:'buyer@example.test',shippingAddress:{name:'Test Buyer',street1:'1 Main St',city:'Seattle',state:'WA',zip:'98122',country:'US'},
  items:[{id:'painting-portrait-in-gold',type:'original',title:'Dorian Nakamoto',amount:'200.00',quantity:1}],shipping:'7.41',tax:'0.00',gross:'207.41'});
const reply=(status,body)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json',intuit_tid:`tid-${++tid}`}});
beforeEach(()=>{
  calls=[];mode={};refreshCount=0;created=[];tid=0;purchases=[];
  vi.stubGlobal('fetch',vi.fn(async(input,init={})=>{
    const url=new URL(input);calls.push({url,init});
    if(url.pathname.endsWith('openid_sandbox_configuration'))return reply(200,doc);
    if(url.href===doc.token_endpoint){
      const body=new URLSearchParams(init.body);
      if(body.get('grant_type')==='refresh_token'){refreshCount++;if(mode.invalidGrant)return reply(400,{error:'invalid_grant'});return reply(200,{access_token:`A${refreshCount+1}`,refresh_token:`R${refreshCount+1}`,token_type:'bearer',expires_in:3600,x_refresh_token_expires_in:8640000});}
      return reply(200,{access_token:'A1',refresh_token:'R1',token_type:'bearer',expires_in:3600,x_refresh_token_expires_in:8640000});
    }
    if(url.href===doc.revocation_endpoint)return new Response(null,{status:200,headers:{intuit_tid:'tid-revoke'}});
    if(url.hostname==='oauth2.googleapis.com')return Response.json({access_token:'gmail'});
    if(url.hostname==='v2.api.finerworks.com'){
      mode.fwCalls=(mode.fwCalls||0)+1;
      if(url.pathname==='/v3/list_orders'){expect(init.method).toBe('POST');return Response.json(mode.fwList||{status:{success:true},orders:[]});}
      if(url.pathname==='/v3/get_order'){expect(init.method).toBe('GET');return Response.json(mode.fwOrder||{status:{success:false,message:'not found'}},{status:mode.fwOrder?200:404});}
    }
    if(url.hostname==='api.goshippo.com'){
      if(url.pathname.startsWith('/transactions/'))return Response.json({object_id:'tx_1',rate:'rate_1',status:'SUCCESS'});
      if(url.pathname.startsWith('/rates/'))return Response.json({object_id:'rate_1',amount:'21.37',currency:'USD'});
    }
    if(url.hostname==='gmail.googleapis.com'){mode.mails=(mode.mails||0)+1;return Response.json({id:'mail'});}
    if(url.hostname==='sandbox-quickbooks.api.intuit.com'){
      const path=url.pathname.replace('/v3/company/4620816365/','');
      expect(url.searchParams.get('minorversion')).toBe('75');
      if(path.startsWith('companyinfo/'))return reply(200,{CompanyInfo:{CompanyName:'Sandbox Company_US_1',Country:'US'}});
      if(path==='preferences')return reply(200,{Preferences:{CurrencyPrefs:{HomeCurrency:{value:mode.currency||'USD'},MultiCurrencyEnabled:false}}});
      if(path==='query'&&url.searchParams.get('query').includes('from Purchase'))return reply(200,{QueryResponse:mode.existingPurchase?{Purchase:[mode.existingPurchase]}:{}});
      if(path==='query'){const q=url.searchParams.get('query');const entity=q.match(/from (\w+)/)[1];if(mode.preflight&&entity==='Account'&&q.includes("'Art sales'"))return reply(200,{QueryResponse:{Account:[{Id:'81',Name:'Art sales',AccountType:'Income',AccountSubType:'SalesOfProductIncome',Active:true}]}});if(mode.preflight&&entity==='Item'&&q.includes("'Shipping'"))return reply(200,{QueryResponse:{Item:[{Id:'7',Name:'Shipping',Type:'Category',Active:true}]}});return reply(200,{QueryResponse:entity==='SalesReceipt'&&mode.existing?{SalesReceipt:[{Id:'900',DocNumber:'VA-x',PrivateNote:`order ${mode.existing}`}]}:{}});}
      if(path==='salesreceipt'){
        if(mode.transient)return reply(503,{Fault:{Error:[{Message:'Service unavailable',code:'503'}],type:'SystemFault'}});
        if(mode.validation)return reply(400,{Fault:{Error:[{Message:'A business validation error has occurred',Detail:'Business Validation Error: Unexpected Element',code:'6000'}],type:'ValidationFault'}});
        created.push({body:JSON.parse(init.body),requestid:url.searchParams.get('requestid'),auth:init.headers.Authorization});return reply(200,{SalesReceipt:{Id:String(100+created.length)}});
      }
      if(path==='purchase'){purchases.push({body:JSON.parse(init.body),requestid:url.searchParams.get('requestid')});return reply(200,{Purchase:{Id:String(500+purchases.length)}});}
      if(path==='vendor')return reply(200,{Vendor:{Id:'77'}});
      if(['customer','item','account'].includes(path))return reply(200,{[path==='customer'?'Customer':path==='item'?'Item':'Account']:{Id:String(Math.floor(Math.random()*1e6))}});
    }
    throw Error(`Unexpected request ${url.href}`);
  }));
});
afterEach(()=>vi.unstubAllGlobals());

async function connected(name=crypto.randomUUID()){
  const stub=env.QUICKBOOKS.getByName(name);
  const {url,nonce}=await stub.beginConnect();
  const auth=new URL(url);
  expect(auth.searchParams.get('scope')).toBe('com.intuit.quickbooks.accounting');
  expect(auth.searchParams.get('redirect_uri')).toBe(`${origin}/quickbooks/callback`);
  const state=auth.searchParams.get('state');
  expect(await stub.completeConnect({state,code:'CODE',realmId:'4620816365',cookieNonce:nonce})).toEqual({result:'connected'});
  // Single use: replaying the callback fails without another token exchange.
  expect(await stub.completeConnect({state,code:'CODE',realmId:'4620816365',cookieNonce:nonce})).toEqual({result:'expired'});
  return stub;
}

it('connects with signed single-use state and records a completed sale once (idempotent per order)',async()=>{
  const stub=await connected();
  const status=await stub.status();
  expect(status).toMatchObject({connected:true,companyName:'Sandbox Company_US_1',syncEnabled:true,environment:'sandbox'});
  expect(JSON.stringify(status)).not.toContain('A1');
  expect(await stub.enqueue(sale())).toEqual({queued:true,duplicate:false});
  expect(await stub.enqueue(sale())).toEqual({queued:true,duplicate:true});
  expect((await stub.queueRows())[0]).toMatchObject({paid_at:'2026-10-07T20:00:00.000Z',provider:'square',gross:'207.41'});
  expect(JSON.stringify(await stub.queueRows())).not.toContain('buyer@example.test');
  await runDurableObjectAlarm(stub);
  expect(created).toHaveLength(1);
  expect(created[0].auth).toBe('Bearer A1');
  expect(created[0].requestid).toMatch(/^[0-9a-f]{36}$/);
  expect(created[0].body).toMatchObject({DocNumber:'VA-0b0c0d0e1111422283',TxnDate:'2026-10-07',CustomerRef:{value:expect.any(String)},DepositToAccountRef:{value:expect.any(String)}});
  expect(created[0].body.Line.map(l=>l.Amount)).toEqual([200,7.41]);
  expect((await stub.queueRows())[0]).toMatchObject({status:'synced',qbo_id:'101',attempts:1});
  await stub.syncNow();
  expect(created).toHaveLength(1);
  const logs=await stub.logs();
  expect(logs.filter(l=>l.op==='create SalesReceipt')[0].intuit_tid).toMatch(/^tid-/);
  expect(logs.every(l=>!/A1|R1|test-secret/.test(JSON.stringify(l)))).toBe(true);
});
it('skips a sale already in QuickBooks after a lost response',async()=>{
  const stub=await connected();
  mode.existing='cart:0b0c0d0e-1111-4222-8333-444455556666';
  await stub.enqueue(sale());await runDurableObjectAlarm(stub);
  expect(created).toHaveLength(0);
  expect((await stub.queueRows())[0]).toMatchObject({status:'synced',qbo_id:'900'});
});
it('refreshes an expiring access token and stores the rotated refresh token',async()=>{
  const stub=await connected();
  await runInDurableObject(stub,async instance=>{const c=await instance.connection();await instance.saveConnection({...c,accessExpiresAt:Date.now()+60000});});
  await stub.enqueue(sale());await runDurableObjectAlarm(stub);
  expect(refreshCount).toBe(1);
  expect(created[0].auth).toBe('Bearer A2');
  await runInDurableObject(stub,async instance=>{expect((await instance.connection()).refreshToken).toBe('R2');});
});
it('marks the connection disconnected and alerts the owner on invalid_grant; the sale stays queued',async()=>{
  const stub=await connected();
  mode.invalidGrant=true;
  await runInDurableObject(stub,async instance=>{const c=await instance.connection();await instance.saveConnection({...c,accessExpiresAt:0});});
  await stub.enqueue(sale());await runDurableObjectAlarm(stub);
  const status=await stub.status();
  expect(status.connected).toBe(false);
  expect(status.disconnected.reason).toMatch(/expired or revoked/);
  expect(mode.mails).toBe(1);
  expect((await stub.queueRows())[0].status).toBe('queued');
  expect(created).toHaveLength(0);
});
it('backs off on transient failures and holds validation errors for review',async()=>{
  const stub=await connected();
  mode.transient=true;
  await stub.enqueue(sale());await runDurableObjectAlarm(stub);
  let row=(await stub.queueRows())[0];
  expect(row).toMatchObject({status:'queued',attempts:1});
  expect(row.next_at).toBeGreaterThan(Date.now()+50_000);
  expect(row.last_tid).toMatch(/^tid-/);
  expect(calls.filter(c=>c.url.pathname.endsWith('/salesreceipt'))).toHaveLength(3);
  mode.transient=false;mode.validation=true;
  await runInDurableObject(stub,(_,ctx)=>ctx.storage.sql.exec('UPDATE queue SET next_at=0'));
  await stub.syncNow();
  row=(await stub.queueRows())[0];
  expect(row).toMatchObject({status:'review',attempts:2});
  expect(row.last_error).toMatch(/6000/);
  expect(mode.mails).toBe(1);
  mode.validation=false;
  expect(await stub.retry(row.order_id)).toEqual({retried:true});
  await stub.syncNow();
  expect((await stub.queueRows())[0].status).toBe('synced');
});
it('refuses a non-USD company and revokes on disconnect',async()=>{
  const stub=env.QUICKBOOKS.getByName(crypto.randomUUID());
  mode.currency='CAD';
  const {url,nonce}=await stub.beginConnect();
  expect(await stub.completeConnect({state:new URL(url).searchParams.get('state'),code:'C',realmId:'4620816365',cookieNonce:nonce})).toEqual({result:'not-usd'});
  expect((await stub.status()).connected).toBe(false);
  mode.currency='USD';
  const live=await connected();
  expect(await live.disconnect('owner')).toEqual({disconnected:true});
  expect(calls.some(c=>c.url.href===doc.revocation_endpoint&&JSON.parse(c.init.body).token==='R1')).toBe(true);
  expect((await live.status()).connected).toBe(false);
});
it('owner routes: origin, manager token, and callback CSRF checks',async()=>{
  expect((await quickbooksApi(new Request('https://evil.example/quickbooks/start',{method:'POST'}),env)).status).toBe(404);
  expect((await quickbooksApi(new Request(`${origin}/quickbooks/start`,{method:'POST',headers:{Origin:origin}}),env)).status).toBe(403);
  const start=await quickbooksApi(new Request(`${origin}/quickbooks/start`,{method:'POST',headers:{Origin:origin,Authorization:`Bearer ${env.COMMISSION_MANAGER_TOKEN}`}}),env);
  expect(start.status).toBe(200);
  expect(start.headers.get('Set-Cookie')).toMatch(/^__Host-qbo-state=[A-Za-z0-9_-]{43}; Path=\/; Secure; HttpOnly; SameSite=Lax/);
  const state=new URL((await start.json()).url).searchParams.get('state');
  const forged=await quickbooksApi(new Request(`${origin}/quickbooks/callback?state=${state}&code=C&realmId=4620816365`,{headers:{Cookie:'__Host-qbo-state=wrong'}}),env);
  expect(forged.headers.get('Location')).toBe('/quickbooks/connect?result=expired');
  const page=await quickbooksApi(new Request(`${origin}/quickbooks/connect`),env);
  expect(await page.text()).toContain('Connect to QuickBooks');
});

it('preflight reports the account and item mapping without writing to QuickBooks',async()=>{
  const stub=await connected();mode.preflight=true;
  const writesBefore=calls.filter(c=>c.init.method==='POST'&&c.url.hostname.includes('quickbooks')).length;
  const r=await stub.preflight();
  expect(r).toMatchObject({company:'Sandbox Company_US_1',homeCurrency:'USD',multiCurrency:false,depositTo:{square:'Square clearing',btcpay:'Bitcoin clearing'},problems:1});
  expect(r.accounts.income).toMatchObject({id:'81',action:'use existing'});
  expect(r.accounts.square.action).toBe('will be created (Other Current Asset)');
  expect(r.items.shipping.action).toMatch(/^PROBLEM: existing item type Category/);
  expect(r.items.original.action).toBe('will be created (Service item posting to Art sales)');
  expect(calls.filter(c=>c.init.method==='POST'&&c.url.hostname.includes('quickbooks')).length).toBe(writesBefore);
  const response=await quickbooksApi(new Request(`${origin}/quickbooks/preflight`,{method:'POST',headers:{Origin:'https://evil.example',Authorization:'Bearer manager-test-token'}}),env);
  expect(response.status).toBe(403);
});

// Production costs (Purchases). The test Worker has no FinerWorks keys or cost flag, so the instance env is extended.
const ORDER='9a8b7c6d-1111-4222-8333-444455556666';
const printCost=(over={})=>({kind:'cost',type:'print',vendor:'finerworks',orderId:`cart:${ORDER}`,saleDocNumber:'VA-9a8b7c6d11114222'+'83',mode:'live',paidAt:'2026-10-02T22:48:12.197Z',
  vendorPo:`va-cart-${ORDER.replaceAll('-','')}-prints`,providerOrderId:'812345',placedAt:'2026-10-02T22:49:00.000Z',quoted:{production:'31.20',shipping:'9.95',maximum:'41.15'},items:[{id:'p1',sku:'SKU1',quantity:1,framed:true,matted:false}],...over});
const fwFound=(over={})=>({status:{success:true},orders:[{order_id:812345,order_po:`va-cart-${ORDER.replaceAll('-','')}-prints`,order_date:'2026-10-02T17:49:30-05:00',order_guid:'5465e83a-a5c3-4f9f-8345-0667f7343238',order_email:'tj@vermillionaurora.com',status:'In Production',total:43.40,...over}]});
const fwDetail={status:{success:true},order:{order_id:812345,totals:{order_subtotal:31.20,order_shipping_rate:9.95,order_discount:0,order_sales_tax:2.25,order_expedite_fee:0,order_credits_used:0,order_grand_total:43.40,
  product_pricing:[{product_qty:1,product_sku:'SKU1',product_price:18.70,add_frame_price:11.00,add_mat_1_price:1.50,add_mat_2_price:0,add_glazing_price:0,total_price:31.20}]}}};
async function costReady(stub){
  await runInDurableObject(stub,instance=>{instance.env={...instance.env,QBO_COST_SYNC_ENABLED:'true',FINERWORKS_WEB_API_KEY:'fw-web',FINERWORKS_APP_KEY:'fw-app',PAYPAL_MODE:'live'};});
  const before=created.length;
  await stub.enqueue(sale(ORDER));await runDurableObjectAlarm(stub);
  expect(created.length).toBe(before+1);
}

it('records the vendor charge as one credit-card Purchase per order, coded to cost of goods sold',async()=>{
  const stub=await connected();await costReady(stub);
  mode.fwList=fwFound();mode.fwOrder=fwDetail;
  expect(await stub.enqueueCost(printCost())).toEqual({queued:true,duplicate:false});
  expect(await stub.enqueueCost(printCost())).toEqual({queued:true,duplicate:true});
  await runDurableObjectAlarm(stub);
  expect(purchases).toHaveLength(1);
  const p=purchases[0].body;
  expect(p).toMatchObject({PaymentType:'CreditCard',EntityRef:{value:'77',type:'Vendor'},TxnDate:'2026-10-02',DocNumber:'VP-9a8b7c6d1111422283'});
  expect(p.PrivateNote).toContain('VA-9a8b7c6d1111422283');expect(p.PrivateNote).toContain('actual charge reported by FinerWorks');
  expect(p.Line.map(l=>[l.Amount,l.Description.split(' — ')[0]])).toEqual([[18.70,'Print production'],[12.50,'Framing (frame, mat, glazing)'],[2.25,'Sales tax charged by FinerWorks'],[9.95,'Print-lab shipping']]);
  expect(p.Line.every(l=>l.DetailType==='AccountBasedExpenseLineDetail'&&l.AccountBasedExpenseLineDetail.AccountRef.value)).toBe(true);
  expect(p.Line.reduce((s,l)=>s+Math.round(l.Amount*100),0)).toBe(4340);
  expect(purchases[0].requestid).toMatch(/^[0-9a-f]{36}$/);
  // Accounts and vendor were matched/created by name with the expected types.
  const accountCreates=calls.filter(c=>c.url.pathname.endsWith('/account')&&c.init.method==='POST').map(c=>JSON.parse(c.init.body));
  expect(accountCreates).toEqual(expect.arrayContaining([
    {Name:'Cost of goods sold – prints & framing',AccountType:'Cost of Goods Sold',AccountSubType:'SuppliesMaterialsCogs'},
    {Name:'Cost of goods sold – shipping',AccountType:'Cost of Goods Sold',AccountSubType:'ShippingFreightDeliveryCos'},
    {Name:'Print vendor card',AccountType:'Credit Card',AccountSubType:'CreditCard'}]));
  expect(JSON.parse(calls.find(c=>c.url.pathname.endsWith('/vendor')).init.body)).toEqual({DisplayName:'FinerWorks',CompanyName:'FinerWorks'});
  const rows=await stub.costRows();
  expect(rows[0]).toMatchObject({status:'synced',qbo_id:'501',amount:'43.40',amount_source:'actual',doc_number:'VP-9a8b7c6d1111422283'});
  expect((await stub.logs()).some(l=>l.op==='Purchase recorded'&&l.message.includes('$43.40'))).toBe(true);
  // A retried sync finds the existing Purchase and never creates a second one.
  await runInDurableObject(stub,instance=>{instance.ctx.storage.sql.exec("UPDATE costs SET status='queued'");});
  mode.existingPurchase={Id:'501',DocNumber:'VP-9a8b7c6d1111422283',PrivateNote:`... (cart:${ORDER}) ...`};
  await stub.syncNow();
  expect(purchases).toHaveLength(1);
});

it('waits for the vendor charge, then falls back to the quoted lab cost with a memo note',async()=>{
  const stub=await connected();await costReady(stub);
  await stub.enqueueCost(printCost({placedAt:new Date().toISOString()}));
  await runDurableObjectAlarm(stub);
  expect(purchases).toHaveLength(0);
  expect((await stub.costRows())[0]).toMatchObject({status:'queued',amount:null});
  const stub2=await connected();await costReady(stub2);
  await stub2.enqueueCost(printCost());
  await runDurableObjectAlarm(stub2);
  expect(purchases).toHaveLength(1);
  expect(purchases[0].body.PrivateNote).toContain('QUOTED lab cost');
  expect(purchases[0].body.Line.map(l=>l.Amount)).toEqual([31.20,9.95]);
  expect((await stub2.costRows())[0]).toMatchObject({status:'synced',amount:'41.15',amount_source:'quoted'});
});

it('uses the charged total with a quoted split when only the order total is reported',async()=>{
  const stub=await connected();await costReady(stub);
  mode.fwList=fwFound({total:42.00});
  await stub.enqueueCost(printCost());
  await runDurableObjectAlarm(stub);
  expect(purchases[0].body.Line.map(l=>l.Amount)).toEqual([32.05,9.95]);
  expect(purchases[0].body.PrivateNote).toContain('split between lines is estimated');
});

it('records Shippo label costs for originals and waits for the sale to be recorded first',async()=>{
  const stub=await connected();
  await runInDurableObject(stub,instance=>{instance.env={...instance.env,QBO_COST_SYNC_ENABLED:'true'};});
  const label={kind:'cost',type:'label',vendor:'shippo',orderId:`cart:${ORDER}`,saleDocNumber:'VA-9a8b7c6d1111422283',mode:'live',paidAt:'2026-10-02T22:48:12.197Z',placedAt:'2026-10-02T23:00:00.000Z',
    labels:[{slug:'painting-portrait-in-gold',title:'Dorian Nakamoto',transactionId:'tx_1',rateId:'rate_1',quoted:'20.00',carrier:'UPS',service:'Ground',trackingNumber:'1Z9'}]};
  await stub.enqueueCost(label);await stub.syncNow();
  expect(purchases).toHaveLength(0);
  await stub.enqueue(sale(ORDER));await stub.syncNow();
  await runInDurableObject(stub,instance=>{instance.ctx.storage.sql.exec("UPDATE costs SET next_at=0");});
  await stub.syncNow();
  expect(purchases).toHaveLength(1);
  expect(purchases[0].body).toMatchObject({DocNumber:'VL-9a8b7c6d1111422283',TxnDate:'2026-10-02'});
  expect(purchases[0].body.Line).toEqual([expect.objectContaining({Amount:21.37,Description:'Shipping label — UPS Ground — Dorian Nakamoto (tracking 1Z9)'})]);
  expect(JSON.parse(calls.find(c=>c.url.pathname.endsWith('/vendor')).init.body).DisplayName).toBe('Shippo');
});

it('previews costs read-only and backfills only synced sales through the cart order',async()=>{
  const stub=await connected('sandbox');await costReady(stub);
  mode.fwList=fwFound();mode.fwOrder=fwDetail;
  const order=env.CART_ORDERS.getByName(ORDER);
  await runInDurableObject(order,instance=>{instance.save({id:ORDER,status:'paid',mode:'live',method:'square',paidAt:'2026-10-02T22:48:12.197Z',quickbooksQueued:true,jobs:[],
    printJob:{provider:'finerworks',status:'in-production',providerId:'812345',attemptedAt:Date.parse('2026-10-02T22:49:00Z'),request:{merchantReference:`va-cart-${ORDER.replaceAll('-','')}-prints`},
      quotedProductionCost:'31.20',quotedShipping:'9.95',maximumProviderCost:'41.15',items:[{id:'p1',sku:'SKU1',quantity:1,frame:{id:1}}]}});
    instance.env={...instance.env,QBO_COST_SYNC_ENABLED:'true'};});
  const writes=()=>calls.filter(c=>c.init.method==='POST'&&c.url.hostname.includes('quickbooks')).length;
  const before=writes();
  const preview=await stub.previewCosts(`cart:${ORDER}`);
  expect(writes()).toBe(before);
  expect(preview.purchases).toEqual([expect.objectContaining({type:'print',vendor:'FinerWorks',paymentAccount:'Print vendor card',docNumber:'VP-9a8b7c6d1111422283',txnDatePT:'2026-10-02',total:'43.40',amountSource:'actual',alreadyInQuickBooks:[]})]);
  expect(preview.purchases[0].lines.map(l=>l.account)).toEqual(['Cost of goods sold – prints & framing','Cost of goods sold – prints & framing','Cost of goods sold – prints & framing','Cost of goods sold – shipping']);
  expect(await stub.backfillCosts(['cart:not-synced-order'])).toEqual({results:[{orderId:'cart:not-synced-order',error:'sale is not recorded in QuickBooks'}]});
  expect((await stub.backfillCosts([`cart:${ORDER}`])).results[0]).toMatchObject({orderId:`cart:${ORDER}`,queued:['print']});
  expect((await stub.backfillCosts([`cart:${ORDER}`])).results[0]).toMatchObject({queued:[],already:['print']});
  await stub.syncNow();
  expect(purchases).toHaveLength(1);
});

it('preflight reports the production-cost accounts and vendors',async()=>{
  const stub=await connected();
  const r=await stub.preflight();
  expect(r.productionCosts).toEqual({enabled:false,paidFrom:'Print vendor card',printVendor:'FinerWorks',labelVendor:'Shippo'});
  expect(r.accounts.cogsPrints).toMatchObject({name:'Cost of goods sold – prints & framing',action:'will be created (Cost of Goods Sold)'});
  expect(r.accounts.vendorCard.action).toBe('will be created (Credit Card)');
  expect(r.vendors.finerworks.action).toBe('will be created (Vendor)');
});
