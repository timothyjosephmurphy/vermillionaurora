import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,byId} from '../catalog/catalog.mjs';
// Apple Pay / Google Pay: wallets show the exact server quote and reuse the 'square' start path. All providers mocked.
const root=path.resolve('dist'),origin='https://vermillionaurora.com',id='painting-portrait-in-green';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[],calls=[];let order,wallets='google',appleResult='OK';
page.on('pageerror',e=>errors.push(e.message));
const product={id,title:byId[id].title,amount:byId[id].listing.price.amount,methods:['square','bitcoin'],status:'available'};
const squareScript=()=>`(()=>{const mode=${JSON.stringify(wallets)},apple=${JSON.stringify(appleResult)};window.walletRequests=[];
window.Square={payments:()=>({card:async()=>({attach:async()=>{},tokenize:async()=>({status:'OK',token:'cnon:test'})}),
 paymentRequest:r=>{window.walletRequests.push(r);return r;},
 applePay:async()=>{if(!mode.includes('apple'))throw Error('Apple Pay is not supported');return {tokenize:async()=>apple==='OK'?{status:'OK',token:'cnon:apple'}:{status:apple},destroy:async()=>{}};},
 googlePay:async()=>{if(!mode.includes('google'))throw Error('Google Pay is not supported');return {attach:async sel=>{const b=document.createElement('button');b.type='button';b.textContent='Buy with GPay';document.querySelector(sel).append(b);},tokenize:async()=>({status:'OK',token:'cnon:google'}),destroy:async()=>{}};}})};})();`;
