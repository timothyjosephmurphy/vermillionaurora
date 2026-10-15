import existing from './products.json' with {type:'json'};
import bookProducts from './book-products.json' with {type:'json'};
import archiveProducts from './archive-products.mjs';
import olderWorkProducts from './older-work-products.mjs';
import strawberryPointProducts from './strawberry-point-products.mjs';
export default [...existing,...bookProducts,...archiveProducts,...olderWorkProducts,...strawberryPointProducts];
