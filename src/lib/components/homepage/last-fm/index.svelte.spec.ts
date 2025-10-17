import { page } from "@vitest/browser/context";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-svelte";
import LastFm from "./index.svelte";

vi.mock("./index.js", () => ({
  fetchLastfmData: vi.fn().mockResolvedValue({
    track: {
      name: "Test Track",
      playedCount: 42,
      url: "https://last.fm/music/track",
    },
    artist: {
      name: "Test Artist",
      playedCount: 25,
      url: "https://last.fm/music/artist",
    },
    album: {
      name: "Test Album",
      playedCount: 10,
      url: "https://last.fm/music/album",
    },
    isLive: false,
  }),
}));

vi.mock("@tanstack/svelte-query", () => ({
  createQuery: vi.fn(() => ({
    data: {
      track: {
        name: "Test Track",
        playedCount: 42,
        url: "https://last.fm/music/track",
      },
      artist: {
        name: "Test Artist",
        playedCount: 25,
        url: "https://last.fm/music/artist",
      },
      album: {
        name: "Test Album",
        playedCount: 10,
        url: "https://last.fm/music/album",
      },
      isLive: false,
    },
    status: "success",
  })),
}));

describe("LastFm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render container with content", async () => {
    render(LastFm);

    const paragraph = page.getByRole("paragraph");
    await expect.element(paragraph).toBeInTheDocument();
  });

  it("should display track name as link", async () => {
    render(LastFm);

    const trackLink = page.getByRole("link", { name: /test track/i });
    await expect.element(trackLink).toBeInTheDocument();
    await expect.element(trackLink).toHaveAttribute(
      "href",
      "https://last.fm/music/track"
    );
  });

  it("should display artist name as link", async () => {
    render(LastFm);

    const artistLink = page.getByRole("link", { name: /test artist/i });
    await expect.element(artistLink).toBeInTheDocument();
    await expect.element(artistLink).toHaveAttribute(
      "href",
      "https://last.fm/music/artist"
    );
  });

  it("should display album name as link", async () => {
    render(LastFm);

    const albumLink = page.getByRole("link", { name: /test album/i });
    await expect.element(albumLink).toBeInTheDocument();
    await expect.element(albumLink).toHaveAttribute(
      "href",
      "https://last.fm/music/album"
    );
  });

  it("should display play count with ordinal", async () => {
    render(LastFm);

    const text = page.getByText(/42nd/);
    await expect.element(text).toBeInTheDocument();
  });

  it("should display correct ordinal for 1", async () => {
    const { createQuery } = await import("@tanstack/svelte-query");
    vi.mocked(createQuery).mockReturnValueOnce({
      data: {
        track: { name: "Track", playedCount: 1, url: "https://last.fm" },
        artist: { name: "Artist", playedCount: 0, url: "https://last.fm" },
        album: { name: "Album", playedCount: 0, url: "https://last.fm" },
      },
      status: "success",
    } as any);

    render(LastFm);

    const text = page.getByText(/1st/);
    await expect.element(text).toBeInTheDocument();
  });

  it("should display correct ordinal for 2", async () => {
    const { createQuery } = await import("@tanstack/svelte-query");
    vi.mocked(createQuery).mockReturnValueOnce({
      data: {
        track: { name: "Track", playedCount: 2, url: "https://last.fm" },
        artist: { name: "Artist", playedCount: 0, url: "https://last.fm" },
        album: { name: "Album", playedCount: 0, url: "https://last.fm" },
      },
      status: "success",
    } as any);

    render(LastFm);

    const text = page.getByText(/2nd/);
    await expect.element(text).toBeInTheDocument();
  });

  it("should display correct ordinal for 3", async () => {
    const { createQuery } = await import("@tanstack/svelte-query");
    vi.mocked(createQuery).mockReturnValueOnce({
      data: {
        track: { name: "Track", playedCount: 3, url: "https://last.fm" },
        artist: { name: "Artist", playedCount: 0, url: "https://last.fm" },
        album: { name: "Album", playedCount: 0, url: "https://last.fm" },
      },
      status: "success",
    } as any);

    render(LastFm);

    const text = page.getByText(/3rd/);
    await expect.element(text).toBeInTheDocument();
  });

  it("should display isLive indicator when track is live", async () => {
    const { createQuery } = await import("@tanstack/svelte-query");
    vi.mocked(createQuery).mockReturnValueOnce({
      data: {
        track: { name: "Track", playedCount: 5, url: "https://last.fm" },
        artist: { name: "Artist", playedCount: 0, url: "https://last.fm" },
        album: { name: "Album", playedCount: 0, url: "https://last.fm" },
        isLive: true,
      },
      status: "success",
    } as any);

    render(LastFm);

    const liveText = page.getByText(/right now/);
    await expect.element(liveText).toBeInTheDocument();
  });

  it("should have noopener on external links", async () => {
    render(LastFm);

    const trackLink = page.getByRole("link", { name: /test track/i });
    await expect.element(trackLink).toHaveAttribute("rel", "noopener");
  });

  it("should open links in new tab", async () => {
    render(LastFm);

    const trackLink = page.getByRole("link", { name: /test track/i });
    await expect.element(trackLink).toHaveAttribute("target", "_blank");
  });

  it("should display default play count of 1 when zero", async () => {
    const { createQuery } = await import("@tanstack/svelte-query");
    vi.mocked(createQuery).mockReturnValueOnce({
      data: {
        track: { name: "Track", playedCount: 0, url: "https://last.fm" },
        artist: { name: "Artist", playedCount: 0, url: "https://last.fm" },
        album: { name: "Album", playedCount: 0, url: "https://last.fm" },
      },
      status: "success",
    } as any);

    render(LastFm);

    const text = page.getByText(/1st/);
    await expect.element(text).toBeInTheDocument();
  });
});
