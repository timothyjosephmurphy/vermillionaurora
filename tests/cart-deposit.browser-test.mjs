// Commission deposits (TJ, Oct 20 2026): no delivery address, no sales tax; the card form shows the exact deposit total.
// A painting in the cart still asks for the full address and the shipping & tax quote (see cart.browser-test.mjs).
import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,byId} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://vermillionaurora.com',deposit='deposit-single-portrait-7-5x12-1f',painting='painting-portrait-in-green';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']}:{})});
const page=await browser.newPage({viewport:{width:1280,height:1100}}),errors=[],calls=[];let order;
page.on('pageerror',e=>errors.push(e.message));
const products=[{id:deposit,type:'deposit',title:'Commission deposit – Portrait 1 face, 7.5 × 12 in (50%)',amount:'50.00',status:'available',methods:['bitcoin','square'],commission:{packageTitle:'Portrait 1 face, 7.5 × 12 in'}},
  {id:painting,title:byId[painting].title,amount:byId[painting].listing.price.amount,methods:['bitcoin','square'],status:'available'}];
await page.route('**/*',async route=>{
  const req=route.request(),url=new URL(req.url()),cors={'Access-Control-Allow-Origin':origin};
  if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{...cors,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
  if(url.pathname.startsWith('/checkout/cart/')){
    const action=url.pathname.split('/').at(-1),body=req.method()==='POST'?req.postDataJSON():null;calls.push({action,body});let result;
    if(action==='catalog')result={enabled:true,version:catalogVersion,products,square:{applicationId:'sq0idp-test',locationId:'LOCATION',mode:'live'}};
    if(action==='hold')result={orderId:body.holdId,status:'holding',heldIds:[],expiresAt:Date.now()+9e5};
    if(action==='quote'){
      const dep=body.items.every(i=>i.id.startsWith('deposit-'));
      result={orderId:body.holdId,key:body.key,expiresAt:Date.now()+6e5,status:'quoted',methods:['bitcoin','square'],quote:dep?{items:[products[0]],base:'50.00',shipping:'0.00',tax:'0.00',total:'50.00'}:{items:[products[1]],base:products[1].amount,shipping:'12.00',tax:'5.00',total:(Number(products[1].amount)+17).toFixed(2)}};order=result;
    }
    if(action==='start'){assert.equal(body.sourceId,'cnon:test');result={...order,method:'square',status:'capturing'};order=result;}
    if(action==='status')result={...order,status:'paid'};
    return route.fulfill({headers:cors,json:result||{}});
  }
  if(url.pathname==='/inventory/status')return route.fulfill({headers:cors,json:{availability:{[painting]:'available'}}});
  if(url.hostname==='web.squarecdn.com')return route.fulfill({contentType:'application/javascript',body:"window.Square={payments:()=>({card:async()=>({attach:async()=>{},tokenize:async(v)=>{window.__tokenized=v;return {status:'OK',token:'cnon:test'};}})})};"});
  if(url.hostname!==new URL(origin).hostname)return route.abort();
  const file=path.join(root,url.pathname,url.pathname.endsWith('/')?'index.html':'');
  if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream'});
  return route.fulfill({status:404});
});
try{
  await page.goto(`${origin}/cart/?buy=${deposit}`);
  const card=page.getByRole('button',{name:'Pay with credit card'});await card.waitFor();
  await page.waitForFunction(()=>!document.querySelector('[data-square-card-box]')?.hidden);
  assert.equal(await card.isDisabled(),false,'deposit payment is ready without an address step');
  assert.equal(await page.locator('[data-cart-total]').textContent(),'$50.00');
  assert.equal(await page.locator('[data-cart-tax]').textContent(),'$0.00');
  for(const name of ['name','street1','city','state','zip'])assert.equal(await page.locator(`[name="${name}"]`).isVisible(),false,`${name} hidden for a deposit`);
  assert.equal(await page.getByRole('button',{name:'Calculate shipping & tax'}).isVisible(),false);
  assert.equal(await page.locator('[name="email"]').isVisible(),true);
  await card.click();assert.equal(calls.filter(c=>c.action==='quote').length,0,'email is still required');
  await page.locator('[name="email"]').fill('client@example.test');await card.click();
  await page.waitForFunction(()=>window.__tokenized);
  const q=calls.find(c=>c.action==='quote');assert.equal(q.body.items[0].id,deposit);assert.equal(q.body.address.street1,'');
  assert.equal(await page.evaluate(()=>window.__tokenized.amount),'50.00','Square charges exactly the deposit');
  assert.equal(calls.filter(c=>c.action==='start').length,1);
  // A painting still needs the delivery address and a shipping & tax quote before payment.
  await page.evaluate(()=>localStorage.clear());calls.length=0;
  await page.goto(`${origin}/cart/?buy=${painting}`);
  const quoteButton=page.getByRole('button',{name:'Calculate shipping & tax'});await quoteButton.waitFor();
  assert.equal(await page.locator('[name="street1"]').isVisible(),true);
  assert(await page.getByRole('button',{name:'Pay with credit card'}).isDisabled());
  assert.equal(await page.locator('[data-cart-total]').textContent(),'—');
  assert.deepEqual(errors,[]);
  console.log('PASS: deposit checkout skips the address and tax; painting checkout still requires both');
}finally{await browser.close();}
