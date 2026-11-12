// Targeted listing plans. Prints stay on the eight-work sync allowlist.
// Originals use the original-only source (no print variants required).
import {etsySkuForPrintId, validateListingPlan} from './etsy-listing-plan.mjs';
import syncWorks, {syncSourceVersion} from './etsy-sync-source.mjs';
import originalWorks, {originalSourceVersion} from './etsy-original-source.mjs';
import {etsyOriginalPrice} from './original-availability.mjs';

export {syncSourceVersion, originalSourceVersion};
export const SYNC_WORKS = syncWorks;
export const ORIGINAL_WORKS = originalWorks;
export const PRINT_LINE = 'Fine art print of an original watercolor pastel by TJ Murphy, printed on Watercolor Bright White fine art paper.';
export const ORIGINAL_LINE_TUBE = 'Original watercolor pastel by TJ Murphy, painted in Seattle. One of a kind, shipped rolled in a tube.';
export const ORIGINAL_LINE_FLAT = 'Original watercolor pastel by TJ Murphy, painted in Seattle. One of a kind, shipped flat in a protective mailer.';
// Kept for older tests and print-fallback copy; new originals use originalLine(work).
export const ORIGINAL_LINE = ORIGINAL_LINE_TUBE;
export const PRINT_TAGS = ['watercolor pastel','seascape painting','el salvador art','el zonte','bitcoin beach','surf art','sunrise painting','beach sunrise','tropical art','ocean wall art','coastal wall decor','large wall art','art print'];
export const ORIGINAL_TAGS = ['watercolor pastel','seascape painting','el salvador art','el zonte','bitcoin beach','surf art','sunrise painting','beach sunrise','tropical art','ocean wall art','coastal wall decor','large wall art','original painting'];
// Per-painting search tags for the print allowlist. Originals prefer subjectTags from the original source.
const SUBJECT_TAGS = {
  'meditation-at-denny-blaine': ['watercolor painting','mount rainier art','seattle art','lake washington','pacific northwest','mountain painting','orange sunset art','reflection art','landscape painting','washington state','nature wall art','meditation art'],
  'painting-moonlit-water': ['watercolor pastel','moon painting','full moon art','north cascades','mountain lake art','pacific northwest','night landscape','moonlight painting','washington state','forest wall art','lake painting','cabin decor'],
  'painting-red-horizon': ['watercolor pastel','maui art','hawaii painting','kihei','sunset painting','beach sunset art','tropical art','ocean wall art','seascape painting','hawaiian decor','island art','coastal wall art'],
  'hope-the-vermillion-aurora': ['watercolor pastel','bitcoin art','crypto art','sunrise painting','hope art','orange art','figurative art','spiritual art','symbolic painting','feather art','large wall art','modern art']
};
export function printTags(work) {
  return SUBJECT_TAGS[work.id] ? [...SUBJECT_TAGS[work.id], 'art print'] : PRINT_TAGS;
}
export function originalTags(work) {
  if (Array.isArray(work.subjectTags) && work.subjectTags.length === 12) return [...work.subjectTags, 'original painting'];
  if (SUBJECT_TAGS[work.id]) return [...SUBJECT_TAGS[work.id], 'original painting'];
  throw Error('Original listing needs 12 subject tags for ' + (work.id || 'unknown') + '.');
}
const mediumOf = work => String(work.medium || 'Watercolor pastel').trim();
const titleCase = value => value.replace(/\b[a-z]/g, letter => letter.toUpperCase());
// The El Zonte copy is unchanged; other media (e.g. watercolor) name their own medium.
export function printLine(work) {
  return PRINT_LINE.replace('watercolor pastel', mediumOf(work).toLowerCase());
}
export function originalLine(work) {
  const base = work.original?.packaging === 'flat' ? ORIGINAL_LINE_FLAT : ORIGINAL_LINE_TUBE;
  return base.replace('watercolor pastel', mediumOf(work).toLowerCase());
}

// Map a catalog year onto Etsy's when_made enum. Unknown years stay in the current decade.
export function whenMade(year) {
  const y = Number(year);
  if (!Number.isFinite(y) || y < 1000) return '2020_2026';
  if (y >= 2020 && y <= 2026) return '2020_2026';
  if (y >= 2010 && y <= 2019) return '2010_2019';
  if (y >= 2007 && y <= 2009) return '2007_2009';
  if (y >= 2000 && y <= 2006) return '2000_2006';
  if (y < 2000) return 'before_2007';
  return '2020_2026';
}

