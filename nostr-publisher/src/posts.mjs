// Campaign queue cleared at the artist's request. New entries require approval.
export const posts = [];

// One explicitly requested connection test, sent once by the next scheduler tick.
// Keep this ID stable: the Durable Object stores its receipt across redeploys.
export const testPost = {
  id: 'connection-test-2026-10-03',
  text: "Warszawska Syrenka — Warsaw's protector, with hussar wings and a Bitcoin shield. Watercolor pastel, created for the Bitcoin Film Festival in Warsaw, 2026.\n\nFirst test post from my website to Nostr. — TJ Murphy\n\nhttps://vermillionaurora.com/products/warszawska-syrenka/?utm_source=nostr&utm_medium=social&utm_campaign=connection_test",
  imageUrl: 'https://vermillionaurora.com/gallery-images/warszawska-syrenka.jpeg'
};
