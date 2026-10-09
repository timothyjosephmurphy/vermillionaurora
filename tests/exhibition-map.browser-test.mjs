import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';

const origin = 'https://vermillionaurora.com';
const root = path.resolve('dist');
const cache = path.join(os.tmpdir(), 'exhibition-map-assets');
await fs.mkdir(cache, {recursive:true});
const cached = async url => {
  const file = path.join(cache, new URL(url).pathname.replaceAll('/', '_'));
  try {return await fs.readFile(file);} catch {}
  const response = await fetch(url);
  assert(response.ok, `${url}: ${response.status}`);
  const body = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(file, body);
  return body;
};
const assets = new Map(await Promise.all(['leaflet.js','leaflet.css'].map(async name => {
  const url = `https://unpkg.com/leaflet@1.9.4/dist/${name}`;
  return [url, await cached(url)];
})));
const browser = await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE ? {executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']} : {})});
try {
  const page = await browser.newPage({reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    let leaflet;
    Object.defineProperty(window, 'L', {get:()=>leaflet,set:value=>{
      leaflet = value;
      const create = value.map;
      value.map = (...args) => (window.__atlasMap = create(...args));
    }});
  });
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (assets.has(url.href)) return route.fulfill({body:assets.get(url.href),contentType:url.pathname.endsWith('.js')?'application/javascript':'text/css',headers:{'access-control-allow-origin':'*'}});
    if (url.origin !== origin) return route.abort();
    const file = path.join(root, url.pathname, url.pathname.endsWith('/')?'index.html':'');
    try {return await route.fulfill({body:await fs.readFile(file),contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.json':'application/json','.png':'image/png'})[path.extname(file)]||'application/octet-stream'});} catch {return route.fulfill({status:404});}
  });
  const checkLayout = async () => {
    assert(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1), 'No horizontal overflow');
    assert(await page.evaluate(()=>{
      const map = document.querySelector('.atlas-canvas').getBoundingClientRect();
      const panel = document.querySelector('.atlas-places').getBoundingClientRect();
      if (!(panel.left >= map.right-1 || panel.top >= map.bottom-1)) return false;
      const markers = [...document.querySelectorAll('.leaflet-marker-icon')].map(el=>el.getBoundingClientRect()).filter(r=>r.left>=map.left&&r.right<=map.right&&r.top>=map.top&&r.bottom<=map.bottom);
      return markers.every((a,i)=>markers.slice(i+1).every(b=>a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top));
    }), 'Details never cover the map and visible pin targets do not overlap');
  };
  const checkPin = async (id, coordinates) => {
    const actual = await page.evaluate(id => {
      const map = window.__atlasMap;
      let result;
      map.eachLayer(layer=>{
        const element = layer.getElement?.();
        if (element?.dataset.mapPlace !== id) return;
        const position = layer.getLatLng(), point = map.latLngToContainerPoint(position);
        const pin = element.getBoundingClientRect(), canvas = map.getContainer().getBoundingClientRect();
        result = {coordinates:[position.lat,position.lng],error:Math.max(Math.abs(pin.left+pin.width/2-canvas.left-point.x),Math.abs(pin.bottom-canvas.top-point.y))};
      });
      return result;
    }, id);
    assert(actual, `${id} has its own pin`);
    assert.deepEqual(actual.coordinates, coordinates, `${id} retains its real location`);
    assert(actual.error < 1.5, `${id} pin tip is anchored at the coordinates`);
  };
  for (const width of [1440,1000,768,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(origin+'/exhibitions/world-map/');
    await page.locator('.atlas-toolbar:visible').waitFor();
    assert(await page.locator('.leaflet-image-layer').evaluate(image=>image.complete&&image.naturalWidth>0),'The self-hosted geography loads');
    assert.equal(await page.locator('.atlas-place').count(), 6);
    assert.equal(await page.locator('.atlas-place[open]').count(), 0, 'Seattle and all other details start collapsed');
    await checkLayout();
    await page.getByRole('button',{name:'Zoom to Seattle & Lillooet, 2 locations',exact:true}).click();
    await checkPin('lillooet',[50.693611,-121.933611]);
    await checkPin('seattle',[47.6062,-122.3321]);
    await checkLayout();
    await page.locator('[data-map-place="seattle"]').click();
    assert.equal(await page.locator('#map-seattle[open] a').count(),5);
    assert(await page.locator('#map-seattle a[href="/murals/#garden-mural"]').isVisible());
    await page.locator('[data-map-place="lillooet"]').focus();
    await page.keyboard.press('Enter');
    assert(await page.locator('#map-lillooet[open] a[href="/murals/#friends-story"]').isVisible());
    assert.equal(await page.locator('#map-seattle[open]').count(),0);
    await checkLayout();
    await page.getByRole('button',{name:'San Salvador & Berlín',exact:true}).click();
    await checkPin('el-salvador',[13.6294151,-89.2508188]);
    await checkPin('berlin-el-salvador',[13.4986,-88.5308]);
    await page.locator('[data-map-place="berlin-el-salvador"]').click();
    assert(await page.locator('#map-berlin-el-salvador[open] a[href="/murals/berlin-el-salvador/"]').isVisible());
    await checkLayout();
    if (process.env.MAP_SCREENSHOTS) {
      await page.locator('[data-exhibition-atlas]').scrollIntoViewIfNeeded();
      await page.screenshot({path:`/tmp/exhibition-map-berlin-${width}.png`,fullPage:true});
    }
    await page.locator('#map-berlin-el-salvador a').click();
    await page.waitForURL(origin+'/murals/berlin-el-salvador/');
    assert.equal(await page.locator('h1').textContent(),'Berlín, El Salvador');
  }
  await page.goto(origin+'/exhibitions/world-map/');
  await page.locator('#map-seattle summary').click();
  assert(await page.locator('#map-seattle[open] a').first().isVisible());
  await page.locator('#map-berlin-el-salvador summary').click();
  await checkPin('berlin-el-salvador',[13.4986,-88.5308]);
  assert.equal(await page.locator('.atlas-place[open]').count(),1);
  await page.route('**/leaflet.js',route=>route.abort());
  await page.reload();
  await page.locator('#map-seattle summary').click();
  assert(await page.locator('#map-seattle a').first().isVisible(),'Gallery links work if the map library fails');
  await page.goto(origin+'/');
  assert.match(await page.locator('.atlas-compact svg').getAttribute('aria-label'),/Berlín/);
  assert.equal(await page.locator('.atlas-compact circle').count(),6);
  assert.deepEqual(errors,[]);
  console.log('PASS: accurate pins, separate San Salvador/Berlín locations, click and keyboard details, mural link, no overlap at four widths, and no-library fallback.');
} finally {await browser.close();}
