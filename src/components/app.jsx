import { config } from './../../config';

import React from 'react';
import { render } from 'react-dom';

import Color from 'color';
const color = Color;

import { Style } from 'radium';
import clrs from './../styles/clrs';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import Intro from './Intro/index.jsx';
import About from './About/index.jsx';
import Blog from './Blog/index.jsx';
import Code from './Code/index.jsx';

const state = {
	me: {
		name: '',
		contact: {},
	},
	blogpost: {},
	twitterData: {
		enabled: false,
		tweets: [],
	},
	instagramData: {
		enabled: false,
		photos: [],
	},
	githubData: {
		enabled: false,
		data: {},
	},
	videos: [],
};

const fontFamily = '"Avenir Next", "Helvetica Neue", Helvetica, Arial, Roboto, "Droid Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif'; // eslint-disable-line
const styles = {
	body: {
		backgroundColor: clrs.white,
		fontFamily,
		color: clrs.black,
	},
	a: {
		color: clrs.red,
		transition: 'all 0.2s',
	},
	'a:hover': {
		color: color(clrs.red).lighten(0.5).rgbString(),
		transition: 'all 0.2s',
	},
	'.hide': {
		display: 'none',
	},
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentDidMount() {
		function handleErrors(response, area = null) {
			if (!response.ok) {
				console.log(response.statusText); //eslint-disable-line
			} else {
				console.log(area); //eslint-disable-line
				if (area !== null) {
					this.setState({
						[area]: {
							enabled: true,
						},
					});
				}
			}
			return response;
		}

		fetch(config.api)
			.then(handleErrors)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					me: data.me,
				});
			});

		fetch(`${config.blog}/api/latest`)
			.then(handleErrors)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					blogpost: data.blogpost,
				});
			});

		fetch(`${config.api}/instagram`)
			.then(handleErrors, 'instagramData')
			.then((response) => response.json())
			.then((data) => {
				const instagramData = data.photos;
				let item;
				const videos = [];

				for (item of instagramData) {
					if (item.type === 'video') {
						videos.push(item.videos.standard_resolution.url);
					}
				}

				this.setState({
					instagramData: data,
					videos,
				});
			});

		fetch(`${config.api}/twitter`)
			.then(handleErrors, 'twitterData')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					twitterData: data,
				});
			});

		fetch(`${config.api}/github`)
			.then(handleErrors, 'githubData')
			.then((response) => response.json())
			.then((data) => {
				const githubData = data.slice(0, 7);
				this.setState({
					githubData,
				});
			});
	}

	render() {
		return (
			<div>
				<Style rules={ styles } />
				<Intro
					me={ this.state.me }
					instagramData={ this.state.instagramData }
					twitterData={ this.state.twitterData }
					videos={ this.state.videos }
				/>
				<About me={ this.state.me } />
				<Blog post={ this.state.blogpost } />
				<Code githubData={ this.state.githubData } />
			</div>
		);
	}
}

render(<App />, document.getElementById('app'));
