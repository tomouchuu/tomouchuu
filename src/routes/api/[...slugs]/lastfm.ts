import { Elysia, t } from "elysia";
import { LASTFM_API_KEY } from "$env/static/private";

export interface LastFmAlbum {
  name: string;
  playedCount: number;
  url: string;
}

export interface LastFmArtist {
  name: string;
  playedCount: number;
  url: string;
}

export interface LastFmTrack {
  name: string;
  playedCount: number;
  url: string;
}

export interface LastFmLatestTrack {
  artist: string;
  album: string;
  track: string;
  isLive?: boolean;
}

export const lastfm = new Elysia({ prefix: "/lastfm" })
  .post(
    "/album",
    async ({ body }): Promise<LastFmAlbum | Error> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
       url.searchParams.append("api_key", LASTFM_API_KEY);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "album.getInfo");
      url.searchParams.append("artist", body.artist);
      url.searchParams.append("album", body.album);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/11.0.0 (tomo.uchuu.dev)`,
        },
      });
      const data = await response.json();
      const { album } = data;

      if (!album) {
        throw new Error("Album not found");
      }

      return {
        name: data.album.name,
        playedCount: parseInt(data.album.userplaycount ?? "0", 10),
        url: data.album.url,
      };
    },
    {
      body: t.Object({
        album: t.String(),
        artist: t.String(),
      }),
    },
  )
  .post(
    "/artist",
    async ({ body }): Promise<LastFmArtist | Error> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
       url.searchParams.append("api_key", LASTFM_API_KEY);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "artist.getInfo");
      url.searchParams.append("artist", body.artist);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/11.0.0 (tomo.uchuu.dev)`,
        },
      });
      const data = await response.json();
      const { artist } = data;

      if (!artist) {
        throw new Error("Artist not found");
      }

      return {
        name: data.artist.name,
        playedCount: parseInt(data.artist.userplaycount ?? "0", 10),
        url: data.artist.url,
      };
    },
    {
      body: t.Object({
        artist: t.String(),
      }),
    },
  )
  .post(
    "/track",
    async ({ body }): Promise<LastFmTrack | Error> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
       url.searchParams.append("api_key", LASTFM_API_KEY);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "track.getInfo");
      url.searchParams.append("artist", body.artist);
      url.searchParams.append("track", body.track);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/11.0.0 (tomo.uchuu.dev)`,
        },
      });
      const data = await response.json();
      const { track } = data;

      if (!track) {
        throw new Error("Track not found");
      }

      return {
        name: data.track.name,
        playedCount: parseInt(data.track.userplaycount ?? "0", 10),
        url: data.track.url,
      };
    },
    {
      body: t.Object({
        artist: t.String(),
        track: t.String(),
      }),
    },
  )
  .get("/latest", async (): Promise<LastFmLatestTrack | Error> => {
    const url = new URL("http://ws.audioscrobbler.com/2.0/");
    url.searchParams.append("user", `TminatorT`);
    url.searchParams.append("api_key", process.env.LASTFM_API_KEY!);
    url.searchParams.append("format", "json");
    url.searchParams.append("method", "user.getRecentTracks");
    url.searchParams.append("limit", "1");

    const response = await fetch(url.href, {
      headers: {
        "User-Agent": `Tomo-API/11.0.0 (tomo.uchuu.dev)`,
      },
    });

    const data = await response.json();
    const recentTracks = data.recenttracks.track;

    if (recentTracks.length <= 0) {
      throw new Error("No recent tracks found");
    }

    const latestTrack = data.recenttracks.track[0];

    return {
      artist: latestTrack.artist["#text"],
      album: latestTrack.album["#text"],
      track: latestTrack.name,
      isLive: latestTrack["@attr"]?.nowplaying,
    };
  });
