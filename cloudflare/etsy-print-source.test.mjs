import test from 'node:test';
import assert from 'node:assert/strict';
import listings,{sourcePrintVersion} from './etsy-print-source.mjs';
import {printVersion} from './print-catalog.mjs';

test('Etsy print drafts are withheld while the 1 inch margin waits for a quote',()=>{
  assert.equal(sourcePrintVersion,printVersion);
  assert.deepEqual(listings,[]);
});
