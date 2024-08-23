import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function About() {
  return (
    <main className="container max-w-screen-md mx-auto flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <p>So hello there, I&apos;m Thomas Moore.</p>
        <p className="my-4">
          I&apos;m a UI engineer primarily working in React with frameworks like
          Next.js, Remix and Astro. Right now I&apos;m a big fan of TailwindCSS.
        </p>
        <p className="my-4">
          Outside of coding, I&apos;m a big fan of things japanese but mostly
          enjoy music (and mostly{" "}
          <a className="underline" href="/idols" title="Tomo's favourite idols">
            IDOL
          </a>{" "}
          at that) and aesthetics. I try to get over there every year at least
          and I&apos;m trying to learn the language via a tutor, self teaching
          and going to meetups.
        </p>
        <p className="my-4">
          I play the critically acclaimed MMORPG Final Fantasy 14 to a
          mid-to-high level (in my opinion). I tend to play support jobs such as
          Bard or Dancer to help my team mates increase damage to clear fights
          (It also has a pretty good story too I guess). Main achievement there
          is clearing an ultimate on the same expansion which took over 1150
          attempts over a 2 month time period! You can find out more about my
          character{" "}
          <a className="underline" href="/ff14" title="Tomo's FF14 character">
            here
          </a>
          .
        </p>
        <p className="my-4">
          I also play drums occasionally, used to be in a band but I still keep
          playing to keep skills up, because of that I do finger drum in the
          office (sorry not sorry).
        </p>
      </section>
    </main>
  );
}
