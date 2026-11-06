# Upload vermillion-neural-dance

From this repository, after `npm run build` (already committed under `dist/assets`):

```bash
npx wrangler@4.143.0 deploy
```

Use an account token that can create a Worker script. Account `3c1fddf0f4f4fc9c84594757d2e1bda0`.

Do not deploy until you are ready to attach the routes below. vermillionaurora is unchanged until those routes exist.

## Worker

| | |
| --- | --- |
| Name | `vermillion-neural-dance` |
| Config | `wrangler.toml` |
| Main module | `worker/index.mjs` |
| Assets directory | `dist/assets` |
| Account | `3c1fddf0f4f4fc9c84594757d2e1bda0` |

## Bindings

| Binding | Type | Value |
| --- | --- | --- |
| `ASSETS` | Assets | `dist/assets` |
| `NEURAL_DANCE_DEBUG` | Durable Object | class `NeuralDanceDebugRoom` |

## Migration

Tag `neural-dance-debug-v1`, new SQLite class `NeuralDanceDebugRoom`.

This is a new script, so the class starts empty. It does not copy rooms already stored on `vermillion-commissions`. After the API route below is attached, new debug rooms are created here.

`worker/index.mjs` runs first for `/api/neural-dance/debug/*` and forwards everything else to assets.

## Routes to add on zone tjm.art

Zone id `5c51165760cc5bc41120a3567c75dc28`. Worker `vermillion-neural-dance`.

- `tjm.art/neural-dance*`
- `tjm.art/api/neural-dance/debug*`

`tjm.art` is still a custom domain on `vermillionaurora`. These routes are more specific, so only those paths move. Favicons, fonts, and the rest of the site stay on `vermillionaurora`.

If `www.tjm.art` is not redirected to the apex before the Worker, add the same two patterns for `www.tjm.art` as well.
