import { exampleRouter } from "./routers/example";
import { lastfmRouter } from "./routers/lastfm";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  lastfm: lastfmRouter,
});

export type AppRouter = typeof appRouter;
