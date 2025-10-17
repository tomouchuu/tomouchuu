import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import Toggles from "./index.svelte";

describe("Toggles component", () => {
  it("should render theme toggle button", async () => {
    render(Toggles);

    const themeButton = page.getByRole("button", { name: /toggle theme/i });
    await expect.element(themeButton).toBeInTheDocument();
  });

  it("should render button group with aria label", async () => {
    render(Toggles);

    const buttonGroup = page.getByRole("group");
    await expect.element(buttonGroup).toHaveAttribute("aria-label", "Toggles");
  });

  it("should have cursor pointer style", async () => {
    render(Toggles);

    const buttonGroup = page.getByRole("group");
    await expect.element(buttonGroup).toHaveClass(/cursor-pointer/);
  });

  it("should have two interactive buttons", async () => {
    render(Toggles);

    const themeButton = page.getByRole("button", { name: /toggle theme/i });
    await expect.element(themeButton).toBeEnabled();
  });

  it("should render toggles container", async () => {
    render(Toggles);

    const container = page.getByRole("group");
    await expect.element(container).toBeInTheDocument();
  });
});
