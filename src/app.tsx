import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { isServer } from "solid-js/web";

import { QueryClientProvider, QueryClient } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

import {
  ColorModeProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
} from "@kobalte/core";
import { getCookie } from "vinxi/http";

import ThemeToggle from "~/components/theme-toggle";
import { Separator } from "~/components/ui/separator";
import "./app.css";

function getServerCookies() {
  "use server";
  const colorMode = getCookie("kb-color-mode");
  return colorMode ? `kb-color-mode=${colorMode}` : "";
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

export default function App() {
  const storageManager = cookieStorageManagerSSR(
    isServer ? getServerCookies() : document.cookie,
  );

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <QueryClientProvider client={client}>
            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
              <Title>Tomo@Uchuu</Title>

              <ThemeToggle />

              <div class="flex min-h-screen flex-col items-center justify-center gap-4">
                <Suspense>{props.children}</Suspense>
                <footer class="text-center text-xs min-w-36">
                  <Separator />
                  <p class="mt-4">
                    トーマス＠
                    <a href="https://uchuu.io" class="hover:underline">
                      宇宙
                    </a>
                  </p>
                </footer>
              </div>
            </ColorModeProvider>

            <SolidQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
