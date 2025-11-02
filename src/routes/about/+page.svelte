<script lang="ts">
  import thomasImage from '$lib/assets/images/thomas.jpg';
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar/index.js";
  import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
  <title>{m.AboutPage()} | {m.thomas()}@{m.uchuu()}</title>
</svelte:head>

<main class="container max-w-screen-md mx-auto px-5 md:px-0 flex flex-col gap-4">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">{m.HomePage()}</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>{m.AboutPage()}</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

   <section class="relative">
     <Avatar class="hidden sm:block w-48 h-48 float-right ml-4 mb-4 -mt-32" style="view-transition-name: thomas-image">
       <AvatarImage src={thomasImage} />
       <AvatarFallback>TM</AvatarFallback>
     </Avatar>
     <p>So hello there, I'm <span style="view-transition-name: thomas-title">Thomas</span>.</p>
     <p class="my-4">
       I'm a UI engineer with experience in React with frameworks like Next.js and Tanstack. With Ember experience for the day job. Though right now I'm playing around with Svelte, Solid, Cloudflare resources and I'm a big fan of TailwindCSS.
     </p>
     <p class="my-4">
       Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly IDOL at that) and aesthetics. I try to get over there a few times a year at least, but my attempts to learn the language are slow going. Mainly because I rely on machine translations (I built my own app, though currently I use Kagi) and "bad" sites like duolingo.
     </p>
     <p class="my-4">
       I played the critically acclaimed MMORPG Final Fantasy 14 to a mid-to-high level (in my opinion). I tend to play support jobs such as Bard or Dancer to help my team mates increase damage to clear fights (It also has a pretty good story too I guess). Main achievements there include clearing an ultimate on the same patch! You can find out more about my character <a class="underline" href="https://tomestone.gg/character/16899179/tomo-uchuu" title="Tomo's FF14 character">here</a>.
     </p>
     <p class="my-4">
       I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry).
     </p>
   </section>
</main>
