import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
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
test('El Salvador, Cape Town, Bounty collaborators, and Revelation keep their tags and gain the missing place or series tag', () => {
  const tags = JSON.parse(readFileSync(new URL('../catalog/painting-tags.json', import.meta.url), 'utf8')).assignments;
  const has = (id, tag) => assert.ok(tags[id]?.includes(tag), `${id} missing ${tag}`);
  for (const id of ['book-art-4afb5cab4bdbe1ff6845', 'book-art-b38b9ae1893908d604da', 'book-art-4d53927ad111f0259402', 'book-art-c04c7e48687fe35e65f5']) {
    has(id, 'bitcoiners');
    has(id, 'el-salvador');
  }
  for (const id of ['book-art-504e3fafdacd7c9bbcd0', 'book-art-4a0bb9cdd6c404c4e77c']) {
    has(id, 'bitcoiners');
    has(id, 'cape-town');
  }
  for (const id of ['book-art-d6e03f6907615dac3797', 'book-art-ec22daff29e72f16eb76', 'book-art-43a3f16ac35df7262254']) {
    has(id, 'bitcoiners');
    has(id, 'bounty-of-satoshi');
  }
  has('painting-lightburst', 'bounty-of-satoshi');
  has('painting-lightburst', 'bitcoiners');
});
test('Paul Murphy works have no related works and are never shown', () => {
  for (const p of Object.values(byId)) {
    if (p.artist === 'Paul Murphy') assert.equal(relatedWorks(p).length, 0);
    else assert.ok(relatedWorks(p).every(r => r.artist !== 'Paul Murphy'));
  }
});
