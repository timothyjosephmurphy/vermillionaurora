// Submit-button state for /testimonials/: every exit path must leave the button off "Sending…".
// Network is mocked (no real pending testimonials). Covers text-only, photo, video, 4xx/5xx, network
// failure, validation, and video chunk failure. Also checks the city/region field copy.
// Requires dist/ (release gate runs npm run build first).
import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const origin = 'https://tjm.art';
assert(fs.existsSync(path.join(root, 'testimonials/index.html')), 'dist/testimonials missing — run npm run build');

const tinyJpeg = Buffer.from(
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//Z',
  'base64',
);

const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
};

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE
    ? {executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--no-zygote']}
    : {}),
});

function mockApis(page, {submit, videoPart} = {}) {
  return page.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname !== 'tjm.art') return route.abort();
    if (url.pathname === '/testimonials/api/approved') {
      return route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({testimonials: []})});
    }
    if (url.pathname === '/testimonials/api/video/start') {
      return route.fulfill({
        status: 200, contentType: 'application/json',
        body: JSON.stringify({id: 'v-mock', token: 'tok', parts: 1, partBytes: 8 * 1024 * 1024}),
      });
    }
    if (url.pathname === '/testimonials/api/video/part') {
      if (typeof videoPart === 'function') return videoPart(route);
      return route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({etag: '"part1"'})});
    }
    if (url.pathname === '/testimonials/api/video/complete') {
      return route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
    }
    if (url.pathname === '/testimonials/api/video/abort') {
      return route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ok: true})});
    }
    if (url.pathname === '/testimonials/api/submit') {
      if (typeof submit === 'function') return submit(route);
      return route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({success: true, id: 't-mock'})});
    }
    const file = path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return route.fulfill({body: fs.readFileSync(file), contentType: types[path.extname(file)] || 'application/octet-stream'});
    }
    return route.fulfill({status: 404});
  });
}

async function openForm(context, mocks = {}) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await mockApis(page, mocks);
  await page.goto(origin + '/testimonials/#share', {waitUntil: 'domcontentloaded'});
  await page.locator('[data-testimonial-form]').waitFor();
  await page.locator('button[type=submit]').waitFor();
  return {page, errors};
}

async function buttonState(page) {
  return page.evaluate(() => {
    const b = document.querySelector('button[type=submit]');
    const status = document.querySelector('[data-form-status]');
    const form = document.querySelector('[data-testimonial-form]');
    const thanks = document.querySelector('[data-thanks]');
    return {
      label: b.textContent.trim(),
      disabled: b.disabled,
      status: (status.textContent || '').trim(),
      formHidden: form.hidden,
      thanksVisible: Boolean(thanks && !thanks.hidden),
      stuckSending: b.textContent.includes('Sending…'),
    };
  });
}

const quote = 'A lovely painting that brightens our hallway every morning.';

