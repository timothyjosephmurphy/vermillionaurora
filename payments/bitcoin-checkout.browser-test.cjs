const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}: {})});
  const page=await browser.newPage({viewport:{width:390,height:844}});
  let enabled=false,paypal=true,state='Processing',sold=false,created=null,redirect=false,quotes=0;
  const id='12345678-1234-4123-8123-123456789abc',errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const cors={'Access-Control-Allow-Origin':'https://vermillionaurora.com','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  await page.route('**/*',async route=>{
    const req=route.request(),url=new URL(req.url()),p=url.pathname;
    if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
    if(url.hostname==='btcpay.example.test'){redirect=true;return route.fulfill({body:'Mock BTCPay'});}
    if(p==='/checkout/status')return route.fulfill({status:paypal?200:503,headers:cors,json:{status:'available',title:'Chase Toole',amount:'20.00',currency:'USD'}});
    if(p==='/checkout/bitcoin/status')return route.fulfill({headers:cors,json:enabled?{enabled:true,status:'available',title:'Chase Toole',amount:'20.00',currency:'USD'}:{enabled:false}});
    if(p.endsWith('/quote')){quotes++;return route.fulfill({headers:cors,json:{base:'20.00',shipping:'6.00',tax:'1.00',total:'27.00',carrier:'UPS',service:'Ground',packaging:'flat'}});}
    if(p==='/checkout/bitcoin/create'){created=req.postDataJSON();return route.fulfill({headers:cors,json:{status:'pending',orderId:id,url:'https://btcpay.example.test/i/INV1'}});}
    if(p==='/checkout/bitcoin/order')return route.fulfill({headers:cors,json:{status:state.toLowerCase(),orderId:id}});
    if(p==='/products/painting-portrait-in-green/') {
      let html=fs.readFileSync(path.join(root,p,'index.html'),'utf8');
      if(sold)html=html.replace('<p class="product-availability">Available</p>','<p class="product-availability">Sold</p>');
      return route.fulfill({contentType:'text/html',body:html});
    }
    const file=path.join(root,p);
    if(url.hostname==='vermillionaurora.com' && fs.existsSync(file) && fs.statSync(file).isFile())return route.fulfill({contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':file.endsWith('.jpg')?'image/jpeg':'text/plain',body:fs.readFileSync(file)});
    return route.abort();
  });
  const base='https://vermillionaurora.com/products/painting-portrait-in-green/';
  const bitcoin=page.getByRole('button',{name:/Buy with Bitcoin/});
  await page.goto(base);await page.getByRole('button',{name:/Buy with PayPal/}).waitFor();assert.equal(await bitcoin.count(),0);
  enabled=true;paypal=false;await page.reload();await bitcoin.waitFor();assert(await bitcoin.isDisabled());
  assert.equal(await page.getByRole('button',{name:/Buy with PayPal/}).count(),0);
  await page.getByRole('button',{name:'Calculate shipping & tax'}).click();assert.equal(quotes,0);
  for(const [name,value]of Object.entries({name:'Buyer',street1:'123 Main St',city:'Seattle',state:'wa',zip:'98122'}))await page.locator(`[name="${name}"]`).fill(value);
  await page.getByRole('button',{name:'Calculate shipping & tax'}).click();
  await page.waitForFunction(()=>!document.querySelector('.checkout-bitcoin').disabled);
  assert.equal(await bitcoin.textContent(),'Buy with Bitcoin · $27.00');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  fs.mkdirSync('/tmp/checkout-ui',{recursive:true});await page.screenshot({path:'/tmp/checkout-ui/bitcoin-mobile.png',fullPage:true});
  await bitcoin.click();await page.waitForURL('https://btcpay.example.test/**');
  assert(redirect);assert.equal(created.expectedTotal,'27.00');assert.equal(created.address.state,'WA');
  await page.goto(base+'?bitcoin='+id);
  await page.getByText('Bitcoin payment received and awaiting confirmation. Your painting remains reserved.').waitFor();
  assert.equal(await page.getByText(/Bitcoin payment confirmed/).count(),0);
  // A static product can already say Sold by the time the customer returns.
  sold=true;state='Settled';await page.reload();await page.getByText(/Bitcoin payment confirmed/).waitFor();
  assert.equal(await page.locator('.product-availability').textContent(),'Sold');
  assert.equal(await page.locator('.purchase-panel').count(),0);
  assert.deepEqual(errors,[]);await browser.close();
  console.log('PASS: Bitcoin activation gate, Bitcoin-only quote, exact total/address, mobile layout, invoice redirect, pending confirmation, return to sold product. All requests mocked.');
})().catch(error=>{console.error(error);process.exit(1)});
