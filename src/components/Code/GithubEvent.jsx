import React from 'react';
import moment from 'moment';

const propTypes = {
	data: React.PropTypes.object.isRequired,
};

function GithubEvent({ data }) {
	const relativeTimeCreated = moment(data.created_at).fromNow();

	let eventType = '';
	let eventMessage = '';
	if (data.type === 'PushEvent') {
		eventType = 'octicon-repo-push';
		eventMessage = 'Pushed to repo';
	} else if (data.type === 'IssueCommentEvent') {
		eventType = 'octicon-comment';
		eventMessage = 'Commented on Issue';
	} else if (data.type === 'DeleteEvent') {
		eventType = 'octicon-trashcan';
		eventMessage = 'Deleted';
	} else if (data.type === 'WatchEvent') {
		if (data.payload.action === 'watched') {
			eventType = 'octicon-eye';
			eventMessage = 'Watched repo';
		} else if (data.payload.action === 'started') {
			eventType = 'octicon-star';
			eventMessage = 'Stared repo';
		}
	} else if (data.type === 'IssuesEvent') {
		if (data.payload.action === 'opened') {
			eventType = 'octicon-issue-opened';
			eventMessage = 'Opened issue';
		} else if (data.payload.action === 'reopened') {
			eventType = 'octicon-issue-reopened';
			eventMessage = 'Reopened issue';
		} else if (data.payload.action === 'closed') {
			eventType = 'octicon-issue-closed';
			eventMessage = 'Closed issue';
		}
	} else if (data.type === 'CreateEvent') {
		if (data.payload.ref_type === 'tag') {
			eventType = 'octicon-tag';
			eventMessage = 'Tagged repo';
		}
	} else if (data.type === 'MemberEvent') {
		if (data.payload.action === 'added') {
			eventType = 'octicon-organization';
			eventMessage = 'Added collaborator';
		}
	} else if (data.type === 'PublicEvent') {
		eventType = 'octicon-rocket';
		eventMessage = 'Made Public';
	} else if (data.type === 'PullRequestEvent') {
		eventType = 'octicon-git-pull-request';
		eventMessage = 'Pull Request';
	} else {
		console.log(data.type); // eslint-disable-line
	}

	let Commits;
	if (typeof data.payload.commits !== 'undefined') {
		Commits = data.payload.commits.map((commit, i) => (
			<li key={i}>
				<span className="octicon octicon-git-commit"></span>
				{ commit.message }
				<small><a href={ commit.url } title="View Commit">View Commit</a></small>
			</li>
		));
	}

	return (
		<div>
			<div className="github-type">
				<span className="fa-stack fa-3x">
					<i className="fa fa-circle fa-lg"></i>
					<span className={`mega-octicon ${eventType}`}></span>
				</span>
			</div>
			<div className="github-content">
				<h4>
					<a href={ data.repo.url } title="View Repo">
						{ data.repo.name }
					</a>
				</h4>
				<p>{ eventMessage }</p>
				<ul className="github-commits">{ Commits }</ul>
				<p><small>{ relativeTimeCreated }</small></p>
			</div>
		</div>
	);
}

GithubEvent.propTypes = propTypes;

export default GithubEvent;
