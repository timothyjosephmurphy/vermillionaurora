import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {walkthroughRooms,walkthroughPaintingCount} from '../src/data/gallery-walkthrough.mjs';
import {walkthroughLayout,HALL} from '../src/scripts/gallery-walkthrough-layout.mjs';
const {rooms,items}=walkthroughLayout(walkthroughRooms);
const origin='https://tjm.art',root=path.resolve('dist');
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
async function context(options={}){
  const ctx=await browser.newContext(options);
  await ctx.route('**/*',async route=>{
    const u=new URL(route.request().url());if(u.hostname!=='tjm.art'&&u.hostname!=='img.tjm.art')return route.fulfill({json:{products:[],availability:{}}});
    const file=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    return route.fulfill({body:fs.readFileSync(file),contentType:mime[path.extname(file)]||'application/octet-stream'});
  });return ctx;
}
try{
  for(const mobile of [false,true]){
    const label=mobile?'Mobile':'Desktop';
    const ctx=await context({viewport:mobile?{width:390,height:844}:{width:1440,height:960},hasTouch:mobile,isMobile:mobile,deviceScaleFactor:mobile?2:1,reducedMotion:'reduce'});
    const page=await ctx.newPage(),errors=[],textures=[];
    page.on('pageerror',e=>{errors.push(e.message);console.log('ROOM PAGE ERROR',e.message);});
    page.on('request',r=>{if(/\.(webp|jpe?g)$/.test(new URL(r.url()).pathname)&&page.url().endsWith('/gallery/room/'))textures.push(r.url());if(page.url().endsWith('/gallery/room/')&&r.url().includes('/checkout/'))throw Error('The room must not initiate checkout');});
    await page.goto(origin+'/gallery/room/');
    const root=page.locator('[data-gallery-room]');
    await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.ready==='true',null,{timeout:120000});
    assert.equal(await root.getAttribute('data-rooms'),String(rooms.length));
    assert(Number(await root.getAttribute('data-paintings'))>=walkthroughPaintingCount);
    const atStart=textures.length;assert(atStart<items.length/2,`Textures load lazily (${atStart} requested at start of ${items.length})`);
    console.log('hosts',[...new Set(textures.map(u=>new URL(u).hostname+new URL(u).pathname.split('/').slice(0,2).join('/')))]);
    await page.locator('[data-room-enter]').click();
    const art=items.find(i=>i.id==='meditation-at-denny-blaine')||items.find(i=>i.kind==='painting');
    await page.keyboard.press('Escape');await page.locator('[data-room-picker]').selectOption(art.id);
    await page.waitForFunction(id=>document.querySelector('[data-gallery-room]').dataset.focusedArt===id,art.id,{timeout:20000});
    await page.waitForFunction(r=>document.querySelector('[data-gallery-room]').dataset.room===r,art.room,{timeout:20000});
    assert.equal(await page.locator('[data-room-art-title]').textContent(),art.title);
    assert.equal(await page.locator('[data-room-product]').getAttribute('href'),new URL(art.href,origin).href);
    assert.deepEqual(errors,[]);await ctx.close();
    console.log(`PASS: ${label} walkthrough renders ${rooms.length} rooms with ${walkthroughPaintingCount} paintings, lazy img.tjm.art textures, and painting jumps.`);
  }
  const fallback=await context();await fallback.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null;});
  const fallbackPage=await fallback.newPage();await fallbackPage.goto(origin+'/gallery/room/');await fallbackPage.waitForSelector('[data-room-error]:not([hidden])');
  assert(await fallbackPage.locator('[data-room-index] li a').count()>=walkthroughPaintingCount);await fallback.close();
  console.log('PASS: WebGL-unavailable fallback lists every painting.');
}finally{await browser.close();}
