import { exampleRouter } from "./routers/example";
import { lastfmRouter } from "./routers/lastfm";
import { personalRouter } from "./routers/personal";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  lastfm: lastfmRouter,
  personal: personalRouter,
});

export type AppRouter = typeof appRouter;
