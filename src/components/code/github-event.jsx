var React = require('react');
var moment = require('moment');

var GithubEvent = React.createClass({

	render: function() {

		var relativeTimeCreated = moment(this.props.data.created_at).fromNow();

		var eventType = '';
        var eventMessage = '';
		if (this.props.data.type === 'PushEvent') {
            eventType = 'octicon-repo-push';
            eventMessage = 'Pushed to repo';
        } else if (this.props.data.type === 'IssueCommentEvent') {
            eventType = 'octicon-comment';
            eventMessage = 'Commented on Issue';
        } else if (this.props.data.type === 'DeleteEvent') {
            eventType = 'octicon-trashcan';
            eventMessage = 'Deleted';
        } else if (this.props.data.type === 'WatchEvent') {
			if (this.props.data.payload.action === 'watched') {
                eventType = 'octicon-eye';
                eventMessage = 'Watched repo';
            } else if (this.props.data.payload.action === 'started') {
                eventType = 'octicon-star';
                eventMessage = 'Stared repo';
            }
		} else if (this.props.data.type === 'IssuesEvent') {
			if (this.props.data.payload.action === 'opened') {
                eventType = 'octicon-issue-opened';
                eventMessage = 'Opened issue';
            } else if (this.props.data.payload.action === 'reopened') {
                eventType = 'octicon-issue-reopened';
                eventMessage = 'Reopened issue';
            } else if (this.props.data.payload.action === 'closed') {
                eventType = 'octicon-issue-closed';
                eventMessage = 'Closed issue';
            }
		} else if (this.props.data.type === 'CreateEvent') {
			if (this.props.data.payload.ref_type === 'tag') {
                eventType = 'octicon-tag';
                eventMessage = 'Tagged repo';
            }
		} else if (this.props.data.type === 'MemberEvent') {
            if (this.props.data.payload.action === 'added') {
                eventType = 'octicon-organization';
                eventMessage = 'Added collaborator';
            }
        }

		var Commits;
		if (typeof this.props.data.payload.commits != 'undefined') {
			Commits = this.props.data.payload.commits.map(function(commit) {
				return (
					<li><span className="octicon octicon-git-commit"></span> { commit.message } <small><a href={ commit.url } title="View Commit">View Commit</a></small></li>
				);
			});
		}

		return (
			<div>
				<div className="github-type">
					<span className="fa-stack fa-3x">
						<i className="fa fa-circle fa-lg"></i>
						<span className={ 'mega-octicon ' + eventType }></span>
					</span>
				</div>
				<div className="github-content">
					<h4><a href={ this.props.data.repo.url } title="View Repo">{ this.props.data.repo.name }</a></h4>
                    <p>{ eventMessage }</p>
					<ul className="github-commits">{{ Commits }}</ul>
					<p><small>{ relativeTimeCreated }</small></p>
				</div>
			</div>
		)
	}

});

module.exports = GithubEvent;
