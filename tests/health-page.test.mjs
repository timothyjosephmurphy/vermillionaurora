import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { classifyChangeSet } from '../scripts/ci/classify-changes.mjs';
import { WORKER_FIRST_PATTERNS } from '../worker/routes-config.mjs';
import { HEALTH_URL, checkedAtLabel, healthView, loadHealth } from '../src/pages/health/report.mjs';

const IDS = [
  'health-status', 'health-summary', 'health-checked', 'health-error', 'health-dashboard', 'health-dashboard-link',
  'health-metrics', 'health-areas', 'health-area-tiles', 'health-issues', 'health-issue-rows',
  'health-lighthouse', 'health-lighthouse-meta', 'health-lighthouse-scores', 'health-lighthouse-metrics', 'health-lighthouse-console',
  'health-pages', 'health-page-rows',
];

function fakeDocument() {
  const nodes = new Map();
  function createElement(tag) {
    const el = {
      tag,
      hidden: false,
      className: '',
      href: '',
      rel: '',
      target: '',
      children: [],
      _text: '',
      append(...kids) { this.children.push(...kids); },
      replaceChildren(...kids) { this.children = kids; },
    };
    Object.defineProperty(el, 'textContent', {
      get() {
        const nested = this.children.map((child) => child.textContent || '').join('');
        return this.children.length ? `${this._text}${nested}` : this._text;
      },
      set(value) {
        this._text = value == null ? '' : String(value);
        this.children = [];
      },
    });
    return el;
  }
  for (const id of IDS) {
    const el = createElement('div');
    el.id = id;
    nodes.set(id, el);
  }
  return {
    readyState: 'complete',
    getElementById: (id) => nodes.get(id) || null,
    createElement,
  };
}

const sample = {
  checked_at: '2026-11-17T08:05:00Z',
  checked_at_label: 'Tuesday, November 17, 2026, 12:05 AM PT (Pacific)',
  library_dashboard: 'https://cursor.com/canvas/example',
  overall: { status: 'Good', tone: 'success', summary: 'Every key page returned 200.' },
  metrics: [{ value: '92', label: 'Mobile Lighthouse', detail: 'Performance score', tone: 'success' }],
  areas: [
    { name: 'Key pages', status: 'Good', tone: 'success', summary: 'All sampled URLs returned 200.' },
    { name: 'Security', status: 'Fair', tone: 'warning', summary: 'CSP is report-only.' },
  ],
  issues: [
    { severity: 'Medium', tone: 'warning', area: 'Performance', title: 'Testimonials are slow', what: 'The page took 1.8 seconds.', fix: 'Cache the public page.', tracker: 'https://github.com/timothyjosephmurphy/studio-tracker/issues/882' },
    { severity: 'Low', tone: 'warning', area: 'Performance', title: 'Short cache', fix: 'Raise Cache-Control.', tracker: null },
    { severity: 'Info', area: 'SEO', what: 'JSON-LD is missing on a few pages.', fix: 'Add a Blog schema.', tracker: 'javascript:alert(1)' },
  ],
  pages: [{ url: 'https://tjm.art/', status: 200, time: '139–611 ms', notes: 'Canonical present' }],
  lighthouse: {
    form_factor: 'mobile',
    runner: 'Lighthouse 12',
    scores: { performance: 92, seo: 100 },
    metrics: { largest_contentful_paint: '3.2 s' },
    console_errors: 0,
  },
};

