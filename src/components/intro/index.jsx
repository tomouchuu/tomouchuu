var React = require('react');
var ReactDOM = require('react-dom');

var DriveIn = require('react-drive-in');

var LatestTweet = require('./LatestTweet.jsx');
var LatestInstagram = require('./LatestInstagram.jsx');

var Intro = React.createClass({

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.videos.length > 0) {
			ReactDOM.render(
				<DriveIn
					showPlaylist={ nextProps.videos }
					loop={true}
					slideshow={false}
					mute={true}
				/>,
				document.getElementById('intro-videos')
			);
		}
	},

	render: function () {
		return (
			<div id="intro">
				<div id="intro-videos"></div>
				<div className="intro-content">
					<div className="intro-row">
						<div className="intro-title">
							<h1>とも</h1>
						</div>
						<div className="latest-happenings">
							<LatestTweet twitterData={ this.props.twitterData } />
							<LatestInstagram instagramData={ this.props.instagramData } />
						</div>
					</div>
					<div className="social-media">
						<a href={ this.props.me.contact.twitter } title="Follow me on Twitter" className="twitter-logo" target="_blank"><span className="fa-stack fa-lg"><i className="fa fa-square fa-stack-2x"></i><i className="fa fa-stack-1x fa-inverse fa-twitter"></i></span></a>
						<a href={ this.props.me.contact.instagram } title="Follow me on Instagram" className="instagram-logo" target="_blank"><span className="fa-stack fa-lg"><i className="fa fa-square fa-stack-2x"></i><i className="fa fa-stack-1x fa-inverse fa-instagram"></i></span></a>
						<a href={ this.props.me.contact.github } title="Follow me on Github" className="github-logo" target="_blank"><span className="fa-stack fa-lg"><i className="fa fa-square fa-stack-2x"></i><i className="fa fa-stack-1x fa-inverse fa-github"></i></span></a>
						<a href={ 'mailto:' + this.props.me.contact.email } title="Email Me" className="email-logo"><span className="fa-stack fa-lg"><i className="fa fa-square fa-stack-2x"></i><i className="fa fa-stack-1x fa-inverse fa-envelope"></i></span></a>
					</div>
				</div>
			</div>
		);
	},

});

module.exports = Intro;
