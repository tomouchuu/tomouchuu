import { app } from "$lib/server/api";

export type App = typeof app;

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const fallback: RequestHandler = ({ request }) => app.handle(request);
