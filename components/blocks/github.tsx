"use client";

import useSWR from "swr";
import { request } from "graphql-request";
import { Skeleton } from "../ui/skeleton";

import { SiGithub } from "@icons-pack/react-simple-icons";

interface GithubEvent {
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

interface Data {
  github: GithubEvent[];
}

const fetcher = (query: string): Promise<Data> =>
  request(`${window.location.origin}/api/graphql`, query);

const link = (ghevent: GithubEvent) => {
  return `
        <a href='https://github.com/${ghevent.repo.name}' title='View ${ghevent.repo.name} on Github' target='_blank' rel='noopener'>
            ${ghevent.repo.name}
        </a>
    `;
};

const event = (ghevent: GithubEvent) => {
  if (!ghevent?.type) return "No event found";

  if (ghevent.type === "PushEvent") {
    return `Pushed to ${link(ghevent)}`;
  } else if (ghevent.type === "IssueCommentEvent") {
    return `Commented on Issue #${ghevent.payload.issue.number} for ${link(
      ghevent,
    )}`;
  } else if (ghevent.type === "DeleteEvent") {
    return `Deleted ${ghevent.payload.ref_type}`;
  } else if (ghevent.type === "WatchEvent") {
    if (ghevent.payload.action === "watched") {
      return `Watched ${link(ghevent)}`;
    } else if (ghevent.payload.action === "started") {
      return `Stared ${link(ghevent)}`;
    }
  } else if (ghevent.type === "IssuesEvent") {
    if (ghevent.payload.action === "opened") {
      return `Opened issue #${ghevent.payload.issue.number} on ${link(
        ghevent,
      )}`;
    } else if (ghevent.payload.action === "reopened") {
      return `Reopened issue #${ghevent.payload.issue.number} on ${link(
        ghevent,
      )}`;
    } else if (ghevent.payload.action === "closed") {
      return `Closed issue #${ghevent.payload.issue.number} on ${link(
        ghevent,
      )}`;
    }
  } else if (ghevent.type === "CreateEvent") {
    if (ghevent.payload.ref_type === "tag") {
      return `Tagged ${link(ghevent)}`;
    } else if (ghevent.payload.ref_type === "branch") {
      return `Created Branch ${ghevent.payload.ref} on ${link(ghevent)}`;
    } else if (ghevent.payload.ref_type === "repository") {
      return `Created ${ghevent.payload.ref_type}`;
    }
  } else if (ghevent.type === "MemberEvent") {
    if (ghevent.payload.action === "added") {
      return `Added collaborator to ${link(ghevent)}`;
    }
  } else if (ghevent.type === "PublicEvent") {
    return `Made ${link(ghevent)} public`;
  } else if (ghevent.type === "PullRequestEvent") {
    return `Pull Request for ${link(ghevent)}`;
  } else if (ghevent.type === "ForkEvent") {
    return `Forked ${link(ghevent)}`;
  } else if (ghevent.type === "ReleaseEvent") {
    return `Released a package for ${link(ghevent)}`;
  }

  console.log(ghevent.type); // eslint-disable-line
  return `Unknown action for ${link(ghevent)}`;
};

export default function Github() {
  const { data, error, isLoading } = useSWR<Data>(
    `{
      github(limit: 1) {
        payload {
          action
          issue {
            number
          }
          ref
          ref_type
        }
        repo {
          name
        }
        type
      }
    }`,
    fetcher,
  );

  if (data === undefined || isLoading || error)
    return (
      <div className="flex justify-center items-center my-2 text-lg">
        <SiGithub className="flex-none mr-4" />
        <Skeleton className="h-8 flex-grow" />
      </div>
    );

  const { github: ghevents } = data;
  const ghevent = ghevents[0];

  return (
    <div className="flex justify-center items-center my-2 text-lg">
      <SiGithub className="flex-none mr-4" />
      <span dangerouslySetInnerHTML={{ __html: event(ghevent) }} />
    </div>
  );
}
