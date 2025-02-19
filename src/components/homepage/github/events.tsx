import type { GithubEvent } from "~/server/api/routers/github";

function GithubLink({ repo }: { repo: string }) {
  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      title={`View ${repo} on Github`}
    >
      {repo}
    </a>
  );
}

function GithubCreateEvent({ ghevent }: { ghevent: GithubEvent }) {
  if (ghevent.payload.action === "branch") {
    return (
      <p>
        Created Branch #{ghevent.payload.ref} on{" "}
        <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  if (ghevent.payload.action === "repository") {
    return <p>Created #{ghevent.payload.ref_type}</p>;
  }

  if (ghevent.payload.action === "tag") {
    return (
      <p>
        Tagged <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  console.log(ghevent, "MysteryCreateEvent");
  return (
    <p>
      MysteryCreateEvent for <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubDeleteEvent({ ghevent }: { ghevent: GithubEvent }) {
  return <p>Deleted {ghevent.payload.ref_type}</p>;
}

function GithubForkEvent({ ghevent }: { ghevent: GithubEvent }) {
  return (
    <p>
      Forked <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubIssueCommentEvent({ ghevent }: { ghevent: GithubEvent }) {
  return (
    <p>
      Commented on Issue #{ghevent.payload.issue.number} for{" "}
      <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubIssueEvent({ ghevent }: { ghevent: GithubEvent }) {
  if (ghevent.payload.action === "opened") {
    return (
      <p>
        Opened issue #{ghevent.payload.issue.number} on{" "}
        <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  if (ghevent.payload.action === "reopened") {
    return (
      <p>
        Reopened issue #{ghevent.payload.issue.number} on{" "}
        <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  if (ghevent.payload.action === "closed") {
    return (
      <p>
        Closed issue #{ghevent.payload.issue.number} on{" "}
        <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  console.log(ghevent, "MysteryIssueEvent");
  return (
    <p>
      MysteryIssueEvent #{ghevent.payload.issue.number} for{" "}
      <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubMemberEvent({ ghevent }: { ghevent: GithubEvent }) {
  if (ghevent.payload.action === "added") {
    return (
      <p>
        Added collaborator to <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  console.log(ghevent, "MysteryMemberEvent");
  return (
    <p>
      MysteryMemberEvent for <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubPublicEvent({ ghevent }: { ghevent: GithubEvent }) {
  return (
    <p>
      Made <GithubLink repo={ghevent.repo.name} /> public
    </p>
  );
}

function GithubPullRequestEvent({ ghevent }: { ghevent: GithubEvent }) {
  return (
    <p>
      PR for <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubPushEvent({ ghevent }: { ghevent: GithubEvent }) {
  return (
    <p>
      Pushed to <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

function GithubReleaseEvent({ ghevent }: { ghevent: GithubEvent }) {
  return (
    <p>
      Released a package for <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

export function GithubWatchEvent({ ghevent }: { ghevent: GithubEvent }) {
  if (ghevent.payload.action === "watched") {
    return (
      <p>
        Watched <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  if (ghevent.payload.action === "stared") {
    return (
      <p>
        Stared <GithubLink repo={ghevent.repo.name} />
      </p>
    );
  }

  console.log(ghevent, "MysteryWatchEvent");
  return (
    <p>
      MysteryWatchEvent <GithubLink repo={ghevent.repo.name} />
    </p>
  );
}

const GithubEvents = {
  CreateEvent: GithubCreateEvent,
  DeleteEvent: GithubDeleteEvent,
  ForkEvent: GithubForkEvent,
  IssueCommentEvent: GithubIssueCommentEvent,
  IssueEvent: GithubIssueEvent,
  MemberEvent: GithubMemberEvent,
  PublicEvent: GithubPublicEvent,
  PullRequestEvent: GithubPullRequestEvent,
  PushEvent: GithubPushEvent,
  ReleaseEvent: GithubReleaseEvent,
  WatchEvent: GithubWatchEvent,
};

export default GithubEvents;
