import type { PageServerLoad } from './$types'
import type { App } from "./api/[...slugs]/+server";

import { treaty } from "@elysiajs/eden"
import { getBaseUrl } from "$lib/utils";
import { VERCEL_AUTOMATION_BYPASS_SECRET } from '$env/static/private';

export const load: PageServerLoad = async () => {
  const app = treaty<App>(getBaseUrl())
  const socials = (await app.api.personal.get({
    headers: {
      'x-vercel-protection-bypass': VERCEL_AUTOMATION_BYPASS_SECRET
    }
  })).data?.contact

  return {
    socials
  }
}
