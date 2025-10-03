// app/api/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { personal } from "@/api/[[...slugs]]/personal";

const app = new Elysia({ prefix: "/api" })
  .use(personal)
  .get("/", () => "hello Next")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

export const GET = app.handle;
export const POST = app.handle;

export type App = typeof app;
