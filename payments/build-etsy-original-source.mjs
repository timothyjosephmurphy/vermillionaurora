// Builds the original-only Etsy sync source. An original needs catalog size and a
// site price; it does not need print variants or a print listing.
import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {products} from '../catalog/catalog.mjs';
import {deriveParcel} from '../catalog/shipping.mjs';
import {estimatePaperParcelWeightLb} from '../catalog/shipping-estimates.mjs';
import paintingTags from '../catalog/painting-tags.json' with {type: 'json'};

// Works with no size in the feed or catalog. Honeybadger and Warszawska Syrenka
// are intentionally not skipped: the catalog has 100×70 cm and a recorded tube.
const SKIP_IDS = new Set([
  'archived-painting-307',
  'archived-painting-img-1555',
  'archived-painting-1',
  'archived-painting-2'
]);

// Curated 12 subject tags for paintings that already had Etsy originals.
const CURATED_SUBJECT_TAGS = {
  'meditation-at-denny-blaine': ['watercolor painting', 'mount rainier art', 'seattle art', 'lake washington', 'pacific northwest', 'mountain painting', 'orange sunset art', 'reflection art', 'landscape painting', 'washington state', 'nature wall art', 'meditation art'],
  'painting-moonlit-water': ['watercolor pastel', 'moon painting', 'full moon art', 'north cascades', 'mountain lake art', 'pacific northwest', 'night landscape', 'moonlight painting', 'washington state', 'forest wall art', 'lake painting', 'cabin decor'],
  'painting-red-horizon': ['watercolor pastel', 'maui art', 'hawaii painting', 'kihei', 'sunset painting', 'beach sunset art', 'tropical art', 'ocean wall art', 'seascape painting', 'hawaiian decor', 'island art', 'coastal wall art'],
  'hope-the-vermillion-aurora': ['watercolor pastel', 'bitcoin art', 'crypto art', 'sunrise painting', 'hope art', 'orange art', 'figurative art', 'spiritual art', 'symbolic painting', 'feather art', 'large wall art', 'modern art'],
  'el-zonte-before-dawn': ['watercolor pastel', 'seascape painting', 'el salvador art', 'el zonte', 'bitcoin beach', 'surf art', 'sunrise painting', 'beach sunrise', 'tropical art', 'ocean wall art', 'coastal wall decor', 'large wall art'],
  'painting-shoreline-at-dusk': ['watercolor pastel', 'seascape painting', 'el salvador art', 'el zonte', 'bitcoin beach', 'surf art', 'sunrise painting', 'beach sunrise', 'tropical art', 'ocean wall art', 'coastal wall decor', 'large wall art'],
  'el-zonte-at-sunrise': ['watercolor pastel', 'seascape painting', 'el salvador art', 'el zonte', 'bitcoin beach', 'surf art', 'sunrise painting', 'beach sunrise', 'tropical art', 'ocean wall art', 'coastal wall decor', 'large wall art'],
  'sunrise-in-el-zonte-large': ['watercolor pastel', 'seascape painting', 'el salvador art', 'el zonte', 'bitcoin beach', 'surf art', 'sunrise painting', 'beach sunrise', 'tropical art', 'ocean wall art', 'coastal wall decor', 'large wall art']
};

const FILLERS = [
  'original art', 'wall art', 'fine art', 'handmade art', 'seattle artist',
  'art painting', 'home wall art', 'gallery wall art', 'collectible art',
  'signed artwork', 'studio painting', 'paper painting', 'one of a kind',
  'contemporary art', 'modern wall art', 'artist original'
];

