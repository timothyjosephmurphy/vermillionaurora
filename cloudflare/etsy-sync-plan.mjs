// Targeted El Zonte listing plans. The five-painting draft batch is unchanged.
import {etsySkuForPrintId, validateListingPlan} from './etsy-listing-plan.mjs';
import syncWorks, {syncSourceVersion} from './etsy-sync-source.mjs';

export {syncSourceVersion};
export const SYNC_WORKS = syncWorks;
export const PRINT_LINE = 'Fine art print of an original watercolor pastel by TJ Murphy, printed on Watercolor Bright White fine art paper.';
export const ORIGINAL_LINE = 'Original watercolor pastel by TJ Murphy, painted in Seattle. One of a kind, shipped rolled in a tube.';
export const PRINT_TAGS = ['watercolor pastel','seascape painting','el salvador art','el zonte','bitcoin beach','surf art','sunrise painting','beach sunrise','tropical art','ocean wall art','coastal wall decor','large wall art','art print'];
export const ORIGINAL_TAGS = ['watercolor pastel','seascape painting','el salvador art','el zonte','bitcoin beach','surf art','sunrise painting','beach sunrise','tropical art','ocean wall art','coastal wall decor','large wall art','original painting'];
// Drafts this route may update. Every other saved draft is off limits.
export const EXISTING_PRINT_LISTINGS = {
  'painting-shoreline-at-dusk': 4587311664,
  'el-zonte-at-sunrise': 4587305955
};
export const PROTECTED_LISTING_IDS = new Set([4587311534, 4587311600, 4587305901]);
const SIZE = 513, FRAME = 514, QUANTITY = 100;
const length = value => Array.from(value).length;
const whole = value => Number.isInteger(value) ? String(value) : String(value);

export function workById(id) {
  const work = SYNC_WORKS.find(item => item.id === id);
  if (!work) throw Error('This sync only accepts the El Zonte paintings.');
  return work;
}

export function printTitle(work) {
  return work.title + ' Art Print · Framed or Unframed';
}

export function originalTitle(work) {
  const dimensions = work.dimensions;
  if (!dimensions || dimensions.unit !== 'in' || !(dimensions.width > 0) || !(dimensions.height > 0)) throw Error('Original title needs catalog dimensions in inches.');
  return work.title + ', Original Watercolor Pastel, ' + whole(dimensions.width) + ' x ' + whole(dimensions.height) + ' in';
}

function story(work) {
  const text = (work.story || []).join('\n\n');
  if (!text.trim() || /punto/i.test(text + work.title)) throw Error('El Zonte copy must use Punta and include the site story.');
  return text;
}

export function printDescription(work) {
  const prices = work.variants.map(variant => variant.label + ' (' + variant.paperSize.width + ' × ' + variant.paperSize.height + ' in): $' + variant.price + ' unframed; Black frame $' + variant.frames[0].price + ', White frame $' + variant.frames[1].price + ', Natural wood frame $' + variant.frames[2].price + '.').join('\n');
  return story(work) + '\n\n' + PRINT_LINE + '\n\n' + prices;
}

export function originalDescription(work) {
  return story(work) + '\n\n' + ORIGINAL_LINE;
}

function form(entries) {
  const body = new URLSearchParams();
  for (const [key, value] of entries) if (value !== undefined && value !== null) body.set(key, String(value));
  return body;
}

export async function buildSyncPrintPlan(work, settings) {
  if (!work.variants?.length || work.variants.some(variant => variant.frames?.length !== 3)) throw Error('Each El Zonte print needs three frame options.');
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
  body.set('tags', PRINT_TAGS.join(','));
  const plan = {id: work.id, kind: 'print', body, inventory: {products, price_on_property: [SIZE, FRAME], quantity_on_property: [], readiness_state_on_property: [], sku_on_property: [SIZE, FRAME]}, skuMap};
  validateListingPlan(plan);
  if (!plan.body.get('description').includes(PRINT_LINE) || plan.body.get('description').includes('rolled in a tube')) throw Error('Print description is missing the paper line or includes the original tube line.');
  if (PRINT_TAGS.some(tag => length(tag) > 20) || PRINT_TAGS.length !== 13) throw Error('Print tags must be 13 tags of at most 20 characters.');
  return plan;
}

export function buildSyncOriginalPlan(work, settings) {
  const title = originalTitle(work);
  if (Array.from(title).length > 140) throw Error('Original title is longer than 140 characters.');
  const body = form([
    ['quantity', 1],
    ['title', title],
    ['description', originalDescription(work)],
    ['price', work.original.price],
    ['who_made', 'i_did'],
    ['when_made', '2020_2026'],
    ['taxonomy_id', settings.taxonomyId],
    ['shipping_profile_id', settings.shippingProfileId],
    ['readiness_state_id', settings.readinessStateId],
    ['is_supply', 'false'],
    ['type', 'physical'],
    ['return_policy_id', settings.returnPolicyId],
    ['materials', 'watercolor pastel'],
    ...Object.entries(work.original.shipping || {})
  ]);
  body.set('tags', ORIGINAL_TAGS.join(','));
  if (body.has('state') || body.get('who_made') !== 'i_did' || body.get('quantity') !== '1') throw Error('Original requests must stay drafts with quantity 1.');
  if (!body.get('description').includes(ORIGINAL_LINE) || body.get('description').includes(PRINT_LINE)) throw Error('Original description is incomplete.');
  if (ORIGINAL_TAGS.some(tag => length(tag) > 20)) throw Error('Original tags are too long.');
  for (const key of ['item_weight', 'item_length', 'item_width', 'item_height']) if (!(Number(body.get(key)) > 0)) throw Error('Original calculated shipping needs the catalog tube measurements.');
  return {id: work.id, kind: 'original', body};
}
