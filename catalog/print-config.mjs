import existing from './prints.json' with {type:'json'};
import bookArtworks from './book-prints.json' with {type:'json'};
export default {...existing,artworks:{...existing.artworks,...bookArtworks}};
