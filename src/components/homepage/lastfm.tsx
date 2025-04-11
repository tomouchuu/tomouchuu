import HeadphonesIcon from "~/components/icons/headphones";

import { Skeleton } from "~/components/ui/skeleton";

import type { LastfmData } from "~/server/api/routers/lastfm";

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

interface Props {
  data?: LastfmData;
}

export function LastfmError() {
  return (
    <div class="flex justify-center items-center my-2 text-lg w-full">
      <HeadphonesIcon class="flex-none mr-4" />
      <p>Could not load lastfm data</p>
    </div>
  );
}

export function LastfmLoading() {
  return (
    <div class="flex justify-center items-center my-2 text-lg w-full">
      <HeadphonesIcon class="flex-none mr-4" />
      <Skeleton class="h-8 rounded-lg flex-grow" style={{ height: "" }} />
    </div>
  );
}

export function Lastfm(props: Props) {
  const data = () => props?.data;

  if (
    data() === undefined ||
    data() === null ||
    (data()?.album.name === "Loading..." &&
      data()?.artist.name === "Loading..." &&
      data()?.track.name === "Loading...")
  )
    return <LastfmLoading />;

  const trackPlayed =
    data()?.track?.playedCount === 0
      ? 1
      : (data()?.track?.playedCount as number);

  return (
    <div class="flex justify-center items-center my-2 text-lg">
      <HeadphonesIcon class="flex-none mr-4" />
      <p>
        <a
          href={data()?.track?.url}
          title={data()?.track?.name}
          target="_blank"
          rel="noopener"
        >
          {data()?.track?.name}
        </a>
        {" by "}
        <a
          href={data()?.artist?.url}
          title={data()?.artist?.name}
          target="_blank"
          rel="noopener"
        >
          {data()?.artist?.name}
        </a>
        {" from "}
        <a
          href={data()?.album?.url}
          title={data()?.album?.name}
          target="_blank"
          rel="noopener"
        >
          {data()?.album?.name}
        </a>
        {` for the `}
        <span class="ordinal">
          {trackPlayed}
          {getOrdinal(trackPlayed)}
        </span>
        {` time`}
        {data()?.isLive && " right now!"}
      </p>
    </div>
  );
}

export default Lastfm;
