import { treaty } from "@elysiajs/eden"
import type { App } from "./../../../../routes/api/[...slugs]/+server";

import type {
  LastFmAlbum,
  LastFmArtist,
  LastFmTrack,
  LastFmLatestTrack,
} from "./../../../../routes/api/[...slugs]/lastfm";

const app = treaty<App>('http://localhost:5173/');

export type LastfmResult = {
  album: LastFmAlbum | null;
  artist: LastFmArtist | null;
  track: LastFmTrack | null;
  isLive?: boolean;
};

export async function fetchLastfmData(): Promise<LastfmResult> {
  const latestResp = (await app.api.lastfm.latest.get()) as {
    data?: LastFmLatestTrack | null;
  };
  const initial = (latestResp?.data ?? latestResp) as
    | LastFmLatestTrack
    | null
    | undefined;

  if (!initial) {
    throw new Error("No initial data");
  }

  const albumResp = (await app.api.lastfm.album.post({
    album: initial.album,
    artist: initial.artist,
  })) as { data?: LastFmAlbum };
  const artistResp = (await app.api.lastfm.artist.post({
    artist: initial.artist,
  })) as { data?: LastFmArtist };
  const trackResp = (await app.api.lastfm.track.post({
    artist: initial.artist,
    track: initial.track,
  })) as { data?: LastFmTrack };

  const album = (albumResp?.data ?? albumResp) as LastFmAlbum | null;
  const artist = (artistResp?.data ?? artistResp) as LastFmArtist | null;
  const track = (trackResp?.data ?? trackResp) as LastFmTrack | null;

  if (!album && !artist && !track) {
    throw new Error("No data found");
  }

  return {
    album: album ?? null,
    artist: artist ?? null,
    track: track ?? null,
    isLive: initial?.isLive,
  };
}
