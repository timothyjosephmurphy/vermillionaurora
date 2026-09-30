import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import prints from '../cloudflare/print-catalog.mjs';
import {publicCartItem} from '../cloudflare/cart-policy.mjs';
const origin='https://vermillionaurora.com',root=path.resolve('dist'),id='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',key='b'.repeat(64),products=Object.values(prints).map(p=>({...publicCartItem({...p,quantity:1}),methods:['paypal'],status:'available'}));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox']});
try {
  const page=await browser.newPage(),errors=[],calls=[];let quote,captured=false;
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',async route=>{
    const u=new URL(route.request().url());
    if(u.hostname==='www.paypal.com')return route.fulfill({contentType:'text/html',body:'Real PayPal handoff (mocked)'});
    if(u.pathname.startsWith('/checkout/cart/')) {
      const action=u.pathname.split('/').at(-1),body=route.request().postDataJSON();calls.push({action,body});
      if(action==='catalog')return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{enabled:true,version:'sample-test',products}});
      if(action==='quote'){quote={items:body.items.map(i=>({...products.find(p=>p.id===i.id),quantity:i.quantity})),base:'50.00',shipping:'8.95',tax:'5.00',total:'63.95'};}
      if(action==='capture')captured=true;
      const json=action==='quote'?{orderId:id,key,status:'quoted',methods:['paypal'],quote}:action==='start'?{orderId:id,status:'pending',method:'paypal',quote,url:'https://www.paypal.com/checkoutnow?token=MOCK'}:{orderId:id,status:captured?'paid':'pending',method:'paypal',quote,...(captured?{printStatus:'in-production'}:{})};
      return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json});
    }
    if(u.hostname!==new URL(origin).hostname)return route.fulfill({json:{products:[],availability:{}}});
    const file=path.join(root,u.pathname,u.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream'});
  });
  for(const width of [1280,390]){
    await page.setViewportSize({width,height:900});await page.goto(origin+'/print-test/');await page.waitForFunction(()=>!document.querySelector('[data-print-samples] button').disabled);
    await page.waitForFunction(()=>[...document.querySelectorAll('[data-print-samples] img')].every(i=>i.complete&&i.naturalWidth===1250));
    assert.equal(await page.locator('select').count(),2);assert.equal(await page.locator('select option').count(),8);
    assert.match(await page.locator('.sample-note').textContent(),/real purchase/);assert.equal(await page.locator('img').count(),2);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`/tmp/live-print-samples-${width}.png`,fullPage:true});
  }
  await page.locator('[data-print-samples] button').click();await page.waitForURL(origin+'/cart/');await page.locator('[data-cart-form]').waitFor({state:'visible'});
  assert.equal(await page.locator('.cart-line').count(),2);assert.equal(await page.locator('.cart-line input').count(),0);assert.equal(await page.locator('.cart-line').filter({hasText:'Low-resolution sample'}).count(),2);
  for(const [name,value] of Object.entries({email:'buyer@example.test',name:'Test Buyer',street1:'600 4th Ave',city:'Seattle',state:'WA',zip:'98104'}))await page.locator(`[name="${name}"]`).fill(value);
  await page.locator('[data-cart-quote]').click();await page.locator('[data-cart-payments]').waitFor({state:'visible'});assert.match(await page.locator('[data-cart-total]').textContent(),/63.95/);
  assert(calls.find(c=>c.action==='quote').body.items.every(i=>i.quantity===1&&i.id.endsWith('-small')));
  await page.locator('[data-cart-methods] button').click();await page.waitForURL('https://www.paypal.com/**');
  await page.goto(origin+'/cart/?order='+id+'&result=return');await page.waitForFunction(()=>document.querySelector('[data-order-tracking]').textContent.includes('In production'));
  assert(calls.some(c=>c.action==='capture'&&c.body.orderId===id));
  await page.goto(origin+'/products/painting-portrait-in-green/');assert.equal(await page.locator('[data-print-options]').count(),1);assert.match(await page.locator('.print-test-note').textContent(),/low-resolution/);
  assert.deepEqual(errors,[]);console.log('PASS: sample disclosures, sizes, desktop/mobile layout, normal cart, live PayPal handoff and return; all provider calls mocked.');
}finally{await browser.close();}
