import test from 'node:test';
import assert from 'node:assert/strict';
import {printThumbnailUrl} from './print-asset-policy.mjs';
const h='168abc0d0194d2e54b7a08b83dfca777bad556737180fc64823a033ce775f883';
test('edition masters use the small build-time thumbnail',()=>{
  assert.equal(printThumbnailUrl(`https://vermillionaurora.com/print-editions/${h}.jpg`,'live'),`https://vermillionaurora.com/print-editions/thumbs/${h}.jpg`);
});
test('other approved files fall back to the file URL and invalid URLs still fail',()=>{
  const u='https://media.vermillionaurora.com/images/a.jpeg';
  assert.equal(printThumbnailUrl(u,'live'),u);
  assert.throws(()=>printThumbnailUrl('https://example.com/a.jpg','live'));
});
