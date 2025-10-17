<script lang="ts">
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import Layout from "../routes/+layout.svelte";

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Layout data={{ queryClient }}>
		<div data-testid="test-child">Test Child Content</div>
	</Layout>
</QueryClientProvider>

