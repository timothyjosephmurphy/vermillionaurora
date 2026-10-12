import existing from './products.json' with {type:'json'};
import bookProducts from './book-products.json' with {type:'json'};
import archiveProducts from './archive-products.mjs';
export default [...existing,...bookProducts,...archiveProducts];
