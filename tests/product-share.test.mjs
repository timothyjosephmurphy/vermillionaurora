import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

// TJ wants icon share buttons. They regressed to text labels once (the icon work in PR #190 was closed
// unmerged), so keep each network button an inline SVG icon with an accessible name and a tooltip.
test('product share buttons for X, Facebook, Nostr and Instagram are labelled inline SVG icons', async () => {
  const source = await readFile(new URL('../src/components/ProductShare.astro', import.meta.url), 'utf8');
  for (const network of ['X', 'Facebook', 'Nostr', 'Instagram']) {
    const tag = source.match(new RegExp(`<(a|button)[^>]*aria-label="Share on ${network}[^"]*"[^>]*>([\\s\\S]*?)</\\1>`));
    assert(tag, `${network} share control exists`);
    assert.match(tag[0], /class="share-action share-action-icon"/, `${network} is an icon button`);
    assert.match(tag[0], new RegExp(`title="Share on ${network}"`), `${network} has a tooltip`);
    assert.match(tag[2], /^<svg\b[^>]*aria-hidden="true"/, `${network} shows an inline SVG icon`);
    assert.match(tag[2], new RegExp(`<span class="share-label">Share on ${network}</span>`), `${network} keeps visually hidden text`);
  }
});
