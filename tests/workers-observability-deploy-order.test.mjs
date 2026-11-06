import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const tokenExpr = 'secrets.CLOUDFLARE_PROD_API_TOKEN || secrets.CLOUDFLARE_SANDBOX_API_TOKEN';

function jobBody(yml, id) {
  const lines = yml.split('\n');
  const start = lines.findIndex(line => line === `  ${id}:`);
  assert.ok(start !== -1, `missing job ${id}`);
  let end = lines.findIndex((line, index) => index > start && /^  [a-z0-9-]+:$/.test(line));
  if (end === -1) end = lines.length;
  return lines.slice(start, end).join('\n');
}

test('both production Workers enable logs and traces (#810)', () => {
  const site = JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8'));
  const checkout = JSON.parse(fs.readFileSync('cloudflare/wrangler.jsonc', 'utf8'));
  assert.equal(site.name, 'vermillionaurora');
  assert.equal(checkout.name, 'vermillion-commissions');
  for (const [config, rate] of [[site, 0.25], [checkout, 0.1]]) {
    assert.equal(config.observability.enabled, true);
    assert.equal(config.observability.logs.enabled, true);
    assert.equal(config.observability.logs.invocation_logs, true);
    assert.equal(config.observability.traces.enabled, true);
    assert.equal(config.observability.traces.head_sampling_rate, rate);
  }
  assert.match(checkout.triggers.crons.join(' '), /\*\/5 \* \* \* \*/);
});

test('production deploy publishes checkout before the website wait and prefers the prod token (#811)', () => {
  const yml = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
  const triggers = yml.slice(yml.indexOf('\non:\n'), yml.indexOf('\npermissions:'));
  assert.match(triggers, /push:\n {4}branches: \[main\]/);
  assert.match(triggers, /workflow_dispatch:/);
  assert.doesNotMatch(triggers, /pull_request/);
  assert.equal(yml.includes(tokenExpr), true);
  assert.doesNotMatch(yml, /apiToken: \$\{\{ secrets\.CLOUDFLARE_SANDBOX_API_TOKEN \}\}/);
  assert.match(yml, /Cloudflare API token source: CLOUDFLARE_PROD_API_TOKEN/);
  assert.match(yml, /Cloudflare API token source: fallback CLOUDFLARE_SANDBOX_API_TOKEN/);
  const checkout = jobBody(yml, 'deploy-checkout');
  const site = jobBody(yml, 'verify-site');
  assert.doesNotMatch(checkout, /\n    needs:/);
  assert.match(checkout, /workingDirectory: cloudflare/);
  assert.match(checkout, /command: deploy --config wrangler.jsonc/);
  assert.match(checkout, /vermillion-commissions\.timothyjosephmurphy\.workers\.dev\/checkout\/health/);
  assert.doesNotMatch(checkout, /Wait for Workers Builds/);
  assert.match(site, /needs: deploy-checkout/);
  assert.match(site, /Wait for Workers Builds to publish this website version/);
  assert.match(site, /node scripts\/verify-release\.mjs/);
  assert.doesNotMatch(site, /command: deploy/);
  assert.doesNotMatch(yml, /--name vermillionaurora/);
  assert.ok(yml.indexOf('deploy-checkout:') < yml.indexOf('verify-site:'));
});

test('rollback keeps checkout before the website and uses the same token fallback (#811)', () => {
  const yml = fs.readFileSync('.github/workflows/rollback.yml', 'utf8');
  assert.equal(yml.includes(tokenExpr), true);
  assert.doesNotMatch(yml, /apiToken: \$\{\{ secrets\.CLOUDFLARE_SANDBOX_API_TOKEN \}\}/);
  assert.match(yml, /Cloudflare API token source: fallback CLOUDFLARE_SANDBOX_API_TOKEN/);
  const checkout = yml.indexOf('Roll back the checkout Worker');
  const site = yml.indexOf('Roll back the website Worker');
  assert.ok(checkout !== -1 && site !== -1 && checkout < site);
  assert.match(yml, /--name vermillion-commissions/);
  assert.match(yml, /--name vermillionaurora/);
  const doc = fs.readFileSync('docs/cloudflare-prod-api-token.md', 'utf8');
  assert.match(doc, /CLOUDFLARE_PROD_API_TOKEN/);
  assert.match(doc, /vermillion-commissions/);
  assert.match(doc, /vermillionaurora/);
  assert.match(doc, /tjm-catalog/);
  assert.match(doc, /e7514ceb-a633-4613-9cf1-cda817d8ca94/);
  assert.match(doc, /vermillion-sales-records/);
  assert.match(doc, /vermillion-commission-uploads/);
  assert.match(doc, /Workers R2 Storage/);
  assert.match(doc, /Cache Purge/);
  assert.match(doc, /5c51165760cc5bc41120a3567c75dc28/);
});
