<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

  import { Separator } from "$lib/components/ui/separator/index.js";
  import { m } from '$lib/paraglide/messages.js';

  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'

  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

  injectAnalytics({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();

	const { data, children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4">
    {@render children?.()}
    <footer class="text-center text-xs min-w-36">
      <Separator />
      <p class="mt-4">
        {m.thomas()}@<a href="https://uchuu.dev" class="hover:underline">{m.uchuu()}</a>
      </p>
    </footer>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>


