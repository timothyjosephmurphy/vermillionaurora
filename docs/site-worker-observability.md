# Site worker observability (studio-tracker #132)

`wrangler.jsonc` (the `vermillionaurora` site worker) enables Workers Logs, matching the checkout worker (`cloudflare/wrangler.jsonc`) and the nostr publisher:

```jsonc
"observability": { "enabled": true, "logs": { "enabled": true, "invocation_logs": true } }
```

Takes effect on the next deploy (not done here). Logs then appear in the Cloudflare dashboard under Workers & Pages > vermillionaurora > Observability. Sampling is the default (100%). Log volume is small: the worker only runs for the `run_worker_first` routes.

## Alert setup (for TJ; needs a dashboard login, so it was not done in code)

No alert is created by this change and nothing here needs a new account or extra spend. Pick one:

1. **Workers Issues (recommended, one line).** Dashboard > Workers & Pages > vermillionaurora > Observability > Issues > enable. It records uncaught exceptions, 5xx responses and error logs and groups them. Then add an automation to email or webhook the issue. (Issues is in open beta; once the beta is stable it can be set with `"observability": {"issues": {"enabled": true}}`; check the current Cloudflare docs before adding it to the file.)
2. **Custom alert on Workers events.** Dashboard > Notifications (Alerts) > Add > custom alert, dataset Workers events, filter `outcome != ok` or status >= 500 for script `vermillionaurora` and `vermillion-commissions`, threshold e.g. 5 in 5 minutes, destination email. Webhook delivery is available on all plans. This is the closest match to the Oct 14-15 `/inventory/status` and `/checkout/status` 503s from the audit.
3. Zone-level "Advanced Error Rate" alerts are Enterprise-only: skip.

Checkout 5xx on `vermillion-commissions` is the important one to cover (checkout worker logs already work).
