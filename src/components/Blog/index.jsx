import React from 'react';

const state = {
	enabled: false,
	content: 'Loading...',
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

	render() {
		if (this.state.enabled === true) {
			return (
				<div id="blog">
					<div id="blog-area">
						<div className="blog-title">
							<h3>Latest Blog Post - { this.state.title }</h3>
							<h4>{ this.state.date }</h4>
						</div>
						<div className="blog-snippet">
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

export default Blog;
