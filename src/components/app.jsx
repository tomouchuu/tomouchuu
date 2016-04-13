import { config } from './../../config';

import React from 'react';
import { render } from 'react-dom';

import Color from 'color';
const color = Color;

import { Style } from 'radium';
// import normalize from 'radium-normalize';

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
		tweets: [],
	},
	instagramData: {
		photos: [],
	},
	githubData: {},
	videos: [],
};

const fontFamily = '"Avenir Next", "Helvetica Neue", Helvetica, Arial, Roboto, "Droid Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif'; // eslint-disable-line
const styles = {
	body: {
		backgroundColor: '#fff',
		fontFamily,
		color: '#111',
	},
	a: {
		color: '#aa201d',
		transition: 'all 0.2s',
	},
	'a:hover': {
		color: color('#aa201d').lighten(0.5).rgbString(),
		transition: 'all 0.2s',
	},
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentDidMount() {
		fetch(config.api)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					me: data.me,
				});
			});

		fetch('https://blog.tomo.pagu.co/api/latest')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					blogpost: data.blogpost,
				});
			});

		fetch(`${config.api}/instagram`)
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
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					twitterData: data,
				});
			});

		fetch(`${config.api}/github`)
			.then((response) => response.json())
			.then((data) => {
				const githubData = data.slice(0, 10);
				this.setState({
					githubData,
				});
			});
	}

	// <Style rules={[normalize, radiumObject]} />

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
