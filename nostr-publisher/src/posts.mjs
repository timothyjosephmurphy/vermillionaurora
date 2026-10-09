// Nostr notes, published on the same Pacific-time schedule as TJ's Buffer posts (X / Instagram / Facebook).
// Never change or remove the id of an entry that has been published: its Durable Object receipt
// (nostr:sent:<id>) is what prevents a repeat. Syrenka and Honeybadger are published (Oct 3 and Oct 6).
// The El Zonte entry keeps its original id but moved from Oct 8, 11 PM to Sun Oct 11, 10 AM (El Zonte at Dawn),
// so at most one El Zonte note can ever go out.
// text: the Nostr note body (the X caption without its trailing tjm.art link and without X @handles);
// the publisher appends https://tjm.art + productUrl and the image URL. xText keeps the Buffer X caption for reference.
// A note whose text already contains its tjm.art + productUrl link (Moonrise, the testimonial request) is not given a second one.
export const posts = [
  {
    "id": "launch-warszawska-syrenka-2026-10-03",
    "title": "Warszawska Syrenka",
    "scheduledAt": "2026-10-03T23:00:00-07:00",
    "text": "I painted Warszawska Syrenka for the Bitcoin Film Festival in Warsaw. She is the city’s guardian, with hussar wings and a Bitcoin shield. I wanted the painting to carry Warsaw’s resilience, too: after World War II, its Old Town was rebuilt from ruins.\n\nMy new website is launching, with original paintings, fine-art prints, and commissions available to explore. Visit tjm.art.",
    "imageUrl": "https://tjm.art/gallery-images/warszawska-syrenka.jpeg",
    "productUrl": "/products/warszawska-syrenka/",
    "facebookText": "I painted Warszawska Syrenka for the Bitcoin Film Festival in Warsaw. She is the city’s guardian, with hussar wings and a Bitcoin shield. I wanted the painting to carry Warsaw’s resilience, too: after World War II, its Old Town was rebuilt from ruins.\n\nMy new website is launching, with original paintings, fine-art prints, and commissions available to explore. Visit tjm.art.\n\nExplore this painting: https://tjm.art/products/warszawska-syrenka/",
    "instagramText": "I painted Warszawska Syrenka for the Bitcoin Film Festival in Warsaw. She is the city’s guardian, with hussar wings and a Bitcoin shield. I wanted the painting to carry Warsaw’s resilience, too: after World War II, its Old Town was rebuilt from ruins.\n\nMy new website is launching, with original paintings, fine-art prints, and commissions available to explore. Visit tjm.art — link in bio.",
    "xText": "Warszawska Syrenka, painted for Bitcoin Film Festival Warsaw: the city’s guardian, hussar wings, and a Bitcoin shield. Originals, fine-art prints and commissions: https://tjm.art/products/warszawska-syrenka/"
  },
  {
    "id": "launch-honeybadger-cub-2026-10-06",
    "title": "Honeybadger and Cub with Genesis Block",
    "scheduledAt": "2026-10-06T07:00:00-07:00",
    "text": "In Honeybadger and Cub with Genesis Block, a fierce protector turns toward the future with tenderness. Behind them is Bitcoin’s Genesis block—the beginning of the chain. I built that pattern into the painting with clear-wax resist before adding watercolor.\n\nFor me, the painting brings together protection, care for future generations, and the freedom to build for the long term.\n\nMy new website is launching, with original paintings, fine-art prints, and commissions available to explore. Visit tjm.art.",
    "imageUrl": "https://tjm.art/gallery-images/honeybadger-and-cub.jpeg",
    "productUrl": "/products/honeybadger-and-cub-with-genesis-block/",
    "facebookText": "In Honeybadger and Cub with Genesis Block, a fierce protector turns toward the future with tenderness. Behind them is Bitcoin’s Genesis block—the beginning of the chain. I built that pattern into the painting with clear-wax resist before adding watercolor.\n\nFor me, the painting brings together protection, care for future generations, and the freedom to build for the long term.\n\nMy new website is launching, with original paintings, fine-art prints, and commissions available to explore. Visit tjm.art.\n\nExplore this painting: https://tjm.art/products/honeybadger-and-cub-with-genesis-block/",
    "instagramText": "In Honeybadger and Cub with Genesis Block, a fierce protector turns toward the future with tenderness. Behind them is Bitcoin’s Genesis block—the beginning of the chain. I built that pattern into the painting with clear-wax resist before adding watercolor.\n\nFor me, the painting brings together protection, care for future generations, and the freedom to build for the long term.\n\nMy new website is launching, with original paintings, fine-art prints, and commissions available to explore. Visit tjm.art — link in bio.",
    "xText": "Honeybadger and Cub with Genesis Block: fierce protection, care for future generations, and Bitcoin’s first block in clear wax resist and watercolor. Originals, prints, commissions: https://tjm.art/products/honeybadger-and-cub-with-genesis-block/"
  },
  {
    "id": "launch-sunrise-el-zonte-bitcoin-beach-2026-10-08",
    "title": "El Zonte at Dawn",
    "scheduledAt": "2026-10-11T10:00:00-07:00",
    "text": "Before dawn at the Punta El Zonte hostel, where the river meets the surf. Surfers paddling out, round stones tumbling in the waves, and that luminous tropical light. I painted it back in my Seattle studio. El Zonte at Dawn, original and prints:",
    "imageUrl": "https://tjm.art/gallery-images/el-zonte-at-dawn-2026.jpg",
    "productUrl": "/products/painting-shoreline-at-dusk/",
    "xText": "Before dawn at the Punta El Zonte hostel, where the river meets the surf. Surfers paddling out, round stones tumbling in the waves, and that luminous tropical light. I painted it back in my Seattle studio. El Zonte at Dawn, original and prints: https://tjm.art/products/painting-shoreline-at-dusk/"
  },
  {
    "id": "campaign-chase-toole-triptych-2026-10-13",
    "title": "El Salvador: Past, Present and Future (with Chase Toole)",
    "scheduledAt": "2026-10-13T07:00:00-07:00",
    "text": "El Salvador: Past, Present and Future. Three paintings I made in 2022 with Chase Toole, my art mentor for almost a decade and a concept artist in the video game industry. Watercolor pastel, 24 × 48 in each, $1,000 each:",
    "imageUrl": "https://tjm.art/gallery-images/insect-garden.jpg",
    "productUrl": "/exhibitions/chase-toole/",
    "xText": "El Salvador: Past, Present and Future. Three paintings I made in 2022 with Chase Toole, my art mentor for almost a decade and a concept artist in the video game industry. Watercolor pastel, 24 × 48 in each, $1,000 each: https://tjm.art/exhibitions/chase-toole/"
  },
  {
    "id": "campaign-cormorant-mural-2026-10-15",
    "title": "Cormorant Presiding over Sunset on Puget Sound",
    "scheduledAt": "2026-10-15T18:00:00-07:00",
    "text": "New mural in a Seattle garden: Cormorant Presiding over Sunset on Puget Sound. Brian and Marcos wanted their favorite view of the Olympics on their fence. Watercolor study first, then acrylic on board. Mural commissions open:",
    "imageUrl": "https://tjm.art/murals/images/cormorant-hero.jpg",
    "productUrl": "/murals/",
    "xText": "New mural in a Seattle garden: Cormorant Presiding over Sunset on Puget Sound. Brian and Marcos wanted their favorite view of the Olympics on their fence. Watercolor study first, then acrylic on board. Mural commissions open: https://tjm.art/murals/"
  },
  {
    "id": "campaign-testimonial-request-2026-10-16",
    "title": "Share a testimonial",
    "scheduledAt": "2026-10-16T12:00:00-07:00",
    "text": "Have one of my paintings at home? I'd love to hear about it. Share a testimonial with photos, or a short selfie video of you in front of your painting talking about it. If I approve it, I'll thank you with a personal code for a print of mine at cost: https://tjm.art/testimonials/#share",
    "imageUrl": "https://tjm.art/product-media/el-zonte/room-1-1600.jpg",
    "productUrl": "/testimonials/",
    "xText": "Have one of my paintings at home? I'd love to hear about it. Share a testimonial with photos, or a short selfie video of you in front of your painting talking about it. If I approve it, I'll thank you with a personal code for a print of mine at cost: https://tjm.art/testimonials/#share"
  },
  {
    "id": "campaign-dorian-nakamoto-2026-10-17",
    "title": "Dorian Nakamoto",
    "scheduledAt": "2026-10-17T10:00:00-07:00",
    "text": "Dorian Nakamoto, in watercolor pastel. The press once called him Satoshi. Whoever Satoshi is, the work speaks for itself. Original 12 × 15 in, $200. Prints from $25:",
    "imageUrl": "https://tjm.art/gallery-images/portrait-in-gold.jpg",
    "productUrl": "/products/painting-portrait-in-gold/",
    "xText": "Dorian Nakamoto, in watercolor pastel. The press once called him Satoshi. Whoever Satoshi is, the work speaks for itself. Original 12 × 15 in, $200. Prints from $25: https://tjm.art/products/painting-portrait-in-gold/"
  },
  {
    "id": "campaign-friends-club-mural-2026-10-20",
    "title": "Friends Club mural, Lillooet BC",
    "scheduledAt": "2026-10-20T07:00:00-07:00",
    "text": "A 40 × 9 ft shipping container in Lillooet, BC. A day of pressure washing, a paint sprayer none of us had used, then spray cans and an airbrush I learned the week before. Festivalgoers added a few hundred dancer stickers. Trust the process.",
    "imageUrl": "https://tjm.art/murals/images/008f6e26.jpg",
    "productUrl": "/murals/",
    "xText": "A 40 × 9 ft shipping container in Lillooet, BC. A day of pressure washing, a paint sprayer none of us had used, then spray cans and an airbrush I learned the week before. Festivalgoers added a few hundred dancer stickers. Trust the process. https://tjm.art/murals/"
  },
  {
    "id": "campaign-coined-in-watercolor-poster-2026-10-22",
    "title": "Coined in Watercolor Film Poster",
    "scheduledAt": "2026-10-22T18:00:00-07:00",
    "text": "The poster for Coined in Watercolor, Gavin Robertson's documentary about my path into art. Pastel, a loose wash, then more color. The subtitle is clear wax: the paint slides off and the words appear. Watch the film: https://www.youtube.com/watch?v=i7tvzE_bqM8",
    "imageUrl": "https://tjm.art/display/002-1c53ed3427-360.webp",
    "productUrl": "/products/coined-in-watercolor-film-poster/",
    "xText": "The poster for Coined in Watercolor, Gavin Robertson's documentary about my path into art. Pastel, a loose wash, then more color. The subtitle is clear wax: the paint slides off and the words appear. Watch the film: https://www.youtube.com/watch?v=i7tvzE_bqM8"
  },
  {
    "id": "campaign-moonrise-north-cascades-2026-10-24",
    "title": "Moonrise Over the Cascades",
    "scheduledAt": "2026-10-24T10:00:00-07:00",
    "text": "Moonrise Over the Cascades. Dark firs, a mountain lake, and a road of moonlight across the water. Watercolor pastel, 12 × 23 in. The original is available, $500, and prints start at $35: https://tjm.art/products/painting-moonlit-water/",
    "imageUrl": "https://tjm.art/gallery-images/moonrise-over-the-cascades.jpg",
    "productUrl": "/products/painting-moonlit-water/",
    "xText": "Moonrise in the North Cascades. Dark firs, a mountain lake, and a road of moonlight across the water. Watercolor pastel, 16 × 24 in. The original is available, $600: https://tjm.art/products/painting-moonlit-water/"
  },
  {
    "id": "campaign-honeybadger-prints-2026-10-27",
    "title": "Honeybadger and Cub with Genesis Block",
    "scheduledAt": "2026-10-27T07:00:00-07:00",
    "text": "Fix the money, fix the world, and think about who inherits it. Honeybadger and Cub with Genesis Block comes as a fine-art print on textured watercolor paper, $25 / $35 / $50 by size. Original $1,200.",
    "imageUrl": "https://tjm.art/gallery-images/honeybadger-and-cub.jpeg",
    "productUrl": "/products/honeybadger-and-cub-with-genesis-block/",
    "xText": "Fix the money, fix the world, and think about who inherits it. Honeybadger and Cub with Genesis Block comes as a fine-art print on textured watercolor paper, $25 / $35 / $50 by size. Original $1,200. https://tjm.art/products/honeybadger-and-cub-with-genesis-block/"
  },
  {
    "id": "campaign-exhibition-history-2026-10-29",
    "title": "Where my paintings have hung",
    "scheduledAt": "2026-10-29T18:00:00-07:00",
    "text": "Where my paintings have hung: Seattle (Intiman auction, Studio 601, Victrola), Adopting Bitcoin in El Salvador and Cape Town, the Bitcoin Film Festival in Warsaw, plus murals in Lillooet and Berlín, El Salvador. Vengo a mirar el mundo de nuevo.",
    "imageUrl": "https://tjm.art/display/027-d77f112227-480.webp",
    "productUrl": "/exhibitions/world-map/",
    "xText": "Where my paintings have hung: Seattle (Intiman auction, Studio 601, Victrola), @AdoptingBTC in El Salvador and Cape Town, @bitcoinfilmfest in Warsaw, plus murals in Lillooet and Berlín, El Salvador. Vengo a mirar el mundo de nuevo. https://tjm.art/exhibitions/world-map/"
  },
  {
    "id": "campaign-maui-sunset-kihei-2026-10-31",
    "title": "Maui Sunset from Kihei",
    "scheduledAt": "2026-10-31T10:00:00-07:00",
    "text": "Maui Sunset from Kihei. Fire in the clouds and the sea catching it. Watercolor pastel, 24 × 48 in. Original $1,000, fine-art prints from $35.",
    "imageUrl": "https://tjm.art/gallery-images/red-horizon.jpg",
    "productUrl": "/products/painting-red-horizon/",
    "xText": "Maui Sunset from Kihei. Fire in the clouds and the sea catching it. Watercolor pastel, 24 × 48 in. Original $1,000, fine-art prints from $35. https://tjm.art/products/painting-red-horizon/"
  },
  {
    "id": "campaign-sunrise-rainier-eagle-2026-11-03",
    "title": "Sunrise on Rainier with Eagle",
    "scheduledAt": "2026-11-03T07:00:00-08:00",
    "text": "The view that made me a painter: Mount Rainier from a beach on Lake Washington, where I sit and breathe a few times a week. One morning an eagle caught a fish and the whole beach cheered. Sunrise on Rainier with Eagle, prints $30:",
    "imageUrl": "https://tjm.art/gallery-images/portrait-with-hat.jpg",
    "productUrl": "/products/painting-portrait-with-hat/",
    "xText": "The view that made me a painter: Mount Rainier from a beach on Lake Washington, where I sit and breathe a few times a week. One morning an eagle caught a fish and the whole beach cheered. Sunrise on Rainier with Eagle, prints $30: https://tjm.art/products/painting-portrait-with-hat/"
  },
  {
    "id": "campaign-syrenka-commissions-2026-11-05",
    "title": "Warszawska Syrenka: sketch to final (commissions)",
    "scheduledAt": "2026-11-05T18:00:00-08:00",
    "text": "Syrenka went sketch → color study → final, revised with the festival at each step. Commissions work the same way: portraits from $100, landscapes from $250, 50% deposit, usually 2–4 weeks. Want one before the holidays?",
    "imageUrl": "https://tjm.art/display/009-807265b533-360.webp",
    "productUrl": "/commissions/",
    "xText": "Syrenka went sketch → color study → final, revised with the festival at each step. Commissions work the same way: portraits from $100, landscapes from $250, 50% deposit, usually 2–4 weeks. Want one before the holidays? https://tjm.art/commissions/"
  },
  {
    "id": "campaign-berlin-el-salvador-sign-2026-11-07",
    "title": "Berlín, El Salvador community sign",
    "scheduledAt": "2026-11-07T10:00:00-08:00",
    "text": "In Berlín, El Salvador, I walked into the Bitcoin Community Center and asked how I could help before the festival. They needed a sign. Borrowed materials, bought paint, used their projector. It hangs at the court by the main square.",
    "imageUrl": "https://tjm.art/murals/images/berlin-el-salvador/artist-with-sign.jpeg",
    "productUrl": "/murals/berlin-el-salvador/",
    "xText": "In Berlín, El Salvador, I walked into the Bitcoin Community Center and asked how I could help before the festival. They needed a sign. Borrowed materials, bought paint, used their projector. It hangs at the court by the main square. @BitcoinBerlinSV https://tjm.art/murals/berlin-el-salvador/"
  }
];

// Keep the already-delivered connection test stable so its Durable Object receipt remains readable.
export const testPost = {
  id: 'connection-test-2026-10-03',
  text: "Warszawska Syrenka — Warsaw's protector, with hussar wings and a Bitcoin shield. Watercolor pastel, created for the Bitcoin Film Festival in Warsaw, 2026.\\n\\nFirst test post from my website to Nostr. — TJ Murphy\\n\\nhttps://vermillionaurora.com/products/warszawska-syrenka/?utm_source=nostr&utm_medium=social&utm_campaign=connection_test",
  imageUrl: 'https://vermillionaurora.com/gallery-images/warszawska-syrenka.jpeg'
};
