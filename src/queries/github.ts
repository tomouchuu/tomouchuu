import { api } from "~/lib/api";

export const githubQueryOpts = () => ({
  queryKey: ["githubData"],
  queryFn: async () => {
    try {
      return await api.github.event.query();
    } catch (error) {
      console.error(error);
    }
  },
  staleTime: 1000 * 60 * 10, // 10 minutes
  throwOnError: false,
  placeholderData: {
    payload: {
      action: "Loading...",
      issue: {
        number: "Loading...",
      },
      ref: "Loading...",
      ref_type: "Loading...",
    },
    repo: {
      name: "Loading...",
    },
    type: "Loading...",
  },
});
