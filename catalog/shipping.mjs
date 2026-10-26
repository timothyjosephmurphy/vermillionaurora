const ceilInches = value => Math.ceil(value - 1e-9);
export function deriveParcel(dimensions, weight=2, flatThickness=2, {rollable=true}={}) {
 if(!dimensions||!['in','cm'].includes(dimensions.unit)||!Number.isFinite(dimensions.width)||dimensions.width<=0||!Number.isFinite(dimensions.height)||dimensions.height<=0)throw new Error('Positive painting dimensions in inches or centimeters are required.');
 if(!Number.isFinite(weight)||weight<=0||!Number.isFinite(flatThickness)||flatThickness<=0)throw new Error('Positive package weight and flat thickness are required.');
 const factor=dimensions.unit==='cm'?1/2.54:1,a=dimensions.width*factor,b=dimensions.height*factor,shorter=Math.min(a,b),longer=Math.max(a,b);
 if(rollable&&longer>12)return {length:ceilInches(shorter),width:4,height:4,weight,packaging:'tube'};
 return {length:ceilInches(longer)+2,width:ceilInches(shorter)+2,height:flatThickness,weight,packaging:'flat'};
}

// Shippo insurance for originals (studio-tracker #128).
// Every shippable original priced at or above this amount (USD) is quoted and labeled with Shippo insurance for its
// full listed price; the premium is included in the shipping quote (cloudflare/shipping-insurance.mjs). Below it
// originals ship uninsured unless a product sets checkout.shipping.insuranceRequested: true. TJ and the bookkeeper
// should confirm this number. Changing it changes live shipping cost after the next catalog build and deploy.
export const INSURANCE_THRESHOLD_USD = 300;
export const insuranceRequiredFor = (amount, explicit = false) => explicit === true || Number(amount) >= INSURANCE_THRESHOLD_USD;

