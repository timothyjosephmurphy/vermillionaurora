// Shipping addresses for checkout: the country list, regions, postal-code rules and
// destinations checkout cannot serve. Shared by the cart page and the checkout Worker.
// Prices stay in USD. Outside the US the buyer pays import duties and taxes on delivery (DDU).

export const DUTIES_NOTE='Orders shipped outside the United States are priced and charged in USD. Import duties, taxes and customs fees are not included; your carrier or customs office collects them from you on delivery.';

const ALL=[
  ["AD","Andorra"],
  ["AE","United Arab Emirates"],
  ["AF","Afghanistan"],
  ["AG","Antigua & Barbuda"],
  ["AI","Anguilla"],
  ["AL","Albania"],
  ["AM","Armenia"],
  ["AO","Angola"],
  ["AR","Argentina"],
  ["AS","American Samoa"],
  ["AT","Austria"],
  ["AU","Australia"],
  ["AW","Aruba"],
  ["AX","Åland Islands"],
  ["AZ","Azerbaijan"],
  ["BA","Bosnia & Herzegovina"],
  ["BB","Barbados"],
  ["BD","Bangladesh"],
  ["BE","Belgium"],
  ["BF","Burkina Faso"],
  ["BG","Bulgaria"],
  ["BH","Bahrain"],
  ["BI","Burundi"],
  ["BJ","Benin"],
  ["BL","St. Barthélemy"],
  ["BM","Bermuda"],
  ["BN","Brunei"],
  ["BO","Bolivia"],
  ["BQ","Caribbean Netherlands"],
  ["BR","Brazil"],
  ["BS","Bahamas"],
  ["BT","Bhutan"],
  ["BW","Botswana"],
  ["BY","Belarus"],
  ["BZ","Belize"],
  ["CA","Canada"],
  ["CC","Cocos (Keeling) Islands"],
  ["CD","Congo - Kinshasa"],
  ["CF","Central African Republic"],
  ["CG","Congo - Brazzaville"],
  ["CH","Switzerland"],
  ["CI","Côte d’Ivoire"],
  ["CK","Cook Islands"],
  ["CL","Chile"],
  ["CM","Cameroon"],
  ["CN","China"],
  ["CO","Colombia"],
  ["CR","Costa Rica"],
  ["CU","Cuba"],
  ["CV","Cape Verde"],
  ["CW","Curaçao"],
  ["CX","Christmas Island"],
  ["CY","Cyprus"],
  ["CZ","Czechia"],
  ["DE","Germany"],
  ["DJ","Djibouti"],
  ["DK","Denmark"],
  ["DM","Dominica"],
  ["DO","Dominican Republic"],
  ["DY","Benin"],
  ["DZ","Algeria"],
  ["EC","Ecuador"],
  ["EE","Estonia"],
  ["EG","Egypt"],
  ["EH","Western Sahara"],
  ["ER","Eritrea"],
  ["ES","Spain"],
  ["ET","Ethiopia"],
  ["FI","Finland"],
  ["FJ","Fiji"],
  ["FK","Falkland Islands"],
  ["FM","Micronesia"],
  ["FO","Faroe Islands"],
  ["FR","France"],
  ["GA","Gabon"],
  ["GB","United Kingdom"],
  ["GD","Grenada"],
  ["GE","Georgia"],
  ["GF","French Guiana"],
  ["GG","Guernsey"],
  ["GH","Ghana"],
  ["GI","Gibraltar"],
  ["GL","Greenland"],
  ["GM","Gambia"],
  ["GN","Guinea"],
  ["GP","Guadeloupe"],
  ["GQ","Equatorial Guinea"],
  ["GR","Greece"],
  ["GT","Guatemala"],
  ["GU","Guam"],
  ["GW","Guinea-Bissau"],
  ["GY","Guyana"],
  ["HK","Hong Kong SAR China"],
  ["HN","Honduras"],
  ["HR","Croatia"],
  ["HT","Haiti"],
  ["HU","Hungary"],
  ["HV","Burkina Faso"],
  ["ID","Indonesia"],
  ["IE","Ireland"],
  ["IL","Israel"],
  ["IM","Isle of Man"],
  ["IN","India"],
  ["IQ","Iraq"],
  ["IR","Iran"],
  ["IS","Iceland"],
  ["IT","Italy"],
  ["JE","Jersey"],
  ["JM","Jamaica"],
  ["JO","Jordan"],
  ["JP","Japan"],
  ["KE","Kenya"],
  ["KG","Kyrgyzstan"],
  ["KH","Cambodia"],
  ["KI","Kiribati"],
  ["KM","Comoros"],
  ["KN","St. Kitts & Nevis"],
  ["KP","North Korea"],
  ["KR","South Korea"],
  ["KW","Kuwait"],
  ["KY","Cayman Islands"],
  ["KZ","Kazakhstan"],
  ["LA","Laos"],
  ["LB","Lebanon"],
  ["LC","St. Lucia"],
  ["LI","Liechtenstein"],
  ["LK","Sri Lanka"],
  ["LR","Liberia"],
  ["LS","Lesotho"],
  ["LT","Lithuania"],
  ["LU","Luxembourg"],
  ["LV","Latvia"],
  ["LY","Libya"],
  ["MA","Morocco"],
  ["MC","Monaco"],
  ["MD","Moldova"],
  ["ME","Montenegro"],
  ["MF","St. Martin"],
  ["MG","Madagascar"],
  ["MH","Marshall Islands"],
  ["MK","North Macedonia"],
  ["ML","Mali"],
  ["MM","Myanmar (Burma)"],
  ["MN","Mongolia"],
  ["MO","Macao SAR China"],
  ["MP","Northern Mariana Islands"],
  ["MQ","Martinique"],
  ["MR","Mauritania"],
  ["MS","Montserrat"],
  ["MT","Malta"],
  ["MU","Mauritius"],
  ["MV","Maldives"],
  ["MW","Malawi"],
  ["MX","Mexico"],
  ["MY","Malaysia"],
  ["MZ","Mozambique"],
  ["NA","Namibia"],
  ["NC","New Caledonia"],
  ["NE","Niger"],
  ["NF","Norfolk Island"],
  ["NG","Nigeria"],
  ["NH","Vanuatu"],
  ["NI","Nicaragua"],
  ["NL","Netherlands"],
  ["NO","Norway"],
  ["NP","Nepal"],
  ["NR","Nauru"],
  ["NU","Niue"],
  ["NZ","New Zealand"],
  ["OM","Oman"],
  ["PA","Panama"],
  ["PE","Peru"],
  ["PF","French Polynesia"],
  ["PG","Papua New Guinea"],
  ["PH","Philippines"],
  ["PK","Pakistan"],
  ["PL","Poland"],
  ["PM","St. Pierre & Miquelon"],
  ["PN","Pitcairn Islands"],
  ["PR","Puerto Rico"],
  ["PS","Palestinian Territories"],
  ["PT","Portugal"],
  ["PW","Palau"],
  ["PY","Paraguay"],
  ["QA","Qatar"],
  ["RE","Réunion"],
  ["RH","Zimbabwe"],
  ["RO","Romania"],
  ["RS","Serbia"],
  ["RU","Russia"],
  ["RW","Rwanda"],
  ["SA","Saudi Arabia"],
  ["SB","Solomon Islands"],
  ["SC","Seychelles"],
  ["SD","Sudan"],
  ["SE","Sweden"],
  ["SG","Singapore"],
  ["SH","St. Helena"],
  ["SI","Slovenia"],
  ["SJ","Svalbard & Jan Mayen"],
  ["SK","Slovakia"],
  ["SL","Sierra Leone"],
  ["SM","San Marino"],
  ["SN","Senegal"],
  ["SO","Somalia"],
  ["SR","Suriname"],
  ["SS","South Sudan"],
  ["ST","São Tomé & Príncipe"],
  ["SV","El Salvador"],
  ["SX","Sint Maarten"],
  ["SY","Syria"],
  ["SZ","Eswatini"],
  ["TC","Turks & Caicos Islands"],
  ["TD","Chad"],
  ["TG","Togo"],
  ["TH","Thailand"],
  ["TJ","Tajikistan"],
  ["TK","Tokelau"],
  ["TL","Timor-Leste"],
  ["TM","Turkmenistan"],
  ["TN","Tunisia"],
  ["TO","Tonga"],
  ["TR","Türkiye"],
  ["TT","Trinidad & Tobago"],
  ["TV","Tuvalu"],
  ["TW","Taiwan"],
  ["TZ","Tanzania"],
  ["UA","Ukraine"],
  ["UG","Uganda"],
  ["UK","United Kingdom"],
  ["US","United States"],
  ["UY","Uruguay"],
  ["UZ","Uzbekistan"],
  ["VA","Vatican City"],
  ["VC","St. Vincent & Grenadines"],
  ["VD","Vietnam"],
  ["VE","Venezuela"],
  ["VG","British Virgin Islands"],
  ["VI","U.S. Virgin Islands"],
  ["VN","Vietnam"],
  ["VU","Vanuatu"],
  ["WF","Wallis & Futuna"],
  ["WS","Samoa"],
  ["YD","Yemen"],
  ["YE","Yemen"],
  ["YT","Mayotte"],
  ["ZA","South Africa"],
  ["ZM","Zambia"],
  ["ZW","Zimbabwe"]
];

