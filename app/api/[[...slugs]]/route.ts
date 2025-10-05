// app/api/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { personal } from "@/api/[[...slugs]]/personal";
import { lastfm } from "@/api/[[...slugs]]/lastfm";

const app = new Elysia({ prefix: "/api" }).use(personal).use(lastfm);

export const GET = app.handle;
export const POST = app.handle;

export type App = typeof app;
