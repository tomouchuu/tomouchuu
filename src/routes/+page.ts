import type { PageLoad } from './$types'
import { fetchLastfmData } from '$lib/components/homepage/last-fm/index.js'

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: ['lastfm'],
    queryFn: () => fetchLastfmData(),
  })
}