// Sanctioned or unservable destinations. Checkout never quotes, charges or ships to these.
export const BLOCKED_COUNTRIES=new Set(['CU','IR','KP','SY','RU','BY']);
export const BLOCKED_MESSAGE='Sorry, online checkout cannot ship to this destination because of trade sanctions or carrier restrictions.';
// Crimea, Sevastopol and the so-called Donetsk and Luhansk People's Republics (Ukrainian postal codes 83–87 and 91–99).
const OCCUPIED_UA_REGION=/crimea|krym|krim|sevastopol|sebastopol|donetsk|donets'k|luhansk|lugansk|luhans'k/i;
const OCCUPIED_UA_POSTAL=/^(8[3-7]|9[1-9])\d{3}$/;

export const COUNTRIES=ALL.filter(([code])=>!BLOCKED_COUNTRIES.has(code)).map(([code,name])=>({code,name}));
const NAMES=new Map(ALL);
export const countryName=code=>NAMES.get(code)||code;

export const US_STATES=['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','AS','GU','MP','PR','VI','AA','AE','AP'];
export const CA_PROVINCES=['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'];
export const AU_STATES=['ACT','NSW','NT','QLD','SA','TAS','VIC','WA'];
// Countries whose addresses need a state, province or region. US, CA and AU use the coded lists above.
export const REGION_CODES={US:US_STATES,CA:CA_PROVINCES,AU:AU_STATES};
export const REGION_REQUIRED=new Set(['US','CA','AU','MX','BR','IN','CN','AR','MY','JP']);
export const REGION_LABEL={US:'State',CA:'Province',AU:'State or territory',JP:'Prefecture',IE:'County',GB:'County'};
export const POSTAL_LABEL={US:'ZIP code',CA:'Postal code',GB:'Postcode',AU:'Postcode',IN:'PIN code',IE:'Eircode'};

