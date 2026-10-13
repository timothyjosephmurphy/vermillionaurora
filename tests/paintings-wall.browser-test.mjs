import {chromium,webkit,devices} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {tjWall,paulWall,notToScale} from '../src/data/paintings-wall.mjs';
const origin='https://tjm.art',root=path.resolve('dist');
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
const pixel=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64');
function router(state){
  return async route=>{
    const u=new URL(route.request().url());
    if(u.hostname.endsWith('workers.dev')){
      if(route.request().frame().url().includes('/gallery/wall/'))state.worker.push(u.pathname);
      return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{enabled:false,products:[]}});
    }
    if(u.hostname!=='tjm.art'){state.external.push(u.href);return /\.(jpe?g|png|webp)/i.test(u.pathname)?route.fulfill({body:pixel,contentType:'image/png'}):route.fulfill({json:{}});}
    const file=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    const body=fs.readFileSync(file);
    if(/\.(webp|jpe?g|png)$/.test(file))state.images.push({url:u.pathname,bytes:body.length});
    return route.fulfill({body,contentType:mime[path.extname(file)]||'application/octet-stream'});
  };
}
for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true,...(engine===chromium?{args:['--no-sandbox']}:{})});
  try{
    for(const mobile of [false,true]){
      const context=await browser.newContext(mobile?{...devices['iPhone 13']}:{viewport:{width:1280,height:900},hasTouch:true});
      const page=await context.newPage(),errors=[],state={worker:[],external:[],images:[]};
      page.on('pageerror',e=>errors.push(e.message));
      await page.route('**/*',router(state));
      const wall=()=>page.locator('[data-gallery-wall]'),panel=page.locator('[data-wall-panel]'),picker=page.locator('[data-wall-picker]');
      const open=async p=>{await page.goto(origin+p);await page.locator('[data-gallery-wall][data-ready="true"]').waitFor();};
      const settled=()=>page.waitForFunction(()=>document.querySelector('[data-gallery-wall]').dataset.animating!=='true');
      const tag=`${engine.name()}${mobile?' iPhone':''}`;

      await open('/gallery/wall/all/');
      assert.equal(await page.locator('[data-wall-art]').count(),tjWall.artworks.length);
      await page.waitForFunction(()=>[...document.querySelectorAll('[data-art-image]')].every(i=>i.complete&&i.naturalWidth>0));
      const initial=state.images.filter(i=>/\.(webp|jpe?g)$/.test(i.url)&&(i.url.startsWith('/wall-paintings/')||i.url.startsWith('/gallery-wall/')||i.url.startsWith('/gallery-images/')));
      const initialBytes=initial.reduce((s,i)=>s+i.bytes,0);
      assert(initialBytes<2_000_000,`initial painting images ${initialBytes}`);
      assert(!state.images.some(i=>i.url.startsWith('/print-masters/')),'overview never downloads masters');
      assert.deepEqual(state.external.filter(u=>u.includes('media.vermillionaurora.com')),[],'no remote photos until zoom');
      assert(await page.locator('[data-wall-index] li').count()===tjWall.artworks.length);
      assert.equal(await page.locator('[data-wall-unsized] li').count(),notToScale.length);
      const rects=await page.locator('[data-wall-art]').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};}));
      for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];assert(a.x+a.w<=b.x+.1||b.x+b.w<=a.x+.1||a.y+a.h<=b.y+.1||b.y+b.h<=a.y+.1,'no overlaps on screen');}
      if(!mobile)await page.screenshot({path:`/tmp/paintings-wall-${engine.name()}-fit.png`});

      // Filter
      const filterButtons=page.locator('[data-wall-filter] [data-filter]');
      assert.deepEqual(await filterButtons.evaluateAll(b=>b.map(x=>x.textContent)),['All (66)','Available (31)','Sold (8)','Not for sale (27)']);
      await page.locator('[data-filter="sold"]').click();await settled();
      assert.equal(await page.locator('.wall-art.is-dimmed').count(),66-8);
      assert.equal(await picker.locator('option').count(),9);
      await page.locator('[data-filter="all"]').click();await settled();
      assert.equal(await page.locator('.wall-art.is-dimmed').count(),0);

      // Inspect card: sold, then available, then not for sale
      const cases=[tjWall.artworks.find(a=>a.status==='available'),tjWall.artworks.find(a=>a.status==='sold'),tjWall.artworks.find(a=>/Burning Man Temple/.test(a.title))];
      for(const art of cases){
        await page.locator('[data-wall-fit]').click();await settled();
        await page.locator(`[data-wall-art="${art.id}"]`).click();
        await page.waitForFunction(id=>document.querySelector('[data-gallery-wall]').dataset.inspecting===id,art.id);await settled();
        await page.waitForFunction(()=>document.querySelector('[data-wall-panel]').classList.contains('is-visible'));
        assert.equal(await page.locator('[data-wall-title]').textContent(),art.title);
        assert.equal(await page.locator('[data-wall-size]').textContent(),art.sizeLabel);
        assert.equal(await page.locator('[data-wall-state]').textContent(),art.statusLabel);
        assert.equal(await page.locator('[data-wall-product]').getAttribute('href'),art.href);
        assert.equal(await page.locator('[data-wall-product]').textContent(),'Painting & story');
        const text=await panel.innerText();assert(!/\$|print|frame|mat\b/i.test(text.replace(art.title,'')),`no print prices or frame sizes: ${text}`);
        const buy=page.locator('[data-wall-buy]');
        if(art.buy){assert(await buy.isVisible());assert.equal((await buy.textContent()).trim(),'Buy');assert.equal(await buy.getAttribute('href'),art.buyHref,'Buy opens the purchase form when checkout is unavailable');}
        else assert(!(await buy.isVisible()));
        const box=await panel.boundingBox(),v=page.viewportSize();assert(box.x>=0&&box.y>=0&&box.x+box.width<=v.width&&box.y+box.height<=v.height,'card stays on screen');
        if(art===cases[0])await page.screenshot({path:`/tmp/paintings-wall-${engine.name()}${mobile?'-mobile':''}-inspect.png`});
      }
      assert.equal(await page.locator('[data-wall-state]').textContent(),'Not for sale');
      // Second click opens the painting's page
      const target=cases[2];
      await Promise.all([page.waitForURL(origin+target.href),page.locator(`[data-wall-art="${target.id}"]`).click()]);

      // Sharpening to the full image on zoom
      await open('/gallery/wall/all/');
      const sharp=tjWall.artworks.find(a=>a.sources.length>1&&a.sources.at(-1).src.startsWith('/')&&!a.sources.at(-1).src.startsWith('/print-masters/')&&a.sources.at(-1).src.startsWith('/gallery-images/'));
      assert(sharp,'a local painting with a full-size photo');
      assert.equal(await page.locator(`[data-art-image="${sharp.id}"]`).evaluate(i=>i.getAttribute('src')),sharp.sources[0].src);
      await picker.selectOption(sharp.id);await settled();
      await page.waitForFunction(({id,src})=>document.querySelector(`[data-art-image="${id}"]`).getAttribute('src')===src,{id:sharp.id,src:sharp.sources.at(-1).src});
      if(!mobile)await page.screenshot({path:`/tmp/paintings-wall-${engine.name()}-zoom.png`});

      // Paul's wall and the toggle
      await page.locator('[data-wall-fit]').click();await settled();
      await Promise.all([page.waitForURL(origin+'/gallery/wall/paul/'),page.locator('.wall-intro a[href="/gallery/wall/paul/"]').click()]);
      await page.locator('[data-gallery-wall][data-ready="true"]').waitFor();
      assert.equal(await page.locator('[data-wall-art]').count(),paulWall.artworks.length);
      assert.equal(await page.locator('[data-wall-unsized]').count(),0);
      assert.deepEqual(await page.locator('[data-wall-filter] [data-filter]').evaluateAll(b=>b.map(x=>x.textContent)),['All (38)','Available (37)','Not for sale (1)']);
      assert.equal(await page.locator('.wall-switch a[aria-current="page"]').textContent(),'Paul Murphy (38)');
      if(!mobile)await page.screenshot({path:`/tmp/paintings-wall-${engine.name()}-paul.png`});
      assert.deepEqual(state.worker.filter(p=>!p.startsWith('/checkout/cart/')),[],'no per-view Worker calls beyond the site cart');
      assert(!state.worker.some(p=>p.includes('inventory')));
      assert.deepEqual(errors,[]);
      await context.close();
      console.log(`PASS: ${tag} all-paintings wall: ${tjWall.artworks.length}/${paulWall.artworks.length} paintings, ${Math.round(initialBytes/1024)} KB initial images, filter, inspect card, Buy, zoom sharpening, toggle`);
    }
    // Reduced motion and no-JS list
    const calm=await browser.newContext({viewport:{width:1100,height:800},reducedMotion:'reduce'});
    const cp=await calm.newPage();await cp.route('**/*',router({worker:[],external:[],images:[]}));
    await cp.goto(origin+'/gallery/wall/all/');await cp.locator('[data-gallery-wall][data-ready="true"]').waitFor();
    const before=await cp.locator('[data-wall-scene]').evaluate(el=>el.style.transform);
    await cp.locator('[data-wall-picker]').selectOption(tjWall.artworks[0].id);
    await cp.waitForFunction(b=>document.querySelector('[data-wall-scene]').style.transform!==b,before,{timeout:2000});
    assert.equal(await cp.locator('[data-gallery-wall]').getAttribute('data-animating'),'false');
    await calm.close();
    const plain=await browser.newContext({viewport:{width:1100,height:800},javaScriptEnabled:false});
    const pp=await plain.newPage();await pp.route('**/*',router({worker:[],external:[],images:[]}));
    await pp.goto(origin+'/gallery/wall/all/');
    assert.equal(await pp.locator('.wall-viewport').evaluate(el=>getComputedStyle(el).display),'none');
    assert.equal(await pp.locator('[data-wall-index] li a:visible').count(),tjWall.artworks.length);
    await plain.close();
    console.log(`PASS: ${engine.name()} all-paintings wall: reduced motion and no-JS list`);
  }finally{await browser.close();}
}

