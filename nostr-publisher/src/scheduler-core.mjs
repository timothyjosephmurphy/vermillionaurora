export function duePosts(posts, nowMs, activatedAtMs, deliveredIds = new Set()) {
  return posts.filter((post) => {
    const scheduledMs = Date.parse(post.scheduledAt);
    return Number.isFinite(scheduledMs)
      && scheduledMs <= nowMs
      && scheduledMs >= activatedAtMs - 5 * 60_000
      && !deliveredIds.has(post.id);
  });
}

export function eventContent(post) {
  const text = post.text.replace(/([?&])utm_source=x\b/g, '$1utm_source=nostr');
  const productLink = post.productUrl ? `https://vermillionaurora.com${post.productUrl}` : '';
  return [text.trim(), productLink, post.imageUrl].filter(Boolean).join('\n\n');
}

export function scheduledSeconds(post) {
  const millis = Date.parse(post.scheduledAt);
  if (!Number.isFinite(millis)) throw new Error(`Invalid schedule for ${post.id}`);
  return Math.floor(millis / 1000);
}

export function pendingPosts(posts, testPost, nowMs, activatedAtMs, deliveredIds = new Set()) {
  const pendingTest = testPost && !deliveredIds.has(testPost.id) ? [testPost] : [];
  return [...pendingTest, ...duePosts(posts, nowMs, activatedAtMs, deliveredIds)];
}
