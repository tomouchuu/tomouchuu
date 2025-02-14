import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "~/server/api/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.NODE_ENV === "production") return "https://tomo.uchuu.io";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// create the client, export it
export const api = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
});
