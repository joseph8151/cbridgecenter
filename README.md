# C-Bridge Center

C-BRIDGE — AI 시험 대비 플랫폼 MVP (Next.js 14 App Router + TypeScript + Tailwind).

## Local development

```bash
npm install
npm run dev
```

## Deploying to Cloudflare Workers

This project is set up with [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) to deploy
as a Cloudflare Worker (static assets + SSR in one Worker).

```bash
# one-time: authenticate wrangler with your Cloudflare account
npx wrangler login

# local production preview, running in the real Workers runtime (workerd)
npm run preview

# build + deploy to Cloudflare
npm run deploy
```

Config lives in `wrangler.jsonc` (Worker name, compatibility date/flags, static
assets binding) and `open-next.config.ts` (OpenNext adapter options).

### Deploying via Cloudflare's Git integration (Workers Builds)

If you connected this GitHub repo directly in the Cloudflare dashboard instead of
deploying from the CLI, set these in the Worker's **Settings → Build**:

| Setting              | Value                  |
| -------------------- | ---------------------- |
| Build command        | `npm run build:worker` |
| Deploy command        | `npx wrangler deploy`  |
| Root directory        | `/` (repo root)        |
| Node version          | `22` (see `.nvmrc` / `engines.node` in `package.json` — `wrangler@4` requires Node ≥22) |

`npm run build:worker` runs `opennextjs-cloudflare build`, which builds the Next.js
app and produces `.open-next/worker.js` + `.open-next/assets`; `wrangler deploy`
then ships that Worker using `wrangler.jsonc`. Every push to the connected branch
triggers this automatically once configured.

**Version pin note:** `@opennextjs/cloudflare` is pinned to `1.15.1` because this
project is on `next@14.2.35`, and newer adapter releases (`1.16+`) dropped Next 14
support (they require `next@15.5.21+` or `16.2.11+`). Upgrading to Next 15/16 later
would unlock the latest adapter version and also resolve several Next 14 security
advisories (see `npm audit`) — but it requires migrating every dynamic route's
`params`/`searchParams` to the async API Next 15 introduced, so it's a deliberate
follow-up, not something to do casually.
