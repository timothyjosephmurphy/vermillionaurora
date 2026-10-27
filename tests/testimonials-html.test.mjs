import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/site.mjs';
import {injectTestimonials, safeEntry} from '../worker/testimonials-html.mjs';

const shell = `<!doctype html><html><head><title>Collector Testimonials</title>
</head><body><p class="testimonials-jump" data-has-testimonials hidden><a href="#share">Share your story</a></p><section class="testimonials-wall" aria-labelledby="wall-heading" data-has-testimonials hidden><h2 id="wall-heading">What collectors say</h2><ul class="testimonial-list" data-testimonial-list></ul></section><form class="testimonial-form" action="/testimonials/api/submit" method="POST"></form><p class="video-fallback" hidden>keep</p></body></html>`;

const jack = {
  id: 't-20261018-21557b4ee6b8',
  name: 'Jack M.',
  email: 'jack@example.com',
  city: 'Kent, OH',
  painting: 'Brothers Hike Mt. Rainer',
  paintingHref: '',
  quote: 'It hangs in the kitchen & glows.',
  photos: ['/testimonials/api/photo/t-20261018-21557b4ee6b8/0', '/testimonials/api/photo/t-20261018-21557b4ee6b8/1'],
  video: null,
  rating: 5,
  pin: [41.15, -81.36],
};

test('approved quotes are in the HTML, with quotation schema and no star rating', () => {
  const html = injectTestimonials(shell, [jack, {
    id: 't-20261008-b0e8eb1e1530',
    name: '',
    quote: 'A short note.',
    city: 'St Anthony, MN',
    painting: 'Sunset El Salvador',
    paintingHref: '/products/sunset-el-salvador/',
    photos: [],
    video: {src: '/testimonials/api/video/t-20261008-b0e8eb1e1530', type: 'video/mp4', poster: '/testimonials/api/video/t-20261008-b0e8eb1e1530/poster'},
  }]);
  assert.match(html, /It hangs in the kitchen &amp; glows\./);
  assert.match(html, /<strong>Jack M\.<\/strong> · Kent, OH/);
  assert.match(html, /id="t-20261018-21557b4ee6b8"/);
  assert.match(html, /src="\/testimonials\/api\/photo\/t-20261018-21557b4ee6b8\/0"/);
  assert.match(html, /class="testimonial-thumbs"/);
  assert.match(html, /<strong>A collector<\/strong>/);
  assert.match(html, /href="\/products\/sunset-el-salvador\/"/);
  assert.match(html, /<video controls playsinline preload="none"/);
  assert.match(html, /poster="\/testimonials\/api\/video\/t-20261008-b0e8eb1e1530\/poster"/);
  assert.equal(html.includes('jack@example.com'), false);
  assert.doesNotMatch(html, /AggregateRating|reviewRating|"@type":"Review"/);
  assert.match(html, /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"ItemList"/);
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">(.+?)<\/script>/)[1]);
  assert.equal(ld.itemListElement.length, 2);
  assert.equal(ld.itemListElement[0].item['@type'], 'Quotation');
  assert.equal(ld.itemListElement[0].item.text, 'It hangs in the kitchen & glows.');
  assert.equal(ld.itemListElement[0].item.author.name, 'Jack M.');
  assert.equal(ld.itemListElement[1].item.about.url, 'https://tjm.art/products/sunset-el-salvador/');
  assert.equal(ld.itemListElement[0].item.about.url, undefined);
  assert.doesNotMatch(html, /data-has-testimonials hidden/);
  assert.match(html, /<p class="video-fallback" hidden>keep<\/p>/);
  assert.match(html, /action="\/testimonials\/api\/submit"/);
  assert.equal(html.split('id="t-20261018-21557b4ee6b8"').length, 2);
  const again = injectTestimonials(html, [jack]);
  assert.equal(again.split('id="t-20261018-21557b4ee6b8"').length, 2);
  assert.equal(again.split('application/ld+json').length, 2);
});

