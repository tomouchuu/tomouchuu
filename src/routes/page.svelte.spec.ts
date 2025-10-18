import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import PageTestWrapper from "../test/PageTestWrapper.svelte";

describe("/+page.svelte", () => {
  it("should render h1 with name", async () => {
    render(PageTestWrapper);

    const heading = page.getByRole("heading", { level: 1 });
    await expect.element(heading).toBeInTheDocument();
  });

  it("should render description paragraph", async () => {
    render(PageTestWrapper);

    const paragraph = page.getByRole("paragraph");
    await expect.element(paragraph).toBeInTheDocument();
  });

  it("should render link to about page", async () => {
    render(PageTestWrapper);

    const link = page.getByRole("link", { name: /about/i });
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "/about");
  });

  it("should render main content section", async () => {
    render(PageTestWrapper);

    const main = page.getByRole("main");
    await expect.element(main).toBeInTheDocument();
  });

  it('should contain a title tag in head', async () => {
    render(PageTestWrapper);

    const titleElement = document.querySelector('title');
    expect(titleElement).toBeTruthy();
  });
});
