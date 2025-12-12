import type { Config } from '@sveltejs/adapter-vercel';
import type { PageLoad } from './$types'

import { fetchLastfmData } from '$lib/queries/last-fm.js'
import { fetchPersonalData } from '$lib/queries/personal';

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

  await queryClient.prefetchQuery({
    queryKey: ['personal'],
    queryFn: () => fetchPersonalData(),
  });
}
