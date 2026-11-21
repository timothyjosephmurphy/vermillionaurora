// Key buyer flows on every engine: Chromium, Firefox, WebKit desktop (Safari) and WebKit iPhone.
// Each press is a real pointer or touch press (not Enter, not element.click()), because the bugs this
// guards against only show up there: a field's change event fires on blur during the press, the page
// re-renders, the pressed element is replaced, and the browser drops the click. Safari dropped the
// Calculate shipping & tax click for weeks (#844) while Chromium-only tests passed.
// Checkout, hold, quote and payment calls are all mocked. Nothing reaches FinerWorks, Square or BTCPay.
// PW_ENGINE=chromium|firefox|webkit limits the run to one engine (tests/run-browser.mjs --engine=...).
import {chromium,firefox,webkit,devices} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import prints,{printVersion} from '../cloudflare/print-catalog.mjs';
import {publicCartItem} from '../cloudflare/cart-policy.mjs';

const root=path.resolve('dist'),origin='https://vermillionaurora.com';
const productSlug='honeybadger-and-cub-with-genesis-block',bookId='watercolor-portraits';
const catalogFile=JSON.parse(fs.readFileSync(path.join(root,'catalog/products.json'),'utf8'));
const book=catalogFile.products.find(p=>p.id===bookId);assert(book,`${bookId} is in dist/catalog/products.json`);
const printOptions=Object.values(prints).filter(p=>p.productId===productSlug&&!p.frame&&!p.mat);
assert(printOptions.length>=2,`${productSlug} has at least two unframed print sizes`);
const products=[
  ...Object.values(prints).filter(p=>p.productId===productSlug).map(p=>({...publicCartItem({...p,quantity:1}),status:'available',methods:['square','bitcoin']})),
  {...book,amount:book.amount||book.listing?.price?.amount,type:'book',status:'available',methods:['square','bitcoin']},
];
const profiles=[
  {name:'chromium desktop',type:chromium,context:{viewport:{width:1366,height:900}}},
  {name:'firefox desktop',type:firefox,context:{viewport:{width:1366,height:900}}},
  {name:'webkit desktop (Safari)',type:webkit,context:{viewport:{width:1366,height:900}}},
  {name:'webkit iPhone',type:webkit,context:{...devices['iPhone 13']},touch:true},
].filter(p=>!process.env.PW_ENGINE||p.type.name()===process.env.PW_ENGINE);
if(!profiles.length)throw new Error(`No browser engine matches PW_ENGINE=${process.env.PW_ENGINE}`);

// Records any press whose target left the DOM before the click, and whether the click still arrived.
const detector=()=>{
  window.__drops=[];let down=null;
  addEventListener('pointerdown',e=>{down={target:e.target,clicked:false,label:(e.target.closest('button,a,label,input')||e.target).textContent.trim().slice(0,40)};},true);
  addEventListener('click',()=>{if(down)down.clicked=true;},true);
  addEventListener('pointerup',()=>{const d=down;setTimeout(()=>{if(d&&!d.clicked&&!d.target.isConnected)window.__drops.push(d.label);if(down===d)down=null;},150);},true);
};
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};

