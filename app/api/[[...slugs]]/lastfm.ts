import { Elysia, t } from "elysia";

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
    async ({ body }): Promise<LastFmAlbum> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
      url.searchParams.append("api_key", process.env.LASTFM_API_KEY!);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "album.getInfo");
      url.searchParams.append("artist", body.artist);
      url.searchParams.append("album", body.album);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
      });
      const data = await response.json();
      const { album } = data;

      if (!album) {
        return {
          name: "Loading...",
          playedCount: 0,
          url: "",
        };
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
    async ({ body }): Promise<LastFmArtist> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
      url.searchParams.append("api_key", process.env.LASTFM_API_KEY!);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "artist.getInfo");
      url.searchParams.append("artist", body.artist);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
      });
      const data = await response.json();
      const { artist } = data;

      if (!artist) {
        return {
          name: "Loading...",
          playedCount: 0,
          url: "",
        };
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
    async ({ body }): Promise<LastFmTrack> => {
      const url = new URL("http://ws.audioscrobbler.com/2.0/");
      url.searchParams.append("user", `TminatorT`);
      url.searchParams.append("api_key", process.env.LASTFM_API_KEY!);
      url.searchParams.append("format", "json");
      url.searchParams.append("method", "track.getInfo");
      url.searchParams.append("artist", body.artist);
      url.searchParams.append("track", body.track);

      const response = await fetch(url.href, {
        headers: {
          "User-Agent": `Tomo-API/9.0.0 (tomo.uchuu.io)`,
        },
        cache: "no-store",
      });
      const data = await response.json();
      const { track } = data;

      if (!track) {
        return {
          name: "Loading...",
          playedCount: 0,
          url: "",
        };
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
  .get("/latest", async (): Promise<LastFmLatestTrack> => {
    const url = new URL("http://ws.audioscrobbler.com/2.0/");
    url.searchParams.append("user", `TminatorT`);
    url.searchParams.append("api_key", process.env.LASTFM_API_KEY!);
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
  });
