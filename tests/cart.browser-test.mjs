import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,byId} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://vermillionaurora.com',ids=['painting-portrait-in-green','painting-portrait-in-gold'];
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[],calls=[];let order,availability='available',enabled=true,failStatus=false,method='paypal';
page.on('pageerror',e=>errors.push(e.message));
const product=id=>({id,title:byId[id].title,amount:byId[id].listing.price.amount,methods:['paypal','bitcoin'],status:availability});
await page.route('**/*',async route=>{
 const req=route.request(),url=new URL(req.url());
 if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
 if(url.pathname.startsWith('/checkout/cart/')){
  const action=url.pathname.split('/').at(-1);const body=req.method()==='POST'?req.postDataJSON():null;calls.push({action,body});let result;
  if(action==='catalog')result={enabled,version:catalogVersion,products:ids.map(product)};
  if(action==='quote'){
   assert.equal(body.catalogVersion,catalogVersion);assert.equal(body.address.city,'Seattle');
   const items=body.items.map(i=>({...product(i.id),quantity:i.quantity})),base=items.reduce((s,i)=>s+Number(i.amount),0);
   result={orderId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',key:'a'.repeat(64),status:'quoted',methods:['paypal','bitcoin'],quote:{items,base:base.toFixed(2),shipping:'12.00',tax:'5.00',total:(base+17).toFixed(2),shipments:items.map(i=>({id:i.id,title:i.title,shipping:'6.00',carrier:'UPS',service:'Ground'}))}};order=result;
  }
  if(action==='start'){assert.equal(body.key,'a'.repeat(64));method=body.method;result={...order,method,status:method==='bitcoin'?'processing':'capturing'};order=result;}
  if(action==='status'){if(failStatus)return route.fulfill({status:503,headers:{'Access-Control-Allow-Origin':origin},json:{error:'Payment status is temporarily unavailable. Please check again.'}});result=order;}
  if(action==='capture'){result={...order,status:'paid'};order=result;}
  if(action==='cancel'){result={...order,status:'cancelled'};order=result;}
  return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:result});
 }
 if(url.pathname==='/inventory/status')return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{availability:Object.fromEntries(url.searchParams.get('ids').split(',').map(id=>[id,availability]))}});
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
 assert.equal(await page.locator('[data-cart-count]').textContent(),'2');await page.getByRole('button',{name:'Continue with PayPal'}).waitFor();assert(await page.getByRole('button',{name:'Continue with PayPal'}).isDisabled());assert.equal(await page.getByRole('button',{name:'Continue with PayPal'}).evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(222, 219, 215)');
 await fill();await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Continue with PayPal'}).waitFor();assert(await page.getByRole('button',{name:'Continue with PayPal'}).isEnabled());assert(await page.getByRole('button',{name:'Shipping & tax calculated'}).isDisabled());
 for(const width of [1440,390]){await page.setViewportSize({width,height:1050});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} cart overflow`);await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>scrollY===0);await page.screenshot({path:`/tmp/cart-preview/cart-${width}.png`,fullPage:true});}
 // Editing the address invalidates the quote; payment stays visible but gray until recalculated.
 await page.locator('[name="street1"]').fill('124 Main St');assert(await page.locator('[data-cart-payments]').isVisible());assert(await page.getByRole('button',{name:'Continue with PayPal'}).isDisabled());await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Continue with PayPal'}).click();
 await page.getByRole('heading',{name:'Confirming your payment'}).waitFor();assert.equal(calls.filter(c=>c.action==='start').length,1);
 await page.reload();await page.locator('.cart-line').nth(1).waitFor();assert.equal(await page.locator('.cart-line').count(),2,'The cart stays visible while an earlier order is pending.');await page.getByRole('link',{name:'Review existing order'}).click();await page.getByRole('heading',{name:'Confirming your payment'}).waitFor();
 order={...order,status:'paid'};await page.getByRole('button',{name:'Check payment status'}).click();await page.getByRole('heading',{name:'Thank you for collecting my work.'}).waitFor();assert.deepEqual(await cartStored(),[]);await page.screenshot({path:'/tmp/cart-preview/confirmation-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Return to cart'}).click();await page.getByRole('heading',{name:'A place for the work you love.'}).waitFor();
 // Invalid persisted data cannot inject markup or alter quantities/prices.
 await page.evaluate(()=>localStorage.setItem('va-cart-v1',JSON.stringify([{id:'<script>alert(1)</script>',quantity:1},{id:'painting-portrait-in-green',quantity:99},{id:'painting-portrait-in-green',quantity:1,amount:'.01'}])));await page.reload();await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line').count(),1);assert.match(await page.locator('.cart-line-price').textContent(),/20.00/);
 availability='sold';await page.reload();await page.getByText('Sold',{exact:true}).waitFor();assert(await page.getByRole('button',{name:'Calculate shipping & tax'}).isDisabled());await page.getByRole('button',{name:'Remove Chase Toole'}).click();await page.getByRole('heading',{name:'A place for the work you love.'}).waitFor();availability='available';
 // Buy now buys just that artwork without dropping other cart selections.
 await page.evaluate(ids=>localStorage.setItem('va-cart-v1',JSON.stringify(ids.map(id=>({id,quantity:1})))),ids);
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
 await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line').count(),1);assert.match(await page.locator('[data-cart-notice]').textContent(),/one-item checkout/i);await fill();await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Pay with Bitcoin / Lightning'}).click();await page.getByRole('heading',{name:'Bitcoin payment received'}).waitFor();assert.equal((await cartStored()).length,2);
 order={...order,status:'paid'};await page.getByRole('button',{name:'Check payment status'}).click();await page.getByRole('heading',{name:'Thank you for collecting my work.'}).waitFor();assert.deepEqual((await cartStored()).map(i=>i.id),[ids[1]]);
 assert.deepEqual(errors,[]);console.log('PASS: desktop/mobile cart, persistent selections, quantity-one originals, invalidation, payment recovery, receipt, unavailable stock, corrupted storage, and Buy now preserving other selections.');
}finally{await browser.close();}
