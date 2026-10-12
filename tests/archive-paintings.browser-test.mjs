import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
const root=path.resolve('dist');
const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.join(root,pathname.endsWith('/')?pathname+'index.html':pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try{const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(base+'/gallery/archived/');
  await page.locator('.archive-tools').waitFor({state:'visible'});
  assert.equal(await page.locator('.archive-card').count(),54);
  await page.locator('.archive-card img').first().evaluate(img=>img.decode());
  await page.screenshot({path:'/tmp/archived-paintings-desktop.png'});
  await page.locator('#archive-search').fill('#193');
  assert.equal(await page.locator('.archive-card:visible').count(),1);
  await page.locator('.archive-card:visible a').click();
  await page.waitForURL('**/products/archived-painting-193/');
  assert.equal(await page.locator('h1').textContent(),'Painting #193');
  await page.locator('.painting-image-trigger img').evaluate(img=>img.decode());
  await page.screenshot({path:'/tmp/archived-paintings-product.png'});
  await page.locator('.product-back').click();
  await page.locator('#archive-sort').selectOption('index');
  assert.equal(await page.locator('.archive-card').first().getAttribute('data-archive-index'),'1');
  await page.locator('#archive-search').fill('no-such-painting');
  assert(await page.locator('.archive-empty').isVisible());
  await page.locator('#archive-search').fill('');
  await page.locator('#archive-sort').selectOption('archive');
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'/tmp/archived-paintings-mobile.png'});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile page must not overflow horizontally');
  assert.equal(await page.locator('.archive-card:visible').count(),54);
  console.log('Archive desktop, search, sorting, product navigation, image decoding, and mobile checks passed.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
