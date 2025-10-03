import { treaty } from "@elysiajs/eden";
import { getTranslations } from "next-intl/server";

import type { App } from "@/api/[[...slugs]]/route";

const app = treaty<App>("localhost:3000");

export default async function Page() {
  const t = await getTranslations();
  const { data, error } = await app.api.personal.get();
  console.log({ data, error });

  return <h1>{t("HomePage.message", { name: data?.name })}</h1>;
}
