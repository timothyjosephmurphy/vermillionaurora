// Exhibition list for /exhibitions/. Sourced only from existing site content: the About page
// CV (year, venue, show type) and each exhibition page's own location block. Newest first.
export const exhibitions = [
  { slug: 'bitcoin-film-festival-warsaw', title: 'Bitcoin Film Festival', year: '2026', type: 'Group show',
    venue: 'Kinoteka · Palace of Culture and Science', location: 'Warsaw, Poland',
    image: '/exhibitions/bitcoin-film-festival-warsaw/images/display-at-kinoteka.jpeg', alt: 'Three paintings displayed outside the Kinoteka theater for Bitcoin Film Festival',
    related: [
      { href: '/products/coined-in-watercolor-film-poster/', label: 'Coined in Watercolor film poster' },
      { href: '/products/honeybadger-and-cub-with-genesis-block/', label: 'Honeybadger and Cub with Genesis Block' },
      { href: '/products/warszawska-syrenka/', label: 'Warszawska Syrenka' },
      { href: '/exhibitions/gavin-robertson/', label: 'Coined in Watercolor (film)' },
    ] },
  { slug: 'victrola', title: 'Victrola Coffee Shop', year: '2025', type: 'Solo show',
    venue: 'Victrola Coffee Shop — Capitol Hill', location: 'Seattle, Washington',
    image: 'https://media.vermillionaurora.com/images/Ex-Victrola/IMG_1600.jpeg', alt: 'Victrola Coffee Shop, Seattle, Washington exhibition' },
  { slug: 'cape-town', title: 'Adopting Bitcoin Cape Town', year: '2025', type: 'Solo show',
    venue: 'Workshop17 Watershed, V&A Waterfront', location: 'Cape Town, South Africa',
    image: 'https://media.vermillionaurora.com/images/Ex-Cape-Town/IMG_0102.jpeg', alt: 'Adopting Bitcoin Cape Town, South Africa exhibition' },
  { slug: 'el-salvador', title: 'Adopting Bitcoin El Salvador', year: '2024', type: 'Group show',
    venue: 'Salamanca Eventos y Experiencias', location: 'Huizúcar, La Libertad, El Salvador',
    image: 'https://media.vermillionaurora.com/images/Ex-El-Salvador/IMG_5441.jpeg', alt: 'Adopting Bitcoin El Salvador exhibition' },
  { slug: 'studio-601', title: 'Studio 601', year: '2023', type: 'Solo show',
    venue: 'Studio 601 / Water Sines Studio, Pioneer Square', location: 'Seattle, Washington',
    image: 'https://media.vermillionaurora.com/images/Ex-Studio-601/IMG_4532.jpeg', alt: 'Studio 601, Seattle, Washington exhibition' },
  { slug: 'intiman-auction', title: 'Intiman Theater Seattle Auction', year: '2023', type: 'Benefit auction',
    venue: 'Intiman Theater', location: 'Seattle, Washington',
    image: 'https://media.vermillionaurora.com/images/Ex-Intiman-Auction/IMG_4483.jpeg', alt: 'Intiman Theater Seattle Auction exhibition' },
  { slug: 'living-room', title: 'My Living Room', year: 'Current', type: 'Solo show',
    venue: 'Home studio', location: 'Seattle, Washington',
    image: '/exhibitions/living-room/images/three-landscapes-in-living-room.jpg', alt: 'Three framed watercolor landscapes hanging side by side in a living room', contain: true },
];
export const featured = [
  { slug: 'paul-murphy', title: 'Paul Murphy', note: 'Featured artist', image: 'https://media.vermillionaurora.com/images/Ex-Featured-Artist-Paul-Murphy/IMG_7409.jpeg', alt: 'Painting by Paul Murphy' },
  { slug: 'chase-toole', title: 'Chase Toole Collab', note: 'Art mentorship since 2017 · Three collaborations with TJ Murphy', image: '/gallery-images/insect-garden.jpg', alt: 'El Salvador: Past — a collaboration by Chase Toole and TJ Murphy' },
  { slug: 'gavin-robertson', title: 'Gavin Robertson Collab', note: 'Coined in Watercolor · Film and painting collaboration', image: '/gallery-images/coined-in-watercolor-film-poster.jpg', alt: 'Coined in Watercolor film poster by TJ Murphy', contain: true },
];
