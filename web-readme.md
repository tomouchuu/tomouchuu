# TOMO@UCHUU Personal Site V11 - Svelte/Elysia -

Wild but I think I've wanted to try something in svelte for a while and after taking more of a look there are a few similarities with how I work in ember with the day job so I'm giving it a go!
Still using elysia for the backend cause eden is cool, comfy anime mascot and I wanna support the dev so the more things that use it the better right?

Though if I was to do a new version of this again, I'd maybe switch from elsyia to just svelte and then use pnpm and go a bit more into the vite+ place because I kinda feel like that's the direction we'll go at my day job.

## Development

Install dependencies and start Vite with Bun:

```sh
bun install
bun run dev
```

The Last.fm API routes require `LASTFM_API_KEY`. Copy `.dev.vars.example` to
`.dev.vars` and replace the placeholder for local Cloudflare previews.

## Cloudflare Workers

The SvelteKit app is configured for Cloudflare Workers with Static Assets.

```sh
bun run preview
bun run deploy
```

Add the production API key to Cloudflare before the first deployment:

```sh
bunx wrangler secret put LASTFM_API_KEY
```

For automatic deployments, connect this GitHub repository in Cloudflare
Workers Builds and use `bun run deploy` as the deploy command. Cloudflare Web
Analytics can be enabled from the domain dashboard without a client SDK.
