import React from 'react';

import Radium from 'radium';

const state = {
	link: '',
	network: 'user',
	color: '#fff',
	styles: {
		base: {
			':hover': {},
		},
		square: {
			color: '#aa201d',
		},
		squareHover: {
			color: '#fff',
		},
		icon: {
			color: '#fff',
		},
		iconHover: {
			color: '#aa201d',
		},
	},
};


class SocialMedia extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		let title = `Follow me on ${update.network}!`;
		if (update.network === 'envelope') {
			title = 'Email me!';
		} else if (update.network === 'newspaper-o') {
			title = 'Check out my blog!';
		}

		this.setState({
			link: update.link,
			network: update.network,
			title,
			color: update.color,
			styles: {
				base: {
					':hover': {},
				},
				square: {
					color: update.color,
					transition: 'all 0.2s',
				},
				squareHover: {
					color: '#fff',
					transition: 'all 0.2s',
				},
				icon: {
					color: '#fff',
					transition: 'all 0.2s',
				},
				iconHover: {
					color: update.color,
					transition: 'all 0.2s',
				},
			},
		});
	}

	render() {
		return (
			<a
				href={ this.state.link }
				title={ this.state.title }
				className={`icon icon__${this.state.network}`}
				target="_blank"
				style={ this.state.styles.base }
				key="socialicon"
			>
				{Radium.getState(
					this.state, 'socialicon', ':hover'
				) ? (
					<span className="fa-stack fa-lg">
						<i
							style={ this.state.styles.squareHover }
							className="fa fa-square fa-stack-2x"
						></i>
						<i
							style={ this.state.styles.iconHover }
							className={`fa fa-stack-1x fa-inverse fa-${this.state.network}`}
						></i>
					</span>
				) : (
					<span className="fa-stack fa-lg">
						<i
							style={ this.state.styles.square }
							className="fa fa-square fa-stack-2x"
						></i>
						<i
							style={ this.state.styles.icon }
							className={`fa fa-stack-1x fa-inverse fa-${this.state.network}`}
						></i>
					</span>
				)}
			</a>
		);
	}
}

SocialMedia = Radium(SocialMedia); // eslint-disable-line

export default SocialMedia;
