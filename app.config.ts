import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    preset: "cloudflare_module",
    compatibilityDate: "2025-04-10",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
