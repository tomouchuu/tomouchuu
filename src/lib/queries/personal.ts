import { getApp } from "$lib/queries/index";

export type WorkItem = {
  company: string;
  date: string;
  description: string;
  title: string;
  url: string;
};

export type PersonalData = {
  name: string;
  image: string;
  status: "online" | "idle" | "dnd" | "offline";
  location: string;
  contact: Record<string, string>;
  work: WorkItem[];
};

export async function fetchPersonalData(
  baseUrl?: string,
  fetcher?: typeof globalThis.fetch,
): Promise<PersonalData> {
  const app = getApp(baseUrl, fetcher);
  const resp = await app.api.personal.get();

  return resp.data as PersonalData;
}
