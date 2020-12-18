function link(ghevent) {
    return `
        <a href='https://github.com/${ghevent.repo.name}' title='View ${ghevent.repo.name} on Github' target='_blank'>
            ${ghevent.repo.name}
        </a>
    `
}

function event(ghevent) {
    if (ghevent.type === 'PushEvent') {
        return `Pushed to ${link(ghevent)}`;
    } else if (ghevent.type === 'IssueCommentEvent') {
        return `Commented on Issue #${ghevent.payload.issue.number} for ${link(ghevent)}`;
    } else if (ghevent.type === 'DeleteEvent') {
        return 'Deleted';
    } else if (ghevent.type === 'WatchEvent') {
        if (ghevent.payload.action === 'watched') {
            return `Watched ${link(ghevent)}`;
        } else if (ghevent.payload.action === 'started') {
            return `Stared ${link(ghevent)}`;
        }
    } else if (ghevent.type === 'IssuesEvent') {
        if (ghevent.payload.action === 'opened') {
            return `Opened issue #${ghevent.payload.issue.number} on ${link(ghevent)}`;
        } else if (ghevent.payload.action === 'reopened') {
            return `Reopened issue #${ghevent.payload.issue.number} on ${link(ghevent)}`;
        } else if (ghevent.payload.action === 'closed') {
            return `Closed issue #${ghevent.payload.issue.number} on ${link(ghevent)}`;
        }
    } else if (ghevent.type === 'CreateEvent') {
        if (ghevent.payload.ref_type === 'tag') {
            return `Tagged ${link(ghevent)}`;
        } else if (ghevent.payload.ref_type === 'branch') {
            return `Created Branch ${ghevent.payload.ref} on ${link(ghevent)}`;
        } else if (ghevent.payload.ref_type === 'repository') {
            return `Created ${ghevent.payload.ref_type}`;
        }
    } else if (ghevent.type === 'MemberEvent') {
        if (ghevent.payload.action === 'added') {
            return `Added collaborator to ${link(ghevent)}`;
        }
    } else if (ghevent.type === 'PublicEvent') {
        return `Made ${link(ghevent)} public`;
    } else if (ghevent.type === 'PullRequestEvent') {
        return `Pull Request for ${link(ghevent)}`;
    } else if (ghevent.type === 'ForkEvent') {
        return `Forked ${link(ghevent)}`;
    } else {
        console.log(ghevent.type); // eslint-disable-line
        return `Unknown action for ${link(ghevent)}`;
    }
};

export const LastGithub = props => {
    const {data} = props;
    return (
        <p className="text-lg">
            <span dangerouslySetInnerHTML={{__html: event(data)}} />
        </p>
    );
}

export default LastGithub;