// International shipping (TJ, Oct 21 2026): country selector, region and postal rules per country, DDU note,
// and the chosen country reaches the quote and the Square billing contact. All providers are mocked; no payment is made.
import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,byId} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://vermillionaurora.com',painting='painting-portrait-in-green';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']}:{})});
const page=await browser.newPage({viewport:{width:1280,height:1100}}),errors=[],quotes=[];
page.on('pageerror',e=>errors.push(e.message));
const product={id:painting,title:byId[painting].title,amount:byId[painting].listing.price.amount,methods:['bitcoin','square'],status:'available'};
await page.route('**/*',async route=>{
  const req=route.request(),url=new URL(req.url()),cors={'Access-Control-Allow-Origin':origin};
  if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{...cors,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
  if(url.pathname.startsWith('/checkout/cart/')){
    const action=url.pathname.split('/').at(-1),body=req.method()==='POST'?req.postDataJSON():null;let result={};
    if(action==='catalog')result={enabled:true,version:catalogVersion,products:[product],square:{applicationId:'sq0idp-test',locationId:'LOCATION',mode:'live',country:'US'}};
    if(action==='hold')result={orderId:body.holdId,status:'holding',heldIds:[],expiresAt:Date.now()+9e5};
    if(action==='quote'){quotes.push(body);result={orderId:body.holdId,key:body.key,expiresAt:Date.now()+6e5,status:'quoted',methods:['bitcoin','square'],quote:{items:[product],base:product.amount,shipping:'48.00',tax:'0.00',total:(Number(product.amount)+48).toFixed(2)}};}
    return route.fulfill({headers:cors,json:result});
  }
  if(url.pathname==='/inventory/status')return route.fulfill({headers:cors,json:{availability:{[painting]:'available'}}});
  if(url.hostname==='web.squarecdn.com')return route.fulfill({contentType:'application/javascript',body:"window.Square={payments:()=>({card:async()=>({attach:async()=>{},tokenize:async(v)=>{window.__tokenized=v;return {status:'OK',token:'cnon:test'};}})})};"});
  if(url.hostname!==new URL(origin).hostname)return route.abort();
  const file=path.join(root,url.pathname,url.pathname.endsWith('/')?'index.html':'');
  if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream'});
  return route.fulfill({status:404});
});
try{
  await page.goto(`${origin}/cart/?buy=${painting}`);
  const country=page.locator('select[name="country"]');await country.waitFor();
  assert.equal(await country.inputValue(),'US');
  for(const code of ['CU','IR','KP','SY','RU','BY'])assert.equal(await page.locator(`select[name="country"] option[value="${code}"]`).count(),0,`${code} is not offered`);
  for(const code of ['CA','GB','DE','AU'])assert.equal(await page.locator(`select[name="country"] option[value="${code}"]`).count(),1);
  assert.equal(await page.locator('[data-cart-duties]').isHidden(),true,'no duties note for US delivery');
  await page.fill('input[name="email"]','buyer@example.com');await page.fill('input[name="name"]','Test Buyer');
  await page.fill('input[name="street1"]','301 Front St W');await page.fill('input[name="city"]','Toronto');
  await country.selectOption('CA');
  assert.match(await page.locator('[data-cart-region-label]').textContent(),/Province/);
  assert.match(await page.locator('[data-cart-postal-label]').textContent(),/Postal code/);
  assert.equal(await page.locator('[data-cart-duties]').isVisible(),true,'duties note shows for international delivery');
  assert.match(await page.locator('[data-cart-duties]').textContent(),/USD.*duties/s);
  await page.fill('input[name="state"]','ZZ');await page.fill('input[name="zip"]','M5V 2T6');
  assert.equal(await page.locator('input[name="state"]').evaluate(e=>e.checkValidity()),false,'unknown province is invalid');
  await page.fill('input[name="state"]','ON');await page.fill('input[name="zip"]','12345');
  assert.equal(await page.locator('input[name="zip"]').evaluate(e=>e.checkValidity()),false,'US ZIP is not a Canadian postal code');
  await page.fill('input[name="zip"]','M5V 2T6');
  await page.getByRole('button',{name:/Calculate shipping/}).click();
  await page.waitForFunction(()=>document.querySelector('[data-cart-total]')?.textContent?.includes('$'));
  await page.waitForTimeout(300);
  const q=quotes.at(-1);assert.equal(q.address.country,'CA');assert.equal(q.address.state,'ON');assert.equal(q.address.zip,'M5V 2T6');
  await country.selectOption('GB');
  assert.match(await page.locator('[data-cart-region-label]').textContent(),/optional/);
  assert.equal(await page.locator('input[name="state"]').evaluate(e=>e.required),false,'UK county is optional');
  assert.deepEqual(errors,[]);
  console.log('PASS: country selector (US default, sanctioned destinations absent), per-country region/postal rules, DDU note, country sent with the quote. All providers mocked.');
}finally{await browser.close();}
