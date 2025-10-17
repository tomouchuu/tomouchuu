import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import PageTestWrapper from "../test/PageTestWrapper.svelte";

describe("/+page.svelte", () => {
  it("should render h1", async () => {
    render(PageTestWrapper);

    const heading = page.getByRole("heading", { level: 1 });
    await expect.element(heading).toBeInTheDocument();
  });
});
