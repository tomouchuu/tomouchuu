"use client";

import { HeadphonesIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { treaty } from "@elysiajs/eden";
import { useSuspenseQuery } from "@tanstack/react-query";

import type { App } from "@/api/[[...slugs]]/route";
import type {
  LastFmAlbum,
  LastFmArtist,
  LastFmTrack,
  LastFmLatestTrack,
} from "@/api/[[...slugs]]/lastfm";

const app = treaty<App>("http://localhost:3000");

function getOrdinal(n: number) {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) ord = "st";
  else if (n % 10 == 2 && n % 100 != 12) ord = "nd";
  else if (n % 10 == 3 && n % 100 != 13) ord = "rd";

  return ord;
}

export function LastfmError() {
  return (
    <div className="flex justify-center items-center my-2 text-lg w-full">
      <HeadphonesIcon className="flex-none mr-4" />
      <p>Could not load lastfm data</p>
    </div>
  );
}

export function LastfmLoading() {
  return (
    <div className="flex justify-center items-center my-2 text-lg w-full">
      <HeadphonesIcon className="flex-none mr-4" />
      <Skeleton className="h-8 rounded-lg flex-grow" style={{ height: "" }} />
    </div>
  );
}

type LastfmResult = {
  album: LastFmAlbum | null;
  artist: LastFmArtist | null;
  track: LastFmTrack | null;
  isLive?: boolean;
};

async function fetchLastfmData(): Promise<LastfmResult> {
  const latestResp = (await app.api.lastfm.latest.get()) as any;
  const initial = (latestResp?.data ?? latestResp) as
    | LastFmLatestTrack
    | undefined;

  if (!initial) throw new Error("No initial data");

  const albumResp = (await app.api.lastfm.album.post({
    album: initial.album,
    artist: initial.artist,
  })) as any;
  const artistResp = (await app.api.lastfm.artist.post({
    artist: initial.artist,
  })) as any;
  const trackResp = (await app.api.lastfm.track.post({
    artist: initial.artist,
    track: initial.track,
  })) as any;

  const album = (albumResp?.data ?? albumResp) as LastFmAlbum | null;
  const artist = (artistResp?.data ?? artistResp) as LastFmArtist | null;
  const track = (trackResp?.data ?? trackResp) as LastFmTrack | null;

  return {
    album: album ?? null,
    artist: artist ?? null,
    track: track ?? null,
    isLive: initial?.isLive,
  };
}

export default function Lastfm() {
  const { data, error } = useSuspenseQuery({
    queryKey: ["lastfm"],
    queryFn: fetchLastfmData,
    refetchInterval: 120000, // 2mins
    staleTime: 30000, // 30s
    retry: 1,
  });

  if (error) return <LastfmError />;

  const trackPlayed =
    data.track?.playedCount === 0 ? 1 : (data.track?.playedCount ?? 1);

  return (
    <div className="flex justify-center items-center my-2 text-lg">
      <HeadphonesIcon className="flex-none mr-4" />
      <p>
        <a
          href={data.track?.url}
          title={data.track?.name}
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          {data.track?.name}
        </a>
        {" by "}
        <a
          href={data.artist?.url}
          title={data.artist?.name}
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          {data.artist?.name}
        </a>
        {" from "}
        <a
          href={data.album?.url}
          title={data.album?.name}
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          {data.album?.name}
        </a>
        {` for the `}
        <span className="ordinal">
          {trackPlayed}
          {getOrdinal(trackPlayed)}
        </span>
        {` time`}
        {data.isLive && " right now!"}
      </p>
    </div>
  );
}
