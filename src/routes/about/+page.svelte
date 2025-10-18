<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
  <title>{m.AboutPage()} | {m.thomas()}@{m.uchuu()}</title>
</svelte:head>

<main class="container max-w-screen-md mx-auto flex flex-col gap-4">
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

  <section>
    <p>So hello there, I&apos;m Thomas Moore.</p>
    <p class="my-4">
      I&apos;m a UI engineer with experience in React with frameworks like
      Next.js, Remix(RR) and Tanstack. Right now I&apos;m playing around
      with Solid, Cloudflare resources and I&apos;m a big fan of
      TailwindCSS.
    </p>
    <p class="my-4">
      Outside of coding, I&apos;m a big fan of things japanese but mostly
      enjoy music (and mostly IDOL at that) and aesthetics. I try to get
      over there a few times a year at least, but my attempts to learn the
      language are slow going. Mainly because I rely on machine translations
      (I built my own!) and bad sites like duolingo.
    </p>
    <p class="my-4">
      I played the critically acclaimed MMORPG Final Fantasy 14 to a
      mid-to-high level (in my opinion). I tend to play support jobs such as
      Bard or Dancer to help my team mates increase damage to clear fights
      (It also has a pretty good story too I guess). Main achievements there
      include clearing an ultimate on the same patch! You can find out more
      about my character{" "}
      <a
        class="underline"
        href="https://tomestone.gg/character/16899179/tomo-uchuu"
        title="Tomo's FF14 character"
      >
        here
      </a>
      .
    </p>
    <p class="my-4">
      I also play drums occasionally, used to be in a band but I still keep
      playing to keep skills up, because of that I do finger drum in the
      office (sorry not sorry).
    </p>
  </section>
</main>
