import React from 'react';
import Radium from 'radium';

import clrs from './../../styles/clrs';

import FitterHappierText from 'react-fitter-happier-text';
import { Flex, Box } from 'reflexbox';

import GithubEvent from './GithubEvent.jsx';
import Project from './Project.jsx';

const propTypes = {
	githubData: React.PropTypes.object.isRequired,
};

const state = {
	events: [],
};

const style = {
	base: {
		backgroundColor: clrs.teal,
	},
	area: {
		padding: 15,
	},
	fullwidth: {
		width: '100%',
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

		const githubEnabledProjects = (this.props.githubData.enabled === false) ? 12 : 9; //eslint-disable-line
		const githubEnabledCode = (this.props.githubData.enabled === false) ? 'hide' : '';

		return (
			<div id="code" style={ style.base }>
				<div id="code-area" style={ style.area }>
					<div className="code-title">
						<FitterHappierText text="Code" />
					</div>
					<Flex sm wrap>
						<Box px={2} sm={githubEnabledProjects}>
							<h3>Projects</h3>
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
							<Project
								ptitle="Z E N"
								pimage="assets/images/projects/zen.png"
								pdesc="
								A webpage to display a thoughtful message everyday. It also exposes an API.
								Uses express & handlebars.
								"
								plink="https://github.com/tomopagu/zen"
							/>
						</Box>
						<Box px={2} sm={3} className={ `github-area ${githubEnabledCode}` }>
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

Code.propTypes = propTypes;

export default Code;
