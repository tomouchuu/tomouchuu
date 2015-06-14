var config = require('../../config.js');

var React = require('react');
var $ = require('jquery');

var Intro = require('./intro/index.jsx');
var About = require('./about/index.jsx');

var App = React.createClass({

	getInitialState: function() {
		return {
			me: {
				name: '',
				contact: {}
			},
			twitterData: {
				tweets: []
			},
			instagramData: {
				photos: []
			},
			videos: [
				'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11424276_455445524629132_41364281_n.mp4',
				'https://scontent.cdninstagram.com/hphotos-xaf1/t50.2886-16/11394769_379144165622374_2128849627_n.mp4'
			]
		};
	},

	componentDidMount: function() {
		$.ajax({
			url: config.api,
			dataType: 'json',
			cache: true,
			success: function(data) {
				if (this.isMounted()) {
					this.setState({
						me: data.me
					});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

		// Get my Instagram Data
		$.ajax({
			url: config.api + '/instagram',
			dataType: 'json',
			cache: true,
			success: function(data) {
				var instagramData = data.photos;
				var item;
				var videos = [];

				for (item of instagramData) {
					if (item.type === 'video') {
						videos.push(item.videos.standard_resolution.url);
					}
				}

				if (this.isMounted()) {
					this.setState({
						instagramData: data,
						videos: videos
					});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

		// Get my Twitter Data
		$.ajax({
			url: config.api + '/twitter',
			dataType: 'json',
			cache: true,
			success: function(data) {
				if (this.isMounted()) {
					this.setState({
						twitterData: data
					});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function() {
		return (
			<div className="react-app">
				<Intro
					me={ this.state.me }
					instagramData={ this.state.instagramData }
					twitterData={ this.state.twitterData }
					videos={ this.state.videos }
				/>
				<About me={ this.state.me } />
			</div>
		);
	}

});

React.render(
	<App />,
	document.getElementById('app')
);
