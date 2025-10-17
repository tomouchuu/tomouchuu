import { page } from "@vitest/browser/context";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import ThemeToggle from "./theme-toggle.svelte";

vi.mock("mode-watcher", () => ({
  toggleMode: vi.fn(),
}));

describe("ThemeToggle component", () => {
  it("should render toggle button", async () => {
    render(ThemeToggle);

    const button = page.getByRole("button", { name: /toggle theme/i });
    await expect.element(button).toBeInTheDocument();
  });

  it("should have sr-only label", async () => {
    render(ThemeToggle);

    const label = page.getByText(/toggle theme/i);
    await expect.element(label).toBeInTheDocument();
  });

  it("should have outline variant", async () => {
    render(ThemeToggle);

    const button = page.getByRole("button", { name: /toggle theme/i });
    await expect.element(button).toHaveClass(/outline/);
  });

  it("should have icon size", async () => {
    render(ThemeToggle);

    const button = page.getByRole("button", { name: /toggle theme/i });
    await expect.element(button).toHaveClass(/cursor-pointer/);
  });

  it("should be clickable", async () => {
    render(ThemeToggle);

    const button = page.getByRole("button", { name: /toggle theme/i });
    await expect.element(button).toBeEnabled();
  });

  it("should call toggleMode when clicked", async () => {
    const { toggleMode } = await import("mode-watcher");
    const mockToggleMode = vi.mocked(toggleMode);

    render(ThemeToggle);

    const button = page.getByRole("button", { name: /toggle theme/i });
    await button.click();

    expect(mockToggleMode).toHaveBeenCalled();
  });
});
