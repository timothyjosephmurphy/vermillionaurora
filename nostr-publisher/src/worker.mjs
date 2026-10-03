import * as nip19 from 'nostr-tools/nip19';
import { SimplePool } from 'nostr-tools/pool';
import { finalizeEvent } from 'nostr-tools/pure';
import { posts } from './posts.mjs';
import { duePosts, eventContent, scheduledSeconds } from './scheduler-core.mjs';

const PUBLISHER_NAME = 'Vermillion Aurora';

function secretKey(value) {
  const raw = String(value || '').trim();
  if (/^[0-9a-f]{64}$/i.test(raw)) {
    return Uint8Array.from(raw.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
  }
  const decoded = nip19.decode(raw);
  if (decoded.type !== 'nsec' || !(decoded.data instanceof Uint8Array) || decoded.data.length !== 32) {
    throw new Error('NOSTR_NSEC must contain a valid nsec value or 32-byte hex key');
  }
  return decoded.data;
}

export class NostrSchedule {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    if (new URL(request.url).pathname !== '/run' || request.method !== 'POST') {
      return new Response('Not found', { status: 404 });
    }
    if (this.env.NOSTR_PUBLISH_ENABLED !== 'true') {
      return Response.json({ status: 'paused' });
    }
    if (!this.env.NOSTR_NSEC) {
      console.error('Nostr schedule is enabled but the NOSTR_NSEC secret is missing.');
      return Response.json({ status: 'missing-secret' }, { status: 503 });
    }

    const { nowMs } = await request.json();
    const now = Number.isFinite(nowMs) ? nowMs : Date.now();
    let activatedAt = await this.state.storage.get('nostr:activatedAt');
    if (activatedAt === undefined) {
      activatedAt = now;
      await this.state.storage.put('nostr:activatedAt', activatedAt);
    }

    const sent = new Set(await this.state.storage.list({ prefix: 'nostr:sent:' }).then((entries) =>
      [...entries.keys()].map((key) => key.slice('nostr:sent:'.length))));
    const due = duePosts(posts, now, activatedAt, sent);
    if (!due.length) return Response.json({ status: 'idle', sent: 0 });

    const key = secretKey(this.env.NOSTR_NSEC);
    const relays = String(this.env.NOSTR_RELAYS || '').split(',').map((relay) => relay.trim()).filter(Boolean);
    if (!relays.length) throw new Error('No Nostr relays are configured');

    const pool = new SimplePool();
    let published = 0;
    try {
      for (const post of due) {
        const sentKey = `nostr:sent:${post.id}`;
        const leaseKey = `nostr:lease:${post.id}`;
        const acquired = await this.state.storage.transaction(async (txn) => {
          if (await txn.get(sentKey)) return false;
          const leaseUntil = await txn.get(leaseKey);
          if (leaseUntil && leaseUntil > now) return false;
          await txn.put(leaseKey, now + 5 * 60_000);
          return true;
        });
        if (!acquired) continue;

        try {
          const event = finalizeEvent({
            kind: 1,
            created_at: scheduledSeconds(post),
            tags: [],
            content: eventContent(post)
          }, key);
          await Promise.any(pool.publish(relays, event));
          await this.state.storage.put(sentKey, { eventId: event.id, acceptedAt: now, publisher: PUBLISHER_NAME });
          published += 1;
          console.log(JSON.stringify({ eventId: event.id, postId: post.id, status: 'published' }));
        } catch (error) {
          console.error(JSON.stringify({ postId: post.id, status: 'publish-failed', message: String(error?.message || error) }));
        } finally {
          await this.state.storage.delete(leaseKey);
        }
      }
    } finally {
      pool.close(relays);
    }
    return Response.json({ status: 'complete', sent: published });
  }
}

export default {
  async fetch() {
    return new Response('Nostr publisher is schedule-only.', { status: 404 });
  },

  async scheduled(event, env, ctx) {
    if (env.NOSTR_PUBLISH_ENABLED !== 'true') return;
    const id = env.NOSTR_SCHEDULE.idFromName('vermillion-aurora');
    const stub = env.NOSTR_SCHEDULE.get(id);
    ctx.waitUntil(stub.fetch('https://nostr-scheduler.internal/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nowMs: event.scheduledTime })
    }));
  }
};
