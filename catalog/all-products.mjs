import existingRaw from './products.json' with {type:'json'};
import paintingStories from './painting-stories.json' with {type:'json'};
// Story text lives in painting-stories.json (keyed by slug) so draft copy can be swapped without touching listings.
const existing=existingRaw.map(p=>paintingStories[p.slug]?{...p,story:paintingStories[p.slug]}:p);
import bookProducts from './book-products.json' with {type:'json'};
import archiveProducts from './archive-products.mjs';
import olderWorkProducts from './older-work-products.mjs';
import strawberryPointProducts from './strawberry-point-products.mjs';
export default [...existing,...bookProducts,...archiveProducts,...olderWorkProducts,...strawberryPointProducts];
