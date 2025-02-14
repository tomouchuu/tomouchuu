import { ErrorBoundary, Show, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import { query, createAsync, type RouteDefinition } from "@solidjs/router";

import { api } from "~/lib/api";

import Lastfm from "~/components/homepage/lastfm";

import type { LastfmData } from "~/server/api/routers/lastfm";

const getLastfmData = query(async () => {
  const initialData = await api.lastfm.getLatest.query();
  const allData = await Promise.all([
    api.lastfm.getAlbumInfo.query({
      album: initialData.album,
      artist: initialData.artist,
    }),
    api.lastfm.getArtistInfo.query(initialData.artist),
    api.lastfm.getTrackInfo.query({
      artist: initialData.artist,
      track: initialData.track,
    }),
  ]);

  await new Promise((resolve) => setTimeout(() => resolve(""), 5000));

  return {
    album: allData[0],
    artist: allData[1],
    track: allData[2],
    isLive: initialData.isLive,
  } as LastfmData;
}, "posts");

export const route = {
  preload: () => getLastfmData(),
} satisfies RouteDefinition;

export default function Home() {
  const lastfmData = createAsync(() => getLastfmData());

  return (
    <main class="container max-w-screen-md mx-auto flex flex-col justify-center items-center gap-4">
      <Title>Tomo@Uchuu</Title>

      <section class="text-center">
        {/* <Avatar class="w-64 h-64 mb-2">
          <AvatarImage src="/images/thomas.jpg" />
          <AvatarFallback>TM</AvatarFallback>
        </Avatar> */}
        <h1 class="text-4xl font-bold">Thomas Moore</h1>
        <p class="text-lg">UI Engineer from Essex, UK.</p>

        <div class="mt-2 flex h-5 justify-center items-center space-x-4 text-sm">
          <a href="/about">About</a>
        </div>
      </section>

      <section class="w-full">
        <ErrorBoundary fallback={<div>Could not load lastfm...</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Show when={Boolean(lastfmData()?.track.name)}>
              <Lastfm data={lastfmData()} />
            </Show>
          </Suspense>
        </ErrorBoundary>
        {/* <Github /> */}
      </section>

      <section class="w-full mb-2">{/* <Socials /> */}</section>
    </main>
  );
}
