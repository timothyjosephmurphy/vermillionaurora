// Exhibition list for /exhibitions/. Sourced only from existing site content: the About page
// CV (year, venue, show type) and each exhibition page's own location block. Newest first.
// A slug listed in `upcoming` is the current show and is left out of the past-show grid.
export const exhibitions = [
  { slug: 'ghost-gallery-holiday-mini', title: '20th Annual Holiday Mini Art Exhibit', year: 'Nov 2026–Jan 2027', type: 'Group show',
    venue: 'Ghost Gallery, Pacific Place', location: 'Seattle, Washington',
    image: '/display/strawberry-point-4-897857fb.jpg', alt: 'Strawberry Point Backpacking Trip #4, in Ghost Gallery’s Holiday Mini Art Exhibit',
    contain: true,
    related: [
      { href: '/products/strawberry-point-4/', label: 'Strawberry Point Backpacking Trip #4' },
      { href: '/products/strawberry-point-5/', label: 'Strawberry Point Backpacking Trip #5' },
      { href: '/products/strawberry-point-6/', label: 'Strawberry Point Backpacking Trip #6' },
    ] },
  { slug: 'woodinville-sip-and-stroll', title: 'Woodinville Arts Alliance 2026 Sip & Stroll', year: 'Nov 13–15, 2026', type: 'Group show',
    venue: 'The Winemakers Reserve', location: 'Woodinville, Washington',
    image: '/display/strawberry-point-2-d1401313.jpg', alt: 'Strawberry Point Backpacking Trip #2, Third Place Overall at the Woodinville Sip & Stroll',
    contain: true,
    related: [
      { href: '/products/strawberry-point-2/', label: 'Third Place Overall for the watercolor Strawberry Point Backpacking Trip #2' },
      { href: '/blog/third-place-sip-and-stroll-ghost-gallery/', label: 'Third Place at the Sip & Stroll' },
    ] },
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
// Upcoming block on /exhibitions/, soonest first. Each item uses an exhibitions slug
// so the index links to that show's page instead of adding a second card.
// Dates are studio calendar items. Street addresses stay out unless a public
// listing confirms that date at that door.
export const upcoming = [
  { slug: 'ghost-gallery-holiday-mini', title: 'Ghost Gallery Holiday Mini Show', start: '2026-11-27',
    dates: 'Reception Friday, November 27, 2026, 5–8 PM PT',
    venue: 'Ghost Gallery, 600 Pine St, Suite 253 (second floor of Pacific Place), Seattle' },
];
export const featured = [
  { slug: 'paul-murphy', title: 'Paul Murphy', note: 'Featured artist', image: 'https://media.vermillionaurora.com/images/Ex-Featured-Artist-Paul-Murphy/IMG_7409.jpeg', alt: 'Painting by Paul Murphy' },
  { slug: 'chase-toole', title: 'Chase Toole Collab', note: 'Art mentorship since 2017 · Three collaborations with TJ Murphy', image: '/gallery-images/insect-garden.jpg', alt: 'El Salvador: Past — a collaboration by Chase Toole and TJ Murphy' },
  { slug: 'gavin-robertson', title: 'Gavin Robertson Collab', note: 'Coined in Watercolor · Film and painting collaboration', image: '/gallery-images/coined-in-watercolor-film-poster.jpg', alt: 'Coined in Watercolor film poster by TJ Murphy', contain: true },
];
