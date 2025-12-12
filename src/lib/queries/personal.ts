import { browser } from "$app/environment";
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

export async function fetchPersonalData(): Promise<PersonalData> {
  const app = getApp();

  let headers = {};
  if (!browser) {
    headers = {
      'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
    };
  }

  const resp = (await app.api.personal.get({
    headers: headers,
  }));

  return resp.data as PersonalData;
}
