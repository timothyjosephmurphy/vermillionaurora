const ceilInches = value => Math.ceil(value - 1e-9);
export function deriveParcel(dimensions, weight=2, flatThickness=2, {rollable=true}={}) {
 if(!dimensions||!['in','cm'].includes(dimensions.unit)||!Number.isFinite(dimensions.width)||dimensions.width<=0||!Number.isFinite(dimensions.height)||dimensions.height<=0)throw new Error('Positive painting dimensions in inches or centimeters are required.');
 if(!Number.isFinite(weight)||weight<=0||!Number.isFinite(flatThickness)||flatThickness<=0)throw new Error('Positive package weight and flat thickness are required.');
 const factor=dimensions.unit==='cm'?1/2.54:1,a=dimensions.width*factor,b=dimensions.height*factor,shorter=Math.min(a,b),longer=Math.max(a,b);
 if(rollable&&longer>12)return {length:ceilInches(shorter),width:4,height:4,weight,packaging:'tube'};
 return {length:ceilInches(longer)+2,width:ceilInches(shorter)+2,height:flatThickness,weight,packaging:'flat'};
}

// The checkout-catalog entry for one integrated painting: the parcel and packaging profile checkout quotes with.
// Shared by payments/build-checkout-catalog.mjs and the Nostr marketplace publisher (#325) so both quote the same box.
export function checkoutItem(p) {
 const s=p.checkout.shipping,rollable=!(p.framing&&!/unframed/i.test(p.framing));
 const pkg=s.packageOverride?{length:s.length,width:s.width,height:s.height,weight:s.weight,packaging:s.packaging}:deriveParcel(p.dimensions,s.weight,s.height,{rollable});
 return {title:p.title,amount:p.listing.price.amount,currency:p.listing.price.currency,parcel:{length:pkg.length,width:pkg.width,height:pkg.height,weight:pkg.weight},packaging:pkg.packaging,...(s.insuranceRequested?{insuranceRequested:true}:{}),...(p.listing.status!=='available'?{available:false}:{})};
}
