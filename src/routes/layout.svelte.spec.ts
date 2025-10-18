import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import LayoutTestWrapper from "../test/LayoutTestWrapper.svelte";

describe("+layout.svelte", () => {
  it("should render footer contentinfo element", async () => {
    render(LayoutTestWrapper);

    const footer = page.getByRole("contentinfo");
    await expect.element(footer).toBeInTheDocument();
  });

  it("should render footer link to uchuu.dev", async () => {
    render(LayoutTestWrapper);

    const link = page.getByRole("link", { name: /uchuu/i });
    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "https://uchuu.dev");
  });

  it("should render children content in layout", async () => {
    render(LayoutTestWrapper);

    const testChild = page.getByText("Test Child Content");
    await expect.element(testChild).toBeInTheDocument();
  });

  it('should contain meta description tag in head', async () => {
    render(LayoutTestWrapper);

    const descriptionMeta = page.getByTestId('meta-description');
    await expect.element(descriptionMeta).toBeInTheDocument();
  });

  it('should contain a favicon link tag in head', async () => {
    render(LayoutTestWrapper);

    const faviconEl = page.getByTestId('favicon');
    await expect.element(faviconEl).toBeInTheDocument();
  });
});
