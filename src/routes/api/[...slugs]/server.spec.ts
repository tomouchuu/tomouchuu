import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "$lib/server/api";

describe("API server", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles a request without compiling routes at request time", async () => {
    vi.stubGlobal("Function", () => {
      throw new EvalError("Code generation from strings disallowed for this context");
    });

    const response = await app.handle(
      new Request("http://localhost/api/lastfm/album", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status, await response.text()).toBe(422);
  });
});
