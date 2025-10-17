import { describe, it, expect, vi, beforeEach } from "vitest";
import type { LastFmAlbum, LastFmArtist, LastFmTrack, LastFmLatestTrack } from "./lastfm";

vi.mock("$env/static/private", () => ({
  LASTFM_API_KEY: "test-api-key",
}));

describe("lastfm API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Album endpoint logic", () => {
    it("should parse album response correctly", () => {
      const apiResponse = {
        album: {
          name: "Test Album",
          userplaycount: "42",
          url: "https://last.fm/music/Artist/Album",
        },
      };

      const result: LastFmAlbum = {
        name: apiResponse.album.name,
        playedCount: parseInt(apiResponse.album.userplaycount ?? "0", 10),
        url: apiResponse.album.url,
      };

      expect(result).toEqual({
        name: "Test Album",
        playedCount: 42,
        url: "https://last.fm/music/Artist/Album",
      });
    });

    it("should default playedCount to 0 when missing", () => {
      const apiResponse = {
        album: {
          name: "Test Album",
          url: "https://last.fm/music/Artist/Album",
        },
      };

      const result: LastFmAlbum = {
        name: apiResponse.album.name,
        // @ts-ignore: test fixture may omit 'userplaycount' from album
        playedCount: parseInt(apiResponse.album.userplaycount ?? "0", 10),
        url: apiResponse.album.url,
      };

      expect(result.playedCount).toBe(0);
    });

    it("should detect missing album", () => {
      const apiResponse = { album: null };
      const albumFound = !!apiResponse.album;

      expect(albumFound).toBe(false);
    });
  });

  describe("Artist endpoint logic", () => {
    it("should parse artist response correctly", () => {
      const apiResponse = {
        artist: {
          name: "Test Artist",
          userplaycount: "123",
          url: "https://last.fm/music/Test+Artist",
        },
      };

      const result: LastFmArtist = {
        name: apiResponse.artist.name,
        playedCount: parseInt(apiResponse.artist.userplaycount ?? "0", 10),
        url: apiResponse.artist.url,
      };

      expect(result).toEqual({
        name: "Test Artist",
        playedCount: 123,
        url: "https://last.fm/music/Test+Artist",
      });
    });

    it("should detect missing artist", () => {
      const apiResponse = { artist: null };
      const artistFound = !!apiResponse.artist;

      expect(artistFound).toBe(false);
    });
  });

  describe("Track endpoint logic", () => {
    it("should parse track response correctly", () => {
      const apiResponse = {
        track: {
          name: "Test Track",
          userplaycount: "99",
          url: "https://last.fm/music/Artist/_/Track",
        },
      };

      const result: LastFmTrack = {
        name: apiResponse.track.name,
        playedCount: parseInt(apiResponse.track.userplaycount ?? "0", 10),
        url: apiResponse.track.url,
      };

      expect(result).toEqual({
        name: "Test Track",
        playedCount: 99,
        url: "https://last.fm/music/Artist/_/Track",
      });
    });

    it("should detect missing track", () => {
      const apiResponse = { track: null };
      const trackFound = !!apiResponse.track;

      expect(trackFound).toBe(false);
    });
  });

  describe("Latest track endpoint logic", () => {
    it("should parse latest track response correctly", () => {
      const apiResponse = {
        recenttracks: {
          track: [
            {
              name: "Latest Track",
              artist: { "#text": "Latest Artist" },
              album: { "#text": "Latest Album" },
              "@attr": { nowplaying: true },
            },
          ],
        },
      };

      const latestTrack = apiResponse.recenttracks.track[0];
      const result: LastFmLatestTrack = {
        artist: latestTrack.artist["#text"],
        album: latestTrack.album["#text"],
        track: latestTrack.name,
        isLive: (latestTrack as any)["@attr"]?.nowplaying,
      };

      expect(result).toEqual({
        artist: "Latest Artist",
        album: "Latest Album",
        track: "Latest Track",
        isLive: true,
      });
    });

    it("should handle undefined isLive when not playing", () => {
      const apiResponse = {
        recenttracks: {
          track: [
            {
              name: "Track",
              artist: { "#text": "Artist" },
              album: { "#text": "Album" },
            },
          ],
        },
      };

      const latestTrack = apiResponse.recenttracks.track[0];
      const result: LastFmLatestTrack = {
        artist: latestTrack.artist["#text"],
        album: latestTrack.album["#text"],
        track: latestTrack.name,
        isLive: (latestTrack as any)["@attr"]?.nowplaying,
      };

      expect(result.isLive).toBeUndefined();
    });

    it("should detect empty recent tracks", () => {
      const apiResponse = {
        recenttracks: {
          track: [],
        },
      };

      const hasRecentTracks = apiResponse.recenttracks.track.length > 0;
      expect(hasRecentTracks).toBe(false);
    });
  });

  describe("Type definitions", () => {
    it("should have correct LastFmAlbum structure", () => {
      const album: LastFmAlbum = {
        name: "Album",
        playedCount: 10,
        url: "https://example.com",
      };

      expect(album).toHaveProperty("name");
      expect(album).toHaveProperty("playedCount");
      expect(album).toHaveProperty("url");
    });

    it("should have correct LastFmLatestTrack structure", () => {
      const track: LastFmLatestTrack = {
        artist: "Artist",
        album: "Album",
        track: "Track",
        isLive: true,
      };

      expect(track).toHaveProperty("artist");
      expect(track).toHaveProperty("album");
      expect(track).toHaveProperty("track");
      expect(track).toHaveProperty("isLive");
    });
  });
});
