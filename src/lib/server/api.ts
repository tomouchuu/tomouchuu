import { Elysia } from "elysia";
import { lastfm } from "../../routes/api/[...slugs]/lastfm";
import { personal } from "../../routes/api/[...slugs]/personal";

export const app = new Elysia({
  aot: false,
  normalize: "typebox",
  prefix: "/api",
})
  .use(personal)
  .use(lastfm);
