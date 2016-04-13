import React from 'react';
import moment from 'moment';
import twitter from 'twitter-text';

const state = {
	enabled: false,
	tweet: '',
	user: '',
	tweetId: '',
	createdAt: '',
};

class LatestTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		if (typeof update.twitterData.tweets !== 'undefined') {
			const tweetData = update.twitterData.tweets[0];

			const tweet = twitter.autoLink(tweetData.text);

			const relativeTimeCreated = moment(
				tweetData.created_at,
				'dd MMM DD HH:mm:ss ZZ YYYY'
			).fromNow();

			this.setState({
				enabled: true,
				tweet,
				user: tweetData.user.screen_name,
				tweetId: tweetData.id_str,
				createdAt: relativeTimeCreated,
			});
		}
	}

	render() {
		if (this.state.enabled === true) {
			return (
				<div className="lastTweeted">
					<p className="twitter-title">I last tweeted...</p>
					<p className="tweet">
						<span dangerouslySetInnerHTML={{ __html: this.state.tweet }} /><br />
						<small><a href={`https://twitter.com/${this.state.user}/status/${this.state.tweetId}`}>{ this.state.createdAt }</a></small>
					</p>
				</div>
			);
		}

		return (
			<div className="lastTweeted">
				<p>Loading Tweet...</p>
			</div>
		);
	}
}

export default LatestTweet;
