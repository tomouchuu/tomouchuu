import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../utils";

export interface GithubEvent {
  payload: {
    action: string;
    issue: {
      number: string;
    };
    ref: string;
    ref_type: string;
  };
  repo: {
    name: string;
  };
  type: string;
}

export const githubRouter = createTRPCRouter({
  event: publicProcedure.query(async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/tomouchuu/events?per_page=1`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "tomouchuu",
          },
        },
      );

      const json = await response.json();
      const event = json[0];

      if (!event) {
        return {
          payload: {
            action: "no-events",
            issue: {
              number: "0",
            },
            ref: "no-events",
            ref_type: "no-events",
          },
          repo: {
            name: "no-events",
          },
          type: "no-events",
        };
      }

      return event as GithubEvent;
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not load github data",
      });
    }
  }),
});