try {
  const context = await browser.newContext({viewport: {width: 1100, height: 900}});

  // City / region field copy
  {
    const {page} = await openForm(context);
    const label = await page.locator('label:has(input[name=city]) > span').first().textContent();
    assert.equal(label.trim(), 'City, state and country (optional)');
    assert.equal(await page.locator('input[name=city]').getAttribute('placeholder'), 'e.g. Seattle, WA, USA');
    assert.equal(await page.locator('input[name=city]').getAttribute('maxlength'), '100');
    assert.equal(
      (await page.locator('#city-help').textContent()).trim(),
      'Shown with your testimonial and as an approximate pin on the map. Never your address.',
    );
    assert.match(await page.locator('.share-points').textContent(), /city, state and country/i);
    await page.close();
    console.log('ok city field copy');
  }

  // Success: text-only (with city, state, country)
  {
    const {page, errors} = await openForm(context);
    await page.locator('textarea[name=quote]').fill(quote);
    await page.locator('input[name=city]').fill('Seattle, WA, USA');
    await page.locator('button[type=submit]').click();
    await page.locator('[data-thanks]').waitFor({state: 'visible', timeout: 10000});
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false, 'text-only success must not leave Sending…');
    assert.equal(state.thanksVisible, true);
    assert.equal(state.formHidden, true);
    assert.equal(state.label, 'Sent — thank you');
    assert.equal(state.disabled, true);
    assert.deepEqual(errors, []);
    await page.close();
    console.log('ok text-only success');
  }

  // Success: with photo
  {
    const {page, errors} = await openForm(context);
    await page.locator('textarea[name=quote]').fill(quote);
    await page.locator('[data-photo-input]').setInputFiles({name: 'wall.jpg', mimeType: 'image/jpeg', buffer: tinyJpeg});
    await page.locator('[data-photo-previews] li').waitFor();
    await page.locator('button[type=submit]').click();
    await page.locator('[data-thanks]').waitFor({state: 'visible', timeout: 15000});
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.thanksVisible, true);
    assert.equal(state.label, 'Sent — thank you');
    assert.deepEqual(errors, []);
    await page.close();
    console.log('ok photo success');
  }

  // Success: with video (quote optional)
  {
    const {page, errors} = await openForm(context);
    const videoBuf = Buffer.alloc(64 * 1024, 1);
    await page.locator('[data-video-input]').setInputFiles({name: 'clip.webm', mimeType: 'video/webm', buffer: videoBuf});
    await page.locator('[data-video-selected]').waitFor();
    await page.locator('input[name=city]').fill('Warsaw, Poland');
    await page.locator('button[type=submit]').click();
    await page.locator('[data-thanks]').waitFor({state: 'visible', timeout: 20000});
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.thanksVisible, true);
    assert.equal(await page.locator('[data-thanks-video]').isVisible(), true);
    assert.equal(state.label, 'Sent — thank you');
    assert.deepEqual(errors, []);
    await page.close();
    console.log('ok video success');
  }

  // Server 4xx
  {
    const {page} = await openForm(context, {
      submit: route => route.fulfill({
        status: 400, contentType: 'application/json',
        body: JSON.stringify({error: 'Please write a few words.'}),
      }),
    });
    await page.locator('textarea[name=quote]').fill(quote);
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => {
      const b = document.querySelector('button[type=submit]');
      return b && !b.disabled && b.textContent === 'Send my testimonial';
    });
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.label, 'Send my testimonial');
    assert.match(state.status, /Please write a few words/);
    assert.equal(state.thanksVisible, false);
    await page.close();
    console.log('ok server 4xx');
  }

  // Server 5xx
  {
    const {page} = await openForm(context, {
      submit: route => route.fulfill({
        status: 500, contentType: 'application/json',
        body: JSON.stringify({error: 'Sorry, your testimonial could not be saved. Please try again.'}),
      }),
    });
    await page.locator('textarea[name=quote]').fill(quote);
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => {
      const b = document.querySelector('button[type=submit]');
      return b && !b.disabled && b.textContent === 'Send my testimonial';
    });
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.label, 'Send my testimonial');
    assert.match(state.status, /could not be saved|something went wrong/i);
    await page.close();
    console.log('ok server 5xx');
  }

  // Network failure
  {
    const {page} = await openForm(context, {submit: route => route.abort('failed')});
    await page.locator('textarea[name=quote]').fill(quote);
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => {
      const b = document.querySelector('button[type=submit]');
      return b && !b.disabled && b.textContent === 'Send my testimonial';
    });
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.label, 'Send my testimonial');
    assert.ok(state.status.length > 0);
    await page.close();
    console.log('ok network failure');
  }

  // Validation (button never enters Sending…)
  {
    const {page} = await openForm(context);
    await page.locator('button[type=submit]').click();
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.disabled, false);
    assert.equal(state.label, 'Send my testimonial');
    assert.match(state.status, /few words|video/i);
    await page.close();
    console.log('ok validation error');
  }

  // Video chunk failure
  {
    const {page} = await openForm(context, {
      videoPart: route => route.fulfill({
        status: 500, contentType: 'application/json',
        body: JSON.stringify({error: 'Upload failed (500)'}),
      }),
    });
    await page.locator('[data-video-input]').setInputFiles({
      name: 'clip.webm', mimeType: 'video/webm', buffer: Buffer.alloc(64 * 1024, 2),
    });
    await page.locator('[data-video-selected]').waitFor();
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => {
      const b = document.querySelector('button[type=submit]');
      return b && !b.disabled && b.textContent === 'Send my testimonial';
    }, null, {timeout: 30000});
    const state = await buttonState(page);
    assert.equal(state.stuckSending, false);
    assert.equal(state.label, 'Send my testimonial');
    assert.ok(state.status.length > 0);
    await page.close();
    console.log('ok video chunk failure');
  }

  await context.close();
  console.log('Testimonials send-button browser test passed');
} finally {
  await browser.close();
}
