import React from 'react';
import { render } from 'react-dom';

import ReactDriveIn from 'react-drive-in';

import { Flex, Box } from 'reflexbox';

import LatestTweet from './LatestTweet/index.jsx';
import LatestInstagram from './LatestInstagram/index.jsx';
import SocialMedia from './SocialMedia/index.jsx';

import { Style } from 'radium';

const propTypes = {
	me: React.PropTypes.object.isRequired,
	twitterData: React.PropTypes.object.isRequired,
	instagramData: React.PropTypes.object.isRequired,
};

const styles = {
	'.intro': {
		background: 'url("/assets/images/bg.jpeg") 0 0 scroll no-repeat #aa201d',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: 550,
		overflow: 'hidden',
	},
	'#intro--videos': {
		height: 550,
		overflow: 'hidden',
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
	},
	'.intro--content': {
		background: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 10,
		color: '#fff',
		zIndex: 100,
	},
	'.intro--content__title': {
		borderRight: '1px dashed #fff',
		fontSize: '2.5em',
		textAlign: 'center',
		float: 'left',
		marginRight: 10,
		paddingRight: 15,
	},
	'.intro--content__title__fullwidth': {
		borderRight: 'none',
		width: '100%',
	},
	'.intro--content__social-media': {
		textAlign: 'center',
		paddingTop: 16,
	},
};

class Intro extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.videos.length > 0) {
			render(<ReactDriveIn
				showPlaylist={ nextProps.videos }
				loop
				mute
			/>, document.getElementById('intro--videos'));
		}
	}

	render() {
		const titleFullWidth = (this.props.twitterData.enabled === false && this.props.instagramData.enabled === false) ? 'intro--content__title__fullwidth' : ''; //eslint-disable-line
		const hideHappenings = (this.props.twitterData.enabled === false && this.props.instagramData.enabled === false) ? 'hide' : ''; //eslint-disable-line
		const hideSocial = (this.props.me.contact.twitter === undefined && this.props.me.contact.instagram === undefined && this.props.me.contact.github === undefined && this.props.me.contact.email === undefined) ? 'hide' : ''; //eslint-disable-line

		return (
			<Flex align="center" justify="center" className="intro">
				<Style rules={ styles } />
				<div id="intro--videos"></div>
				<Box className="intro--content" p={2} sm={11} md={5}>
					<Flex align="center">
						<Box px={2} className={ `intro--content__title ${titleFullWidth}` }>
							<h1>とも</h1>
						</Box>
						<Box px={2} auto className={ `intro--content__latest-happenings ${hideHappenings}` }>
							<LatestTweet twitterData={ this.props.twitterData } />
							<LatestInstagram instagramData={ this.props.instagramData } />
						</Box>
					</Flex>
					<div className={ `intro--content__social-media ${hideSocial}` }>
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
				</Box>
			</Flex>
		);
	}
}

Intro.propTypes = propTypes;

export default Intro;
