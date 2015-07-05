var React = require('react');

var GithubEvent = require('./github-event.jsx');

var Code = React.createClass({

	getInitialState: function() {
		return {
			events: []
		};
	},

	componentWillReceiveProps: function(update) {
		this.setState({
			events: update.githubData
		})
	},

	render: function() {
		var GithubEvents = this.state.events.map(function(eventData) {
			return (
				<GithubEvent data={ eventData } key={ eventData.id } />
			);
		});

		return (
			<div id="code">
				<div id="code-area">
					<div className="code-title">
						<h1>Code</h1>
					</div>
					<div className="github-area">
						<h2>Github</h2>
						{ GithubEvents }
					</div>
					<div className="projects-area">
						<h2>Projects</h2>
						<p>COMING SOON</p>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Code;
