import { Title } from "@solidjs/meta";

export default function About() {
  // TODO: Add breadcrumb to link back to homepage here

  return (
    <main class="container max-w-screen-md mx-auto flex flex-col gap-4">
      <Title>About | Tomo@Uchuu</Title>

      <section>
        <p>So hello there, I'm Thomas Moore.</p>
        <p class="my-4">
          I'm a UI engineer with experience in React with frameworks like
          Next.js, Remix(RR) and Astro. Right now I'm playing around with Solid
          and I'm a big fan of TailwindCSS
        </p>
        <p class="my-4">
          Outside of coding, I'm a big fan of things japanese but mostly enjoy
          music (and mostly IDOL at that) and aesthetics. I try to get over
          there every year at least and I'm trying to learn the language via a
          tutor, self teaching and going to meetups.
        </p>
        <p class="my-4">
          I play the critically acclaimed MMORPG Final Fantasy 14 to a
          mid-to-high level (in my opinion). I tend to play support jobs such as
          Bard or Dancer to help my team mates increase damage to clear fights
          (It also has a pretty good story too I guess). Main achievement there
          is clearing an ultimate on the same expansion which took over 1150
          attempts over a 2 month time period! You can find out more about my
          character{" "}
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
  );
}
