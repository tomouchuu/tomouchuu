import React from 'react';

import GithubEvent from './GithubEvent.jsx';
import Project from './Project.jsx';

const state = {
	events: [],
};

class Code extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		this.setState({
			events: update.githubData,
		});
	}

	render() {
		const GithubEvents = this.state.events.map((eventData) => (
			<GithubEvent data={ eventData } key={ eventData.id } />
		));

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
							ptitle="Oshimen"
							pimage="assets/images/projects/oshimen.png"
							pdesc="
								Oshimen is a webapp to easily showcase the idols that a user supports.
								For example instead of just listing the idols,
								oshimen gives a nice page you can link to.
							"
							plink="https://oshimen.pagu.co"
						/>
						<Project
							ptitle="Disbott"
							pimage="assets/images/projects/disbott.png"
							pdesc="
								Disbott is a bot for Discord.
								It's written in node and is primarily in use for some fun commands on mine
								and friends' discord servers.
							"
							plink="https://disbott.pagu.co"
						/>
						<Project
							ptitle="Start (スタート)"
							pimage="assets/images/projects/start.png"
							pdesc="
								This start page replaces your browser's new tab page
								and is a nice looking alternative which can be customisable
								with a few changes to the config file.
							"
							plink="https://github.com/tomopagu/start"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Code;
