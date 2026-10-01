const ceilInches = value => Math.ceil(value - 1e-9);
export function deriveParcel(dimensions, weight=2, flatThickness=2) {
 if(!dimensions||!['in','cm'].includes(dimensions.unit)||!Number.isFinite(dimensions.width)||dimensions.width<=0||!Number.isFinite(dimensions.height)||dimensions.height<=0)throw new Error('Positive painting dimensions in inches or centimeters are required.');
 if(!Number.isFinite(weight)||weight<=0||!Number.isFinite(flatThickness)||flatThickness<=0)throw new Error('Positive package weight and flat thickness are required.');
 const factor=dimensions.unit==='cm'?1/2.54:1,a=dimensions.width*factor,b=dimensions.height*factor,shorter=Math.min(a,b),longer=Math.max(a,b);
 if(longer>12)return {length:ceilInches(shorter),width:4,height:4,weight,packaging:'tube'};
 return {length:ceilInches(longer),width:ceilInches(shorter),height:flatThickness,weight,packaging:'flat'};
}