await page.route('**/*',async route=>{
 const req=route.request(),url=new URL(req.url());
 if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
 if(url.pathname.startsWith('/checkout/cart/')){
  const action=url.pathname.split('/').at(-1),body=req.method()==='POST'?req.postDataJSON():null;calls.push({action,body});let result;
  if(action==='catalog')result={enabled:true,version:catalogVersion,products:[product],square:{applicationId:'sq0idp-test',locationId:'LOCATION',mode:'live'}};
  if(action==='hold')result={orderId:body.holdId,status:'holding',heldIds:[id],expiresAt:Date.now()+15*60*1000};
  if(action==='quote'){const base=Number(product.amount);result={orderId:body.holdId,key:body.key,expiresAt:Date.now()+10*60*1000,status:'quoted',methods:['square','bitcoin'],quote:{items:[{...product,quantity:1}],base:base.toFixed(2),shipping:'12.34',tax:'5.67',total:(base+18.01).toFixed(2),shipments:[]}};order=result;}
  if(action==='start'){assert.equal(body.key,order.key);result={...order,method:body.method,status:'settling'};order=result;}
  if(action==='status')result=order;
  if(action==='cancel'){result={...order,status:'cancelled'};order=result;}
  return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:result});
 }
 if(url.pathname==='/inventory/status')return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{availability:{[id]:'available'}}});
 if(url.hostname==='web.squarecdn.com')return route.fulfill({contentType:'application/javascript',body:squareScript()});
 if(url.hostname!==new URL(origin).hostname)return route.abort();
 const file=path.join(root,url.pathname,url.pathname.endsWith('/')?'index.html':'');
 if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream'});
 return route.fulfill({status:404});
});
const fill=async()=>{for(const [name,value] of Object.entries({email:'buyer@example.test',name:'Test Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122'}))await page.locator(`[name="${name}"]`).fill(value);};
const quote=async()=>{await page.goto(origin+'/cart/');await page.locator('.cart-line').first().waitFor();await fill();await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Shipping & tax calculated'}).waitFor();await page.getByRole('button',{name:'Pay with credit card'}).waitFor();};
const starts=()=>calls.filter(c=>c.action==='start');
try{
 await page.goto(`${origin}/products/${id}/`);await page.getByRole('button',{name:'Add to cart',exact:true}).click();await page.getByRole('button',{name:'Added to cart',exact:true}).waitFor();
 // Before a quote there is no wallet: the sheet must show the server's shipping and tax.
 await page.goto(origin+'/cart/');await page.locator('.cart-line').first().waitFor();assert(await page.locator('[data-cart-wallets]').isHidden());
 // Chromium-like: Google Pay only.
 await quote();await page.getByRole('button',{name:'Buy with GPay'}).waitFor();
 assert(await page.locator('[data-cart-wallets]').isVisible());assert.equal(await page.locator('.apple-pay-button').count(),0);
 const total=order.quote.total,requests=await page.evaluate(()=>window.walletRequests);
 assert(requests.length>=1);for(const r of requests){assert.deepEqual(r.total,{amount:total,label:'TJ Murphy'});assert.equal(r.currencyCode,'USD');assert.equal(r.countryCode,'US');
  assert.deepEqual(r.lineItems,[{label:'Artwork',amount:order.quote.base},{label:'Shipping',amount:'12.34'},{label:'Tax',amount:'5.67'}]);}
 assert(await page.getByRole('button',{name:'Pay with credit card'}).isEnabled(),'card form stays available beside wallets');
 // Changing the address invalidates the quote and removes the wallet until it is recalculated.
 await page.locator('[name="street1"]').fill('124 Main St');await page.locator('[data-cart-wallets]').waitFor({state:'hidden'});
 await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Buy with GPay'}).waitFor();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1050});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} cart overflow`);}
 fs.mkdirSync('/tmp/cart-preview',{recursive:true});await page.locator('.cart-checkout').screenshot({path:'/tmp/cart-preview/wallets-390.png'});await page.setViewportSize({width:1440,height:1100});
 // Google Pay token goes through the same 'square' start path as a card token.
 await page.getByRole('button',{name:'Buy with GPay'}).click();await page.getByRole('heading',{name:'Confirming your order'}).waitFor();
 assert.equal(starts().length,1);assert.equal(starts()[0].body.method,'square');assert.equal(starts()[0].body.sourceId,'cnon:google');assert.equal(starts()[0].body.orderId,order.orderId);
 // Safari-like: Apple Pay and Google Pay; a cancelled Apple Pay sheet starts nothing and keeps the quote.
 wallets='apple,google';appleResult='Cancel';await page.evaluate(()=>localStorage.removeItem('va-cart-order-v1'));
 order={...order,status:'cancelled'};await quote();await page.getByRole('button',{name:'Pay with Apple Pay'}).waitFor();
 assert.equal(await page.locator('[data-wallet-buttons] > *').evaluateAll(els=>els.map(e=>e.className).join(' ')).then(s=>s.indexOf('apple-pay-button')<s.indexOf('google-pay-button')),true,'Apple Pay listed first');
 const before=starts().length;await page.getByRole('button',{name:'Pay with Apple Pay'}).click();
 await page.waitForFunction(()=>/Payment cancelled/.test(document.querySelector('[data-cart-notice]')?.textContent||document.body.textContent));
 assert.equal(starts().length,before);assert(await page.getByRole('button',{name:'Pay with Apple Pay'}).isEnabled());
 appleResult='OK';await quote();await page.getByRole('button',{name:'Pay with Apple Pay'}).click();await page.getByRole('heading',{name:'Confirming your order'}).waitFor();
 assert.equal(starts().at(-1).body.sourceId,'cnon:apple');assert.equal(starts().at(-1).body.method,'square');
 // No wallet support: no express section; the card form is the fallback.
 wallets='none';order={...order,status:'cancelled'};await quote();await page.waitForTimeout(300);
 assert(await page.locator('[data-cart-wallets]').isHidden());assert(await page.getByRole('button',{name:'Pay with credit card'}).isEnabled());
 assert.deepEqual(errors,[]);
 console.log('PASS: wallets only after a server quote, exact quote total/line items, invalidation on edit, Google Pay and Apple Pay tokens via the square start path, cancel keeps the quote, card fallback. All providers mocked.');
}finally{await browser.close();}
