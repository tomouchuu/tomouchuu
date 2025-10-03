import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "@/../i18n/navigation";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="container max-w-screen-md mx-auto flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t("HomePage.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("AboutPage.about")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <p>So hello there, I'm Thomas Moore.</p>
        <p className="my-4">
          I'm a UI engineer with experience in React with frameworks like
          Next.js, Remix(RR) and Tanstack. Right now I'm playing around with
          Solid, Cloudflare resources and I'm a big fan of TailwindCSS.
        </p>
        <p className="my-4">
          Outside of coding, I'm a big fan of things japanese but mostly enjoy
          music (and mostly IDOL at that) and aesthetics. I try to get over
          there a few times a year at least, but my attempts to learn the
          language are slow going. Mainly because I rely on machine translations
          (I built my own!) and bad sites like duolingo.
        </p>
        <p className="my-4">
          I played the critically acclaimed MMORPG Final Fantasy 14 to a
          mid-to-high level (in my opinion). I tend to play support jobs such as
          Bard or Dancer to help my team mates increase damage to clear fights
          (It also has a pretty good story too I guess). Main achievements there
          include clearing an ultimate on the same patch! You can find out more
          about my character{" "}
          <a
            className="underline"
            href="https://tomestone.gg/character/16899179/tomo-uchuu"
            title="Tomo's FF14 character"
          >
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
