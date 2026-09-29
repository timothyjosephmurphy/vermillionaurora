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
 assert.equal(await page.locator('[data-cart-count]').textContent(),'2');await fill();await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Continue with PayPal'}).waitFor();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1050});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} cart overflow`);await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>scrollY===0);await page.screenshot({path:`/tmp/cart-preview/cart-${width}.png`,fullPage:true});}
 // Editing the address invalidates the accepted quote and hides payment controls.
 await page.locator('[name="street1"]').fill('124 Main St');assert(await page.locator('[data-cart-payments]').isHidden());await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Continue with PayPal'}).click();
 await page.getByRole('heading',{name:'Confirming your payment'}).waitFor();assert.equal(calls.filter(c=>c.action==='start').length,1);
 await page.reload();await page.getByRole('heading',{name:'Confirming your payment'}).waitFor();
 order={...order,status:'paid'};await page.getByRole('button',{name:'Check payment status'}).click();await page.getByRole('heading',{name:'Thank you for collecting my work.'}).waitFor();assert.deepEqual(await cartStored(),[]);await page.screenshot({path:'/tmp/cart-preview/confirmation-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Return to cart'}).click();await page.getByRole('heading',{name:'A place for the work you love.'}).waitFor();
 // Invalid persisted data cannot inject markup or alter quantities/prices.
 await page.evaluate(()=>localStorage.setItem('va-cart-v1',JSON.stringify([{id:'<script>alert(1)</script>',quantity:1},{id:'painting-portrait-in-green',quantity:99},{id:'painting-portrait-in-green',quantity:1,amount:'.01'}])));await page.reload();await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line').count(),1);assert.match(await page.locator('.cart-line-price').textContent(),/20.00/);
 availability='sold';await page.reload();await page.getByText('Sold',{exact:true}).waitFor();assert(await page.getByRole('button',{name:'Calculate shipping & tax'}).isDisabled());await page.getByRole('button',{name:'Remove Chase Toole'}).click();await page.getByRole('heading',{name:'A place for the work you love.'}).waitFor();availability='available';
 // Buy now buys just that artwork without dropping other cart selections.
 await page.evaluate(ids=>localStorage.setItem('va-cart-v1',JSON.stringify(ids.map(id=>({id,quantity:1})))),ids);
 await page.goto(origin+'/cart/?buy='+ids[0]);await page.locator('.cart-line').waitFor();assert.equal(await page.locator('.cart-line').count(),1);await fill();await page.getByRole('button',{name:'Calculate shipping & tax'}).click();await page.getByRole('button',{name:'Pay with Bitcoin / Lightning'}).click();await page.getByRole('heading',{name:'Bitcoin payment received'}).waitFor();assert.equal((await cartStored()).length,2);
 order={...order,status:'paid'};await page.getByRole('button',{name:'Check payment status'}).click();await page.getByRole('heading',{name:'Thank you for collecting my work.'}).waitFor();assert.deepEqual((await cartStored()).map(i=>i.id),[ids[1]]);
 assert.deepEqual(errors,[]);console.log('PASS: desktop/mobile cart, persistent selections, quantity-one originals, invalidation, payment recovery, receipt, unavailable stock, corrupted storage, and Buy now preserving other selections.');
}finally{await browser.close();}