// Known postal-code formats (normalised to upper case). A country listed here requires a postal code.
// Elsewhere the postal code is optional and only checked for length.
export const POSTAL_FORMATS={
  US:/^\d{5}(-\d{4})?$/,
  CA:/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] \d[ABCEGHJ-NPRSTV-Z]\d$/,
  GB:/^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/,
  DE:/^\d{5}$/,FR:/^\d{5}$/,IT:/^\d{5}$/,ES:/^\d{5}$/,FI:/^\d{5}$/,MX:/^\d{5}$/,
  AU:/^\d{4}$/,NZ:/^\d{4}$/,AT:/^\d{4}$/,BE:/^\d{4}$/,CH:/^\d{4}$/,DK:/^\d{4}$/,NO:/^\d{4}$/,
  NL:/^\d{4} ?[A-Z]{2}$/,SE:/^\d{3} ?\d{2}$/,PT:/^\d{4}-\d{3}$/,PL:/^\d{2}-\d{3}$/,
  JP:/^\d{3}-?\d{4}$/,BR:/^\d{5}-?\d{3}$/,IN:/^\d{6}$/,CN:/^\d{6}$/,
};

// Errors the buyer can fix or needs to read; checkout shows their message as written.
export function destinationError(message){const error=Error(message);error.code='DESTINATION';return error;}
const text=(value,max,label,required=true)=>{
  const v=String(value??'').trim().replace(/\s+/g,' ');
  if(/[\u0000-\u001f]/.test(v))throw destinationError(`Check the ${label}`);
  if(required&&!v)throw destinationError(`Enter the ${label}`);
  if(v.length>max)throw destinationError(`The ${label} is too long`);
  return v;
};
export function normalisePostal(country,value) {
  let v=String(value??'').trim().toUpperCase().replace(/\s+/g,' ');
  if(country==='CA'&&/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(v))v=`${v.slice(0,3)} ${v.slice(-3)}`;
  if(country==='GB'&&/^[A-Z0-9]{5,7}$/.test(v))v=`${v.slice(0,-3)} ${v.slice(-3)}`;
  return v;
}
export const isInternational=address=>!!address&&address.country!=='US';

