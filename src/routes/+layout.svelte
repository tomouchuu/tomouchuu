<script lang="ts">
	import '../app.css';
  import thomasImage from '$lib/assets/images/thomas.jpg';

  import { ModeWatcher } from "mode-watcher";

  import { Separator } from "$lib/components/ui/separator/index.js";
  import Toggles from '$lib/components/toggles/index.svelte';
  import { m } from '$lib/paraglide/messages.js';

  import { QueryClientProvider } from '@tanstack/svelte-query'

  import { dev, browser } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();

	const { data, children } = $props()

  if (dev && browser) {
    // @ts-ignore Just for dev
    window.__TANSTACK_QUERY_CLIENT__ = data.queryClient;
  }
</script>

<svelte:head>
  <link data-testid="favicon" rel="icon" href={thomasImage} type="image/jpeg">
  <meta data-testid="meta-description" name="description" content={m.description()} />
</svelte:head>

<ModeWatcher />

<QueryClientProvider client={data.queryClient}>
  <Toggles />
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    {@render children?.()}
    <footer class="text-center text-xs min-w-36">
      <Separator />
      <p class="mt-4">
        {m.thomas()}@<a href="https://uchuu.dev" class="hover:underline">{m.uchuu()}</a>
      </p>
    </footer>
  </div>
</QueryClientProvider>


