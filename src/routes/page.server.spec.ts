import { describe, it, expect, vi, beforeEach } from "vitest";
import { load } from "./+page.server";

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
    const result = (await load({} as any) as { socials: any });

    expect(result.socials).toEqual(
      expect.objectContaining({
        email: "test@example.com",
        twitter: "https://twitter.com/test",
        github: "https://github.com/test",
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

    const result = (await load({} as any)) as { socials: any };

    expect(result.socials).toBeUndefined();
  });
});
