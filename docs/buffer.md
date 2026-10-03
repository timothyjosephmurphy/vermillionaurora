# Buffer social publishing

The production `vermillion-commissions` Worker uses the secret `BUFFER_API_TOKEN`
to manage the owner's Facebook, Instagram and X channels. The Buffer key stays
inside Cloudflare and is never supplied to browsers, git, or GitHub Actions.
Required Buffer permissions: account:read, posts:read, posts:write. insights:read
can be retained for a later reporting feature; metrics are not implemented here.

Owner-only POST endpoints:

| Endpoint | Input | Result |
| --- | --- | --- |
| `/buffer/status` | `{}` | Connected channels and organization IDs |
| `/buffer/posts/list` | `{channelId,status?,after?}` | Up to 100 posts and pagination cursor |
| `/buffer/posts/create` | `{channelId,text,imageUrls?,idempotencyKey,saveToDraft?,dueAt?}` | Draft or scheduled post receipt |

Owner requests use `Authorization: Bearer <COMMISSION_MANAGER_TOKEN>`. If an
Origin header is provided it must equal the production Worker origin. Preview
and sandbox hostnames are refused. Drafts are the default. Scheduling requires
`saveToDraft:false` plus a future UTC ISO8601 `dueAt`. Paused queues are refused.
Image URLs are limited to public HTTPS files on the site's two media hosts.
Provider errors are redacted; no credential or provider response is logged.

To run an operation through chat, create an isolated `ops/buffer-*` branch from
the current reviewed main commit, then commit `social/buffer-request.json`:

```json
{"operation":"status","input":{}}
```

The workflow executes that request using a temporary `BUFFER_OPERATIONS_TOKEN`,
installed and removed with the existing Cloudflare deployment credential. This
is separate from the owner's manager token and checkout diagnostic credential.
The workflow shares the production deployment concurrency group. It does not
deploy the Worker or need npm installation. Creation can be requested with
`operation:"create"` and the input shown above. A scheduling request also needs
`confirmSchedule:true` in the request object. Only execute publishing actions
that the owner has requested. Status/list queries do not change Buffer posts.

Use one stable idempotencyKey per post operation. Private R2 receipts under
`buffer/operations/` reserve the operation before calling Buffer. Repeated
successful requests return the saved receipt; mismatched input or unconfirmed
requests return 409. Do not create another key blindly after an unconfirmed
write. Inspect `/buffer/posts/list` and Buffer first; a timeout can occur after
Buffer accepted a post. No create mutation is automatically retried.

Buffer free-plan queue limits still apply. Create campaign content as drafts,
then schedule only the approved portion that fits. Images must remain public
until publishing. The chat-created campaign CSVs can supply the same captions
and URLs for API input; CSV upload is not needed.

References: https://developers.buffer.com/guides/getting-started.html,
https://developers.buffer.com/examples/get-channels.html,
https://developers.buffer.com/examples/create-image-post.html,
https://developers.buffer.com/examples/create-draft-post.html,
https://developers.buffer.com/guides/posts-and-scheduling.html.
