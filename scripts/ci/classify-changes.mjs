// Classifies changed files (one per line on stdin) into a PR gate tier and writes GitHub outputs.
//   blog     - a story publish only: build + the new article is on the index. No Playwright.
//   content  - catalog data, images, other static assets, docs: build + changed pages load.
//   code     - site code: unit tests + browser tests for touched areas + smoke.
//   full     - checkout/payments/worker/CI/dependency changes: the full suite.
import fs from 'node:fs';
const files=fs.readFileSync(0,'utf8').split('\n').map(s=>s.trim()).filter(Boolean);
const full=[/^cloudflare\//,/^payments\//,/^worker\//,/^wrangler\.jsonc$/,/^package(-lock)?\.json$/,/^\.github\//,/^scripts\/ci\//,/^catalog\/.*\.(m?js)$/,/^src\/pages\/cart\//,/^src\/data\/card-commerce\.mjs$/,/^tests\/(cart|print-checkout)/,/^scripts\/build-.*print/];
const content=[/^catalog\/.*\.json$/,/^gallery-images\//,/^images\//,/^static\//,/^src\/pages\/blog\//,/^src\/content\//,/^public\//,/^docs\//,/\.(jpe?g|png|webp|gif|avif|svg|mp4|webm|md|txt)$/i,/^scripts\/sitemap-lastmod\.json$/,/^src\/data\/testimonials\.json$/];
// Story publish. Display, social, and display-files.json are shared with the catalog, so they
// only take this tier when the change set also touches a story, the blog index, or upload assets.
// Uploader source (worker.mjs, wrangler, scripts/upload-blog-media.mjs) is not in this list.
const blogAllow=[/^static\/blog\//,/^src\/pages\/blog\//,/^static\/display\//,/^static\/social\//,/^scripts\/display-files\.json$/,/^scripts\/blog-media-upload\/assets\//,/^scripts\/blog-media-upload\/publish-assets\//,/^scripts\/blog-media-upload\/manifest\.json$/];
const blogAnchor=/^(static\/blog\/|src\/pages\/blog\/|scripts\/blog-media-upload\/(?:assets\/|publish-assets\/))/;
// These files change serving behavior, so they need the routing/cache unit tests
// even though they live alongside ordinary content and images.
const assetConfig=/^(static|public)\/_(headers|redirects)$/;
const areas=[
  [/gallery-wall/,['tests/gallery-wall.browser-test.mjs']],
  [/paintings-wall/,['tests/paintings-wall.browser-test.mjs']],
  [/gallery-room|babylon/i,['ROOM']],
  [/featured-carousel/,['tests/featured-carousel.browser-test.mjs']],
  [/testimonial/,['tests/testimonials-video.browser-test.mjs','tests/testimonials-send-button.browser-test.mjs']],
  [/^src\/pages\/products\/|^src\/(layouts|components)\/|^catalog\/|product/,['tests/catalog.browser-test.mjs']],
  [/print|frame|matting|-mats?\b/,['tests/print-matting.browser-test.mjs','tests/print-editions.browser-test.mjs']],
  [/archive/,['tests/archive-paintings.browser-test.mjs']],
  [/home-map|exhibition/,['tests/home-map.browser-test.mjs','tests/exhibition-map.browser-test.mjs']],
  [/wallet|apple-pay|google-pay/i,['tests/cart-wallets.browser-test.mjs']],
];
// Print-master-only: prints.json, master registries, master/edition files and the catalogs generated from them.
const printMaster=[/^catalog\/prints\.json$/,/^catalog\/[a-z-]*print-masters\.json$/,/^catalog\/gallery-wall-layout\.json$/,/^static\/print-(masters|editions)\//,/^cloudflare\/(print-catalog|checkout-catalog|etsy-print-source|etsy-sync-source)\.mjs$/];
let tier;
const printOnly=files.length>0&&files.includes('catalog/prints.json')&&files.every(f=>printMaster.some(r=>r.test(f)));
const blogShaped=files.length>0&&files.every(f=>blogAllow.some(r=>r.test(f)))&&files.some(f=>blogAnchor.test(f));
if(process.env.FORCE_FULL!=='true'&&printOnly)tier='content';
else if(process.env.FORCE_FULL==='true'||!files.length||files.length>=3000||files.some(f=>full.some(r=>r.test(f))))tier='full';
else if(blogShaped)tier='blog';
else if(files.every(f=>!assetConfig.test(f)&&content.some(r=>r.test(f))))tier='content';
else tier='code';
const browser=new Set();let room=false;
for(const f of files){
  if(/^tests\/.*\.browser-test\.mjs$/.test(f)&&fs.existsSync(f)){if(f.includes('gallery-room'))room=true;else browser.add(f);}
  for(const [r,tests] of areas)if(r.test(f))for(const t of tests){if(t==='ROOM')room=true;else if(fs.existsSync(t))browser.add(t);}
}
const blog=files.some(f=>/(^|\/)blog(\/|-)/.test(f));
const out={tier,print_quotes:String(tier==='content'&&printOnly),browser_tests:[...browser].join(' '),room:String(room),blog:String(blog),count:String(files.length)};
console.log(JSON.stringify(out,null,1));
if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,Object.entries(out).map(([k,v])=>`${k}=${v}\n`).join(''));
