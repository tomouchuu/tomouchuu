import { Dynamic } from "solid-js/web";

import GithubEvents from "./events";
import { Github as GithubIcon } from "~/components/socials/icons/github";
import { Skeleton } from "~/components/ui/skeleton";

import type { GithubEvent } from "~/server/api/routers/github";

type GithubEvents = keyof typeof GithubEvents;

interface Props {
  data?: GithubEvent;
}

export function GithubError() {
  return (
    <div class="flex justify-center items-center my-2 text-lg w-full">
      <GithubIcon class="flex-none mr-4" />
      <p>Could not load github data</p>
    </div>
  );
}

export function GithubLoading() {
  return (
    <div class="flex justify-center items-center my-2 text-lg w-full">
      <GithubIcon class="flex-none mr-4" />
      <Skeleton class="h-8 rounded-lg flex-grow" style={{ height: "" }} />
    </div>
  );
}

export function Github(props: Props) {
  if (props.data === undefined) return;
  const ghevent = props.data;
  const gheventType = ghevent.type as GithubEvents;

  return (
    <div class="flex justify-center items-center my-2 text-lg">
      <GithubIcon class="flex-none mr-4" />
      <Dynamic component={GithubEvents[gheventType]} ghevent={ghevent} />
    </div>
  );
}

export default Github;