// Returns {name,street1,street2,city,state,zip,country,phone?}. A missing country means US (older carts and quotes).
export function cleanShippingAddress(input) {
  if(!input||typeof input!=='object')throw destinationError('Shipping address required');
  const country=String(input.country||'US').trim().toUpperCase();
  if(BLOCKED_COUNTRIES.has(country))throw destinationError(BLOCKED_MESSAGE);
  if(!NAMES.has(country))throw destinationError('Choose a destination country from the list');
  const isUS=country==='US';
  const address={name:text(input.name,100,'full name'),street1:text(input.street1,100,'street address'),street2:text(input.street2,100,'second address line',false),
    city:text(input.city,isUS?100:50,'city')};
  const codes=REGION_CODES[country],region=text(input.state,50,(REGION_LABEL[country]||'state, province or region').toLowerCase(),REGION_REQUIRED.has(country));
  if(codes){
    const code=region.toUpperCase();
    if(!codes.includes(code))throw destinationError(isUS?'Enter a valid two-letter US state code':country==='CA'?'Enter a valid two-letter Canadian province or territory code, such as ON or BC':'Choose a valid Australian state or territory, such as NSW');
    address.state=code;
  } else address.state=region;
  const zip=normalisePostal(country,input.zip),format=POSTAL_FORMATS[country];
  if(format&&!format.test(zip))throw destinationError(isUS?'Enter a 5-digit ZIP code':country==='CA'?'Enter a Canadian postal code such as K1A 0B1':`Enter a valid postal code for ${countryName(country)}`);
  if(zip.length>10||/[^A-Z0-9 -]/.test(zip))throw destinationError('Check the postal code');
  address.zip=zip;
  address.country=country;
  if(country==='UA'&&(OCCUPIED_UA_REGION.test(`${address.state} ${address.city}`)||OCCUPIED_UA_POSTAL.test(zip)))throw destinationError(BLOCKED_MESSAGE);
  const phone=String(input.phone??'').trim();
  if(phone){if(!/^\+?[0-9 ().-]{7,20}$/.test(phone))throw destinationError('Check the phone number');address.phone=phone;}
  return address;
}

// Lines for emails and labels, in the usual international order.
export function addressLines(a) {
  if(!a)return [];
  const local=a.country==='US'||a.country==='CA'||a.country==='AU'?[a.city&&`${a.city}, ${[a.state,a.zip].filter(Boolean).join(' ')}`]:[[a.zip,a.city].filter(Boolean).join(' '),a.state];
  return [a.name,a.street1,a.street2,...local,a.country&&a.country!=='US'?countryName(a.country):'' ].filter(Boolean);
}
