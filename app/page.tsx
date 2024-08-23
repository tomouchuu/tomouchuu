import Lastfm from "@/components/blocks/lastfm";
import Github from "@/components/blocks/github";
import Socials from "@/components/blocks/socials";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="container max-w-screen-md mx-auto flex flex-col justify-center items-center gap-4">
      <section className="text-center">
        <Avatar className="w-64 h-64 mb-2">
          <AvatarImage src="/images/thomas.jpg" />
          <AvatarFallback>TM</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold">Thomas Moore</h1>
        <p className="text-lg">UI Engineer from Essex, UK.</p>

        <div className="mt-2 flex h-5 justify-center items-center space-x-4 text-sm">
          <a href="/about">About</a>
          <Separator orientation="vertical" />
          <a href="/idols">Idols</a>
          <Separator orientation="vertical" />
          <a href="/ff14">FF14</a>
        </div>
      </section>

      <section className="w-full">
        <Lastfm />
        <Github />
      </section>

      <section className="w-full mb-2">
        <Socials />
      </section>
    </main>
  );
}
