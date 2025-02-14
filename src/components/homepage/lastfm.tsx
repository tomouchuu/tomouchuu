import { Headphones } from "lucide-solid";

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

export default function Lastfm(props: Props) {
  if (props.data === undefined) return;

  const { album, artist, isLive, track } = props.data;
  const trackPlayed =
    track.playedCount === 0 ? 1 : (track.playedCount as number);

  return (
    <div class="flex justify-center items-center my-2 text-lg">
      <Headphones class="flex-none mr-4" />
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
        <span class="ordinal">
          {trackPlayed}
          {getOrdinal(trackPlayed)}
        </span>
        {` time`}
        {isLive && " right now!"}
      </p>
    </div>
  );
}
