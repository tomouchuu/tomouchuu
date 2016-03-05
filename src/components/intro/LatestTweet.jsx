var React = require('react');
var moment = require('moment');
var twitter = require('twitter-text');

var LatestTweet = React.createClass({

	getInitialState: function () {
		return {
			enabled: false,
			tweet: '',
			user: '',
			tweetId: '',
			createdAt: '',
		};
	},

	componentWillReceiveProps: function (update) {
		if (typeof update.twitterData.tweets !== 'undefined') {
			var tweetData = update.twitterData.tweets[0];

			var tweet = twitter.autoLink(tweetData.text);

			var relativeTimeCreated = moment(
				tweetData.created_at,
				'dd MMM DD HH:mm:ss ZZ YYYY'
			).fromNow();

			this.setState({
				enabled: true,
				tweet: tweet,
				user: tweetData.user.screen_name,
				tweetId: tweetData.id_str,
				createdAt: relativeTimeCreated,
			});
		}
	},

	render: function () {
		if (this.state.enabled === true) {
			return (
				<div className="lastTweeted">
					<p className="twitter-title">I last tweeted...</p>
					<p className="tweet"><span dangerouslySetInnerHTML={{ __html: this.state.tweet }} /> <small><a href={ 'https://twitter.com/' + this.state.user + '/status/' + this.state.tweetId }>{ this.state.createdAt }</a></small></p>
				</div>
			);
		} else {
			return (
				<div className="lastTweeted">
					<p>Loading Tweet...</p>
				</div>
			);
		}
	},

});

module.exports = LatestTweet;
