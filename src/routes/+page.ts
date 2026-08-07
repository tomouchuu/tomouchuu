import { fetchLastfmData } from "$lib/queries/last-fm.js";
import { fetchPersonalData } from "$lib/queries/personal";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, parent, url }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ["lastfm"],
    queryFn: () => fetchLastfmData(url.origin, fetch),
  });

  await queryClient.prefetchQuery({
    queryKey: ["personal"],
    queryFn: () => fetchPersonalData(url.origin, fetch),
  });
};
