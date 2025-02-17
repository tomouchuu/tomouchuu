import { ErrorBoundary, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import { createQuery } from "@tanstack/solid-query";

import { api } from "~/lib/api";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Lastfm,
  LastfmError,
  LastfmLoading,
} from "~/components/homepage/lastfm";
import type { LastfmData } from "~/server/api/routers/lastfm";

import {
  Github,
  GithubError,
  GithubLoading,
} from "~/components/homepage/github";

import { Socials, SocialsLoading } from "~/components/socials";

export default function Home() {
  const lastfmData = createQuery(() => ({
    queryKey: ["lastfmData"],
    queryFn: async () => {
      const initialData = await api.lastfm.getLatest.query();

      const albumInfo = await api.lastfm.getAlbumInfo.query({
        album: initialData.album,
        artist: initialData.artist,
      });
      const artistInfo = await api.lastfm.getArtistInfo.query(
        initialData.artist,
      );
      const trackInfo = await api.lastfm.getTrackInfo.query({
        artist: initialData.artist,
        track: initialData.track,
      });

      return {
        album: albumInfo,
        artist: artistInfo,
        track: trackInfo,
        isLive: initialData.isLive,
      } as LastfmData;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    throwOnError: true, // Throw an error if the query fails
  }));

  const githubData = createQuery(() => ({
    queryKey: ["githubData"],
    queryFn: async () => {
      return await api.github.event.query();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    throwOnError: true, // Throw an error if the query fails
  }));

  const personalData = createQuery(() => ({
    queryKey: ["personalData"],
    queryFn: async () => {
      return await api.personal.data.query();
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    throwOnError: true, // Throw an error if the query fails
  }));

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
            <Lastfm data={lastfmData.data} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<GithubError />}>
          <Suspense fallback={<GithubLoading />}>
            <Github data={githubData.data} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section class="w-2/3 mb-2">
        <ErrorBoundary fallback>
          <Suspense fallback={<SocialsLoading />}>
            <Socials data={personalData.data?.contact} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
}
