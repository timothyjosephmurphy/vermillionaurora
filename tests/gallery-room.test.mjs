import {test} from 'node:test';
import assert from 'node:assert/strict';
import {walkthroughRooms,walkthroughPaintingCount} from '../src/data/gallery-walkthrough.mjs';
import {walkthroughLayout,approachPosition,insideWalk,HALL} from '../src/scripts/gallery-walkthrough-layout.mjs';
import {tjWall,WALL_UNIT} from '../src/data/paintings-wall.mjs';
import assets from '../catalog/walkthrough-assets.json' with {type:'json'};
const layout=walkthroughLayout(walkthroughRooms),{rooms,items,start}=layout;
test('walkthrough hangs every Painting Wall work once, at true size',()=>{
  assert.equal(walkthroughPaintingCount,tjWall.artworks.length);
  const works=items.filter(i=>i.kind==='painting'||(i.kind==='mural'&&tjWall.artworks.some(a=>a.id===i.id)));
  assert.equal(new Set(works.map(w=>w.id)).size,tjWall.artworks.length);
  for(const w of works){const a=tjWall.artworks.find(x=>x.id===w.id);assert(Math.abs(w.width-a.width/WALL_UNIT*.0254)<1e-9,w.id);assert.equal(w.href,a.href);}
});
test('a square central hall with corner exits to four outer galleries; exhibitions and full-scale murals',()=>{
  const c=rooms.find(r=>r.kind==='hall');assert.equal(c.maxX-c.minX,c.maxZ-c.minZ);
  assert.deepEqual(rooms.filter(r=>r.kind==='gallery').map(r=>r.position).sort(),['east','north','south','west']);
  for(const o of c.openings){const half=(c.maxX-c.minX)/2;assert(Math.abs(o.from)>half-3&&Math.abs(o.to)>half-3,'exits sit at the corners');}
  assert.equal(layout.signs.length,8);
  for(const ex of assets.exhibitions){const inRoom=items.filter(i=>i.href===ex.href&&i.kind!=='painting');assert(inRoom.some(i=>i.kind==='plaque'),ex.id);assert.equal(inRoom.filter(i=>i.kind==='photo').length,ex.photos.length);}
  const lillooet=items.find(i=>i.id==='friends-club-mural');assert(Math.abs(lillooet.width-480*.0254)<1e-9&&Math.abs(lillooet.height-108*.0254)<1e-9);
  const focal=items.find(i=>i.focal);assert.equal(focal.x,start.x);assert(focal.z>start.z+20,'the entry mural is in the far distance, straight ahead');
  assert(!items.some(i=>i!==focal&&Math.abs(i.x-start.x)<focal.width/2+.5&&i.z>start.z&&i.z<focal.z-.5&&i.room==='central'),'nothing hangs in the entry sightline');
});
test('salon hanging: no overlaps, stacks within the band, every work reachable',()=>{
  for(const i of items){assert(i.y+i.height/2<HALL.height-.3,i.id);assert(i.y-i.height/2>=HALL.band[0]-1e-9,i.id);const p=approachPosition(i);assert(insideWalk(layout,p.x,p.z,0),i.id);}
  assert(items.filter(i=>items.some(j=>j!==i&&Math.abs(j.x-i.x)<1e-6&&Math.abs(j.z-i.z)<1e-6)).length>20,'small works stack in columns');
  for(const a of items)for(const b of items)if(a!==b&&a.room===b.room&&a.wall===b.wall){const d=Math.abs(a.x-b.x)+Math.abs(a.z-b.z);assert(!(d<(a.width+b.width)/2-.01&&Math.abs(a.y-b.y)<(a.height+b.height)/2-.01),a.id+' overlaps '+b.id);}
  assert.equal(new Set(items.map(i=>i.id)).size,items.length);
});
