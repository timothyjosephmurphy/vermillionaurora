import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { byId } from '../catalog/catalog.mjs';
import { relatedWorks } from '../catalog/related-works.mjs';

test('painting tags validate', () => { execFileSync(process.execPath, ['scripts/check-painting-tags.mjs'], { stdio: 'pipe' }); });
test('Travis at Bass Coast relates to Dawn at Bass Coast', () => {
  const travis = Object.values(byId).find(p => p.title === 'Travis at Bass Coast');
  assert.ok(relatedWorks(travis).some(p => p.title === 'Dawn at Bass Coast'));
});
test('twins never relate to each other', () => {
  const rel = relatedWorks(byId['archived-painting-433']).map(p => p.id);
  for (const id of ['archived-painting-436', 'archived-painting-437', 'archived-painting-438', 'book-art-9a4b9331f62350fa36fc', 'book-art-c198f09bc8ddad18ed1e']) assert.ok(!rel.includes(id));
  assert.ok(!relatedWorks(byId['archived-painting-22']).some(p => p.id === 'book-art-67cc9a4d5823eca2182e'));
});
test('Paul Murphy works have no related works and are never shown', () => {
  for (const p of Object.values(byId)) {
    if (p.artist === 'Paul Murphy') assert.equal(relatedWorks(p).length, 0);
    else assert.ok(relatedWorks(p).every(r => r.artist !== 'Paul Murphy'));
  }
});
