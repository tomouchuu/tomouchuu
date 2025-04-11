import { createTRPCClient, httpLink, loggerLink } from "@trpc/client";
import { getRequestEvent } from "solid-js/web";
import { AppRouter } from "~/server/api/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "/";

  const request = getRequestEvent();
  const url = request?.request.url;

  return url ?? `http://localhost:${process.env.PORT ?? 3000}/`;
};

// create the client, export it
export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: () =>
        process.env.NODE_ENV === "development" && typeof window !== "undefined",
    }),
    httpLink({ url: `${getBaseUrl()}api/trpc` }),
  ],
});
