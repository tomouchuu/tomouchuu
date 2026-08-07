import { treaty } from "@elysiajs/eden";
import { getBaseUrl } from "$lib/utils";
import type { App } from "../../routes/api/[...slugs]/+server";

export const getApp = (
  baseUrl = getBaseUrl(),
  fetcher: typeof globalThis.fetch = globalThis.fetch,
) => treaty<App>(baseUrl, { fetcher });
