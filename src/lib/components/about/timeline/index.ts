import { browser } from "$app/environment";
import { getBaseUrl } from "$lib/utils";

export type WorkItem = {
  company: string;
  date: string;
  description: string;
  title: string;
  url: string;
};

export type PersonalData = {
  name: string;
  location: string;
  based: string;
  contact: Record<string, string>;
  work: WorkItem[];
};

export async function fetchPersonalData(): Promise<PersonalData> {
  const base = getBaseUrl();

  let headers: Record<string, string> = {};
  if (!browser) {
    headers = {
      "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
    };
  }

  const resp = await fetch(`${base}api/personal`, { headers });
  if (!resp.ok) throw new Error("Failed to fetch personal data");
  return (await resp.json()) as PersonalData;
}
