import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import SocialsTestWrapper from "../../../test/SocialsTestWrapper.svelte";

describe("Socials component", () => {
  it("should render github link", async () => {
    render(SocialsTestWrapper);

    const githubLink = page.getByRole("link", { name: /github/i });
    await expect.element(githubLink).toBeInTheDocument();
  });

  it("should render twitter link", async () => {
    render(SocialsTestWrapper);

    const twitterLink = page.getByRole("link", { name: /twitter/i });
    await expect.element(twitterLink).toBeInTheDocument();
  });

  it("should render linkedin link", async () => {
    render(SocialsTestWrapper);

    const linkedinLink = page.getByRole("link", { name: /linkedin/i });
    await expect.element(linkedinLink).toBeInTheDocument();
  });

  it("should render instagram link", async () => {
    render(SocialsTestWrapper);

    const instagramLink = page.getByRole("link", { name: /instagram/i });
    await expect.element(instagramLink).toBeInTheDocument();
  });

  it("should render discord link", async () => {
    render(SocialsTestWrapper);

    const discordLink = page.getByRole("link", { name: /discord/i });
    await expect.element(discordLink).toBeInTheDocument();
  });

  it("should render cv link", async () => {
    render(SocialsTestWrapper);

    const cvLink = page.getByRole("link", { name: /cv/i });
    await expect.element(cvLink).toBeInTheDocument();
  });

  it("should render youtube link", async () => {
    render(SocialsTestWrapper);

    const youtubeLink = page.getByRole("link", { name: /youtube/i });
    await expect.element(youtubeLink).toBeInTheDocument();
  });

  it("should have noopener noreferrer on external links", async () => {
    render(SocialsTestWrapper);

    const twitterLink = page.getByRole("link", { name: /twitter/i });
    await expect.element(twitterLink).toHaveAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

  it("should open cv in new tab", async () => {
    render(SocialsTestWrapper);

    const cvLink = page.getByRole("link", { name: /cv/i });
    await expect.element(cvLink).toHaveAttribute("target", "_blank");
  });
});
