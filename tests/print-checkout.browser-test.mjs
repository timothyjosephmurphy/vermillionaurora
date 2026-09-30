import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {printTestPage} from '../cloudflare/print-test-page.mjs';
import prints from '../cloudflare/print-catalog.mjs';
const origin='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev',id='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',key='b'.repeat(64);
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
 const page=await browser.newPage({viewport:{width:1100,height:900}}),requests=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.hostname==='www.sandbox.paypal.com')return route.fulfill({contentType:'text/html',body:'Sandbox PayPal handoff'});
   if(u.pathname==='/checkout/print-test'||u.pathname==='/cart/')return route.fulfill({contentType:'text/html',body:printTestPage});
   const action=u.pathname.split('/').at(-1),body=route.request().postDataJSON();requests.push({action,body});
   let json;
   if(action==='catalog')json={enabled:true,version:'test',products:Object.values(prints).map(p=>({...p,methods:['paypal'],status:'available'}))};
   else if(action==='quote')json={orderId:id,key,quote:{base:'50.00',shipping:'8.95',tax:'5.00',total:'63.95'}};
   else if(action==='start')json={url:'https://www.sandbox.paypal.com/checkoutnow?token=TEST'};
   else json={orderId:id,status:'paid',printStatus:'test-complete'};
   return route.fulfill({json});
 });
 await page.goto(origin+'/checkout/print-test');await page.waitForFunction(()=>!document.querySelector('#quote').disabled);
 assert.equal(await page.locator('#choices select').count(),2);
 assert.equal(await page.locator('#choices select option').count(),8);
 for(const [name,value] of Object.entries({email:'buyer@example.test',name:'Test Buyer',street1:'123 Test St',city:'Seattle',state:'WA',zip:'98122'}))await page.locator(`[name="${name}"]`).fill(value);
 await page.locator('#quote').click();await page.locator('#pay').waitFor({state:'visible'});assert.match(await page.locator('#status').textContent(),/63.95/);
 const quote=requests.find(r=>r.action==='quote').body;assert.equal(quote.items.length,2);assert(quote.items.every(i=>i.quantity===1&&i.id.endsWith('-small')));
 await page.screenshot({path:'/tmp/print-checkout-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:'/tmp/print-checkout-mobile.png',fullPage:true});
 await page.locator('#pay').click();await page.waitForURL('https://www.sandbox.paypal.com/**');
 await page.goto(origin+'/cart/?order='+id+'&result=return');await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Test order accepted'));
 assert(requests.some(r=>r.action==='capture'&&r.body.orderId===id&&r.body.key===key));assert.deepEqual(errors,[]);
 console.log('PASS: both print selections, combined quote, sandbox PayPal handoff, capture return, order status and mobile layout (mock provider responses).');
}finally{await browser.close();}
