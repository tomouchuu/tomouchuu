import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchLastfmData } from '$lib/queries/last-fm';

vi.mock("$lib/utils", () => ({
  getBaseUrl: vi.fn(() => "http://localhost:3000/"),
}));

vi.mock("@elysiajs/eden", () => ({
  treaty: vi.fn(() => ({
    api: {
      lastfm: {
        latest: {
          get: vi.fn().mockResolvedValue({
            data: {
              artist: "Test Artist",
              album: "Test Album",
              track: "Test Track",
              isLive: false,
            },
          }),
        },
        album: {
          post: vi.fn().mockResolvedValue({
            data: {
              name: "Test Album",
              playedCount: 10,
              url: "https://last.fm/music/Test",
            },
          }),
        },
        artist: {
          post: vi.fn().mockResolvedValue({
            data: {
              name: "Test Artist",
              playedCount: 25,
              url: "https://last.fm/music/Test+Artist",
            },
          }),
        },
        track: {
          post: vi.fn().mockResolvedValue({
            data: {
              name: "Test Track",
              playedCount: 42,
              url: "https://last.fm/music/Test+Artist/_/Test+Track",
            },
          }),
        },
      },
    },
  })),
}));

describe("fetchLastfmData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return complete LastfmResult", async () => {
    const result = await fetchLastfmData();

    expect(result).toHaveProperty("album");
    expect(result).toHaveProperty("artist");
    expect(result).toHaveProperty("track");
    expect(result).toHaveProperty("isLive");
  });

  it("should have correct album data structure", async () => {
    const result = await fetchLastfmData();

    expect(result.album).toEqual({
      name: "Test Album",
      playedCount: 10,
      url: "https://last.fm/music/Test",
    });
  });

  it("should have correct artist data structure", async () => {
    const result = await fetchLastfmData();

    expect(result.artist).toEqual({
      name: "Test Artist",
      playedCount: 25,
      url: "https://last.fm/music/Test+Artist",
    });
  });

  it("should have correct track data structure", async () => {
    const result = await fetchLastfmData();

    expect(result.track).toEqual({
      name: "Test Track",
      playedCount: 42,
      url: "https://last.fm/music/Test+Artist/_/Test+Track",
    });
  });

  it("should preserve isLive status", async () => {
    const result = await fetchLastfmData();

    expect(result.isLive).toBe(false);
  });

  it("should handle isLive true status", async () => {
    const { treaty } = await import("@elysiajs/eden");
    vi.mocked(treaty).mockReturnValueOnce({
      api: {
        lastfm: {
          latest: {
            get: vi.fn().mockResolvedValue({
              data: {
                artist: "Artist",
                album: "Album",
                track: "Track",
                isLive: true,
              },
            }),
          },
          album: {
            post: vi.fn().mockResolvedValue({
              data: { name: "Album", playedCount: 0, url: "https://last.fm" },
            }),
          },
          artist: {
            post: vi.fn().mockResolvedValue({
              data: { name: "Artist", playedCount: 0, url: "https://last.fm" },
            }),
          },
          track: {
            post: vi.fn().mockResolvedValue({
              data: { name: "Track", playedCount: 0, url: "https://last.fm" },
            }),
          },
        },
      },
    } as any);

    const result = await fetchLastfmData();

    expect(result.isLive).toBe(true);
  });
});
