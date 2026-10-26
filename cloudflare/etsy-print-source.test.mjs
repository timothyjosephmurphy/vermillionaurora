import test from 'node:test';
import assert from 'node:assert/strict';
import listings,{sourcePrintVersion} from './etsy-print-source.mjs';
import {printVersion} from './print-catalog.mjs';

test('Etsy draft source contains only the prepared print paintings that have a published price',()=>{
  assert.equal(sourcePrintVersion,printVersion);
  assert.deepEqual(listings.map(item=>item.id),[
    'warszawska-syrenka',
    'honeybadger-and-cub-with-genesis-block',
    'painting-red-horizon',
    'painting-shoreline-at-dusk'
  ]);
  // Sunrise is held until the landscape reprint is quoted. Kihei still yields three sizes.
  assert.deepEqual(listings.map(item=>item.variants.length),[3,3,3,3]);
  for(const item of listings){
    assert.equal(item.artist,'TJ Murphy');
    assert.equal(item.variants.length>0,true);
    assert.match(item.image.src,/^\//);
    for(const size of item.variants){
      assert.match(size.price,/^\d+\.\d{2}$/);
      assert.match(size.sku,/^[A-Za-z0-9._-]{1,160}$/);
      assert.equal(size.paperSize.unit,'in');
      assert(size.paperSize.width>0&&size.paperSize.height>0);
      assert.deepEqual(size.frames.map(frame=>frame.key),['black','white','natural']);
      for(const frame of size.frames){
        assert.match(frame.price,/^\d+\.\d{2}$/);
        assert.match(frame.sku,/^[A-Za-z0-9._-]{1,160}$/);
        assert.equal(frame.mat,'Snow White');
        assert.equal(frame.glazing,'Premium Clear');
      }
    }
  }
});
