// Descriptive alt text: title, medium, year and artist from the catalog.
export const artworkAlt = p => p.type==='painting' ? `${p.title} — ${[p.medium, p.year].filter(Boolean).join(', ')}${p.medium||p.year?', ':''}by ${p.artist||'TJ Murphy'}` : (p.image?.alt||p.title);
