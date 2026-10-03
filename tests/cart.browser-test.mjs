import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,byId} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://vermillionaurora.com',ids=['painting-portrait-in-green','painting-portrait-in-gold'];
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[],calls=[];let order,availability='available',enabled=true,failStatus=false,startedHold=false,method='square',productMethods=['paypal','square','bitcoin'];const reservations=new Map();
page.on('pageerror',e=>errors.push(e.message));
const product=id=>({id,title:byId[id].title,amount:byId[id].listing.price.amount,methods:productMethods,status:availability});
await page.route('**/*',async route=>{
 const req=route.request(),url=new URL(req.url());
 if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
  if(url.pathname.startsWith('/checkout/cart/')){
  const action=url.pathname.split('/').at(-1);const body=req.method()==='POST'?req.postDataJSON():null;calls.push({action,body});let result;
  if(action==='catalog')result={enabled,version:catalogVersion,products:ids.map(product),square:{applicationId:'sq0idp-test',locationId:'LOCATION',mode:'live'}};
  if(action==='hold'){
   if(startedHold)return route.fulfill({status:409,headers:{'Access-Control-Allow-Origin':origin},json:{error:'Checkout has already started.',code:'CHECKOUT_STARTED'}});
   const originals=body.items.filter(i=>!i.id.startsWith('print-')).map(i=>i.id),previous=reservations.get(body.holdId)||new Set(),unavailable=availability==='available'?null:originals.find(id=>ids.includes(id)&&!previous.has(id));
   if(!unavailable)reservations.set(body.holdId,new Set(originals));
   result={orderId:body.holdId,status:unavailable?'unavailable':'holding',heldIds:unavailable?[]:originals,expiresAt:Date.now()+15*60*1000,...(unavailable?{unavailable}:{})};
  }
  if(action==='quote'){
   assert.equal(body.catalogVersion,catalogVersion);assert.equal(body.address.city,'Seattle');
   const items=body.items.map(i=>({...product(i.id),quantity:i.quantity})),base=items.reduce((s,i)=>s+Number(i.amount),0);
   result={orderId:body.holdId,key:body.key,expiresAt:Date.now()+10*60*1000,status:'quoted',methods:productMethods,quote:{items,base:base.toFixed(2),shipping:'12.00',tax:'5.00',total:(base+17).toFixed(2),shipments:items.map(i=>({id:i.id,title:i.title,shipping:'6.00',carrier:'UPS',service:'Ground'}))}};order=result;
  }
  if(action==='start'){assert.equal(body.key,order.key);method=body.method;if(method==='square')assert.equal(body.sourceId,'cnon:test');result={...order,method,status:method==='bitcoin'?'processing':'settling'};order=result;}
  if(action==='status'){if(failStatus)return route.fulfill({status:503,headers:{'Access-Control-Allow-Origin':origin},json:{error:'Payment status is temporarily unavailable. Please check again.'}});result=order;}
  if(action==='capture'){result={...order,status:'paid'};order=result;}
  if(action==='cancel'){result={...order,status:'cancelled'};order=result;}
  return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:result});
 }
 if(url.pathname==='/inventory/status')return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{availability:Object.fromEntries(url.searchParams.get('ids').split(',').map(id=>[id,availability]))}});
 if(url.hostname==='web.squarecdn.com')return route.fulfill({contentType:'application/javascript',body:"window.Square={payments:()=>({card:async()=>({attach:async()=>{},tokenize:async()=>({status:'OK',token:'cnon:test'})})})};"});
 if(url.hostname!==new URL(origin).hostname)return route.abort();
 const file=path.join(root,url.pathname,url.pathname.endsWith('/')?'index.html':'');
 if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream'});
 return route.fulfill({status:404});
});
const fill=async()=>{for(const [name,value] of Object.entries({email:'buyer@example.test',name:'Test Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122'}))await page.locator(`[name="${name}"]`).fill(value);};
const cartStored=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1')));
try{
 fs.mkdirSync('/tmp/cart-preview',{recursive:true});
 // Duplicate additions remain one original and the cart survives navigation/reload.
 for(const id of ids){await page.goto(`${origin}/products/${id}/`);await page.getByRole('button',{name:'Add to cart',exact:true}).click();await page.getByRole('button',{name:'Added to cart',exact:true}).click();}
 assert.equal((await cartStored()).length,2);
 await page.goto(origin+'/cart/');await page.locator('.cart-line').nth(1).waitFor();await page.reload();await page.locator('.cart-line').nth(1).waitFor();
 assert.equal(await page.locator('[data-cart-count]').textContent(),'2');await page.getByRole('button',{name:'Pay with credit card'}).waitFor();assert(await page.getByRole('button',{name:'Pay with credit card'}).isDisabled());assert.equal(await page.getByRole('button',{name:'Pay with credit card'}).evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(222, 219, 215)');assert(await page.getByRole('button',{name:'Calculate shipping & tax'}).isDisabled(),'quote waits for required delivery details');
 assert.equal(await page.getByRole('button',{name:'Continue with PayPal'}).count(),0);
 await fill();assert(await page.getByRole('button',{name:'Calculate shipping & tax'}).isEnabled(),'valid delivery details activate the quote button');await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Shipping & tax calculated'}).waitFor();await page.getByRole('button',{name:'Pay with credit card'}).waitFor();assert(await page.getByRole('button',{name:'Pay with credit card'}).isEnabled());assert(await page.getByRole('button',{name:'Shipping & tax calculated'}).isDisabled());
 assert.equal(await page.getByRole('button',{name:'Continue with PayPal'}).count(),0);
 for(const width of [1440,390]){await page.setViewportSize({width,height:1050});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} cart overflow`);await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>scrollY===0);await page.screenshot({path:`/tmp/cart-preview/cart-${width}.png`,fullPage:true});}
 // Editing the address invalidates the quote; payment stays visible but gray until recalculated.
 await page.locator('[name="street1"]').fill('124 Main St');assert(await page.locator('[data-cart-payments]').isVisible());assert(await page.getByRole('button',{name:'Pay with credit card'}).isDisabled());await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Shipping & tax calculated'}).waitFor();await page.getByRole('button',{name:'Pay with credit card'}).click();
 await page.getByRole('heading',{name:'Confirming your order'}).waitFor();assert.equal(calls.filter(c=>c.action==='start').length,1);
 await page.reload();await page.locator('.cart-line').nth(1).waitFor();assert.equal(await page.locator('.cart-line').count(),2,'The cart stays visible while an earlier order is pending.');await page.getByRole('link',{name:'Review existing order'}).click();await page.getByRole('heading',{name:'Confirming your order'}).waitFor();
 order={...order,status:'paid'};await page.getByRole('button',{name:'Check payment status'}).click();await page.getByRole('heading',{name:'Thank you for collecting my work.'}).waitFor();assert.deepEqual(await cartStored(),[]);await page.screenshot({path:'/tmp/cart-preview/confirmation-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Return to cart'}).click();await page.getByRole('heading',{name:'A place for the work you love.'}).waitFor();
 // Invalid persisted data cannot inject markup or alter quantities/prices.
 await page.evaluate(()=>localStorage.setItem('va-cart-v1',JSON.stringify([{id:'<script>alert(1)</script>',quantity:1},{id:'painting-portrait-in-green',quantity:99},{id:'painting-portrait-in-green',quantity:1,amount:'.01'}])));await page.reload();await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line').count(),1);assert.match(await page.locator('.cart-line-price').textContent(),/20.00/);
 availability='sold';await page.reload();await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line-unavailable').count(),0,'The active reservation keeps the original available in this cart despite later inventory changes.');await page.getByRole('button',{name:'Remove Chase Toole'}).click();await page.getByRole('heading',{name:'A place for the work you love.'}).waitFor();availability='available';
 // A lone item keeps the expedited one-item checkout.
 await page.evaluate(id=>localStorage.setItem('va-cart-v1',JSON.stringify([{id,quantity:1}])),ids[0]);
 await page.goto(`${origin}/products/${ids[0]}/`);
 const buyNow=page.getByRole('button',{name:'Buy now',exact:true});await buyNow.waitFor();
 const buyBounds=await buyNow.boundingBox(),titleBounds=await page.locator('.product-summary h1').boundingBox();
 assert(buyBounds.y>=titleBounds.y+titleBounds.height,'Buy now appears below the artwork title');
 assert.equal(await buyNow.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(211, 66, 32)','Buy now is vermilion orange');
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1050});
  const button=await buyNow.boundingBox(),price=page.locator('[data-original-purchase] .product-detail-price'),bounds=await price.boundingBox();
  assert.equal(await page.locator('.product-detail-price').count(),1,'The original price appears once');
  assert(bounds.y>=button.y+button.height&&bounds.y<button.y+button.height+16,`${width}: original price sits directly below Buy now`);
  const priceCenter=await price.evaluate(el=>{const range=document.createRange();range.selectNodeContents(el);const r=range.getBoundingClientRect();return r.x+r.width/2;});
  assert(Math.abs(priceCenter-(button.x+button.width/2))<2,`${width}: original price is centered beneath Buy now`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width}: product page fits the viewport`);
  await page.locator('.product-purchase-actions').screenshot({path:`/tmp/cart-preview/original-price-${width}.png`});
 }
 await buyNow.click();await page.waitForURL(origin+'/cart/?buy='+ids[0]);
 await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line').count(),1);assert.equal(await page.locator('[data-cart-notice]').textContent().then(text=>text.trim()),'','No one-item explanatory banner is shown');assert.equal(await page.getByRole('link',{name:'View full cart'}).count(),0);
 // When a different item is already saved, Buy Now opens the entire cart.
 await page.evaluate(ids=>localStorage.setItem('va-cart-v1',JSON.stringify(ids.map(id=>({id,quantity:1})))),ids);
 await page.goto(`${origin}/products/${ids[0]}/`);
 await page.getByRole('button',{name:'Buy now',exact:true}).click();await page.waitForURL(origin+'/cart/');
 await page.locator('.cart-line').nth(1).waitFor();assert.equal(await page.locator('.cart-line').count(),2);
 assert.deepEqual((await cartStored()).map(i=>i.id),ids);
 await fill();await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Shipping & tax calculated'}).waitFor();
 assert.equal(calls.filter(c=>c.action==='quote').at(-1).body.items.length,2,'Buy Now with other saved items quotes the full cart');
 await page.getByRole('button',{name:'Pay with Bitcoin'}).click();await page.getByRole('heading',{name:'Bitcoin payment received'}).waitFor();assert.equal((await cartStored()).length,2);
 order={...order,status:'paid'};await page.getByRole('button',{name:'Check payment status'}).click();await page.getByRole('heading',{name:'Thank you for collecting my work.'}).waitFor();assert.deepEqual(await cartStored(),[]);
 // A pending Chase attempt must not silently discard Dorian or disable Buy now.
 startedHold=true;
 await page.evaluate(id=>localStorage.setItem('va-cart-v1',JSON.stringify([{id,quantity:1}])),ids[0]);
 await page.goto(`${origin}/products/${ids[1]}/`);
 await page.getByRole('button',{name:'Add to cart',exact:true}).click();
 await page.getByText('Added locally. Finish the current checkout before reserving or paying for another order.').waitFor();
 assert.deepEqual((await cartStored()).map(i=>i.id),ids);
 await page.getByRole('button',{name:'Buy now',exact:true}).click();await page.waitForURL(origin+'/cart/');
 assert.deepEqual((await cartStored()).map(i=>i.id),ids);
 startedHold=false;
 productMethods=[];await page.evaluate(id=>localStorage.setItem('va-cart-v1',JSON.stringify([{id,quantity:1}])),ids[0]);await page.goto(origin+'/cart/');await page.locator('.cart-line').waitFor();await fill();assert(await page.getByRole('button',{name:'Calculate shipping & tax'}).isEnabled(),'payment-method availability does not block a shipping/tax quote');
 assert.deepEqual(errors,[]);console.log('PASS: cart quote activates only after valid address entry, remains independent of payment-method availability, and existing desktop/mobile checkout behavior passes.');
}finally{await browser.close();}
