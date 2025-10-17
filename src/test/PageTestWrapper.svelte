<script lang="ts">
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import Page from "../routes/+page.svelte";
	import type { PageProps } from "../routes/$types";

	const queryClient = new QueryClient();
	const data: PageProps["data"] = {
		queryClient,
		socials: undefined,
	};
</script>

<QueryClientProvider client={queryClient}>
	<Page {data} params={{}} />
</QueryClientProvider>
