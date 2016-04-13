import React from 'react';

import LatestTweet from './LatestTweet/index.jsx';
import LatestInstagram from './LatestInstagram/index.jsx';
import SocialMedia from './SocialMedia/index.jsx';

import { Style } from 'radium';
import radiumObject from './Intro.css';

const propTypes = {
	me: React.PropTypes.object.isRequired,
	twitterData: React.PropTypes.object.isRequired,
	instagramData: React.PropTypes.object.isRequired,
};

class Intro extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.videos.length > 0) {
			// ReactDOM.render(
			// 	<DriveIn
			// 		showPlaylist={ nextProps.videos }
			// 		loop={true}
			// 		slideshow={false}
			// 		mute={true}
			// 	/>,
			// 	document.getElementById('intro-videos')
			// );
		}
	}

	render() {
		return (
			<div className="intro">
				<Style rules={ radiumObject } />
				<div id="intro--videos"></div>
				<div className="intro--content">
					<div className="intro--row">
						<div className="intro--content__title">
							<h1>とも</h1>
						</div>
						<div className="intro--content__latest-happenings">
							<LatestTweet twitterData={ this.props.twitterData } />
							<LatestInstagram instagramData={ this.props.instagramData } />
						</div>
					</div>
					<div className="intro--content__social-media">
						<SocialMedia
							link={ this.props.me.contact.twitter }
							network="twitter"
							color="#55acee"
						/>
						<SocialMedia
							link={ this.props.me.contact.instagram }
							network="instagram"
							color="#3f729b"
						/>
						<SocialMedia
							link={ this.props.me.contact.github }
							network="github"
							color="#333333"
						/>
						<SocialMedia
							link={`mailto:${this.props.me.contact.email}`}
							network="envelope"
							color="#db4437"
						/>
					</div>
				</div>
			</div>
		);
	}
}

Intro.propTypes = propTypes;

export default Intro;
