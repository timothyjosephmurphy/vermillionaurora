import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {canonicalArtwork} from '../src/data/canonical-artworks.mjs';
import {renamedProductPath} from '../worker/product-renames.mjs';
// Oct 15 2026 backend audit: same painting under two slugs; the dropped slug 301s to the survivor in one hop.
const MERGED={'book-art-f91504eaa0ab6b936c29':'older-work-beach-sunsets-original-1','book-art-4bb692457bed7cd4bb00':'older-work-beach-sunsets-original-2','book-art-fb5eaeb2078ebf9c75f0':'older-work-beach-sunsets-original-3','book-art-b50262c37f44843487ae':'archived-painting-301','book-art-a6a2c048812a41cee4e4':'archived-painting-371','archived-painting-412':'painting-studio-figure'};
test('audit twins 301 to one page each',()=>{
  const lines=fs.readFileSync('static/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/));
  for(const [from,to] of Object.entries(MERGED)){
    assert.equal(canonicalArtwork[from],to);
    for(const p of [`/products/${from}/`,`/products/${from}`]){assert.deepEqual(lines.find(([f])=>f===p),[p,`/products/${to}/`,'301']);assert.equal(renamedProductPath(p),`/products/${to}/`);}
  }
});
