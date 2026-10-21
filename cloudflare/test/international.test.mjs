import { env } from 'cloudflare:workers';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanAddress, priceOrder, customsDeclaration, ORIGINAL_HS_CODE } from '../checkout-pricing.mjs';
import { finerworksRecipient } from '../finerworks-quotes.mjs';
import { salesTax } from '../wa-sales-tax.mjs';
import { squarePaymentBody } from '../square-provider.mjs';
import { addressLines, COUNTRIES, BLOCKED_COUNTRIES } from '../../catalog/addresses.mjs';
import catalog from '../checkout-catalog.mjs';

// Quote-only: every provider call is mocked. No payment, label, order or hold.
const slug = 'painting-chef-in-white';
const ADDRESSES = {
  US:{name:'Test Buyer',street1:'1600 Amphitheatre Pkwy',city:'Mountain View',state:'ca',zip:'94043'},
  CA:{name:'Test Buyer',street1:'301 Front St W',city:'Toronto',state:'on',zip:'m5v2t6',country:'CA'},
  GB:{name:'Test Buyer',street1:'10 Downing St',city:'London',zip:'sw1a2aa',country:'GB'},
  DE:{name:'Test Buyer',street1:'Platz der Republik 1',city:'Berlin',zip:'11011',country:'DE'},
  AU:{name:'Test Buyer',street1:'1 Macquarie St',city:'Sydney',state:'nsw',zip:'2000',country:'AU'},
};
let shipments;
beforeEach(() => {
  shipments = [];
  vi.stubGlobal('fetch', vi.fn(async (url, options = {}) => {
    if (String(url) === 'https://api.goshippo.com/shipments/') {
      const body = JSON.parse(options.body); shipments.push(body);
      return Response.json({object_id:'SHIP1',rates:[{object_id:'RATE1',currency:'USD',amount:'48.20',provider:'UPS',servicelevel:{name:'Worldwide Expedited'}}]});
    }
    throw new Error(`Unexpected fetch ${url}`);
  }));
});
afterEach(() => vi.unstubAllGlobals());

