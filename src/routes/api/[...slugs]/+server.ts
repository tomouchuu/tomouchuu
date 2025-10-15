import { Elysia } from 'elysia';
import { lastfm } from './lastfm';
import { personal } from './personal';

const app = new Elysia({ prefix: '/api' }).use(personal).use(lastfm);

export type App = typeof app

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

export const fallback: RequestHandler = ({ request }) => app.handle(request)
