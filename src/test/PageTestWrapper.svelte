<script lang="ts">
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import Page from "../routes/+page.svelte";
	import type { PersonalData } from "$lib/queries/personal";

	const mockPersonalData: PersonalData = {
		name: "Thomas Moore",
		image: "https://example.com/image.jpg",
		status: "online",
		location: "Tokyo, Japan",
		contact: {
			email: "test@example.com",
			twitter: "https://twitter.com/test",
			github: "https://github.com/test",
		},
		work: [
			{
				company: "Test Company",
				date: "2024",
				description: "Test description",
				title: "Software Engineer",
				url: "https://example.com",
			},
		],
	};

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	queryClient.setQueryData(["personal"], mockPersonalData);
</script>

<QueryClientProvider client={queryClient}>
	<Page />
</QueryClientProvider>
