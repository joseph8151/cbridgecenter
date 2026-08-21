# C-Bridge Center

C-BRIDGE — AI 시험 대비 플랫폼 MVP (Next.js 16 App Router + TypeScript + Tailwind).

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

**Version pin note:** the project runs `next@16.3.1` with `@opennextjs/cloudflare@1.20.2`
(its peer range requires `next@16.2.11+`). Every dynamic route's `params`/`searchParams`
uses the async API required by Next 15+.
