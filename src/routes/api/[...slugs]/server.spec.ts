import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "$lib/server/api";

describe("API server", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles a request without compiling routes at request time", async () => {
    // Build the request before stubbing `Function`: Node lazily loads its bundled
    // undici on first `Request` access, and undici reads `Function.prototype`.
    const request = new Request("http://localhost/api/lastfm/album", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });

    vi.stubGlobal("Function", () => {
      throw new EvalError("Code generation from strings disallowed for this context");
    });

    const response = await app.handle(request);

    expect(response.status, await response.text()).toBe(422);
  });
});
