import { ErrorBoundary, Show, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import { query, createAsync, type RouteDefinition } from "@solidjs/router";

import { api } from "~/lib/api";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Lastfm,
  LastfmError,
  LastfmLoading,
} from "~/components/homepage/lastfm";
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

  return {
    album: allData[0],
    artist: allData[1],
    track: allData[2],
    isLive: initialData.isLive,
  } as LastfmData;
}, "lastfmData");

export const route = {
  preload: () => getLastfmData(),
} satisfies RouteDefinition;

export default function Home() {
  const lastfmData = createAsync(() => getLastfmData());

  return (
    <main class="container max-w-screen-md mx-auto flex flex-col justify-center items-center gap-4">
      <Title>Tomo@Uchuu</Title>

      <section class="text-center">
        <Avatar class="w-64 h-64 mb-2">
          <AvatarImage src="/images/thomas.jpg" />
          <AvatarFallback>TM</AvatarFallback>
        </Avatar>
        <h1 class="text-4xl font-bold">Thomas Moore</h1>
        <p class="text-lg">UI Engineer from Essex, UK.</p>

        <div class="mt-2 flex h-5 justify-center items-center space-x-4 text-sm">
          <a href="/about">About</a>
        </div>
      </section>

      <section class="w-full">
        <ErrorBoundary fallback={<LastfmError />}>
          <Suspense fallback={<LastfmLoading />}>
            <Show
              when={Boolean(lastfmData()?.track.name)}
              fallback={<LastfmLoading />}
            >
              <Lastfm data={lastfmData()} />
            </Show>
          </Suspense>
        </ErrorBoundary>
        {/* TODO: Github component */}
        {/* <Github /> */}
      </section>

      <section class="w-full mb-2">
        {/* TODO: Pull in socials from trpc and pass to this component to render them dynamically */}
        {/* https://docs.solidjs.com/concepts/control-flow/dynamic */}
        {/* <Socials /> */}
      </section>
    </main>
  );
}
