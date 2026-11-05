// /cart/?from=tags must paint line items from the page display index before the
// checkout catalog, /catalog/products.json, or the hold call return.
import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const origin='https://tjm.art';
const id='hope-the-vermillion-aurora';
const index=[{id,title:'Hope, the Vermillion Aurora',amount:'2000.00',image:'/gallery-images/hope-the-vermillion-aurora.jpg'}];
const printId='print-hope-the-vermillion-aurora-small';
const html=fs.readFileSync(new URL('./fixtures/cart-paint.html',import.meta.url),'utf8').replace('__INDEX__',JSON.stringify(index).replace(/</g,'\\u003c'));
const cartJs=fs.readFileSync('payments/cart.js');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||'/usr/bin/google-chrome',args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:900}});
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
let release=()=>{},gate=new Promise(resolve=>{release=resolve;});
const arm=()=>{gate=new Promise(resolve=>{release=resolve;});};
const seen={catalog:0,catalogDone:0,products:0,hold:0,lastHold:null};
await page.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.pathname==='/payments/cart.js')return route.fulfill({contentType:'application/javascript',body:cartJs});
  if(url.pathname==='/src/data/play-return.mjs'||url.pathname==='/src/data/gallery-entry.mjs')return route.fulfill({contentType:'text/javascript',body:fs.readFileSync(url.pathname.slice(1))});
  if(url.pathname==='/cart/'||url.pathname==='/cart/index.html')return route.fulfill({contentType:'text/html',body:html});
  if(url.pathname==='/checkout/cart/catalog'){
    seen.catalog++;
    const pending=gate;
    await pending;
    seen.catalogDone++;
    return route.fulfill({contentType:'application/json',body:JSON.stringify({enabled:true,version:'paint-test',products:[{id,title:'Hope, the Vermillion Aurora',amount:'2000.00',methods:['square','bitcoin'],status:'available'}]})});
  }
  if(url.pathname==='/catalog/products.json'){seen.products++;const pending=gate;await pending;return route.fulfill({contentType:'application/json',body:'{"products":[],"prints":[]}'});}
  if(url.pathname==='/checkout/cart/hold'){
    seen.hold++;
    const body=route.request().postDataJSON();
    seen.lastHold=body;
    const pending=gate;
    await pending;
    const originals=(body.items||[]).filter(item=>!String(item.id).startsWith('print-')).map(item=>item.id);
    return route.fulfill({contentType:'application/json',body:JSON.stringify({orderId:body.holdId,status:'holding',heldIds:originals,expiresAt:Date.now()+15*60*1000})});
  }
  return route.fulfill({status:404,body:'missing '+url.pathname});
});
try{
  await page.addInitScript(storedId=>{
    if(sessionStorage.getItem('cart-paint-seeded'))return;
    localStorage.setItem('va-cart-v1',JSON.stringify([{id:storedId,quantity:1}]));
    sessionStorage.setItem('cart-paint-seeded','1');
  },id);
  const started=Date.now();
  await page.goto(origin+'/cart/?from=tags',{waitUntil:'domcontentloaded'});
  await page.getByRole('heading',{name:'Hope, the Vermillion Aurora'}).waitFor({timeout:2000});
  const paintedMs=Date.now()-started;
  assert.equal(seen.catalogDone,0,'line items paint before the checkout catalog responds');
  assert.equal(seen.products,0,'?from=tags does not request the full products file before paint');
  assert.equal(seen.hold,0,'the hold refresh does not run before the line is painted');
  assert.match(await page.locator('.cart-line-price').textContent(),/2,000\.00/);
  assert.equal(await page.locator('.cart-line').count(),1);
  assert.equal(await page.locator('.cart-line-unavailable').count(),0);
  assert.equal(await page.locator('.cart-line img').getAttribute('src'),'/gallery-images/hope-the-vermillion-aurora.jpg');
  assert.equal(await page.locator('.back-to-dungeon').getAttribute('href'),'https://tjm.art/play/');
  assert.match(await page.locator('.back-to-dungeon').textContent(),/Back to 3D gallery/);
  await page.getByRole('button',{name:'Remove Hope, the Vermillion Aurora'}).click();
  await page.locator('[data-cart-empty] h2').waitFor();
  assert.equal(await page.locator('[data-cart-empty] h2').textContent(),'A place for the work you love.');
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1'))),[]);
  assert.equal(seen.catalogDone,0,'removing a line does not wait on the catalog');
  release();
  assert.equal(await page.locator('.cart-line').count(),0,'catalog arrival does not put a removed original back');
  for(let i=0;i<50&&seen.hold<1;i++)await page.waitForTimeout(20);
  assert.ok(seen.hold>=1,'the hold refresh still runs after the line is on screen');
  assert.deepEqual(seen.lastHold.items,[]);
  console.log(`PASS: Hope painted in ${paintedMs}ms while catalog, products.json and hold were still pending`);

  arm();
  const beforeProducts=seen.products;
  await page.evaluate(()=>localStorage.removeItem('va-cart-v1'));
  const emptyStart=Date.now();
  await page.goto(origin+'/cart/?from=tags',{waitUntil:'domcontentloaded'});
  await page.locator('[data-cart-empty] h2').waitFor({timeout:2000});
  const emptyMs=Date.now()-emptyStart;
  assert.equal(seen.products,beforeProducts,'an empty ?from=tags cart does not download products.json');
  assert.ok(seen.catalogDone<seen.catalog,'empty cart still paints before the catalog responds');
  console.log(`PASS: empty from=tags cart painted in ${emptyMs}ms without products.json`);
  release();

  arm();
  await page.evaluate(print=>{
    localStorage.setItem('va-cart-v1',JSON.stringify([{id:print.id,quantity:1}]));
    localStorage.setItem('va-cart-display-v1',JSON.stringify({[print.id]:{id:print.id,title:print.title,type:'print',amount:'40.00',imageSize:{width:8,height:10},paperSize:{width:8.5,height:11},productId:'hope-the-vermillion-aurora',preview:{src:'/gallery-images/hope-the-vermillion-aurora.jpg',alt:'Hope'}}}));
  },{id:printId,title:'Hope, the Vermillion Aurora — small print'});
  const printStart=Date.now();
  await page.goto(origin+'/cart/?from=tags',{waitUntil:'domcontentloaded'});
  await page.getByRole('heading',{name:'Hope, the Vermillion Aurora — small print'}).waitFor({timeout:2000});
  const printMs=Date.now()-printStart;
  assert.ok(seen.catalogDone<seen.catalog,'cached print paints before the catalog responds');
  assert.equal(seen.products,0,'a described cart does not need products.json before the catalog returns');
  assert.match(await page.locator('.cart-line-price').textContent(),/40\.00/);
  assert.match(await page.locator('.cart-line').textContent(),/Fine-art print/);
  console.log(`PASS: cached print painted in ${printMs}ms before the catalog responded`);
  assert.deepEqual(errors,[]);
  release();
}finally{await browser.close();}