// Drafts this route may update. Every other saved draft is off limits.
export const EXISTING_PRINT_LISTINGS = {
  'painting-shoreline-at-dusk': 4587311664,
  'el-zonte-at-sunrise': 4587305955
};
export const PROTECTED_LISTING_IDS = new Set([4587311534, 4587311600, 4587305901]);
// Originals this sync may update. Saved index entries override these ids.
export const ORIGINAL_LISTINGS = {
  'el-zonte-before-dawn': 4591466297,
  'painting-shoreline-at-dusk': 4591478382,
  'el-zonte-at-sunrise': 4591478390,
  'sunrise-in-el-zonte-large': 4591556382,
  'meditation-at-denny-blaine': 4591543973,
  'painting-moonlit-water': 4591556404,
  'painting-red-horizon': 4591572797,
  'hope-the-vermillion-aurora': 4591572815
};
const SIZE = 513, FRAME = 514, QUANTITY = 100;
const length = value => Array.from(value).length;
const whole = value => Number.isInteger(value) ? String(value) : String(value);

export function worksForKind(kind) {
  return kind === 'original' ? ORIGINAL_WORKS : SYNC_WORKS;
}

export function workById(id, kind = 'print') {
  const work = worksForKind(kind).find(item => item.id === id);
  if (!work) throw Error(kind === 'original'
    ? 'This sync only accepts the paintings in the Etsy original list.'
    : 'This sync only accepts the paintings in the Etsy sync list.');
  return work;
}

export function printTitle(work) {
  return work.title + ' Art Print · Framed or Unframed';
}

export function originalTitle(work) {
  const dimensions = work.dimensions;
  if (!dimensions || dimensions.unit !== 'in' || !(dimensions.width > 0) || !(dimensions.height > 0)) throw Error('Original title needs catalog dimensions in inches.');
  return work.title + ', Original ' + titleCase(mediumOf(work)) + ', ' + whole(dimensions.width) + ' x ' + whole(dimensions.height) + ' in';
}

function story(work) {
  const text = (work.story || []).join('\n\n');
  if (/punto/i.test(text + work.title)) throw Error('El Zonte copy must use Punta and include the site story.');
  // The listing title carries the size, so the site's closing size ("Watercolor, 16 × 23 in, painted in Seattle.")
  // is dropped on Etsy and the medium is kept ("Watercolor, painted in Seattle.").
  return text.replace(/,\s*\d+(?:\.\d+)?\s*[×x]\s*\d+(?:\.\d+)?\s*in\b/g, '').trim();
}

export function printDescription(work) {
  if (!work.variants?.length) throw Error('Prints are held until the 1 inch margin has a FinerWorks quote.');
  const prices = work.variants.map(variant => variant.label + ' (' + variant.paperSize.width + ' × ' + variant.paperSize.height + ' in): $' + variant.price + ' unframed; Black frame $' + variant.frames[0].price + ', White frame $' + variant.frames[1].price + ', Natural wood frame $' + variant.frames[2].price + '.').join('\n');
  const body = story(work);
  if (!body) throw Error('Print listings need the site story.');
  return body + '\n\n' + printLine(work) + '\n\n' + prices;
}

export function originalDescription(work) {
  const body = story(work);
  return body ? body + '\n\n' + originalLine(work) : originalLine(work);
}

function form(entries) {
  const body = new URLSearchParams();
  for (const [key, value] of entries) if (value !== undefined && value !== null) body.set(key, String(value));
  return body;
}

