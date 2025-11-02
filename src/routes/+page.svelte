<script lang="ts">
  import thomasImage from '$lib/assets/images/thomas.jpg';

  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar/index.js";
  import { m } from '$lib/paraglide/messages.js';

  import LastFm from "$lib/components/homepage/last-fm/index.svelte";
  import Socials from "$lib/components/socials/index.svelte";
  import Toggles from '$lib/components/toggles/index.svelte';

  import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{m.thomas()}@{m.uchuu()}</title>
</svelte:head>

<div class="container max-w-screen-lg mx-auto p-5 pb-0 flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <div class="flex-1"></div>
    <Toggles />
  </div>
</div>

<main class="container max-w-screen-md mx-auto px-5 md:px-0 min-h-full flex flex-1 flex-col justify-center items-center text-center">
  <Avatar class="w-64 h-64 mb-2" style="view-transition-name: thomas-image">
    <AvatarImage src={thomasImage} />
    <AvatarFallback>TM</AvatarFallback>
  </Avatar>

  <h1 class="text-4xl font-bold">{m.thomas()}</h1>
  <p class="text-lg">{m.description()}</p>

  <div class="mt-2 flex h-5 justify-center items-center space-x-4 text-sm">
    <a href="/about" class="hover:underline">
      {m.AboutPage()}
    </a>
  </div>

  <section class="w-full my-4">
    <LastFm />
  </section>

  <section class="w-2/3 mt-2 mb-4">
    <Socials socials={data.socials} />
  </section>
</main>
