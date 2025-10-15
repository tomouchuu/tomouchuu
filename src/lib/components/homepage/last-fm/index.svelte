<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'
  import { fetchLastfmData, type LastfmResult } from './index.js'

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
</script>

{#if lastfm.status === 'pending'}
  <span>Loading...</span>
{:else if lastfm.status === 'error'}
  <span>Error: {lastfm.error?.message}</span>
{:else}
  <span>Album: {lastfm.data?.album?.name}</span>
  <span>Artist: {lastfm.data?.artist?.name}</span>
  <span>Track: {lastfm.data?.track?.name}</span>
  {#if lastfm.data?.isLive}
    <span>(Live)</span>
  {/if}
{/if}
