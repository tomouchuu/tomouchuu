import { describe, it, expect, vi, beforeEach } from "vitest";
import { load } from "./+page";
import { QueryClient } from "@tanstack/svelte-query";

vi.mock("$lib/components/homepage/last-fm/index.js", () => ({
  fetchLastfmData: vi.fn().mockResolvedValue([]),
}));

describe("+page.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
});
