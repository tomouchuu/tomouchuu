import type { Config } from '@sveltejs/adapter-vercel';
import type { PageLoad } from './$types'
import type { App } from "./api/[...slugs]/+server";

import { treaty } from "@elysiajs/eden"
import { fetchLastfmData } from '$lib/components/homepage/last-fm/index.js'
import { getBaseUrl } from "$lib/utils";

export const config: Config = {
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
  const socials = (await app.api.personal.get({
    headers: {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET!
    }
  })).data?.contact

  return {
    socials
  }
}
