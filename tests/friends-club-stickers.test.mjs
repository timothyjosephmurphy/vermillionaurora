// Friends Club mural sticker carousel (studio-tracker #748).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const dir = 'murals/friends-club-stickers';
const manifest = JSON.parse(fs.readFileSync(`${dir}/manifest.json`, 'utf8'));

test('Friends Club sticker thumbs match the manifest (studio-tracker #748)', () => {
  assert.equal(manifest.length, 262);
  const files = new Set(manifest.map((row) => row.file));
  assert.equal(files.size, 262);
  manifest.forEach((row, i) => {
    const expected = `fc-sticker-${String(i + 1).padStart(3, '0')}.webp`;
    assert.equal(row.file, expected);
    assert.equal(typeof row.alt, 'string');
    assert.ok(row.alt.trim().length > 8, row.file);
    const stat = fs.statSync(`${dir}/${row.file}`);
    assert.ok(stat.size > 100 && stat.size < 80_000, `${row.file} is ${stat.size} bytes`);
  });
  const bytes = manifest.reduce((sum, row) => sum + fs.statSync(`${dir}/${row.file}`).size, 0);
  assert.ok(bytes < 4_000_000, `thumbs are ${bytes} bytes; raw PNGs must not be committed`);
  assert.equal(fs.readdirSync(dir).filter((name) => name.endsWith('.png')).length, 0);
});

test('Friends Club story renders a lazy sticker carousel beneath the chapter (studio-tracker #748)', () => {
  const page = fs.readFileSync('src/pages/murals/index.astro', 'utf8');
  const story = page.slice(page.indexOf('id="friends-story"'));
  const articleAt = story.indexOf('</article>');
  const stickersAt = story.indexOf('id="friends-stickers"');
  const dataAt = story.indexOf('id="friends-data"');
  assert.ok(articleAt > 0 && stickersAt > articleAt && dataAt > stickersAt, 'carousel sits beneath the story');
  const block = story.slice(stickersAt, dataAt);
  assert.match(block, /aria-roledescription="carousel" aria-label="Friends Club mural sticker silhouettes"/);
  assert.match(block, /loading="lazy"/);
  assert.doesNotMatch(block, /loading="eager"/);
  assert.match(block, /\/murals\/friends-club-stickers\/\$\{s\.file\}/);
  assert.match(block, /class="sticker-prev"/);
  assert.match(block, /class="sticker-next"/);
  assert.match(story, /closest\?\.\('#friends-stickers'\)/);
});
