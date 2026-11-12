// Fails when a push, pull request, or scheduled workflow can call a FinerWorks host.
// Checkout may call FinerWorks for a real buyer. CI and deploys may not, unless the
// step is locked to an explicit marker: [print-pilot-test], test_print_orders, or
// [configure-finerworks-billing]. workflow_dispatch-only jobs stay allowed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {dirname, join, normalize} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const AUTOMATIC = new Set(['push', 'pull_request', 'schedule']);
const OPT_IN = ['[print-pilot-test]', 'test_print_orders', '[configure-finerworks-billing]'];

export function contactsFinerWorks(source) {
  if (!source) return false;
  const host = /finerworks\.com/i.test(source) && /\bfetch\s*\(/.test(source);
  const quoteProxy = /\/checkout\/prints\/verify\b/.test(source)
    || /\/checkout\/prints\/billing-setup\b/.test(source)
    || (/\/checkout\/cart\b/.test(source) && /['"]quote['"]/.test(source));
  return host || quoteProxy;
}

function parseWorkflow(text) {
  const lines = text.split(/\r?\n/);
  const triggers = [];
  const steps = [];
  let inOn = false;
  let inSteps = false;
  let stepsIndent = 0;
  let current = null;
  const flush = () => {
    if (!current) return;
    steps.push(parseStep(current));
    current = null;
  };
  for (const line of lines) {
    const trimmed = line.trim();
    const indent = line.match(/^ */)[0].length;
    if (!trimmed || trimmed.startsWith('#')) {
      if (current) current.raw.push(line);
      continue;
    }
    if (inOn && indent <= 0) inOn = false;
    if (indent === 0 && trimmed.startsWith('on:')) {
      flush();
      inSteps = false;
      inOn = true;
      const rest = trimmed.slice(3).trim();
      if (rest && rest !== '|' && rest !== '>') {
        for (const name of rest.replace(/[\[\]]/g, '').split(',')) {
          const trigger = name.trim();
          if (trigger) triggers.push(trigger);
        }
      }
      continue;
    }
    if (inOn && indent === 2 && /^[\w-]+:/.test(trimmed)) triggers.push(trimmed.split(':')[0]);
    if (inSteps && indent <= stepsIndent && !trimmed.startsWith('- ')) {
      inSteps = false;
      flush();
    }
    if (trimmed === 'steps:' || trimmed.startsWith('steps:')) {
      flush();
      inSteps = true;
      stepsIndent = indent;
      continue;
    }
    if (inSteps && trimmed.startsWith('- ') && indent > stepsIndent) {
      flush();
      current = {indent, raw: [line]};
      continue;
    }
    if (current && indent > current.indent) current.raw.push(line);
    else if (current) {
      flush();
      inSteps = false;
    }
  }
  flush();
  return {triggers: [...new Set(triggers)], steps};
}

function parseStep(step) {
  let ifExpr = '';
  const run = [];
  let mode = null;
  let runIndent = 0;
  for (const line of step.raw) {
    let trimmed = line.trim();
    const indent = line.match(/^ */)[0].length;
    if (mode === 'run' && trimmed && indent > runIndent) {
      run.push(trimmed);
      continue;
    }
    mode = null;
    if (!trimmed || trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('- ')) trimmed = trimmed.slice(2).trim();
    const ifMatch = trimmed.match(/^if:\s*(.*)$/);
    if (ifMatch) {
      ifExpr = ifMatch[1];
      continue;
    }
    const runMatch = trimmed.match(/^run:\s*(.*)$/);
    if (!runMatch) continue;
    const rest = runMatch[1];
    if (rest === '|' || rest === '>' || rest === '|-' || rest === '>-') {
      mode = 'run';
      runIndent = indent;
    } else if (rest) run.push(rest.replace(/^['"]|['"]$/g, ''));
  }
  return {ifExpr, run: run.join('\n')};
}

export function isExplicitFinerWorksOptIn(ifExpr) {
  if (!ifExpr || !OPT_IN.some(token => ifExpr.includes(token))) return false;
  let rest = ifExpr;
  rest = rest.replace(/contains\(\s*github\.event\.head_commit\.message\s*,\s*'\[print-pilot-test\]'\s*\)/g, 'OPT');
  rest = rest.replace(/contains\(\s*github\.event\.head_commit\.message\s*,\s*'\[configure-finerworks-billing\]'\s*\)/g, 'OPT');
  rest = rest.replace(/inputs\.test_print_orders/g, 'OPT');
  rest = rest.replace(/\b(?:always|success)\(\)/g, '');
  rest = rest.replace(/\bOPT\b/g, '');
  rest = rest.replace(/&&|\|\||\(|\)/g, '');
  return rest.trim() === '';
}

function invokedScripts(run) {
  const paths = [];
  const re = /(?:^|[\s;&|])node\s+(?:--[\w.=-]+\s+)*([A-Za-z0-9_./-]+\.mjs)\b/g;
  for (const match of run.matchAll(re)) paths.push(match[1]);
  return paths;
}

function localImports(source, fromPath) {
  const dir = dirname(fromPath);
  const out = [];
  const re = /from\s+['"](\.[^'"]+\.mjs)['"]/g;
  for (const match of source.matchAll(re)) {
    const rel = normalize(join(dir, match[1])).replaceAll('\\', '/');
    if (rel.startsWith('payments/') || rel.startsWith('scripts/')) out.push(rel);
  }
  return out;
}

export function automaticFinerWorksCalls(workflows, readScript) {
  const violations = [];
  for (const workflow of workflows) {
    const {triggers, steps} = parseWorkflow(workflow.text);
    if (!triggers.some(trigger => AUTOMATIC.has(trigger))) continue;
    for (const step of steps) {
      if (isExplicitFinerWorksOptIn(step.ifExpr)) continue;
      if (contactsFinerWorks(step.run)) {
        violations.push({workflow: workflow.name, via: 'inline run', excerpt: step.run.slice(0, 180)});
        continue;
      }
      for (const script of invokedScripts(step.run)) {
        const seen = new Set();
        const queue = [script];
        let hit = null;
        while (queue.length) {
          const path = queue.shift();
          if (seen.has(path) || /\.(?:browser-)?test\.mjs$/.test(path)) continue;
          seen.add(path);
          const source = readScript(path);
          if (source == null) continue;
          if (contactsFinerWorks(source)) {
            hit = path;
            break;
          }
          if (seen.size < 8) queue.push(...localImports(source, path));
        }
        if (hit) violations.push({workflow: workflow.name, via: hit, excerpt: step.run.slice(0, 180)});
      }
    }
  }
  return violations;
}

function readRepo(path) {
  try {
    return readFileSync(join(root, path), 'utf8');
  } catch {
    return null;
  }
}

test('known quote scripts contact FinerWorks and the offline price check does not', () => {
  assert.equal(contactsFinerWorks(readRepo('scripts/ci/sample-print-quotes.mjs')), true);
  assert.equal(contactsFinerWorks(readRepo('payments/verify-sampled-quote.mjs')), true);
  assert.equal(contactsFinerWorks(readRepo('payments/verify-print-sandbox.mjs')), true);
  assert.equal(contactsFinerWorks(readRepo('payments/inspect-finerworks-frames.mjs')), true);
  for (const path of ['scripts/ci/check-print-price-table.mjs', 'catalog/print-price-table.mjs']) {
    const source = readRepo(path);
    assert.equal(source == null, false, path);
    assert.equal(contactsFinerWorks(source), false, path);
    assert.doesNotMatch(source, /\bfetch\s*\(/);
    assert.doesNotMatch(source, /finerworks\.com/i);
  }
});

test('an ungated push that runs a quote script fails, and the pilot marker is the exception', () => {
  const caller = 'scripts/ci/sample-print-quotes.mjs';
  const scripts = new Map([[caller, "await fetch(base+'/checkout/prints/verify')"]]);
  const readScript = path => scripts.get(path) ?? null;
  const ungated = {
    name: 'bad.yml',
    text: `on:\n  push:\n    branches: [main]\njobs:\n  quotes:\n    runs-on: ubuntu-latest\n    steps:\n      - run: node ${caller}\n`,
  };
  assert.equal(automaticFinerWorksCalls([ungated], readScript).length, 1);
  const gated = {
    name: 'gated.yml',
    text: `on:\n  push:\n    branches: [main]\n  workflow_dispatch:\njobs:\n  quotes:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Pilot only\n        if: inputs.test_print_orders || contains(github.event.head_commit.message, '[print-pilot-test]')\n        run: node ${caller}\n`,
  };
  assert.deepEqual(automaticFinerWorksCalls([gated], readScript), []);
  const manual = {
    name: 'manual.yml',
    text: `on:\n  workflow_dispatch:\njobs:\n  framing:\n    runs-on: ubuntu-latest\n    steps:\n      - run: node payments/inspect-finerworks-frames.mjs\n`,
  };
  scripts.set('payments/inspect-finerworks-frames.mjs', "await fetch(base+'/checkout/prints/verify')");
  assert.deepEqual(automaticFinerWorksCalls([manual], readScript), []);
  const scheduled = {
    name: 'cron.yml',
    text: `on:\n  schedule:\n    - cron: '17 10 * * *'\njobs:\n  q:\n    runs-on: ubuntu-latest\n    steps:\n      - run: node ${caller}\n`,
  };
  assert.equal(automaticFinerWorksCalls([scheduled], readScript).length, 1);
});

test('no push, pull request, or scheduled workflow calls a FinerWorks host', () => {
  const dir = join(root, '.github/workflows');
  const workflows = readdirSync(dir).filter(name => name.endsWith('.yml') || name.endsWith('.yaml')).map(name => ({
    name,
    text: readFileSync(join(dir, name), 'utf8'),
  }));
  const violations = automaticFinerWorksCalls(workflows, readRepo);
  assert.deepEqual(violations, [], `CI calls FinerWorks:\n${JSON.stringify(violations, null, 2)}`);
  const byName = Object.fromEntries(workflows.map(workflow => [workflow.name, workflow.text]));
  assert.match(byName['release-gate.yml'], /node scripts\/ci\/check-print-price-table\.mjs/);
  assert.doesNotMatch(byName['release-gate.yml'], /sample-print-quotes\.mjs/);
  assert.doesNotMatch(byName['deploy-production.yml'], /verify-sampled-quote\.mjs/);
  assert.match(byName['deploy-checkout-sandbox.yml'], /\[print-pilot-test\]/);
  assert.match(byName['verify-finerworks-framing.yml'], /workflow_dispatch:/);
  assert.doesNotMatch(byName['verify-finerworks-framing.yml'], /\n\s+push:/);
  assert.doesNotMatch(byName['check-print-readiness.yml'], /\n\s+push:/);
  assert.doesNotMatch(byName['check-print-readiness.yml'], /\n\s+schedule:/);
  assert.equal(workflows.some(workflow => /\bschedule:/.test(workflow.text) && /prints\/verify|sample-print-quotes|verify-sampled-quote/.test(workflow.text)), false);
});
