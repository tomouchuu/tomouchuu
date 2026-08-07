# Thomas

### aka. Tom, Tomo, Tomouchuu

Hey there, I'm a frontend web developer based in Essex / London where I'm currently working within **Web Security**.

Right now I'm in EmberJS for my employer, but I have experience working in React (Next or Tanstack), a little Solid and currently messing most around in Svelte.

Outside of work, you can find me visitng Japan 4 times a year, drumming away, catching up on social media and previously playing Final Fantasy 14 which has an unlimited free trial up to level 60 that includes the award winning expansion Stormblood to a decently high level.

Feel free to reach out to me on my socials!

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
