import type { Config } from '@sveltejs/adapter-vercel';
import type { PageLoad } from './$types'

import { fetchLastfmData } from '$lib/components/homepage/last-fm/index.js'

export const config: Config = {
  isr: {
    expiration: 120,
  },
};

export const load: PageLoad = async ({ data, parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: ['lastfm'],
    queryFn: () => fetchLastfmData(),
  });

  return {
    socials: data?.socials
  }
}
