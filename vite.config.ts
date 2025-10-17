import devtoolsJson from "vite-plugin-devtools-json";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide"
    }),
    devtoolsJson()
  ],
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          environment: "browser",
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }]
          },
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"],
          setupFiles: ["./vitest-setup-client.ts"]
        }
      },
      {
        extends: "./vite.config.ts",
        test: {
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"]
        }
      }
    ]
  }
});
