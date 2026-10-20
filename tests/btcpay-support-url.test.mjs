import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const sandbox = { URLSearchParams };
vm.runInNewContext(fs.readFileSync('script.js', 'utf8'), sandbox);
const { btcpayReference } = sandbox;
const ref = (q) => btcpayReference(new URLSearchParams(q));

test('BTCPay Support URL params become a validated "Re:" line; empty or unsafe values are ignored', () => {
  assert.equal(ref('order=A-123&invoice=Inv_9xYz'), 'Re: BTCPay invoice Inv_9xYz, order A-123');
  assert.equal(ref('invoice=ABC&order='), 'Re: BTCPay invoice ABC');
  assert.equal(ref('order=42'), 'Re: BTCPay order 42');
  assert.equal(ref('order=&invoice='), '');
  assert.equal(ref(''), '');
  assert.equal(ref('invoice=<script>alert(1)</script>&order=7'), 'Re: BTCPay order 7');
  assert.equal(ref('invoice=' + 'a'.repeat(65)), '');
  assert.equal(ref('invoice={InvoiceId}'), '');
});

test('commissions form has the hidden btcpayRef field and the submit adds it to the description', () => {
  assert.match(fs.readFileSync('src/pages/commissions/index.astro', 'utf8'), /<input type="hidden" name="btcpayRef" value="">/);
  assert.match(fs.readFileSync('script.js', 'utf8'), /data\.get\('btcpayRef'\)[\s\S]*data\.set\('description', description\)/);
});

test('/contact redirects to the commissions form without dropping the query string (Cloudflare keeps it)', () => {
  const rules = fs.readFileSync('static/_redirects', 'utf8').split('\n').map(l => l.trim().split(/\s+/));
  for (const from of ['/contact', '/contact/']) {
    const r = rules.find(l => l[0] === from);
    assert.deepEqual(r.slice(1), ['/commissions/#form', '301']);
    assert.ok(!r[1].includes('?'), 'no fixed query in the target, so the incoming one is passed through');
  }
});
