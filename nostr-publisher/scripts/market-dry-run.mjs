#!/usr/bin/env node
// Dry-run: prints UNSIGNED marketplace events as JSON to stdout. Never reads a key, never touches a relay.
//   node nostr-publisher/scripts/market-dry-run.mjs --only warszawska-syrenka     (one listing + shipping options)
//   node nostr-publisher/scripts/market-dry-run.mjs --profile                      (kind 0 profile, merged into --current <file>)
//   node nostr-publisher/scripts/market-dry-run.mjs --only <id> --now 1792800000   (fixed timestamp for repeatable output)
// --only builds a preview even though the product is not approved; previews can never be published.
// Shipping costs: real Shippo rate quotes (the checkout's code, never a label) when SHIPPO_TOKEN, SHIP_FROM_STREET and
// SHIP_FROM_PHONE are set in this shell; otherwise each listing falls back to "contact for a quote". Values are never printed.
// A per-product cost summary goes to stderr.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { runMarket, runProfile } from '../src/market-run.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i === -1 ? undefined : args[i + 1]; };
const now = flag('--now') ? Number(flag('--now')) * 1000 : Date.now();

// Dry-run only: whatever the environment says, force dry-run and never pass a key.
const SHIPPO_VARS = ['SHIPPO_TOKEN', 'SHIP_FROM_STREET', 'SHIP_FROM_PHONE', 'SHIPPO_CUSTOMS_SIGNER', 'SHIPPO_CARRIER_ALLOWLIST'];
const env = { ...Object.fromEntries(SHIPPO_VARS.filter((k) => process.env[k]).map((k) => [k, process.env[k]])), MARKET_MODE: 'dry-run', MARKET_PUBLISH_ENABLED: 'false' };
const unsigned = [];

if (args.includes('--profile')) {
  const current = flag('--current') ? JSON.parse(readFileSync(flag('--current'), 'utf8')) : undefined;
  const result = await runProfile({ env, current, now, allowBlank: !current });
  if (result.template) unsigned.push(result.template);
}
if (flag('--only')) {
  process.chdir(root);   // the catalog checks image files relative to the repo root
  const { products } = await import(resolve(root, 'catalog/catalog.mjs'));
  const tagData = JSON.parse(readFileSync(resolve(root, 'catalog/painting-tags.json'), 'utf8'));
  const ids = flag('--only').split(',');
  const categories = Object.fromEntries(ids.map((id) => [id, (tagData.assignments[id] || []).map((t) => tagData.tags[t]?.label).filter(Boolean)]));
  const result = await runMarket({ env, products, categories, previewIds: ids, now });
  unsigned.push(...result.unsigned);
  for (const item of result.plan.items) console.error(`${item.productId}: ${JSON.stringify(item.shippingCosts || item.reason)}`);
}
if (!unsigned.length) {
  console.error('Nothing to print. Use --only <product-id>[,id] and/or --profile [--current file.json].');
  process.exit(1);
}
console.log(JSON.stringify(unsigned, null, 2));
