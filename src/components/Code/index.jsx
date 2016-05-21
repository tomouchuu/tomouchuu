import React from 'react';
import Radium from 'radium';

import FitterHappierText from 'react-fitter-happier-text';
import { Flex, Box } from 'reflexbox';

import GithubEvent from './GithubEvent.jsx';
import Project from './Project.jsx';

const state = {
	events: [],
};

const style = {
	base: {
		backgroundColor: '#ace1af',
	},
	area: {
		padding: 15,
	},
};

class Code extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		if (Object.getOwnPropertyNames(update.githubData).length > 0) {
			this.setState({
				events: update.githubData,
			});
		}
	}

	render() {
		const GithubEvents = this.state.events.map((eventData) => (
			<GithubEvent data={ eventData } key={ eventData.id } />
		));

		return (
			<div id="code" style={ style.base }>
				<div id="code-area" style={ style.area }>
					<div className="code-title">
						<FitterHappierText text="Code" />
					</div>
					<Flex sm wrap>
						<Box px={2} sm={6} md={9} className="projects-area">
							<h3>Projects</h3>
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
						</Box>
						<Box px={2} sm={6} md={3} className="github-area">
							<h3>Github</h3>
							{ GithubEvents }
						</Box>
					</Flex>
				</div>
			</div>
		);
	}
}

Code = Radium(Code); //eslint-disable-line

export default Code;
