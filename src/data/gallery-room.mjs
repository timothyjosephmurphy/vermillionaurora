import selection from '../../catalog/gallery-room-selection.json' with {type:'json'};
import {wallArtworks,WALL_UNIT} from './gallery-wall.mjs';
// The room is a curated four-wall exhibition; the Print Wall can grow independently.
export const roomArtworks=selection.map(id=>{
  const art=wallArtworks.find(p=>p.id===id);
  if(!art)throw Error(`Gallery room painting is missing from the print collection: ${id}`);
  return art;
});
export {WALL_UNIT};
