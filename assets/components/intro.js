'use strict';

var LatestTweet = React.createClass({
	displayName: 'LatestTweet',

	getInitialState: function getInitialState() {
		return {
			tweet: [],
			user: []
		};
	},

	componentDidMount: function componentDidMount() {
		$.ajax({
			url: 'http://api-tomo.pagu.co/twitter',
			dataType: 'json',
			cache: true,
			success: (function (data) {
				var tweet = data.tweets[0];
				var user = tweet.user.screen_name;
				this.setState({
					tweet: tweet,
					user: user
				});
			}).bind(this),
			error: (function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}).bind(this)
		});
	},

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'lastTweeted' },
			React.createElement(
				'p',
				null,
				'I last tweeted...'
			),
			React.createElement(
				'p',
				{ className: 'tweet' },
				this.state.tweet.text,
				' ',
				React.createElement(
					'small',
					null,
					React.createElement(
						'a',
						{ href: 'https://twitter.com/' + this.state.user + '/status/' + this.state.tweet.id_str },
						this.state.tweet.created_at
					)
				)
			)
		);
	}

});

var LatestInstagram = React.createClass({
	displayName: 'LatestInstagram',

	getInitialState: function getInitialState() {
		return {
			link: '',
			image: [],
			caption: ''
		};
	},

	componentDidMount: function componentDidMount() {
		$.ajax({
			url: 'http://api-tomo.pagu.co/instagram',
			dataType: 'json',
			cache: true,
			success: (function (data) {
				var lastPhoto = data.photos[0];
				var image = lastPhoto.images.thumbnail;
				var caption = lastPhoto.caption.text;

				this.setState({
					link: lastPhoto.link,
					image: image,
					caption: caption
				});
			}).bind(this),
			error: (function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}).bind(this)
		});
	},

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'lastInstagrammed' },
			React.createElement(
				'p',
				null,
				'I last instagramed...'
			),
			React.createElement(
				'a',
				{ href: this.state.link, title: this.state.caption, className: 'instagram' },
				React.createElement('img', { src: this.state.image.url, height: this.state.image.height, width: this.state.image.width, alt: this.state.caption })
			)
		);
	}

});

var Intro = React.createClass({
	displayName: 'Intro',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'Hi, I\'m Thomas Moore'
			),
			React.createElement(LatestTweet, null),
			React.createElement(LatestInstagram, null)
		);
	}

});

React.render(React.createElement(Intro, null), document.getElementById('intro'));
//# sourceMappingURL=intro.js.map