function clipTag(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[@#_]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20)
    .trim();
}

function addTag(tags, value) {
  const tag = clipTag(value);
  if (!tag || tag.length < 2 || tag === 'original painting' || tags.includes(tag)) return;
  tags.push(tag);
}

function titlePhrases(title) {
  const cleaned = String(title || '')
    .replace(/[@#_]/g, ' ')
    .replace(/[^a-zA-Z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleaned.split(' ').filter(Boolean);
  const phrases = [];
  if (cleaned) phrases.push(cleaned);
  for (let i = 0; i < words.length - 1; i++) phrases.push(words[i] + ' ' + words[i + 1]);
  for (const word of words) if (word.length > 2 && !/^(the|and|for|with|from|into|over)$/i.test(word)) phrases.push(word);
  return phrases;
}

function sizeBand(dimensions) {
  if (!dimensions) return null;
  const factor = dimensions.unit === 'cm' ? 1 / 2.54 : 1;
  const longer = Math.max(dimensions.width, dimensions.height) * factor;
  if (longer >= 36) return 'large wall art';
  if (longer >= 20) return 'medium wall art';
  if (longer >= 12) return 'small wall art';
  return 'mini painting';
}

export function buildSubjectTags(product) {
  if (CURATED_SUBJECT_TAGS[product.id]) return [...CURATED_SUBJECT_TAGS[product.id]];
  const tags = [];
  const medium = String(product.medium || 'Watercolor pastel').toLowerCase();
  if (medium.includes('pastel')) {
    addTag(tags, 'watercolor pastel');
    addTag(tags, 'pastel painting');
  } else if (medium.includes('watercolor')) {
    addTag(tags, 'watercolor');
    addTag(tags, 'watercolor art');
  } else {
    addTag(tags, medium);
    addTag(tags, 'painting');
  }
  const assigned = paintingTags.assignments[product.id] || [];
  for (const key of assigned) {
    const label = paintingTags.tags[key]?.label;
    if (label) addTag(tags, label);
    addTag(tags, key.replace(/-/g, ' '));
  }
  for (const phrase of titlePhrases(product.title)) addTag(tags, phrase);
  addTag(tags, sizeBand(product.dimensions));
  if (product.year) addTag(tags, String(product.year) + ' painting');
  for (const filler of FILLERS) {
    if (tags.length >= 12) break;
    addTag(tags, filler);
  }
  // Stable unique fillers if still short (avoid colliding with another painting's set).
  let n = 1;
  while (tags.length < 12 && n <= 40) {
    addTag(tags, product.id.replace(/-/g, ' ').slice(0, 12) + ' ' + n);
    n += 1;
  }
  const subject = tags.slice(0, 12);
  if (subject.length !== 12 || new Set(subject).size !== 12 || subject.some(tag => tag.length > 20 || tag.length < 2)) {
    throw Error('Could not build 12 distinct Etsy subject tags for ' + product.id + ': ' + JSON.stringify(tags));
  }
  return subject;
}

function inchesOf(dimensions) {
  if (!dimensions || !['in', 'cm'].includes(dimensions.unit)) throw Error('Original needs dimensions in inches or centimeters.');
  if (!(dimensions.width > 0) || !(dimensions.height > 0)) throw Error('Original needs positive dimensions.');
  if (dimensions.unit === 'in') return {width: dimensions.width, height: dimensions.height, unit: 'in'};
  return {
    width: +(dimensions.width / 2.54).toFixed(1),
    height: +(dimensions.height / 2.54).toFixed(1),
    unit: 'in'
  };
}

function parcelFor(product) {
  const recorded = product.checkout?.shipping;
  if (recorded && ['flat', 'tube'].includes(recorded.packaging)
    && recorded.weight > 0 && recorded.length > 0 && recorded.width > 0 && recorded.height > 0) {
    return {
      packaging: recorded.packaging,
      item_weight: recorded.weight,
      item_length: recorded.length,
      item_width: recorded.width,
      item_height: recorded.height,
      item_weight_unit: 'lb',
      item_dimensions_unit: 'in'
    };
  }
  if (!product.dimensions) throw Error('No recorded or computable parcel for ' + product.id);
  const flatThickness = recorded?.height > 0 ? recorded.height : 2;
  const rollable = !(product.framing && !/unframed/i.test(product.framing));
  const weight = recorded?.weight > 0
    ? recorded.weight
    : estimatePaperParcelWeightLb({
      dimensions: product.dimensions,
      framing: product.framing,
      checkout: {shipping: {height: flatThickness}}
    });
  const derived = deriveParcel(product.dimensions, weight, flatThickness, {rollable});
  return {
    packaging: derived.packaging,
    item_weight: derived.weight,
    item_length: derived.length,
    item_width: derived.width,
    item_height: derived.height,
    item_weight_unit: 'lb',
    item_dimensions_unit: 'in'
  };
}

function eligible(product) {
  if (product.type !== 'painting') return false;
  if (product.artist === 'Paul Murphy') return false;
  if (product.listing?.status !== 'available') return false;
  if (SKIP_IDS.has(product.id)) return false;
  if (!product.dimensions?.width || !product.dimensions?.height) return false;
  if (!product.listing?.price?.amount) return false;
  return true;
}

export function buildOriginalSource(items = products) {
  const selected = items.filter(eligible).sort((a, b) => a.id.localeCompare(b.id));
  return selected.map(product => {
    const parcel = parcelFor(product);
    const {packaging, ...shipping} = parcel;
    const tags = buildSubjectTags(product);
    return {
      id: product.id,
      title: product.title,
      artist: product.artist || 'TJ Murphy',
      year: product.year ? Number(product.year) || null : null,
      medium: product.medium || 'Watercolor pastel',
      story: product.story || [],
      dimensions: inchesOf(product.dimensions),
      image: {src: product.image.src, alt: product.image.alt},
      ...(product.gallery?.[0]?.alt ? {roomAlt: product.gallery[0].alt} : {}),
      subjectTags: tags,
      original: {
        price: product.listing.price.amount,
        currency: product.listing.price.currency,
        packaging,
        shipping
      }
    };
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = buildOriginalSource();
  const sourceVersion = createHash('sha256').update(JSON.stringify(output)).digest('hex').slice(0, 20);
  await writeFile(
    new URL('../cloudflare/etsy-original-source.mjs', import.meta.url),
    `// Generated from the catalog for original-only Etsy sync. Do not edit by hand.\nexport const originalSourceVersion=${JSON.stringify(sourceVersion)};\nexport default ${JSON.stringify(output, null, 2)};\n`
  );
  console.log(`Built Etsy original source for ${output.length} paintings (${output.filter(item => item.original.packaging === 'tube').length} tube, ${output.filter(item => item.original.packaging === 'flat').length} flat).`);
}
