const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'../dist');
const output=process.env.CHECKOUT_TEST_OUTPUT || '/tmp/checkout-ui';
fs.mkdirSync(output,{recursive:true});

(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}: {})});
  // All HTTP requests are intercepted below; this cannot create a real order or label.
  const page=await browser.newPage({viewport:{width:1440,height:1100}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  let available=true, quoteRequests=[], createRequests=[], createFails=false, redirects=0;
  const quote={base:'20.00',shipping:'6.01',tax:'0.00',total:'26.01',carrier:'UPS',service:'Ground',packaging:'flat'};
  await page.route('**/*',async route=>{
    const request=route.request(), url=new URL(request.url());
    const cors={'Access-Control-Allow-Origin':'https://vermillionaurora.com','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
    if(request.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
    if(url.hostname==='www.paypal.com'){redirects++;return route.fulfill({body:'Mock PayPal checkout'});}
    if(url.pathname==='/checkout/status')return route.fulfill({headers:cors,json:{status:'available',title:'Chase Toole',amount:'20.00',currency:'USD'}});
    if(url.pathname==='/checkout/quote')return new Promise(resolve=>quoteRequests.push({data:request.postDataJSON(),finish:async(json=quote,status=200)=>{await route.fulfill({status,json,headers:cors});resolve();}}));
    if(url.pathname==='/checkout/create'){
      createRequests.push(request.postDataJSON());
      return route.fulfill(createFails?{headers:cors,status:502,json:{error:'Could not start checkout. Please try again.'}}:{headers:cors,json:{url:'https://www.paypal.com/checkoutnow?token=TEST'}});
    }
    if(url.pathname==='/products/painting-portrait-in-green/'){
      let html=fs.readFileSync(path.join(root,'products/painting-portrait-in-green/index.html'),'utf8');
      html=html.replace(/(<p class="product-availability"[^>]*>)(Available|Sold)(<\/p>)/,`$1${available?'Available':'Sold'}$3`);
      return route.fulfill({contentType:'text/html',body:html});
    }
    if(url.pathname==='/gallery-images/portrait-in-green.jpg')return route.fulfill({contentType:'image/jpeg',body:fs.readFileSync(path.join(root,'gallery-images/portrait-in-green.jpg'))});
    const file=path.join(root,url.pathname);
    if(url.hostname==='vermillionaurora.com'&&fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({contentType:file.endsWith('.css')?'text/css':file.endsWith('.js')?'application/javascript':'text/plain',body:fs.readFileSync(file)});
    return route.abort();
  });
  const navigate=()=>page.goto('https://vermillionaurora.com/products/painting-portrait-in-green/',{waitUntil:'domcontentloaded'});
  const wait=async(fn)=>{for(let i=0;i<100;i++){if(await fn())return;await new Promise(r=>setTimeout(r,20));}throw Error('Condition not reached');};
  const fill=async()=>{for(const [name,value]of Object.entries({name:'Test Buyer',street1:'123 Main St',city:'Seattle',state:'wa',zip:'98122'}))await page.locator(`[name="${name}"]`).fill(value);};
  const calculate=()=>page.getByRole('button',{name:'Calculate shipping & tax',exact:true}).click();
  const pay=page.getByRole('button',{name:/Buy with PayPal/});
  await navigate();
  await pay.waitFor();
  assert(await pay.isVisible());assert(await pay.isDisabled());
  assert(await page.locator('.checkout-address-form').isVisible());
  assert.equal(await page.locator('[data-original-purchase] .product-detail-price').textContent(),'$20 USD','The original price remains visible when checkout replaces the Buy now control');
  assert(await page.locator('.product-purchase-actions').evaluate(el=>el.previousElementSibling?.matches('h1')), 'Purchase options follow the artwork title');
  assert(await page.locator('.purchase-panel').evaluate(el=>el.compareDocumentPosition(document.querySelector('.painting-facts'))&Node.DOCUMENT_POSITION_FOLLOWING));
  await page.screenshot({path:path.join(output,'checkout-desktop.png'),fullPage:true});
  await calculate();assert.equal(quoteRequests.length,0,'invalid address must not call quote');
  await fill();await calculate();await wait(()=>quoteRequests.length===1);
  assert(await pay.isDisabled());
  await quoteRequests[0].finish();await wait(async()=>!await pay.isDisabled());
  assert.equal(await pay.textContent(),'Buy with PayPal · $26.01');
  const calculateButton=page.getByRole('button',{name:'Shipping & tax calculated',exact:true});assert(await calculateButton.isDisabled());assert.equal(await calculateButton.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(222, 219, 215)');
  assert.equal(quoteRequests[0].data.address.state,'WA');
  assert((await page.locator('.checkout-total').innerText()).includes('26.01'));
  await page.locator('[name="city"]').fill('Tacoma');assert(await pay.isDisabled());assert(await page.getByRole('button',{name:'Calculate shipping & tax',exact:true}).isEnabled());
  await calculate();await wait(()=>quoteRequests.length===2);
  await page.locator('[name="city"]').fill('Bellevue');await calculate();await wait(()=>quoteRequests.length===3);
  await quoteRequests[2].finish({...quote,shipping:'7.00',total:'27.00'});await wait(async()=>!await pay.isDisabled());
  await quoteRequests[1].finish({...quote,shipping:'99.00',total:'119.00'});
  assert.equal(await pay.textContent(),'Buy with PayPal · $27.00','late quote must not replace the current total');
  await page.locator('[name="street1"]').fill('456 Main St');await calculate();await wait(()=>quoteRequests.length===4);
  await quoteRequests[3].finish({error:'Unable to quote shipping and tax for this address.'},422);
  await wait(async()=>(await page.locator('.checkout-total').innerText()).includes('Unable'));
  assert(await pay.isVisible());assert(await pay.isDisabled());
  await calculate();await wait(()=>quoteRequests.length===5);await quoteRequests[4].finish();await wait(async()=>!await pay.isDisabled());
  createFails=true;await pay.click();await wait(()=>createRequests.length===1);
  await wait(async()=>(await page.locator('.checkout-notice').innerText()).includes('Could not'));
  assert(await pay.isDisabled());assert(await pay.isVisible());assert(await page.locator('[name="street1"]').isEnabled());
  createFails=false;await calculate();await wait(()=>quoteRequests.length===6);await quoteRequests[5].finish();await wait(async()=>!await pay.isDisabled());
  await pay.click();await wait(()=>redirects===1);
  assert.equal(createRequests.length,2);
  assert.equal(createRequests[1].address.city,'Bellevue');assert.equal(createRequests[1].address.street1,'456 Main St');
  assert.equal(createRequests[1].expectedTotal,'26.01');
  await page.setViewportSize({width:390,height:844});await navigate();await pay.waitFor();
  await page.screenshot({path:path.join(output,'checkout-mobile.png'),fullPage:true});
  await page.getByRole('link',{name:'Enter shipping details to buy Chase Toole'}).click();
  assert.equal(await page.locator('[name="name"]').evaluate(el=>document.activeElement===el),true);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(output,'checkout-mobile-form.png')});
  available=false;await navigate();
  assert.equal(await page.locator('.purchase-panel,.product-purchase-cta').count(),0,'sold painting must not get purchase controls');
  assert.deepEqual(errors,[]);
  console.log('PASS: visible form and disabled payment; address validation; exact quoted address; stale responses; quote/create failures; PayPal redirect; desktop/mobile layout; sold painting protected. All provider calls mocked.');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
