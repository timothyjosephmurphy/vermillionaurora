// Offline release-gate check: every enabled catalog print/frame price maps to the
// saved supplier cost plus the intended margin. Zero network calls.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {checkPrintPriceTable} from '../../catalog/print-price-table.mjs';

const prints = JSON.parse(readFileSync(new URL('../../catalog/prints.json', import.meta.url), 'utf8'));
const books = JSON.parse(readFileSync(new URL('../../catalog/book-prints.json', import.meta.url), 'utf8'));
const result = checkPrintPriceTable(prints, books);
if (!result.ok) {
  console.error('Print price table failed:');
  for (const error of result.errors.slice(0, 50)) console.error(' -', error);
  if (result.errors.length > 50) console.error(` …and ${result.errors.length - 50} more`);
  process.exit(1);
}
assert(result.counts.unframed > 0, 'Expected priced unframed prints');
console.log(`PASS: offline price table — ${result.counts.artworks} artworks, ${result.counts.unframed} unframed, ${result.counts.framed} framed. No FinerWorks calls.`);
