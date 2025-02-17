import { githubRouter } from "./routers/github";
import { lastfmRouter } from "./routers/lastfm";
import { personalRouter } from "./routers/personal";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
  github: githubRouter,
  lastfm: lastfmRouter,
  personal: personalRouter,
});

export type AppRouter = typeof appRouter;
