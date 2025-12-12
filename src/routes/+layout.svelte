<script lang="ts">
	import '../app.css';
  import thomasImage from '$lib/assets/images/thomas.jpg';

  import { ModeWatcher } from "mode-watcher";

  import { Separator } from "$lib/components/ui/separator/index.js";
  import { m } from '$lib/paraglide/messages.js';

  import { QueryClientProvider } from '@tanstack/svelte-query'

  import { dev, browser } from '$app/environment';
  import { onNavigate } from '$app/navigation';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();

	const { data, children } = $props()

  if (dev && browser) {
    // @ts-ignore Just for dev
    window.__TANSTACK_QUERY_CLIENT__ = data.queryClient;
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link data-testid="favicon" rel="icon" href={thomasImage} type="image/jpeg">
  <meta data-testid="meta-description" name="description" content={m.description()} />

  <meta name="theme-color" content="hsl(210 90% 98%)" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="hsl(215 40% 12%)" media="(prefers-color-scheme: dark)" />
</svelte:head>

<ModeWatcher />

<QueryClientProvider client={data.queryClient}>
  <div class="min-h-screen flex flex-col">
    <div class="flex flex-col flex-1 pb-10">
      {@render children?.()}
    </div>
    <footer class="mt-auto text-center text-xs min-w-36 max-w-screen-md mx-auto pb-4">
      <Separator />
      <p class="mt-4">
        {m.thomas()}@<a href="https://uchuu.dev" class="hover:underline">{m.uchuu()}</a>
      </p>
    </footer>
  </div>
</QueryClientProvider>


