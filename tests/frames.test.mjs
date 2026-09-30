import test from 'node:test';
import assert from 'node:assert/strict';
import {matchingFrames,originalFrameEligible,amazonFrameUrl,amazonFrameSearchUrl} from '../catalog/frame-matching.mjs';
const size=(width,height,unit='in')=>({width,height,unit});

test('frames match the physical sheet, with orientation independent of the image',()=>{
  const options=matchingFrames(size(16,12),size(15,12));
  assert.equal(options[0].asin,'B0BQQYRMX7');
  assert.equal(options[0].fit,'direct');
  assert(!options.some(x=>x.asin==='B0FJLR7MTQ'));
  assert.equal(matchingFrames(size(30.48,38.1,'cm'))[0].asin,'B0FJLR7MTQ');
});
test('fractional sheets require mats and oversized or unconfirmed sheets never get a false match',()=>{
  for(const paper of [size(7.5,6),size(11.25,9)]){
    const options=matchingFrames(paper);assert.equal(options.length,2);
    assert(options.every(x=>x.fit==='mat'));
  }
  assert.deepEqual(matchingFrames(null,size(15,12)),[]);
  assert.deepEqual(matchingFrames(size(24,48)),[]);
  assert.deepEqual(matchingFrames(size(12,15),size(16,12)),[]);
  assert(!matchingFrames(size(12.01,15)).some(x=>x.fit==='direct'));
});
test('framed artwork, canvas, and unavailable originals do not get flat-paper frame links',()=>{
  const p={type:'painting',listing:{status:'available'},surface:'Arches paper',framing:'Unframed',dimensions:size(12,15)};
  assert(originalFrameEligible(p));
  assert(!originalFrameEligible({...p,framing:'Framed'}));
  assert(!originalFrameEligible({...p,surface:'Canvas'}));
  assert(!originalFrameEligible({...p,listing:{status:'sold'}}));
});
test('Amazon links stay on the verified product and only use an explicitly configured tracking ID',()=>{
  assert.equal(amazonFrameUrl('B0FJLR7MTQ'),'https://www.amazon.com/dp/B0FJLR7MTQ');
  assert.equal(new URL(amazonFrameUrl('B0FJLR7MTQ','example-20')).searchParams.get('tag'),'example-20');
  assert.throws(()=>amazonFrameUrl('https://example.com'));
  assert.throws(()=>amazonFrameUrl('B0FJLR7MTQ','?bad'));
  assert.equal(new URL(amazonFrameSearchUrl(size(15,12))).searchParams.get('k'),'12 x 15 inch picture frame');
  assert.equal(new URL(amazonFrameSearchUrl(size(38.1,30.48,'cm'))).searchParams.get('k'),'30.48 x 38.1 cm picture frame');
  assert.equal(amazonFrameSearchUrl(null),null);
});
