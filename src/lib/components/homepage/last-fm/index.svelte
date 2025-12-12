<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'
  import { fetchLastfmData, type LastfmResult } from '$lib/queries/last-fm'

  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import HeadphonesIcon from '@lucide/svelte/icons/headphones';

  const lastfm = createQuery<
    LastfmResult,
    Error
  >(() => ({
    queryKey: ['lastfm'],
    queryFn: () => fetchLastfmData(),
    refetchInterval: 120000, // 2mins
    staleTime: 30000, // 30s
    retry: 1,
  }))

  function getOrdinal(n: number) {
    let ord = "th";

    if (n % 10 == 1 && n % 100 != 11) ord = "st";
    else if (n % 10 == 2 && n % 100 != 12) ord = "nd";
    else if (n % 10 == 3 && n % 100 != 13) ord = "rd";

    return ord;
  }

  let trackPlayed = $derived(lastfm.data?.track?.playedCount === 0 ? 1 : (lastfm.data?.track?.playedCount ?? 1));
</script>

<div class="flex flex-col sm:flex-row justify-center items-center my-2 text-lg w-full">
  <HeadphonesIcon class="flex-none sm:mr-4" />
  {#if lastfm.status === 'pending'}
    <Skeleton class="h-8 rounded-lg grow" style="height: ''" />
  {:else if lastfm.status === 'error'}
    <p>Could not load lastfm data</p>
  {:else}
    <p>
      <a
        href={lastfm.data.track?.url}
        title={lastfm.data.track?.name}
        target="_blank"
        rel="noopener"
        class="hover:underline"
      >
        {lastfm.data.track?.name}
      </a>
      by
      <a
        href={lastfm.data.artist?.url}
        title={lastfm.data.artist?.name}
        target="_blank"
        rel="noopener"
        class="hover:underline"
      >
        {lastfm.data.artist?.name}
      </a>
      from
      <a
        href={lastfm.data.album?.url}
        title={lastfm.data.album?.name}
        target="_blank"
        rel="noopener"
        class="hover:underline"
      >
        {lastfm.data.album?.name}
      </a>
      for the
      <span class="ordinal">
        {trackPlayed}{getOrdinal(trackPlayed)}
      </span>
      time
      {#if lastfm.data.isLive}
        right now!
      {/if}
    </p>
  {/if}
</div>
