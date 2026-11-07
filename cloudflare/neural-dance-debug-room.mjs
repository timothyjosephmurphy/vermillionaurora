// The live debug Durable Object moved to vermillion-neural-dance.
// This class stays exported so migration neural-dance-debug-v1 is not deleted.
export class NeuralDanceDebugRoom {
  constructor(state) {
    this.state = state;
  }
  async fetch() {
    return Response.json({ error: 'Neural Dance debug moved.' }, { status: 410, headers: { 'Cache-Control': 'no-store' } });
  }
}
