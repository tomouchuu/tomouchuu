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
  if (props.data === undefined) return;

  const trackPlayed =
    props.data.track.playedCount === 0
      ? 1
      : (props.data.track.playedCount as number);

  return (
    <div class="flex justify-center items-center my-2 text-lg">
      <HeadphonesIcon class="flex-none mr-4" />
      <p>
        <a
          href={props.data.track.url}
          title={props.data.track.name}
          target="_blank"
          rel="noopener"
        >
          {props.data.track.name}
        </a>
        {" by "}
        <a
          href={props.data.artist.url}
          title={props.data.artist.name}
          target="_blank"
          rel="noopener"
        >
          {props.data.artist.name}
        </a>
        {" from "}
        <a
          href={props.data.album.url}
          title={props.data.album.name}
          target="_blank"
          rel="noopener"
        >
          {props.data.album.name}
        </a>
        {` for the `}
        <span class="ordinal">
          {trackPlayed}
          {getOrdinal(trackPlayed)}
        </span>
        {` time`}
        {props.data.isLive && " right now!"}
      </p>
    </div>
  );
}

export default Lastfm;
