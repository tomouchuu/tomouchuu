var React = require('react');
var moment = require('moment');

var LatestInstagram = React.createClass({

	getInitialState: function () {
		return {
			link: '',
			image: {},
			caption: '',
			createdAt: '',
		};
	},

	componentWillReceiveProps: function (update) {
		var lastPhoto = update.instagramData.photos[0];
		var relativeTimeCreated = moment.unix(lastPhoto.created_time).fromNow();
		this.setState({
			link: lastPhoto.link,
			image: lastPhoto.images.thumbnail,
			caption: lastPhoto.caption.text,
			createdAt: relativeTimeCreated,
		});
	},

	render: function () {
		return (
			<div className="lastInstagrammed">
				<p className="instagram-title">I last instagramed...</p>
				<a href={ this.state.link } title={ this.state.caption + ' - ' + this.state.createdAt } className="instagram">
					<img src={ this.state.image.url } height={ this.state.image.height } width={ this.state.image.width } alt={ this.state.caption + ' - ' + this.state.createdAt } />
				</a>
			</div>
		);
	},

});

module.exports = LatestInstagram;
