import { describe, it, expect, vi, beforeEach } from "vitest";
import { load } from "./+page";
import { QueryClient } from "@tanstack/svelte-query";

vi.mock("$lib/components/homepage/last-fm/index.js", () => ({
  fetchLastfmData: vi.fn().mockResolvedValue([]),
}));

vi.mock("@elysiajs/eden", () => ({
  treaty: vi.fn(() => ({
    api: {
      personal: {
        get: vi.fn().mockResolvedValue({
          data: {
            contact: {
              email: "test@example.com",
              twitter: "https://twitter.com/test",
              github: "https://github.com/test",
              instagram: "https://instagram.com/test",
              applemusic: "https://music.apple.com/test",
              lastfm: "https://last.fm/user/test",
              discord: "discord:test",
              youtube: "https://youtube.com/@test",
              twitch: "https://twitch.tv/test",
              linkedin: "https://linkedin.com/in/test",
              cv: "https://example.com/cv.pdf",
            },
          },
        }),
      },
    },
  })),
}));

describe("+page.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return socials from API", async () => {
    const queryClient = new QueryClient();
    const result = (await load({
      parent: async () => ({ queryClient }),
    } as any)) as { socials: any };

    expect(result.socials).toEqual(
      expect.objectContaining({
        email: "test@example.com",
        twitter: "https://twitter.com/test",
        github: "https://github.com/test",
      })
    );
  });

  it("should prefetch lastfm query", async () => {
    const queryClient = new QueryClient();
    const prefetchSpy = vi.spyOn(queryClient, "prefetchQuery");

    await load({
      parent: async () => ({ queryClient }),
    } as any);

    expect(prefetchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["lastfm"],
        queryFn: expect.any(Function),
      })
    );
  });

  it("should handle API errors gracefully", async () => {
    const { treaty } = await import("@elysiajs/eden");
    vi.mocked(treaty).mockReturnValueOnce({
      api: {
        personal: {
          get: vi.fn().mockResolvedValue({ data: null }),
        },
      },
    } as any);

    const queryClient = new QueryClient();
    const result = (await load({
      parent: async () => ({ queryClient }),
    } as any)) as { socials: any };

    expect(result.socials).toBeUndefined();
  });
});
