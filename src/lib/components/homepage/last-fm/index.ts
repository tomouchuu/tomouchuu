import { treaty } from "@elysiajs/eden"
import { getBaseUrl } from "$lib/utils";
import type { App } from "./../../../../routes/api/[...slugs]/+server";

import type {
  LastFmAlbum,
  LastFmArtist,
  LastFmTrack,
  LastFmLatestTrack,
} from "./../../../../routes/api/[...slugs]/lastfm";
import { browser } from "$app/environment";

const getApp = () => treaty<App>(getBaseUrl());

export type LastfmResult = {
  album: LastFmAlbum | null;
  artist: LastFmArtist | null;
  track: LastFmTrack | null;
  isLive?: boolean;
};

export async function fetchLastfmData(): Promise<LastfmResult> {
  const app = getApp();

  let headers = {};
  if (!browser) {
    headers = {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
    };
  }

  const latestResp = (await app.api.lastfm.latest.get({
    headers: headers,
  })) as {
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
  }, {
    headers: headers
  })) as { data?: LastFmAlbum };
  const artistResp = (await app.api.lastfm.artist.post({
    artist: initial.artist,
  }, {
    headers: headers
  })) as { data?: LastFmArtist };
  const trackResp = (await app.api.lastfm.track.post({
    artist: initial.artist,
    track: initial.track,
  }, {
    headers: headers
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
