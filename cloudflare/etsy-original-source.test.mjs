import test from 'node:test';
import assert from 'node:assert/strict';
import originals, {originalSourceVersion} from './etsy-original-source.mjs';
import {buildSyncOriginalPlan, whenMade, originalTags, workById} from './etsy-sync-plan.mjs';
import {etsyOriginalPrice} from './original-availability.mjs';

test('original source covers the eligible TJ set and skips Paul Murphy and unsized works', () => {
  assert.match(originalSourceVersion, /^[a-f0-9]{20}$/);
  assert.equal(originals.length, 114);
  assert.equal(originals.every(item => item.artist !== 'Paul Murphy'), true);
  const ids = new Set(originals.map(item => item.id));
  assert.equal(ids.has('honeybadger-and-cub-with-genesis-block'), true);
  assert.equal(ids.has('warszawska-syrenka'), true);
  assert.equal(ids.has('archived-painting-307'), false);
  assert.equal(ids.has('archived-painting-img-1555'), false);
  assert.equal(ids.has('archived-painting-1'), false);
  assert.equal(ids.has('archived-painting-2'), false);
  assert.equal(originals.filter(item => item.original.packaging === 'tube').length, 36);
  assert.equal(originals.filter(item => item.original.packaging === 'flat').length, 78);
});

test('each original has twelve subject tags, a parcel, and an uplifted plan price', () => {
  const settings = {taxonomyId: 88, shippingProfileId: 502, readinessStateId: 22, returnPolicyId: 77};
  for (const item of originals) {
    assert.equal(item.subjectTags.length, 12);
    assert.equal(new Set(item.subjectTags).size, 12);
    assert.equal(item.subjectTags.every(tag => tag.length <= 20), true);
    assert.equal(item.dimensions.unit, 'in');
    assert.ok(item.original.shipping.item_weight > 0);
    const tags = originalTags(item);
    assert.equal(tags.length, 13);
    assert.equal(tags.at(-1), 'original painting');
    const plan = buildSyncOriginalPlan(item, settings);
    assert.equal(plan.body.get('price'), etsyOriginalPrice(item.original.price));
    assert.equal(plan.body.get('when_made'), whenMade(item.year));
    assert.equal(plan.body.has('production_partner_ids'), false);
  }
  assert.equal(whenMade(2022), '2020_2026');
  assert.equal(whenMade(2015), '2010_2019');
  assert.equal(whenMade(null), '2020_2026');
  assert.equal(workById('strawberry-point-4', 'original').original.packaging, 'flat');
  assert.equal(workById('warszawska-syrenka', 'original').original.packaging, 'tube');
  assert.equal(workById('warszawska-syrenka', 'original').dimensions.width, 39.4);
});
