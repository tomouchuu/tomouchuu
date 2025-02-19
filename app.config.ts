import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    preset: "aws-lambda",
    awsLambda: {
      streaming: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