test('the health page is an unlisted static page with the site chrome', () => {
  const page = fs.readFileSync('src/pages/health/index.astro', 'utf8');
  assert.match(page, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(page, /<title>Site health \| TJ Murphy<\/title>/);
  assert.match(page, /import SiteHeader/);
  assert.match(page, /import SiteFooter/);
  assert.match(page, /loadHealth/);
  assert.doesNotMatch(page, /PolicyLayout/);
  assert.equal(HEALTH_URL, 'https://img.tjm.art/health/latest.json');
  const header = fs.readFileSync('src/components/SiteHeader.astro', 'utf8');
  assert.doesNotMatch(header, /\/health\//);
  const footer = fs.readFileSync('src/components/SiteFooter.astro', 'utf8');
  const links = footer.match(/<div class="footer-links">([\s\S]*?)<\/div>/)[1];
  const anchors = [...links.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  const last = anchors.at(-1);
  assert.match(last[1], /href="\/health\/"/);
  assert.match(last[1], /rel="nofollow"/);
  assert.match(last[2], /Site health/);
  assert.equal(anchors.filter((anchor) => anchor[1].includes('href="/health/"')).length, 1);
  assert.doesNotMatch(fs.readFileSync('robots.txt', 'utf8'), /\/health/);
  assert.equal(WORKER_FIRST_PATTERNS.some((pattern) => pattern.includes('health')), false);
});

test('this change stays on the code tier and does not request print quotes', () => {
  const files = [
    'src/pages/health/index.astro',
    'src/pages/health/report.mjs',
    'src/components/SiteFooter.astro',
    'tests/health-page.test.mjs',
  ];
  const out = classifyChangeSet(files);
  assert.equal(out.tier, 'code');
  assert.equal(out.print_quotes, 'false');
  assert.equal(out.browser_tests.includes('tests/print-matting.browser-test.mjs'), false);
  assert.equal(out.browser_tests.includes('tests/print-editions.browser-test.mjs'), false);
});

test('checked time uses the report label, or formats checked_at in Pacific Time', () => {
  assert.equal(
    checkedAtLabel({ checked_at_label: 'Tuesday, November 17, 2026, 12:05 AM PT (Pacific)', checked_at: '2020-01-01T00:00:00Z' }),
    'Tuesday, November 17, 2026, 12:05 AM PT (Pacific)',
  );
  const formatted = checkedAtLabel({ checked_at: '2026-11-17T08:05:00Z' });
  assert.match(formatted, /November 17, 2026/);
  assert.match(formatted, /12:05/);
  assert.match(formatted, /AM/);
  assert.match(formatted, /PT \(Pacific\)$/);
  assert.equal(checkedAtLabel({}), '');
  const view = healthView({ issues: [{ title: 'Only a title', what: '', tracker: 'not a url' }] });
  assert.equal(view.issues[0].what, 'Only a title');
  assert.equal(view.issues[0].title, '');
  assert.equal(view.issues[0].tracker, '');
});

test('the page renders the health report and keeps optional sections when they are present', async () => {
  const doc = fakeDocument();
  await loadHealth(doc, async (url, init) => {
    assert.equal(url, HEALTH_URL);
    assert.equal(init.cache, 'no-store');
    return { ok: true, json: async () => sample };
  });
  assert.equal(doc.getElementById('health-error').hidden, true);
  assert.equal(doc.getElementById('health-status').textContent, 'Good');
  assert.match(doc.getElementById('health-status').className, /success/);
  assert.equal(doc.getElementById('health-summary').textContent, 'Every key page returned 200.');
  assert.equal(doc.getElementById('health-checked').textContent, 'Checked at Tuesday, November 17, 2026, 12:05 AM PT (Pacific)');
  assert.equal(doc.getElementById('health-dashboard').hidden, false);
  assert.equal(doc.getElementById('health-dashboard-link').href, 'https://cursor.com/canvas/example');
  const tiles = doc.getElementById('health-area-tiles').children;
  assert.equal(tiles.length, 2);
  assert.match(tiles[0].textContent, /Key pages/);
  assert.match(tiles[0].textContent, /Good/);
  assert.match(tiles[0].textContent, /All sampled URLs returned 200\./);
  assert.match(tiles[1].className, /warning/);
  assert.equal(doc.getElementById('health-metrics').children[0].textContent.includes('92'), true);
  const rows = doc.getElementById('health-issue-rows').children;
  assert.equal(rows.length, 3);
  assert.match(rows[0].textContent, /Medium/);
  assert.match(rows[0].textContent, /Performance/);
  assert.match(rows[0].textContent, /Testimonials are slow/);
  assert.match(rows[0].textContent, /The page took 1\.8 seconds\./);
  assert.match(rows[0].textContent, /Cache the public page\./);
  assert.equal(rows[0].children[4].children[0].href, 'https://github.com/timothyjosephmurphy/studio-tracker/issues/882');
  assert.match(rows[1].textContent, /Short cache/);
  assert.equal(rows[1].children[4].textContent, '—');
  assert.match(rows[2].textContent, /JSON-LD is missing/);
  assert.equal(rows[2].children[4].textContent, '—');
  assert.match(doc.getElementById('health-lighthouse-scores').textContent, /Performance/);
  assert.match(doc.getElementById('health-lighthouse-scores').textContent, /92/);
  assert.match(doc.getElementById('health-lighthouse-metrics').textContent, /3\.2 s/);
  assert.match(doc.getElementById('health-lighthouse-console').textContent, /Console errors: 0/);
  const pageRow = doc.getElementById('health-page-rows').children[0];
  assert.equal(pageRow.children[0].children[0].href, 'https://tjm.art/');
  assert.match(pageRow.textContent, /200/);
  assert.match(pageRow.textContent, /139–611 ms/);
  assert.equal(doc.getElementById('health-areas').hidden, false);
  assert.equal(doc.getElementById('health-issues').hidden, false);
  assert.equal(doc.getElementById('health-pages').hidden, false);
});

test('optional sections stay hidden when the report omits them', async () => {
  const doc = fakeDocument();
  await loadHealth(doc, async () => ({ ok: true, json: async () => ({ overall: { status: 'Good', summary: 'Quiet day.' } }) }));
  assert.equal(doc.getElementById('health-status').textContent, 'Good');
  assert.equal(doc.getElementById('health-metrics').hidden, true);
  assert.equal(doc.getElementById('health-areas').hidden, true);
  assert.equal(doc.getElementById('health-issues').hidden, true);
  assert.equal(doc.getElementById('health-lighthouse').hidden, true);
  assert.equal(doc.getElementById('health-pages').hidden, true);
  assert.equal(doc.getElementById('health-dashboard').hidden, true);
});

test('a failed fetch shows an error instead of a blank report', async () => {
  for (const fetchImpl of [
    async () => { throw new Error('network'); },
    async () => ({ ok: false, status: 503, json: async () => ({}) }),
    async () => ({ ok: true, json: async () => { throw new Error('not json'); } }),
  ]) {
    const doc = fakeDocument();
    doc.getElementById('health-status').textContent = 'Loading the latest check…';
    await loadHealth(doc, fetchImpl);
    assert.equal(doc.getElementById('health-error').hidden, false);
    assert.equal(doc.getElementById('health-error').textContent, 'The latest health check could not be loaded.');
    assert.equal(doc.getElementById('health-status').hidden, true);
    assert.equal(doc.getElementById('health-areas').hidden, true);
    assert.equal(doc.getElementById('health-issues').hidden, true);
  }
});

test('a built sitemap leaves the health page out', () => {
  if (!fs.existsSync('dist/sitemap.xml')) return;
  assert.doesNotMatch(fs.readFileSync('dist/sitemap.xml', 'utf8'), /\/health\//);
  const html = fs.readFileSync('dist/health/index.html', 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(html, /<title>Site health \| TJ Murphy<\/title>/);
});
