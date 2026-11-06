// Fails when Worker code reads an env binding that the generated Env type,
// plus the secret augmentations, does not declare.
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function parseJsonc(text) {
  const stripped = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  return JSON.parse(stripped);
}

export function configBindingNames(config) {
  const names = new Set();
  for (const db of config.d1_databases || []) if (db.binding) names.add(db.binding);
  for (const bucket of config.r2_buckets || []) if (bucket.binding) names.add(bucket.binding);
  for (const service of config.services || []) if (service.binding) names.add(service.binding);
  for (const binding of config.durable_objects?.bindings || []) if (binding.name) names.add(binding.name);
  for (const key of Object.keys(config.vars || {})) names.add(key);
  if (config.assets?.binding) names.add(config.assets.binding);
  if (config.images?.binding) names.add(config.images.binding);
  return names;
}

function project(configPath) {
  const absolute = path.join(root, configPath);
  const read = ts.readConfigFile(absolute, ts.sys.readFile);
  if (read.error) throw new Error(ts.flattenDiagnosticMessageText(read.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, path.dirname(absolute));
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  return {program, checker: program.getTypeChecker()};
}

function propertiesOf(checker, type) {
  const names = new Set();
  if (!type) return names;
  for (const symbol of checker.getPropertiesOfType(type)) names.add(symbol.getName());
  return names;
}

function namedInterface(checker, program, name) {
  for (const file of program.getSourceFiles()) {
    if (file.isDeclarationFile === false) continue;
    const symbol = checker.resolveName(name, file, ts.SymbolFlags.Interface, false);
    if (!symbol) continue;
    return propertiesOf(checker, checker.getDeclaredTypeOfSymbol(symbol));
  }
  return new Set();
}

function cloudflareEnv(checker, program) {
  for (const file of program.getSourceFiles()) {
    if (file.isDeclarationFile === false) continue;
    const namespace = checker.resolveName('Cloudflare', file, ts.SymbolFlags.Namespace, false);
    const env = namespace?.exports?.get('Env');
    if (!env) continue;
    return propertiesOf(checker, checker.getDeclaredTypeOfSymbol(env));
  }
  return new Set();
}

export function envBindingNames(configPath, interfaceName) {
  const {program, checker} = project(configPath);
  const names = namedInterface(checker, program, interfaceName);
  for (const name of cloudflareEnv(checker, program)) names.add(name);
  return names;
}

function addAccess(names, nameNode) {
  if (nameNode && ts.isIdentifier(nameNode)) names.add(nameNode.text);
  else if (nameNode && ts.isStringLiteral(nameNode)) names.add(nameNode.text);
}

export function bindingAccesses(source) {
  const file = ts.createSourceFile('scan.mjs', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const names = new Set();
  function isEnv(node) {
    return ts.isIdentifier(node) && node.text === 'env';
  }
  function isThisEnv(node) {
    return ts.isPropertyAccessExpression(node) && node.name.text === 'env' && (node.expression.kind === ts.SyntaxKind.ThisKeyword || (ts.isIdentifier(node.expression) && node.expression.text === 'this'));
  }
  function visit(node) {
    if (ts.isPropertyAccessExpression(node) && (isEnv(node.expression) || isThisEnv(node.expression))) addAccess(names, node.name);
    else if (ts.isElementAccessExpression(node) && (isEnv(node.expression) || isThisEnv(node.expression)) && node.argumentExpression && ts.isStringLiteral(node.argumentExpression)) names.add(node.argumentExpression.text);
    else if (ts.isVariableDeclaration(node) && node.initializer && isEnv(node.initializer) && ts.isObjectBindingPattern(node.name)) {
      for (const element of node.name.elements) {
        if (!ts.isBindingElement(element)) continue;
        addAccess(names, element.propertyName || element.name);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return names;
}

function walkSources(dir, skip) {
  const files = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name === 'test' || entry.name === 'media-index') continue;
    const full = path.join(dir, entry.name);
    if (skip.some(part => full.includes(part))) continue;
    if (entry.isDirectory()) files.push(...walkSources(full, skip));
    else if (/\.(mjs|js)$/.test(entry.name) && !entry.name.endsWith('.test.mjs')) files.push(full);
  }
  return files;
}

export function unknownInFile(source, allowed) {
  return [...bindingAccesses(source)].filter(name => !allowed.has(name)).sort();
}

export function checkWorkerTree(dir, allowed) {
  const problems = [];
  for (const file of walkSources(path.join(root, dir), [])) {
    const unknown = unknownInFile(fs.readFileSync(file, 'utf8'), allowed);
    if (unknown.length) problems.push({file: path.relative(root, file).split(path.sep).join('/'), unknown});
  }
  return problems;
}

export function missingConfigBindings(configPath, allowed) {
  const config = parseJsonc(fs.readFileSync(path.join(root, configPath), 'utf8'));
  return [...configBindingNames(config)].filter(name => !allowed.has(name)).sort();
}

function report(label, problems) {
  if (!problems.length) return false;
  console.error(`${label}: undeclared env bindings`);
  for (const problem of problems) console.error(`  ${problem.file}: ${problem.unknown.join(', ')}`);
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const site = envBindingNames('tsconfig.site.json', 'SiteEnv');
  const checkout = envBindingNames('tsconfig.checkout.json', 'CheckoutEnv');
  let failed = false;
  const siteMissing = missingConfigBindings('wrangler.jsonc', site);
  const checkoutMissing = missingConfigBindings('cloudflare/wrangler.jsonc', checkout);
  if (siteMissing.length) {
    console.error(`wrangler.jsonc bindings missing from SiteEnv: ${siteMissing.join(', ')}`);
    failed = true;
  }
  if (checkoutMissing.length) {
    console.error(`cloudflare/wrangler.jsonc bindings missing from CheckoutEnv: ${checkoutMissing.join(', ')}`);
    failed = true;
  }
  if (report('site worker', checkWorkerTree('worker', site))) failed = true;
  if (report('checkout worker', checkWorkerTree('cloudflare', checkout))) failed = true;
  if (!site.has('CATALOG_ADMIN_PASSWORD') || !checkout.has('SQUARE_ACCESS_TOKEN') || !checkout.has('SHIPPO_TOKEN')) {
    console.error('Secret augmentation did not merge into Env');
    failed = true;
  }
  if (failed) process.exit(1);
  console.log(`env bindings ok (site ${site.size}, checkout ${checkout.size})`);
}
