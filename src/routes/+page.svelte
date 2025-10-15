<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar/index.js";
  import { m } from '$lib/paraglide/messages.js';
</script>

<main class="container max-w-screen-md mx-auto flex flex-col justify-center items-center text-center">
  <Avatar class="w-64 h-64 mb-2">
    <AvatarImage src="/images/thomas.jpg" />
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
    LASTFM
  </section>

  <section class="w-2/3 mt-2 mb-4">
    SOCIALS
  </section>
</main>
