import { wrap } from "@typeschema/valibot";
import { object, string } from "valibot";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../utils";

const url = new URL("http://ws.audioscrobbler.com/2.0/");
url.searchParams.append("user", `TminatorT`);
url.searchParams.append("api_key", process.env.LastFmApiKey as string);
url.searchParams.append("format", "json");

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
  isLive: boolean | undefined;
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
    .query(async (opts): Promise<LastFmAlbum> => {
      url.searchParams.append("method", "album.getinfo");
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
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find album data",
        });
      }

      return {
        name: data.album.name,
        playedCount: data.album.userplaycount ?? 0,
        url: data.album.url,
      };
    }),

  getArtistInfo: publicProcedure.input(wrap(string())).query(async (opts) => {
    url.searchParams.append("method", "artist.getinfo");
    url.searchParams.append("artist", opts.input);

    const response = await fetch(url.href, {
      headers: {
        "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
      },
    });
    const data = await response.json();
    const { artist } = data;

    if (!artist) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find artist data",
      });
    }

    return {
      name: data.artist.name as string,
      playedCount: (data.artist.userplaycount as number) ?? 0,
      url: data.artist.url as string,
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
    .query(async (opts) => {
      url.searchParams.append("method", "track.getinfo");
      url.searchParams.append("artist", opts.input.artist);
      url.searchParams.append("track", opts.input.track);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
      });
      const data = await response.json();
      const { track } = data;

      if (!track) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find track data",
        });
      }

      return {
        name: data.track.name as string,
        playedCount: (data.track.userplaycount as number) ?? 0,
        url: data.track.url as string,
      };
    }),

  getLatest: publicProcedure.query(async () => {
    url.searchParams.append("method", "user.getrecenttracks");

    const response = await fetch(url.href, {
      headers: {
        "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
      },
    });

    const data = await response.json();
    const recentTracks = data.recenttracks.track;

    if (recentTracks.length <= 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find any recent tracks",
      });
    }

    const latestTrack = data.recenttracks.track[0];

    return {
      artist: latestTrack.artist["#text"] as string,
      album: latestTrack.album["#text"] as string,
      track: latestTrack.name as string,
      isLive: latestTrack["@attr"]?.nowplaying as boolean | undefined,
    };
  }),
});
