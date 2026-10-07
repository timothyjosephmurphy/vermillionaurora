import {env} from 'cloudflare:workers';
import {runInDurableObject,runDurableObjectAlarm} from 'cloudflare:test';
import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {quickbooksApi} from '../quickbooks-api.mjs';

const origin='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const doc={authorization_endpoint:'https://appcenter.intuit.com/connect/oauth2',token_endpoint:'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',revocation_endpoint:'https://developer.api.intuit.com/v2/oauth2/tokens/revoke'};
let calls,mode,refreshCount,created,tid;
const sale=(id='0b0c0d0e-1111-4222-8333-444455556666')=>({kind:'sale',status:'COMPLETED',provider:'square',currency:'USD',orderId:`cart:${id}`,transactionId:'SQPAY1',paidAt:'2026-10-07T20:00:00.000Z',
  buyerName:'Test Buyer',buyerEmail:'buyer@example.test',shippingAddress:{name:'Test Buyer',street1:'1 Main St',city:'Seattle',state:'WA',zip:'98122',country:'US'},
  items:[{id:'painting-portrait-in-gold',type:'original',title:'Dorian Nakamoto',amount:'200.00',quantity:1}],shipping:'7.41',tax:'0.00',gross:'207.41'});
const reply=(status,body)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json',intuit_tid:`tid-${++tid}`}});
beforeEach(()=>{
  calls=[];mode={};refreshCount=0;created=[];tid=0;
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
    if(url.hostname==='gmail.googleapis.com'){mode.mails=(mode.mails||0)+1;return Response.json({id:'mail'});}
    if(url.hostname==='sandbox-quickbooks.api.intuit.com'){
      const path=url.pathname.replace('/v3/company/4620816365/','');
      expect(url.searchParams.get('minorversion')).toBe('75');
      if(path.startsWith('companyinfo/'))return reply(200,{CompanyInfo:{CompanyName:'Sandbox Company_US_1',Country:'US'}});
      if(path==='preferences')return reply(200,{Preferences:{CurrencyPrefs:{HomeCurrency:{value:mode.currency||'USD'},MultiCurrencyEnabled:false}}});
      if(path==='query'){const q=url.searchParams.get('query');const entity=q.match(/from (\w+)/)[1];return reply(200,{QueryResponse:entity==='SalesReceipt'&&mode.existing?{SalesReceipt:[{Id:'900',DocNumber:'VA-x',PrivateNote:`order ${mode.existing}`}]}:{}});}
      if(path==='salesreceipt'){
        if(mode.transient)return reply(503,{Fault:{Error:[{Message:'Service unavailable',code:'503'}],type:'SystemFault'}});
        if(mode.validation)return reply(400,{Fault:{Error:[{Message:'A business validation error has occurred',Detail:'Business Validation Error: Unexpected Element',code:'6000'}],type:'ValidationFault'}});
        created.push({body:JSON.parse(init.body),requestid:url.searchParams.get('requestid'),auth:init.headers.Authorization});return reply(200,{SalesReceipt:{Id:String(100+created.length)}});
      }
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
