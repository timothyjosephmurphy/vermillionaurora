// Marketplace sync (Shopstr / Plebeian "Gamma") for studio-tracker #325, phase 1.
// Nothing in this module publishes. Every value TJ should review is marked "TJ:".

// ---- Switches (all default OFF; set only by TJ in the Cloudflare dashboard) ----------------------------
// MARKET_PUBLISH_ENABLED  "true" is the master switch. Anything else (or unset) = dry-run only.
// MARKET_MODE             "dry-run" (default) or "publish". Publishing needs BOTH "publish" and the master switch.
// MARKET_APPROVED_IDS     comma-separated catalog product ids TJ approved. Default: none approved.
// MARKET_PROFILE_APPROVED "true" lets the kind 0 profile update be signed. Default: not approved.
export const MODE_DRY_RUN = 'dry-run';
export const MODE_PUBLISH = 'publish';

// Public key of the existing publisher account (same as NOSTR_PUBKEY in worker/site.mjs, public by design).
// A signer must produce exactly this pubkey or signing aborts. TJ decided to reuse the existing key.
export const MARKET_PUBKEY = '7edfc4a9556797f26adab9d1fd5adbe5f66f174546f8ddeee09502cd532f88cb';

// ---- Timing (TJ, Oct 23 2026) -------------------------------------------------------------------------
export const MARKET_HOLD_TTL_MS = 2 * 60 * 60_000;      // marketplace order DM = hold for 2 hours
export const MARKET_POLL_INTERVAL_MS = 5 * 60_000;       // sale detection poll (matches the */5 cron)
// NIP-59 gift wraps randomize created_at up to 2 days back, so detection widens `since` by this much.
export const MARKET_GIFT_WRAP_LOOKBACK_S = 2 * 24 * 60 * 60;

// ---- Prices --------------------------------------------------------------------------------------------
// TJ: marketplace price = site price, USD, no uplift (Etsy keeps its own 10% uplift).
export const MARKET_PRICE_UPLIFT = 1;

// ---- Shipping (TJ: "contact for quote or just a flat rate for now"; buyer pays; worldwide) ----------------
// PLACEHOLDER VALUES, NOT FINAL. TJ: set these. They are deliberately conservative (high) so a sale never
// loses money on postage. Costs are USD whole dollars as strings.
export const MARKET_SHIPPING = Object.freeze({
  placeholder: true,                 // TJ: set to false once the numbers below are real
  us: Object.freeze({ id: 'tjm-ship-us', title: 'Tracked shipping, United States', cost: '45.00', durationDays: [3, 10] }),
  international: Object.freeze({ id: 'tjm-ship-intl', title: 'Tracked shipping, international', cost: '95.00', durationDays: [7, 21] }),
  // Which flat tier the single-cost Shopstr `shipping` tag carries. Shopstr has one "Added Cost" per listing,
  // so the default is the higher (international) tier so a buyer never underpays. TJ: confirm.
  shopstrTier: 'international',
  // Works that do not fit a flat rate get "contact for quote" instead of a cost: no shipping cost tags,
  // a `shipping-note` tag and a line in the description.
  framedIsQuote: true,
  maxFlatLongestSideIn: 40,          // TJ: longest side (inches) above which a work is quote-only
  noQuoteProfileIsQuote: true        // no packed-parcel profile in the catalog -> quote
});
export const MARKET_QUOTE_TEXT = 'Shipping: contact me for a quote before buying. Buyer pays shipping.';

// ISO 3166-1 alpha-2 codes shipped to. US tier = US only. International = every country except the
// sanctioned destinations on tjm.art/shipping-returns (Cuba, Iran, North Korea, Syria, Russia, Belarus;
// the occupied regions of Ukraine are regions, not countries, so they are not expressible here: TJ to confirm).
export const SANCTIONED_COUNTRIES = Object.freeze(['CU', 'IR', 'KP', 'SY', 'RU', 'BY']);
const ALL_COUNTRIES = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IS IT JE JM JO JP KE KG KH KI KM KN KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const UNINHABITED = ['AQ', 'BV', 'HM', 'GS', 'TF', 'UM', 'IO', 'CX', 'CC'];
export const INTERNATIONAL_COUNTRIES = Object.freeze([...new Set(ALL_COUNTRIES)].filter((c) =>
  c !== 'US' && !SANCTIONED_COUNTRIES.includes(c) && !UNINHABITED.includes(c)));

// ---- Listing ---------------------------------------------------------------------------------------------
export const MARKET_SITE = 'https://tjm.art';
export const MARKET_LOCATION = 'Seattle, WA, US';           // UNVERIFIED how each app renders this
export const MARKET_RELAYS = Object.freeze([
  'wss://relay.damus.io', 'wss://nos.lol', 'wss://relay.primal.net', 'wss://relay.nostr.band', 'wss://relay.plebeian.market'
]);
// Only these catalog artists are listed. The catalog also holds Paul Murphy's works, which are never listed here.
export const MARKET_ARTIST = 'TJ Murphy';
export const MARKET_BUSINESS = 'Vermillion Aurora Productions';

// ---- Profile (kind 0), DRAFT for TJ -----------------------------------------------------------------------
export const MARKET_PROFILE = Object.freeze({
  name: 'TJ Murphy',
  display_name: 'TJ Murphy',
  about: 'Seattle watercolor artist. I paint the light on water, shorelines, birds and portraits in watercolor and watercolor pastel, and the odd outdoor mural. Originals, prints and commissions at tjm.art. Vermillion Aurora Productions.',
  website: 'https://tjm.art',
  nip05: 'tj@tjm.art',
  lud16: 'tj@tjm.art'          // verified live Oct 23: resolves to pay.tjm.art LNURL, allowsNostr true
});
