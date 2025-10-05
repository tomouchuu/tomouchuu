import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { Link } from "@/../i18n/navigation";

import Lastfm, { LastfmLoading } from "@/components/homepage/last-fm";
import Socials, { SocialsLoading } from "@/components/socials";
import { Suspense } from "react";

export default function Page() {
  const t = useTranslations();

  return (
    <main className="container max-w-screen-md mx-auto flex flex-col justify-center items-center text-center">
      <Avatar className="w-64 h-64 mb-2">
        <AvatarImage src="/images/thomas.jpg" />
        <AvatarFallback>TM</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold">{t("thomas")}</h1>
      <p className="text-lg">{t("description")}</p>

      <div className="mt-2 flex h-5 justify-center items-center space-x-4 text-sm">
        <Link href="/about" className="hover:underline">
          {t("AboutPage.about")}
        </Link>
      </div>

      <section className="my-4">
        <Suspense fallback={<LastfmLoading />}>
          <Lastfm />
          {/* Maybe github soon */}
        </Suspense>
      </section>

      <section className="w-2/3 mt-2">
        <Suspense fallback={<SocialsLoading />}>
          <Socials />
        </Suspense>
      </section>
    </main>
  );
}
