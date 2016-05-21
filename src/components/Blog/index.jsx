import React from 'react';
import Radium from 'radium';

import FitterHappierText from 'react-fitter-happier-text';

const state = {
	enabled: false,
	content: 'Loading...',
};

const styles = {
	base: {
		background: '#e8b00c',
		color: '#fff',
		padding: 15,
	},
	blogPost: {
		wordBreak: 'break-word',
	},
};

class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		const title = update.post.title;
		const date = update.post.date;
		const content = update.post.content;
		const url = update.post.file;

		if (Object.getOwnPropertyNames(update.post).length > 0) {
			const paragraphs = content.split('</p>');

			let snippet = `${paragraphs[0]}</p>`;
			snippet += `${paragraphs[1]}</p>`;
			snippet += `<a href="https://blog.tomo.pagu.co/show/${url}" title="Read ${title}">Read More...</a>`;

			this.setState({
				enabled: true,
				title,
				date,
				snippet,
				url,
			});
		}
	}

	render() {
		if (this.state.enabled === true) {
			return (
				<div id="blog" style={styles.base}>
					<div id="blog-area">
						<div className="blog-title">
							<FitterHappierText text="Latest Blog Post" />
							<h3>{ this.state.title } - { this.state.date }</h3>
						</div>
						<div className="blog-snippet" style={styles.blogPost}>
							<span dangerouslySetInnerHTML={{ __html: this.state.snippet }} />
						</div>
					</div>
				</div>
			);
		}

		return (
			<div id="no-blog"></div>
		);
	}
}

Blog = Radium(Blog); //eslint-disable-line

export default Blog;