test('quote markup cannot break out of the page, and unsafe urls are dropped', () => {
  const html = injectTestimonials(shell, [{
    id: 't-20261009-2e99f4b2bfb2',
    name: '<script>alert(1)</script>',
    quote: '</script><img src=x onerror=alert(1)>',
    city: 'A & B',
    painting: 'A painting',
    paintingHref: 'javascript:alert(1)',
    photos: ['https://evil.example/a.jpg', '/testimonials/api/photo/t-20261009-2e99f4b2bfb2/0'],
    video: {src: 'https://evil.example/v.mp4', type: 'video/mp4', poster: '/poster.jpg'},
    email: 'secret@example.com',
  }]);
  assert.equal(html.includes('secret@example.com'), false);
  assert.equal(html.includes('evil.example'), false);
  assert.equal(html.includes('javascript:'), false);
  assert.equal(html.includes('<script>alert'), false);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /&lt;\/script&gt;&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(html, /\\u003c\/script>/);
  assert.equal((html.match(/<\/script>/g) || []).length, 1);
  assert.doesNotMatch(html, /<figure class="testimonial-video">/);
  assert.match(html, /src="\/testimonials\/api\/photo\/t-20261009-2e99f4b2bfb2\/0"/);
  assert.equal(safeEntry({id: 'nope', quote: 'x'}), null);
  assert.equal(injectTestimonials(shell, []), null);
  assert.equal(injectTestimonials('<html></html>', [jack]), null);
});

test('an existing card is not duplicated, and a nested list does not swallow later quotes', () => {
  const prior = shell.replace('data-testimonial-list>', 'data-testimonial-list><li class="testimonial" id="t-20261018-21557b4ee6b8"><ul><li>thumb</li></ul></li>');
  const html = injectTestimonials(prior, [jack, {id: 't-20261014-ee936c2ac75b', name: 'Paul Murphy', quote: 'Warm.', photos: []}]);
  assert.equal(html.split('id="t-20261018-21557b4ee6b8"').length, 2);
  assert.match(html, /id="t-20261014-ee936c2ac75b"/);
  assert.match(html, /<li>thumb<\/li>/);
  const ul = html.slice(html.indexOf('data-testimonial-list'), html.indexOf('</section>'));
  assert.ok(ul.indexOf('id="t-20261014-ee936c2ac75b"') > ul.indexOf('<li>thumb</li>'));
});

const assetHeaders = {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate', ETag: '"built"'};
function envFor(quotes, {fail = false} = {}) {
  const seen = [];
  const env = {
    LEGACY_REDIRECT: 'false',
    PRIMARY_HOST: 'tjm.art',
    ASSETS: {fetch: () => new Response(shell, {headers: assetHeaders})},
    CHECKOUT: {fetch: async request => {
      seen.push(new URL(request.url).pathname);
      if (fail) throw Error('down');
      return Response.json({testimonials: quotes});
    }},
  };
  return {env, seen};
}

test('GET /testimonials/ on tjm.art inlines approved quotes and keeps the form', async () => {
  const {env, seen} = envFor([jack]);
  const res = await worker.fetch(new Request('https://tjm.art/testimonials/?thanks=1'), env);
  const html = await res.text();
  assert.deepEqual(seen, ['/testimonials/api/approved']);
  assert.match(html, /It hangs in the kitchen &amp; glows\./);
  assert.match(html, /"@type":"Quotation"/);
  assert.match(html, /action="\/testimonials\/api\/submit"/);
  assert.equal(res.headers.get('Cache-Control'), 'public, max-age=60, must-revalidate');
  assert.equal(res.headers.get('ETag'), null);
  const bare = envFor([]);
  const unchanged = await worker.fetch(new Request('https://tjm.art/testimonials'), bare.env);
  assert.equal(await unchanged.text(), shell);
  assert.equal(unchanged.headers.get('Cache-Control'), 'public, max-age=0, must-revalidate');
  const down = envFor([jack], {fail: true});
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/testimonials/'), down.env)).text(), shell);
  const other = envFor([jack]);
  assert.equal(await (await worker.fetch(new Request('https://vermillionaurora.com/testimonials/'), other.env)).text(), shell);
  assert.deepEqual(other.seen, []);
  const manager = envFor([jack]);
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/testimonial-manager/'), manager.env)).text(), shell);
  assert.deepEqual(manager.seen, []);
  const api = envFor([jack]);
  assert.equal(await (await worker.fetch(new Request('https://tjm.art/testimonials/api/approved'), api.env)).text(), JSON.stringify({testimonials: [jack]}));
  assert.deepEqual(api.seen, ['/testimonials/api/approved']);
});
