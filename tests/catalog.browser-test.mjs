import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,byId,collections} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://vermillionaurora.com';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}: {})});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[],missing=[];let status='sold',allSold=false;page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.pathname==='/inventory/status'){const ids=url.searchParams.get('ids').split(',');return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{version:catalogVersion,availability:Object.fromEntries(ids.map(id=>[id,allSold?'sold':['painting-portrait-in-green','painting-moonlit-water','paul-murphy-painting-1'].includes(id)?status:byId[id]?.listing.status||'available']))}});}
  if(url.hostname!==new URL(origin).hostname)return route.abort();
  // Approved testimonials come from the Worker at request time; the static preview has none.
  if(url.pathname==='/testimonials/api/approved')return route.fulfill({json:{testimonials:[]}});
  const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
  if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream'});
  missing.push(url.pathname);return route.fulfill({status:404});
 });
 const routes=['/','/gallery/','/exhibitions/paul-murphy/','/exhibitions/chase-toole/','/exhibitions/gavin-robertson/','/products/painting-portrait-in-green/','/products/paul-murphy-painting-1/','/products/coined-in-watercolor-film-poster/','/commissions/','/products/watercolor-portraits/'];
 fs.mkdirSync('/tmp/catalog-preview',{recursive:true});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const route of routes){console.log('Preview',width,route);await page.goto(origin+route);await page.locator('main').first().waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} overflow ${route}`);}
 }
 await page.goto(origin+'/');await page.waitForFunction(()=>document.querySelector('.collector-items-carousel [data-product-id="painting-moonlit-water"] [data-card-price]')?.textContent==='Sold');
 assert.equal(await page.locator('.available-paintings-carousel [data-product-id="painting-moonlit-water"]').count(),0);
 assert.equal(await page.locator('.collector-items-carousel [data-product-id="painting-moonlit-water"]').count(),1);
 assert.equal(await page.locator('.available-paintings-carousel [data-availability="Sold"]').count(),0);
 await page.goto(origin+'/exhibitions/paul-murphy/');await page.waitForFunction(()=>[...document.querySelectorAll('.ev-caption-title')].some(el=>el.textContent==='Tipi · Sold'));
 assert(await page.evaluate(()=>{const buys=[...document.querySelectorAll('.ev-buy')];return buys.length>0&&buys.every(b=>{const row=b.parentElement,text=row.firstElementChild,br=b.getBoundingClientRect(),tr=text.getBoundingClientRect();return row.matches('.ev-caption-row')&&row.parentElement.matches('.ev-caption')&&br.top<tr.bottom&&br.bottom>tr.top&&br.left>=tr.right-1;});}),'Viewer Buy sits inline at the end of the caption’s last line');
 await page.goto(origin+'/');await page.waitForTimeout(500);
 assert(await page.evaluate(()=>{const track=document.querySelector('[data-available-paintings]'),tr=track.getBoundingClientRect();const pills=[...track.querySelectorAll('.card-buy:not([hidden])')].map(b=>({b:b.getBoundingClientRect(),c:b.closest('.card-tile').getBoundingClientRect()})).filter(x=>x.c.left>=tr.left-1&&x.c.right<=tr.right+1);
  return pills.length>1&&pills.every(x=>Math.abs(x.b.bottom-pills[0].b.bottom)<=1&&Math.abs((x.c.right-x.b.right)-(pills[0].c.right-pills[0].b.right))<=1&&Math.abs(x.c.height-pills[0].c.height)<=1);}),'Homepage carousel cards are equal height with Buy pills level in the lower-right corner');
 // Every visible Buy cue (card pills, viewer pills, the hero carousel's slides) must be the vermillion pill, never plain text glued to a price.
 const buyCueProblems=()=>{const cta=(()=>{const probe=document.createElement('span');probe.style.background='var(--cta)';document.body.append(probe);const c=getComputedStyle(probe).backgroundColor;probe.remove();return c;})();const hover=(()=>{const probe=document.createElement('span');probe.style.background='var(--cta-hover)';document.body.append(probe);const c=getComputedStyle(probe).backgroundColor;probe.remove();return c;})();
  const problems=[];
  for(const el of document.querySelectorAll('body *')){if(el.children.length||!/^buy$/i.test(el.textContent.trim())||el.closest('[hidden],[inert]'))continue;const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;const cs=getComputedStyle(el);
   if(![cta,hover].includes(cs.backgroundColor))problems.push(`${el.className||el.tagName}: background ${cs.backgroundColor}`);
   else if(!el.closest('.button')&&(r.height<24||r.height>32||parseFloat(cs.borderTopLeftRadius)<8))problems.push(`${el.className}: not a compact pill (${Math.round(r.height)}px)`);}
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
  while((node=walker.nextNode())){const v=node.nodeValue.trim();if(/Buy$/.test(v)&&!/^buy$/i.test(v)&&node.parentElement?.getClientRects().length&&!node.parentElement.closest('script,style,[hidden]'))problems.push(`glued Buy text: ${v.slice(-50)}`);}
  return problems;};
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/gallery/','/gallery/available/','/exhibitions/paul-murphy/']){
   await page.goto(origin+route);await page.waitForTimeout(400);
   let problems=await page.evaluate(buyCueProblems);
   if(route==='/'){const slides=await page.evaluate(()=>Number(document.querySelector('.featured-position')?.textContent.split('/')[1]||0));assert(slides>1,'hero carousel has slides');
    for(let i=0;i<slides;i++){await page.evaluate(()=>document.querySelector('.featured-carousel [data-next]').click());await page.waitForTimeout(500);problems=problems.concat(await page.evaluate(buyCueProblems));
     assert.equal(await page.evaluate(()=>{const s=document.querySelector('.featured-stage .featured-slide:last-child'),row=s.querySelector('.featured-caption .card-buy-row'),buy=row?.querySelector('.card-buy');if(!buy)return 'ok';const text=row.firstElementChild.getBoundingClientRect(),b=buy.getBoundingClientRect();return row.lastElementChild===buy&&b.left-text.right>=8&&b.top<text.bottom&&b.bottom>text.top?'ok':'Buy not inline at the end of the last line';}),'ok',`hero slide ${i+1} at ${width}px`);}}
   assert.deepEqual([...new Set(problems)],[],`${route} at ${width}px`);
  }
 }
 await page.goto(origin+'/gallery/');const card=page.locator('[data-product-id="painting-portrait-in-green"]');await page.waitForFunction(()=>document.querySelector('[data-product-id="painting-portrait-in-green"]').dataset.availability==='Sold');await page.locator('#available-only').check();assert(await card.isHidden());
 assert.equal(await page.locator('.product-grid').count(),0,'Gallery uses a list instead of tiles');
 assert.match(await page.locator('[data-product-id="painting-portrait-in-gold"] .painting-list-dimensions').textContent(),/12 × 15 in/);
 for(const choice of ['price-asc','price-desc','size-asc','size-desc']){
  await page.locator('#gallery-sort').selectOption(choice);
  const field=choice.startsWith('price')?'price':'area',direction=choice.endsWith('asc')?1:-1;
  const rows=await page.locator('.painting-list-row:visible').evaluateAll((nodes,field)=>nodes.map(n=>({value:Number(n.dataset[field]),url:n.querySelector('.product-title-link').href})),field);
  assert(rows.length>1);
  assert(rows.every((r,i)=>i===0||direction*(r.value-rows[i-1].value)>=0),choice+' sorts the visible paintings');
  assert.deepEqual(await page.locator('.ev-stage .ev-cell').evaluateAll(nodes=>nodes.map(n=>n.href)),rows.map(r=>r.url),'Carousel follows the sorted, filtered list');
 }
 await page.locator('#available-only').uncheck();await page.locator('#gallery-sort').selectOption('price-desc');
 const availability=await page.locator('.painting-list-row').evaluateAll(nodes=>nodes.map(n=>n.dataset.availability));
 assert(availability.indexOf('Sold')>availability.lastIndexOf('Available'));
 assert(availability.indexOf('Not for sale')>availability.lastIndexOf('Sold'));
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});await page.locator('[data-gallery-list]').scrollIntoViewIfNeeded();
  const first=page.locator('.painting-list-row').first(),thumbnail=await first.locator('img').boundingBox(),title=await first.locator('h3').boundingBox();
  assert(thumbnail.width<=72&&thumbnail.x<title.x,'Compact thumbnail is left of the title');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Gallery list has no horizontal overflow');
  const carousel=await page.locator('.exhibition-viewer').boundingBox(),list=await page.locator('[data-gallery-list]').boundingBox();
  assert(list.y>=carousel.y+carousel.height,'List and its controls sit below the carousel');
  await page.locator('.gallery-filter').evaluate(el=>window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-document.querySelector('.site-header').getBoundingClientRect().height-16,behavior:'instant'}));
  await page.screenshot({path:`/tmp/catalog-preview/gallery-list-${width}.png`});
 }
 allSold=true;await page.reload();await page.waitForFunction(()=>[...document.querySelectorAll('.painting-list-row')].every(n=>n.dataset.availability==='Sold'));
 await page.locator('#available-only').check();assert.equal(await page.locator('.painting-list-row:visible').count(),0);assert(await page.locator('.gallery-empty').isVisible());assert(await page.locator('.exhibition-viewer').isHidden());
 await page.locator('#available-only').uncheck();assert(await page.locator('.exhibition-viewer').isVisible());
 await page.goto(origin+'/');await page.waitForFunction(()=>document.querySelector('.available-paintings-carousel .ex-track').children.length===0);
 const availableCount=collections.home.filter(e=>e.variant==='carousel'&&['available','inquiry'].includes(byId[e.product].listing?.status)).length;
 const collectorPreview=collections.home.filter(e=>e.variant==='carousel'&&!['available','inquiry'].includes(byId[e.product].listing?.status)).length;
 // Live availability moves sold available cards into the collectors track; Collector's Items has no item limit.
 assert.equal(await page.locator('.collector-items-carousel .product-card').count(),collectorPreview+availableCount);
 assert.equal(await page.locator('.collector-archive-link').count(),0);
 assert(await page.locator('.painting-discovery-actions a.button[href="/gallery/"]').count());
 allSold=false;
 await page.goto(origin+'/products/painting-portrait-in-green/');await page.getByText('Sold',{exact:true}).waitFor();await page.screenshot({path:'/tmp/catalog-preview/product-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'/tmp/catalog-preview/product-desktop.png',fullPage:true});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  await page.goto(origin+'/products/painting-portrait-in-green/');
  const trigger=page.getByRole('link',{name:'View Chase Toole full screen'}),dialog=page.getByRole('dialog'),image=dialog.locator('img'),close=dialog.getByRole('button',{name:'Close'});
  await trigger.scrollIntoViewIfNeeded();
  const scroll=await page.evaluate(()=>window.scrollY);
  await trigger.click();await dialog.waitFor();
  await page.waitForFunction(()=>{const img=document.querySelector('.painting-lightbox img');return img.complete&&img.naturalWidth>0;});
  assert.equal(await image.getAttribute('src'),await trigger.getAttribute('href'));
  const bounds=await image.boundingBox(),frame=await dialog.boundingBox();
  assert.equal(frame.y,0);assert.equal(frame.height,900);assert.equal(frame.width,width);
  assert(bounds.x>=19&&bounds.y>=75&&bounds.x+bounds.width<=width-19&&bounds.y+bounds.height<=877,'painting fits the viewport');
  const ratio=await image.evaluate(img=>img.naturalWidth/img.naturalHeight);
  assert(Math.abs(bounds.width/bounds.height-ratio)<.01,'painting retains its aspect ratio');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed');
  assert(await close.evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Tab');
  assert(await dialog.evaluate(el=>el.contains(document.activeElement)||document.activeElement===document.body),'keyboard cannot reach the page behind the modal');
  await image.click();assert(await dialog.isVisible(),'clicking the painting keeps it open');
  await page.screenshot({path:`/tmp/catalog-preview/painting-viewer-${width}.png`});
  await page.mouse.click(8,450);await dialog.waitFor({state:'hidden'});
  await page.waitForFunction(()=>!document.documentElement.classList.contains('painting-viewer-open'));
  assert.equal(await page.evaluate(()=>window.scrollY),scroll,'click-away restores the original scroll position');
  assert(await trigger.evaluate(el=>el===document.activeElement),'focus returns to the image link');
  await trigger.press('Enter');await dialog.waitFor();await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
  await trigger.click();await dialog.waitFor();await close.click();await dialog.waitFor({state:'hidden'});
  await page.waitForFunction(()=>!document.documentElement.classList.contains('painting-viewer-open'));
  assert.equal(await page.evaluate(()=>window.scrollY),scroll);
 }
 await page.goto(origin+'/exhibitions/gavin-robertson/');assert(await page.getByRole('heading',{name:'From the Nantucket to Cape Town'}).isVisible());assert.equal(await page.locator('iframe').getAttribute('src'),'https://www.youtube-nocookie.com/embed/i7tvzE_bqM8?playsinline=1');
 assert.deepEqual(errors,[]);assert.deepEqual([...new Set(missing)],[]);
 console.log('PASS: 10 routes on desktop/mobile; gallery list, both price/size sort directions, synced carousel, live availability and empty state; full-screen painting and preserved film/story; no local asset errors.');
}finally{await browser.close();}
