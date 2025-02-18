import { Resource } from "sst";
import { wrap } from "@typeschema/valibot";
import { object, string } from "valibot";
import { createTRPCRouter, publicProcedure } from "../utils";

interface LastFmError {
  isError: true;
}

interface LastFmAlbum {
  name: string;
  playedCount: number;
  url: string;
}

interface LastFmArtist {
  name: string;
  playedCount: number;
  url: string;
}

interface LastFmTrack {
  name: string;
  playedCount: number;
  url: string;
}

interface LastFmLatestTrack {
  artist: string;
  album: string;
  track: string;
  isLive?: boolean;
}

export interface LastfmData {
  album: LastFmAlbum;
  artist: LastFmArtist;
  isLive: LastFmLatestTrack["isLive"];
  track: LastFmTrack;
}

export const lastfmRouter = createTRPCRouter({
  getAlbumInfo: publicProcedure
    .input(
      wrap(
        object({
          album: string(),
          artist: string(),
        }),
      ),
    )
    .query(async (opts): Promise<LastFmAlbum | LastFmError> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
      url.searchParams.append("api_key", Resource.LastFmApiKey.value);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "album.getInfo");
      url.searchParams.append("artist", opts.input.artist);
      url.searchParams.append("album", opts.input.album);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
      });
      const data = await response.json();
      const { album } = data;

      if (!album) {
        return { isError: true };
      }

      return {
        name: data.album.name,
        playedCount: data.album.userplaycount ?? 0,
        url: data.album.url,
      };
    }),

  getArtistInfo: publicProcedure
    .input(wrap(string()))
    .query(async (opts): Promise<LastFmArtist | LastFmError> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
      url.searchParams.append("api_key", Resource.LastFmApiKey.value);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "artist.getInfo");
      url.searchParams.append("artist", opts.input);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
      });
      const data = await response.json();
      const { artist } = data;

      if (!artist) {
        return { isError: true };
      }

      return {
        name: data.artist.name,
        playedCount: data.artist.userplaycount ?? 0,
        url: data.artist.url,
      };
    }),

  getTrackInfo: publicProcedure
    .input(
      wrap(
        object({
          artist: string(),
          track: string(),
        }),
      ),
    )
    .query(async (opts): Promise<LastFmTrack | LastFmError> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
      url.searchParams.append("api_key", Resource.LastFmApiKey.value);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "track.getInfo");
      url.searchParams.append("artist", opts.input.artist);
      url.searchParams.append("track", opts.input.track);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
        cache: "no-store",
      });
      const data = await response.json();
      const { track } = data;

      if (!track) {
        return { isError: true };
      }

      return {
        name: data.track.name,
        playedCount: data.track.userplaycount ?? 0,
        url: data.track.url,
      };
    }),

  getLatest: publicProcedure.query(async (): Promise<LastFmLatestTrack> => {
    const url = new URL("http://ws.audioscrobbler.com/2.0/");
    url.searchParams.append("user", `TminatorT`);
    url.searchParams.append("api_key", Resource.LastFmApiKey.value);
    url.searchParams.append("format", "json");
    url.searchParams.append("method", "user.getRecentTracks");
    url.searchParams.append("limit", "1");

    const response = await fetch(url.href, {
      headers: {
        "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
      },
    });

    const data = await response.json();
    const recentTracks = data.recenttracks.track;

    if (recentTracks.length <= 0) {
      return {
        artist: "",
        album: "",
        track: "",
      };
    }

    const latestTrack = data.recenttracks.track[0];

    return {
      artist: latestTrack.artist["#text"],
      album: latestTrack.album["#text"],
      track: latestTrack.name,
      isLive: latestTrack["@attr"]?.nowplaying,
    };
  }),
});