const failures=[];
for(const profile of profiles){
  const launch=profile.type===chromium&&process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox']}:{};
  const browser=await profile.type.launch({headless:true,...launch});
  const context=await browser.newContext(profile.context),calls=[],errors=[];let order;
  await context.addInitScript(detector);
  await context.route('**/*',async route=>{
    const req=route.request(),url=new URL(req.url()),cors={'Access-Control-Allow-Origin':origin};
    if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:{...cors,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
    if(url.pathname.startsWith('/checkout/cart/')){
      const action=url.pathname.split('/').at(-1),body=req.method()==='POST'?req.postDataJSON():null;calls.push(action);let json;
      if(action==='catalog')json={enabled:true,version:'cross-browser-'+printVersion,products,square:{applicationId:'sq0idp-test',locationId:'LOCATION',mode:'live'}};
      else if(action==='hold')json={orderId:body.holdId,status:'holding',heldIds:[],expiresAt:Date.now()+900000};
      else if(action==='quote'){const items=body.items.map(i=>({...products.find(p=>p.id===i.id),quantity:i.quantity}));const base=items.reduce((s,i)=>s+Number(i.amount)*i.quantity,0);order={orderId:body.holdId,key:body.key,expiresAt:Date.now()+600000,status:'quoted',methods:['square','bitcoin'],quote:{items,base:base.toFixed(2),shipping:'10.00',tax:'5.00',total:(base+15).toFixed(2),shipments:[]}};json=order;}
      else if(action==='start'){order={...order,method:body.method,status:'pending',url:'https://btcpay.example.test/i/test'};json=order;}
      else if(action==='status'||action==='cancel')json=order;
      else json={};
      return route.fulfill({headers:cors,json});
    }
    if(url.hostname==='btcpay.example.test')return route.fulfill({contentType:'text/html',body:'<h1>BTCPay</h1>'});
    if(url.hostname==='web.squarecdn.com')return route.fulfill({contentType:'application/javascript',body:"window.Square={payments:()=>({card:async()=>({attach:async()=>{},tokenize:async()=>({status:'OK',token:'cnon:test'})}),paymentRequest:r=>r,applePay:async()=>{throw Error('no')},googlePay:async()=>{throw Error('no')}})};"});
    if(url.hostname==='img.tjm.art'){const f=path.join(root,decodeURIComponent(url.pathname));return fs.existsSync(f)&&fs.statSync(f).isFile()?route.fulfill({body:fs.readFileSync(f),contentType:types[path.extname(f)]||'application/octet-stream'}):route.fulfill({status:404});}
    if(url.hostname!==new URL(origin).hostname)return route.abort();
    const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
    if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:types[path.extname(file)]||'application/octet-stream'});
    return route.fulfill({status:404});
  });
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  const press=async locator=>{await locator.scrollIntoViewIfNeeded();if(profile.touch)await locator.tap();else await locator.click();};
  const typeInto=async(locator,value)=>{await press(locator);await locator.fill('');await locator.pressSequentially(value);};
  const drops=()=>page.evaluate(()=>window.__drops||[]);
  const check=async(step,fn)=>{
    try{await fn();const dropped=await drops();assert.deepEqual(dropped,[],`a press was dropped because its element was replaced: ${dropped.join(', ')}`);}
    catch(error){failures.push(`${profile.name} / ${step}: ${error.message.split('\n')[0]}`);await page.screenshot({path:`/tmp/cross-browser-${profile.type.name()}-${profile.touch?'touch':'desktop'}-${step.replace(/\W+/g,'-')}.png`}).catch(()=>{});}
  };
  const seed=async items=>{await page.evaluate(items=>{localStorage.setItem('va-cart-v1',JSON.stringify(items));localStorage.removeItem('va-cart-order-v1');},items);};
  const print=printOptions[0].id;

  if(profile.touch)await check('menu',async()=>{
    await page.goto(origin+'/');const toggle=page.locator('.nav-toggle');
    await press(toggle);await page.waitForFunction(()=>document.querySelector('.nav-toggle').getAttribute('aria-expanded')==='true');
    const about=page.locator('.main-nav a[href="/about/"]');assert(await about.isVisible(),'About link shows in the open menu');
    await press(about);await page.waitForURL(/\/about\/$/);
  });

  await check('print dialog: type a quantity, then press Add print to cart',async()=>{
    await page.goto(`${origin}/products/${productSlug}/`);await seed([]);await page.reload();
    await press(page.locator('[data-print-open]'));const dialog=page.locator('[data-print-dialog]');await dialog.waitFor({state:'visible'});
    await press(dialog.locator('.print-choice').nth(1));await page.waitForFunction(()=>!document.querySelector('[data-print-add]').disabled);
    await typeInto(dialog.locator('[data-print-quantity]'),'2');
    await press(dialog.locator('[data-print-add]'));await page.waitForURL(/\/cart\/$/);
    const cart=await page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1')));assert.equal(cart.length,1);assert.equal(cart[0].quantity,2);
  });

  await check('cart: type a quantity, then press Remove on another line',async()=>{
    await seed([{id:print,quantity:1},{id:bookId,quantity:1}]);await page.goto(origin+'/cart/');await page.locator('.cart-line').nth(1).waitFor();
    await typeInto(page.locator(`[data-cart-line="${bookId}"] input[type=number]`),'3');
    await press(page.locator(`[data-cart-line="${print}"] .cart-text-link`));
    await page.waitForFunction(()=>document.querySelectorAll('.cart-line').length===1,null,{timeout:5000});
    const cart=await page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1')));assert.deepEqual(cart.map(i=>[i.id,i.quantity]),[[bookId,3]]);
    assert.match(await page.locator('[data-cart-subtotal]').textContent(),new RegExp((Number(products.at(-1).amount)*3).toFixed(2).replace('.','\\.')));
  });

  await check('cart: type the address, then press Calculate shipping & tax',async()=>{
    await seed([{id:print,quantity:1},{id:bookId,quantity:1}]);await page.goto(origin+'/cart/');await page.locator('.cart-line').nth(1).waitFor();
    for(const [name,value] of Object.entries({email:'buyer@example.test',name:'Test Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122'}))await typeInto(page.locator(`[data-cart-form] [name="${name}"]`),value);
    const before=calls.filter(c=>c==='quote').length;
    await press(page.locator('[data-cart-quote]'));// focus is still in zip, so its change event fires during this press
    await page.getByRole('button',{name:'Shipping & tax calculated'}).waitFor({timeout:8000});
    assert.equal(calls.filter(c=>c==='quote').length,before+1,'one quote request per press');
  });

  await check('cart: press Pay with Bitcoin hands off to BTCPay',async()=>{
    const pay=page.getByRole('button',{name:/Pay with Bitcoin/});await pay.waitFor();assert(await pay.isEnabled());
    await press(pay);await page.waitForURL(/btcpay\.example\.test/,{timeout:8000});
  });

  await check('available: type a search, then press a result',async()=>{
    await page.goto(origin+'/gallery/available/');
    await typeInto(page.locator('[data-avail-filters] input[name=q]'),'honeybadger');
    const link=page.locator('.painting-list-row:not([hidden]) .product-title-link').first();const href=await link.getAttribute('href');
    await press(link);await page.waitForURL(u=>u.pathname===href,{timeout:5000});
  });

  const real=errors.filter(e=>!/Failed to fetch|Load failed|NetworkError|access control checks|cancelled/i.test(e));
  if(real.length)failures.push(`${profile.name}: page errors: ${real.slice(0,3).join(' | ')}`);
  await browser.close();
  console.log(`${profile.name}: done`);
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`PASS cross-browser flows on ${profiles.map(p=>p.name).join(', ')}`);
