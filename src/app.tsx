import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Tomo@Uchuu</Title>

          <div class="flex min-h-screen flex-col items-center justify-center gap-4">
            <Suspense>{props.children}</Suspense>
            <footer class="text-center text-xs min-w-36">
              {/* <Separator /> */}
              <p class="mt-4">トー マス＠宇宙</p>
            </footer>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
