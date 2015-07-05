var React = require('react');
var moment = require('moment');

var GithubEvent = React.createClass({

	render: function() {

		var relativeTimeCreated = moment(this.props.data.created_at).fromNow();

		var eventType = '';
		(this.props.data.type === 'PushEvent') ? eventType = 'octicon-repo-push' : '';
		(this.props.data.type === 'IssueCommentEvent') ? eventType = 'octicon-comment' : '';
		(this.props.data.type === 'DeleteEvent') ? eventType = 'octicon-trashcan' : '';
		if (this.props.data.type === 'IssuesEvent') {
			(this.props.data.payload.action === 'opened') ? eventType = 'octicon-issue-opened' : '';
			(this.props.data.payload.action === 'reopened') ? eventType = 'octicon-issue-reopened' : '';
			(this.props.data.payload.action === 'closed') ? eventType = 'octicon-issue-closed' : '';
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
					<ul className="github-commits">{{ Commits }}</ul>
					<p><small>{ relativeTimeCreated }</small></p>
				</div>
			</div>
		)
	}

});

module.exports = GithubEvent;
