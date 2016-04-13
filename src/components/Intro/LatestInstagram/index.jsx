import React from 'react';
import moment from 'moment';

const state = {
	link: '',
	image: {},
	caption: '',
	createdAt: '',
};

class LatestInstagram extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		const lastPhoto = update.instagramData.photos[0];
		const relativeTimeCreated = moment.unix(lastPhoto.created_time).fromNow();
		this.setState({
			link: lastPhoto.link,
			image: lastPhoto.images.thumbnail,
			caption: lastPhoto.caption.text,
			createdAt: relativeTimeCreated,
		});
	}

	render() {
		return (
			<div className="lastInstagrammed">
				<p className="instagram-title">I last instagramed...</p>
				<a
					href={ this.state.link }
					title={`${this.state.caption} - ${this.state.createdAt}`}
					className="instagram"
				>
					<img
						src={ this.state.image.url }
						height={ this.state.image.height }
						width={ this.state.image.width }
						alt={`${this.state.caption} - ${this.state.createdAt}`}
					/>
				</a>
			</div>
		);
	}
}

export default LatestInstagram;
