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
test('a symmetric loop of rooms around a courtyard (no dead ends, no pinwheel); exhibitions and full-scale murals',()=>{
  const R=Object.fromEntries(rooms.map(r=>[r.ring,r]));
  assert.equal(R.S.kind,'hall');assert.equal(R.S.minX,-R.S.maxX);assert.equal(R.N.minX,-R.N.maxX);
  assert.equal(R.W.minX,-R.E.maxX,'side galleries mirror each other');assert.equal(R.W.maxZ-R.W.minZ,R.E.maxZ-R.E.minZ);
  assert(R.N.minZ>R.S.maxZ,'a courtyard separates hall and north gallery');
  assert.equal(layout.hallways.length,4);for(const r of rooms)assert.equal(layout.hallways.filter(h=>h.from===r.id||h.to===r.id).length,2,r.id+' has two exits');
  assert.deepEqual(layout.loop,['central',R.W.id,R.N.id,R.E.id,'central']);
  for(const h of layout.hallways)assert(Math.abs(layout.hallways.find(k=>Math.abs(k.minX+h.maxX)<1e-9&&k.minZ===h.minZ).minZ-h.minZ)<1e-9,'doorways mirror');
  assert.equal(layout.signs.length,2*layout.hallways.length);
  for(const ex of assets.exhibitions){const inRoom=items.filter(i=>i.href===ex.href&&i.kind!=='painting');assert(inRoom.some(i=>i.kind==='plaque'),ex.id);assert.equal(inRoom.filter(i=>i.kind==='photo').length,0);}
  const lillooet=items.find(i=>i.id==='friends-club-mural');assert(Math.abs(lillooet.width-480*.0254)<1e-9&&Math.abs(lillooet.height-108*.0254)<1e-9);
  const focal=items.find(i=>i.focal);assert.equal(focal.x,start.x);assert(focal.z>start.z+8,'the entry mural is straight ahead across the hall');
  assert(!items.some(i=>i!==focal&&Math.abs(i.x-start.x)<focal.width/2+.5&&i.z>start.z&&i.wall==='N'&&i.room===focal.room),'nothing else hangs in the entry sightline');
});
test('only paintings with a product page, the two murals, and plaques',()=>{
  for(const i of items)assert(i.kind==='mural'||i.kind==='plaque'||(i.kind==='painting'&&/^\/products\/[^/]+\/$/.test(i.href)),i.id);
  assert.equal(items.filter(i=>i.kind==='mural').length,2);
});
test('only related works share a column',()=>{
  const cols=new Map();for(const i of items){const k=i.room+i.x.toFixed(3)+i.z.toFixed(3);(cols.get(k)||cols.set(k,[]).get(k)).push(i);}
  for(const c of cols.values())if(c.length>1)assert(c.every(i=>i.series&&i.series===c[0].series),c.map(i=>i.id).join(','));
  assert([...cols.values()].some(c=>c.length>1&&c[0].series==='set:older-work-sunset-ridge-strips'),'the Ridge studies hang together');
});
test('salon hanging: no overlaps, stacks within the band, every work reachable',()=>{
  for(const i of items){assert(i.y+i.height/2<HALL.height-.3,i.id);assert(i.y-i.height/2>=HALL.band[0]-1e-9,i.id);const p=approachPosition(i);assert(insideWalk(layout,p.x,p.z,0),i.id);}
    for(const a of items)for(const b of items)if(a!==b&&a.room===b.room&&a.wall===b.wall){const d=Math.abs(a.x-b.x)+Math.abs(a.z-b.z);assert(!(d<(a.width+b.width)/2-.01&&Math.abs(a.y-b.y)<(a.height+b.height)/2-.01),a.id+' overlaps '+b.id);}
  assert.equal(new Set(items.map(i=>i.id)).size,items.length);
});
