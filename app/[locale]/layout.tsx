import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/../i18n/routing";

import { Separator } from "@/components/ui/separator";

export const experimental_ppr = true;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {children}
      <footer className="text-center text-xs min-w-36">
        <Separator />
        <p className="mt-4">
          {t("thomas")}@
          <a href="https://uchuu.dev" className="hover:underline">
            {t("uchuu")}
          </a>
        </p>
      </footer>
    </div>
  );
}
