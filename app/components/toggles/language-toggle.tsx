"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/../i18n/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const router = useRouter();
  const initialLocale = useLocale();
  const [locale, setLocale] = useState(initialLocale);
  let pathname = usePathname();

  pathname = pathname.replace(/^\/(ja|en)/, "");

  const toggleLanguage = () => {
    if (locale === "ja") {
      setLocale("en");
      router.replace(pathname, { locale: "en" });
    } else {
      setLocale("ja");
      router.replace(pathname, { locale: "ja" });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="cursor-pointer"
    >
      {locale === "ja" ? "🇯🇵" : "🇬🇧"}
    </Button>
  );
}
