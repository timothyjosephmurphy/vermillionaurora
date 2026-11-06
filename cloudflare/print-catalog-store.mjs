// Mutable print catalog shared by Node, Worker tests, and the checkout Worker.
// Node and Worker tests install it by importing print-catalog.mjs. The checkout
// Worker installs the same object from Workers Static Assets (print-catalog-asset.mjs).
export const prints = {};
let installedVersion = '';

export function printCatalogInstalledVersion() {
  return installedVersion;
}

export function installPrintCatalog(source, version) {
  if (!source || typeof source !== 'object' || Array.isArray(source) || typeof version !== 'string' || !version) throw Error('Invalid print catalog');
  const incoming = source === prints ? { ...prints } : source;
  for (const key of Object.keys(prints)) delete prints[key];
  Object.assign(prints, incoming);
  installedVersion = version;
  return prints;
}

export function clearPrintCatalog() {
  for (const key of Object.keys(prints)) delete prints[key];
  installedVersion = '';
}
