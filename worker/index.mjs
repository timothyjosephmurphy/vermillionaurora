// Copyright (c) 2026 TJ Murphy / Vermillion Aurora Productions
// All rights reserved. No use, copying, modification, or distribution
// without a written license. Contact tj@tjm.art.
// License: neural-dance/LICENSE

import { handleNeuralDanceDebug, NEURAL_DANCE_DEBUG_API } from './neural-dance-debug.mjs';

export { NeuralDanceDebugRoom } from './neural-dance-debug.mjs';

const PRIVATE = { 'Cache-Control': 'no-store' };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith(NEURAL_DANCE_DEBUG_API)) {
      if (!env.NEURAL_DANCE_DEBUG) {
        return Response.json({ error: 'Live debug is temporarily unavailable.' }, { status: 503, headers: PRIVATE });
      }
      return handleNeuralDanceDebug(request, env);
    }
    if (!env.ASSETS) return new Response('Neural Dance assets are not configured.', { status: 500, headers: PRIVATE });
    return env.ASSETS.fetch(request);
  }
};
