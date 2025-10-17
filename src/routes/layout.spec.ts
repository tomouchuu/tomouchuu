import { describe, it, expect, vi } from "vitest";
import { load } from "./+layout";
import { QueryClient } from "@tanstack/svelte-query";

vi.mock("$app/environment", () => ({
  browser: true,
  dev: false,
}));

vi.mock("@vercel/analytics/sveltekit", () => ({
  injectAnalytics: vi.fn(),
}));

vi.mock("@vercel/speed-insights/sveltekit", () => ({
  injectSpeedInsights: vi.fn(),
}));

describe("+layout.ts", () => {
  it("should create and return QueryClient", () => {
    const result = (load({} as any) as unknown as { queryClient: QueryClient }).queryClient;

    expect(result).toBeInstanceOf(QueryClient);
  });

  it("should configure QueryClient with browser mode", () => {
    const result = (load({} as any) as unknown as { queryClient: QueryClient }).queryClient;

    expect(result.getDefaultOptions().queries).toEqual(
      expect.objectContaining({
        enabled: true,
        staleTime: 60 * 1000,
      })
    );
  });

  it("should set staleTime to 60 seconds", () => {
    const result = (load({} as any) as unknown as { queryClient: QueryClient }).queryClient;
    const options = result.getDefaultOptions();

    expect(options.queries?.staleTime).toBe(60 * 1000);
  });

  it("should configure queries with enabled property", () => {
    const result = (load({} as any) as unknown as { queryClient: QueryClient }).queryClient;
    const options = result.getDefaultOptions();

    expect(options.queries?.enabled).toBe(true);
  });
});