export async function buildSyncPrintPlan(work, settings) {
  if (!work.variants?.length) throw Error('Prints are held until the 1 inch margin has a FinerWorks quote.');
  if (work.variants.some(variant => variant.frames?.length !== 3)) throw Error('Each synced print needs three frame options.');
  const products = [], skuMap = {};
  for (const size of work.variants) {
    const choices = [{key: null, name: 'Unframed', price: size.price, sku: size.sku}, ...size.frames.map(frame => ({...frame, name: frame.label}))];
    for (const choice of choices) {
      const printId = 'print-' + work.id + '-' + size.key + (choice.key ? '-frame-' + choice.key : '');
      const sku = await etsySkuForPrintId(printId);
      skuMap[sku] = {printId, productId: work.id, sizeKey: size.key, frameKey: choice.key, providerSku: choice.sku};
      products.push({
        sku,
        property_values: [
          {property_id: SIZE, property_name: 'Print size', value_ids: [], values: [size.label], scale_id: null},
          {property_id: FRAME, property_name: 'Frame', value_ids: [], values: [choice.name], scale_id: null}
        ],
        offerings: [{price: Number(choice.price), quantity: QUANTITY, is_enabled: true, readiness_state_id: settings.readinessStateId}]
      });
    }
  }
  const body = form([
    ['quantity', QUANTITY],
    ['title', printTitle(work)],
    ['description', printDescription(work)],
    ['price', Math.min(...work.variants.map(variant => Number(variant.price)))],
    ['who_made', 'someone_else'],
    ['when_made', 'made_to_order'],
    ['taxonomy_id', settings.taxonomyId],
    ['shipping_profile_id', settings.shippingProfileId],
    ['readiness_state_id', settings.readinessStateId],
    ['is_supply', 'false'],
    ['type', 'physical'],
    ['production_partner_ids', settings.partnerId],
    ['return_policy_id', settings.returnPolicyId],
    ['materials', 'watercolor paper']
  ]);
  for (const [key, value] of Object.entries(settings.shippingPackages?.[work.id] || {})) body.set(key, String(value));
  const tags = printTags(work);
  body.set('tags', tags.join(','));
  const plan = {id: work.id, kind: 'print', body, inventory: {products, price_on_property: [SIZE, FRAME], quantity_on_property: [], readiness_state_on_property: [], sku_on_property: [SIZE, FRAME]}, skuMap};
  validateListingPlan(plan);
  if (!plan.body.get('description').includes(printLine(work)) || !plan.body.get('description').includes('Watercolor Bright White fine art paper') || /finerworks/i.test(plan.body.get('description')) || plan.body.get('description').includes('rolled in a tube')) throw Error('Print description is missing the paper line or includes the original tube line.');
  if (tags.some(tag => length(tag) > 20) || tags.length !== 13 || new Set(tags).size !== 13 || tags.at(-1) !== 'art print') throw Error('Print tags must be 13 distinct tags of at most 20 characters, ending with art print.');
  return plan;
}

export function buildSyncOriginalPlan(work, settings) {
  const title = originalTitle(work);
  if (Array.from(title).length > 140) throw Error('Original title is longer than 140 characters.');
  if (!work.original?.shipping) throw Error('Original calculated shipping needs catalog parcel measurements.');
  const packaging = work.original.packaging;
  if (packaging !== 'tube' && packaging !== 'flat') throw Error('Original packaging must be tube or flat.');
  const body = form([
    ['quantity', 1],
    ['title', title],
    ['description', originalDescription(work)],
    ['price', etsyOriginalPrice(work.original.price)],
    ['who_made', 'i_did'],
    ['when_made', whenMade(work.year)],
    ['taxonomy_id', settings.taxonomyId],
    ['shipping_profile_id', settings.shippingProfileId],
    ['readiness_state_id', settings.readinessStateId],
    ['is_supply', 'false'],
    ['type', 'physical'],
    ['return_policy_id', settings.returnPolicyId],
    ['materials', mediumOf(work).toLowerCase()],
    ...Object.entries(work.original.shipping || {})
  ]);
  const tags = originalTags(work);
  body.set('tags', tags.join(','));
  if (body.has('state') || body.get('who_made') !== 'i_did' || body.get('quantity') !== '1') throw Error('Original requests must stay drafts with quantity 1.');
  if (!body.get('description').includes(originalLine(work)) || body.get('description').includes(printLine(work))) throw Error('Original description is incomplete.');
  if (tags.some(tag => length(tag) > 20) || tags.length !== 13 || new Set(tags).size !== 13 || tags.at(-1) !== 'original painting') throw Error('Original tags must be 13 distinct tags of at most 20 characters, ending with original painting.');
  for (const key of ['item_weight', 'item_length', 'item_width', 'item_height']) if (!(Number(body.get(key)) > 0)) throw Error('Original calculated shipping needs the catalog parcel measurements.');
  return {id: work.id, kind: 'original', body};
}
