import { page } from "@vitest/browser/context";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import LanguageToggle from "./language-toggle.svelte";

vi.mock("$lib/paraglide/runtime", () => ({
  getLocale: vi.fn(() => "en"),
  setLocale: vi.fn(),
}));

describe("LanguageToggle component", () => {
  it("should render toggle button", async () => {
    render(LanguageToggle);

    const button = page.getByRole("button");
    await expect.element(button).toBeInTheDocument();
  });

  it("should display language flag emoji", async () => {
    render(LanguageToggle);

    const flag = page.getByText(/🇬🇧|🇯🇵/);
    await expect.element(flag).toBeInTheDocument();
  });

  it("should have outline variant", async () => {
    render(LanguageToggle);

    const button = page.getByRole("button");
    await expect.element(button).toHaveClass(/outline/);
  });

  it("should be clickable", async () => {
    render(LanguageToggle);

    const button = page.getByRole("button");
    await expect.element(button).toBeEnabled();
  });

  it("should have cursor pointer", async () => {
    render(LanguageToggle);

    const button = page.getByRole("button");
    await expect.element(button).toHaveClass(/cursor-pointer/);
  });

  it("should call setLocale when clicked", async () => {
    const { setLocale } = await import("$lib/paraglide/runtime");
    const mockSetLocale = vi.mocked(setLocale);

    render(LanguageToggle);

    const button = page.getByRole("button");
    await button.click();

    expect(mockSetLocale).toHaveBeenCalled();
  });
});
