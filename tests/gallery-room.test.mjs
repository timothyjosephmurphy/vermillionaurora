import {test} from 'node:test';
import assert from 'node:assert/strict';
import {wallArtworks,WALL_UNIT} from '../src/data/gallery-wall.mjs';
import {ROOM,roomLayout,approachPosition} from '../src/scripts/gallery-room-layout.mjs';
const artworks=roomLayout(wallArtworks,WALL_UNIT);
test('square room has six unique, evenly spaced, physically sized TJ prints on each wall',()=>{
  assert.equal(artworks.length,24);assert.equal(new Set(artworks.map(a=>a.id)).size,24);
  for(let wall=0;wall<4;wall++){
    const row=artworks.filter(a=>a.wall===wall);assert.equal(row.length,6);
    for(let i=0;i<row.length;i++){
      const art=row[i],source=wallArtworks.find(a=>a.id===art.id);
      assert(Math.abs(art.width-source.width/WALL_UNIT*.0254)<1e-9);
      assert(Math.abs(art.imageWidth/art.imageHeight-source.sourceWidth/source.sourceHeight)<.002);
      assert(art.y-art.height/2>.8&&art.y+art.height/2<ROOM.height-.6);
      if(i){const previous=row[i-1],distance=Math.hypot(art.x-previous.x,art.z-previous.z);assert(Math.abs(distance-ROOM.size/6)<1e-9);assert(distance>(art.width+previous.width)/2+.2);}
      const approach=approachPosition(art);assert(Math.abs(approach.x)<ROOM.size/2-.2&&Math.abs(approach.z)<ROOM.size/2-.2);
      assert.equal(art.href,source.href);
    }
  }
});
