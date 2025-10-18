import type { PageLoad } from './$types'
import type { App } from "./api/[...slugs]/+server";

import { treaty } from "@elysiajs/eden"
import { fetchLastfmData } from '$lib/components/homepage/last-fm/index.js'
import { getBaseUrl } from "$lib/utils";

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  isr: {
    expiration: 120,
  },
};

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: ['lastfm'],
    queryFn: () => fetchLastfmData(),
  });

  const app = treaty<App>(getBaseUrl())
  const socials = (await app.api.personal.get()).data?.contact

  return {
    socials
  }
}