it('cleans US, CA, GB, DE and AU addresses and keeps older carts as US', () => {
  expect(cleanAddress(ADDRESSES.US)).toMatchObject({state:'CA',zip:'94043',country:'US'});
  expect(cleanAddress(ADDRESSES.CA)).toMatchObject({state:'ON',zip:'M5V 2T6',country:'CA'});
  expect(cleanAddress(ADDRESSES.GB)).toMatchObject({state:'',zip:'SW1A 2AA',country:'GB'});
  expect(cleanAddress(ADDRESSES.DE)).toMatchObject({zip:'11011',country:'DE'});
  expect(cleanAddress(ADDRESSES.AU)).toMatchObject({state:'NSW',zip:'2000',country:'AU'});
});
it('rejects invalid regions and postal codes per country', () => {
  expect(() => cleanAddress({...ADDRESSES.CA,state:'XX'})).toThrow(/province/);
  expect(() => cleanAddress({...ADDRESSES.CA,zip:'12345'})).toThrow(/postal code/);
  expect(() => cleanAddress({...ADDRESSES.CA,state:''})).toThrow();
  expect(() => cleanAddress({...ADDRESSES.AU,state:''})).toThrow();
  expect(() => cleanAddress({...ADDRESSES.DE,zip:'1101'})).toThrow(/Germany/);
  expect(() => cleanAddress({...ADDRESSES.US,state:'ZZ'})).toThrow(/state/);
  expect(() => cleanAddress({...ADDRESSES.US,zip:'K1A 0B1'})).toThrow(/ZIP/);
  expect(cleanAddress({name:'A B',street1:'1 Road',city:'Dubai',country:'AE'})).toMatchObject({zip:'',state:'',country:'AE'});
});
it('blocks sanctioned destinations with a clear message', () => {
  for (const country of ['CU','IR','KP','SY','RU','BY']) {
    expect(BLOCKED_COUNTRIES.has(country)).toBe(true);
    expect(COUNTRIES.some(c => c.code === country)).toBe(false);
    expect(() => cleanAddress({...ADDRESSES.DE,country,zip:''})).toThrow(/sanctions/);
  }
  expect(() => cleanAddress({name:'A B',street1:'1 Lenina',city:'Simferopol',state:'Crimea',zip:'95000',country:'UA'})).toThrow(/sanctions/);
  expect(() => cleanAddress({name:'A B',street1:'1 Street',city:'Donetsk',zip:'83001',country:'UA'})).toThrow(/sanctions/);
  expect(cleanAddress({name:'A B',street1:'1 Khreshchatyk',city:'Kyiv',zip:'01001',country:'UA'}).country).toBe('UA');
});
it('quotes originals abroad with a DDU customs declaration (HS 9701) and none for US', async () => {
  for (const country of ['US','CA','GB','DE','AU']) {
    const quote = await priceOrder(env, slug, ADDRESSES[country]);
    const body = shipments.at(-1);
    expect(body.address_to.country).toBe(country);
    expect(body.address_from).toMatchObject({city:'Seattle',state:'WA',country:'US'});
    if (country === 'US') { expect(body.customs_declaration).toBeUndefined(); continue; }
    const customs = body.customs_declaration;
    expect(customs).toMatchObject({contents_type:'MERCHANDISE',incoterm:'DDU',non_delivery_option:'RETURN',eel_pfc:country === 'CA' ? 'NOEEI_30_36' : 'NOEEI_30_37_a'});
    expect(customs.items).toEqual([expect.objectContaining({tariff_number:ORIGINAL_HS_CODE,value_amount:Number(catalog[slug].amount).toFixed(2),value_currency:'USD',origin_country:'US',quantity:1})]);
    expect(ORIGINAL_HS_CODE.startsWith('9701')).toBe(true);
    expect(quote.tax).toBe('0.00');
    expect(quote.salesTax).toMatchObject({collected:false,basis:'export'});
    expect(quote.customs).toMatchObject({hsCode:ORIGINAL_HS_CODE,incoterm:'DDU'});
  }
});
it('certifies the customs declaration only with a configured signer, and blocks exports over $2,500 outside Canada', () => {
  const item = {amount:'400.00',parcel:{weight:3}};
  expect(customsDeclaration({}, item, {country:'GB'})).toMatchObject({certify:false});
  expect(customsDeclaration({SHIPPO_CUSTOMS_SIGNER:'Signer'}, item, {country:'GB'})).toMatchObject({certify:true,certify_signer:'Signer'});
  expect(() => customsDeclaration({}, {...item,amount:'3000.00'}, {country:'DE'})).toThrow(/export paperwork/);
  expect(customsDeclaration({}, {...item,amount:'3000.00'}, {country:'CA'}).eel_pfc).toBe('NOEEI_30_36');
});
it('sends FinerWorks a province outside the US and a state code inside it', () => {
  expect(finerworksRecipient(cleanAddress(ADDRESSES.CA),'po')).toMatchObject({country_code:'CA',province:'ON',state_code:null,zip_postal_code:'M5V 2T6'});
  expect(finerworksRecipient(cleanAddress(ADDRESSES.GB),'po')).toMatchObject({country_code:'GB',province:'',zip_postal_code:'SW1A 2AA'});
  expect(finerworksRecipient(cleanAddress(ADDRESSES.US),'po')).toMatchObject({country_code:'US',state_code:'CA'});
  expect(finerworksRecipient(cleanAddress(ADDRESSES.US),'po').province).toBeUndefined();
});
it('charges no Washington sales tax on exports', async () => {
  for (const country of ['CA','GB','DE','AU']) {
    const {taxCents,tax} = await salesTax(cleanAddress(ADDRESSES[country]), 50000);
    expect(taxCents).toBe(0); expect(tax.basis).toBe('export');
  }
});
it('sends Square the real shipping country', () => {
  const data = {squareSourceId:'cnon:x',id:'ORDER',squareLocationId:'LOC',quote:{total:'10.00',email:'a@example.com',items:[{title:'Art'}],address:cleanAddress(ADDRESSES.GB)}};
  const body = squarePaymentBody(env, data);
  expect(body.shipping_address).toMatchObject({country:'GB',postal_code:'SW1A 2AA'});
  expect(body.shipping_address.administrative_district_level_1).toBeUndefined();
  expect(body.amount_money.currency).toBe('USD');
});
it('formats international addresses for emails', () => {
  expect(addressLines(cleanAddress(ADDRESSES.CA))).toEqual(['Test Buyer','301 Front St W','Toronto, ON M5V 2T6','Canada']);
  expect(addressLines(cleanAddress(ADDRESSES.DE))).toEqual(['Test Buyer','Platz der Republik 1','11011 Berlin','Germany']);
  expect(addressLines(cleanAddress(ADDRESSES.US)).at(-1)).toBe('Mountain View, CA 94043');
});
