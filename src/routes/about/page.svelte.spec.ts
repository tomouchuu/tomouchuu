import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import About from "./+page.svelte";

describe("/about/+page.svelte", () => {
  it("should render main content section", async () => {
    render(About);

    const main = page.getByRole("main");
    await expect.element(main).toBeInTheDocument();
  });

  it("should render breadcrumb navigation link to home", async () => {
    render(About);

    const homeLink = page.getByRole("link", { name: /home/i });
    await expect.element(homeLink).toBeInTheDocument();
    await expect.element(homeLink).toHaveAttribute("href", "/");
  });
});
