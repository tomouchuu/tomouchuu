"use client";

import useSWR from "swr";
import { request } from "graphql-request";
import { Headphones } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface Data {
  music: {
    isLive: boolean;
    album: {
      name: string;
      url: string;
    };
    artist: {
      name: string;
      url: string;
    };
    track: {
      name: string;
      url: string;
      playedCount: number;
    };
  };
}

const fetcher = (query: string): Promise<Data> =>
  request(`${window.location.origin}/api/graphql`, query);

function getOrdinal(n: number) {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) {
    ord = "st";
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = "nd";
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = "rd";
  }

  return ord;
}

export default function Lastfm() {
  const { data, error, isLoading } = useSWR<Data>(
    `{
      music {
        isLive
        album {
          name
          url
        }
        artist {
          name
          url
        }
        track {
          name
          url
          playedCount
        }
      }
    }`,
    fetcher,
  );

  if (data === undefined || isLoading || error)
    return (
      <div className="flex justify-center items-center my-2 text-lg w-full">
        <Headphones className="mr-4" />
        <Skeleton className="h-8 flex-grow" />
      </div>
    );

  const { album, artist, isLive, track } = data.music;
  const trackPlayed = track.playedCount === 0 ? 1 : track.playedCount;

  return (
    <div className="flex justify-center items-center my-2 text-lg">
      <Headphones className="mr-4" />
      <p>
        <a href={track.url} title={track.name} target="_blank" rel="noopener">
          {track.name}
        </a>
        {" by "}
        <a href={artist.url} title={artist.name} target="_blank" rel="noopener">
          {artist.name}
        </a>
        {" from "}
        <a href={album.url} title={album.name} target="_blank" rel="noopener">
          {album.name}
        </a>
        {` for the `}
        <span className="ordinal">
          {trackPlayed}
          {getOrdinal(trackPlayed)}
        </span>
        {` time`}
        {isLive && " right now!"}
      </p>
    </div>
  );
}
