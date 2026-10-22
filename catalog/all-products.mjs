import existingRaw from './products.json' with {type:'json'};
import paintingStories from './painting-stories.json' with {type:'json'};
// Story text lives in painting-stories.json (keyed by slug) so draft copy can be swapped without touching listings.
const existing=existingRaw.map(p=>paintingStories[p.slug]?{...p,story:paintingStories[p.slug]}:p);
import shortDescriptions from './short-descriptions.json' with {type:'json'};
import bookProductsRaw from './book-products.json' with {type:'json'};
// Book-gallery pages take their story from the same file (e.g. Yes: Close to the Edge).
const bookProducts=bookProductsRaw.map(p=>paintingStories[p.slug]?{...p,story:paintingStories[p.slug]}:p);
import archiveProducts from './archive-products.mjs';
import olderWorkProducts from './older-work-products.mjs';
import strawberryPointProducts from './strawberry-point-products.mjs';
// Studio default (TJ): his own paintings are watercolor pastel unless a record says otherwise. Product pages show it as the
// Medium (mediumDisplay). It is deliberately NOT written to `medium`, because the Painting Wall and 3D walkthrough group
// works by medium-or-eyebrow. Paul Murphy's works are left blank.
const withMedium=p=>p.type==='painting'&&p.artist==='TJ Murphy'&&!p.medium?{...p,mediumDisplay:'Watercolor pastel'}:p;
// Short factual descriptions (short-descriptions.json) go first, ahead of any story already on the record.
const withShort=p=>shortDescriptions[p.slug]?{...p,story:[...shortDescriptions[p.slug],...(p.story||[])]}:p;
export default [...existing,...bookProducts,...archiveProducts,...olderWorkProducts,...strawberryPointProducts].map(withMedium).map(withShort);
