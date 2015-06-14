var React = require('react');
var moment = require('moment');

var LatestTweet = React.createClass({

	getInitialState: function() {
		return {
			tweet: '',
			user: '',
			tweetId: '',
			createdAt: ''
		};
	},

	componentWillReceiveProps: function(update) {
		if (typeof update.twitterData.tweets !== 'undefined') {
			var tweetData = update.twitterData.tweets[0];
			var relativeTimeCreated = moment(
				tweetData.created_at,
				'dd MMM DD HH:mm:ss ZZ YYYY'
			).fromNow();
			this.setState({
				tweet: tweetData.text,
				user: tweetData.user.screen_name,
				tweetId: tweetData.id_str,
				createdAt: relativeTimeCreated
			});
		}
	},

	render: function() {
		return (
			<div className="lastTweeted">
				<p className="twitter-title">I last tweeted...</p>
				<p className="tweet">{ this.state.tweet } <small><a href={ 'https://twitter.com/' + this.state.user + '/status/' + this.state.tweetId }>{ this.state.createdAt }</a></small></p>
			</div>
		);
	}

});

module.exports = LatestTweet;
