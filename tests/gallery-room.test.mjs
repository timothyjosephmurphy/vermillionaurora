import {test} from 'node:test';
import assert from 'node:assert/strict';
import {walkthroughRooms,walkthroughPaintingCount} from '../src/data/gallery-walkthrough.mjs';
import {walkthroughLayout,approachPosition,HALL} from '../src/scripts/gallery-walkthrough-layout.mjs';
import {tjWall,WALL_UNIT} from '../src/data/paintings-wall.mjs';
import assets from '../catalog/walkthrough-assets.json' with {type:'json'};
const {rooms,items}=walkthroughLayout(walkthroughRooms);
test('walkthrough hangs every Painting Wall work once, at true size',()=>{
  assert.equal(walkthroughPaintingCount,tjWall.artworks.length);
  const works=items.filter(i=>i.kind==='painting'||(i.kind==='mural'&&tjWall.artworks.some(a=>a.id===i.id)));
  assert.equal(new Set(works.map(w=>w.id)).size,tjWall.artworks.length);
  for(const w of works){const a=tjWall.artworks.find(x=>x.id===w.id);assert(Math.abs(w.width-a.width/WALL_UNIT*.0254)<1e-9,w.id);assert.equal(w.href,a.href);}
});
test('theme rooms, one room per exhibition, and full-scale murals',()=>{
  assert(rooms.filter(r=>r.kind==='theme').length>=4);
  for(const ex of assets.exhibitions){const r=rooms.find(x=>x.id==='exhibition-'+ex.id);assert(r,ex.id);
    const inRoom=items.filter(i=>i.room===r.id);assert(inRoom.some(i=>i.kind==='plaque'));assert.equal(inRoom.filter(i=>i.kind==='photo').length,ex.photos.length);}
  const lillooet=items.find(i=>i.id==='friends-club-mural');assert(Math.abs(lillooet.width-480*.0254)<1e-9&&Math.abs(lillooet.height-108*.0254)<1e-9);
});
test('every hung item fits inside its room, below the ceiling, with room to approach',()=>{
  for(const i of items){const r=rooms.find(x=>x.id===i.room);
    assert(i.x-.001>=r.x0&&i.x+.001<=r.x0+r.width,i.id);assert(i.y+i.height/2<HALL.height,i.id);assert(i.y-i.height/2>0,i.id);
    const p=approachPosition(i);assert((p.z-r.z0)*r.side>0&&(r.z1-p.z)*r.side>0,i.id);}
  assert.equal(new Set(items.map(i=>i.id)).size,items.length);
});
