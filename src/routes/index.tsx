import { ErrorBoundary, Show, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import { useQuery } from "@tanstack/solid-query";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Lastfm,
  LastfmError,
  LastfmLoading,
} from "~/components/homepage/lastfm";
import { lastfmQueryOpts } from "~/queries/lastfm";

import {
  Github,
  GithubError,
  GithubLoading,
} from "~/components/homepage/github";
import { githubQueryOpts } from "~/queries/github";

import { Socials, SocialsLoading } from "~/components/socials";
import { personalQueryOpts } from "~/queries/personal";

export default function Home() {
  const lastfmData = useQuery(() => lastfmQueryOpts());
  const githubData = useQuery(() => githubQueryOpts());
  const personalData = useQuery(() => personalQueryOpts());

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
          <a href="/about" class="hover:underline">
            About
          </a>
        </div>
      </section>

      <section class="w-full">
        <ErrorBoundary fallback={<LastfmError />}>
          <Suspense fallback={<LastfmLoading />}>
            <Show
              when={
                lastfmData.data?.artist.name !== "Loading..." &&
                lastfmData.data?.album.name !== "Loading..." &&
                lastfmData.data?.track.name !== "Loading..."
              }
              fallback={<LastfmLoading />}
            >
              <Lastfm data={lastfmData?.data} />
            </Show>
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<GithubError />}>
          <Suspense fallback={<GithubLoading />}>
            <Show
              when={githubData.data?.payload.action !== "Loading..."}
              fallback={<GithubLoading />}
            >
              <Github data={githubData.data} />
            </Show>
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
