import { HeadphonesIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { treaty } from "@elysiajs/eden";

import type { App } from "@/api/[[...slugs]]/route";

const app = treaty<App>("localhost:3000");

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

async function getData() {
  try {
    const { data: initialData } = await app.api.lastfm.latest.get();
    if (!initialData) throw new Error("No initial data");

    const { data: albumInfo } = await app.api.lastfm.album.post({
      album: initialData.album,
      artist: initialData.artist,
    });
    const { data: artistInfo } = await app.api.lastfm.artist.post({
      artist: initialData.artist,
    });
    const { data: trackInfo } = await app.api.lastfm.track.post({
      artist: initialData.artist,
      track: initialData.track,
    });

    return {
      album: albumInfo,
      artist: artistInfo,
      track: trackInfo,
      isLive: initialData?.isLive,
    };
  } catch (error) {
    return null;
  }
}

export default async function Lastfm() {
  const data = await getData();

  if (
    data === undefined ||
    data === null ||
    (data.album?.name === "Loading..." &&
      data.artist?.name === "Loading..." &&
      data.track?.name === "Loading...") ||
    (data.album === null && data.artist === null && data.track === null)
  )
    return <LastfmLoading />;

  const trackPlayed =
    data.track?.playedCount === 0 ? 1 : (data.track?.playedCount as number);

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
