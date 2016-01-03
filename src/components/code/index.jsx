var React = require('react');

var GithubEvent = require('./github-event.jsx');
var Project = require('./project.jsx');

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
                        <Project
							ptitle="Disbott"
							pimage="assets/images/projects/disbott.png"
							pdesc="Disbott is a bot for Discord. It's written in node and is primarily in use for some fun commands on mine and friends' discord servers."
							plink="http://disbott.pagu.co"
						/>
						<Project
							ptitle="Start (スタート)"
							pimage="http://anoxy.se/uploads/2015/08/3jfgoc2h80r17la.png"
							pdesc="This start page replaces your browser's new tab page and is a nice looking alternative which can be customisable with a few changes to the config file."
							plink="https://github.com/tomopagu/start"
						/>
						<Project
							ptitle="Doujin Release Tracker"
							pimage="assets/images/projects/doujin-release-tracker.png"
							pdesc="On it's 5th version, the doujin release tracker is built using Laravel with MongoDB for it's Database store. It uses Jquery Datatables heavily to allow users to filter and search for specific releases and runs atop a public API I created for it."
							plink="http://doujinreleas.es"
						/>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Code;
