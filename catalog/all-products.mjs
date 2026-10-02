import existing from './products.json' with {type:'json'};
import bookProducts from './book-products.json' with {type:'json'};
export default [...existing,...bookProducts];
