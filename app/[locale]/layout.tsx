import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {children}
      <footer className="text-center text-xs min-w-36">
        <Separator />
        <p className="mt-4">
          {t("thomas")}@
          <a href="https://uchuu.io" className="hover:underline">
            {t("uchuu")}
          </a>
        </p>
      </footer>
    </div>
  );
}
