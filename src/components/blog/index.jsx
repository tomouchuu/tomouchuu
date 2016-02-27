var React = require('react');
var moment = require('moment');

var Blog = React.createClass({

	getInitialState: function () {
		return {
			content: 'Loading...',
		};
	},

	componentWillReceiveProps: function (update) {
		var title = update.post.title;
		var date = update.post.date;
		var content = update.post.content;
		var url = update.post.file;

		var paragraphs = content.split('</p>');

		var snippet = paragraphs[0] + '</p>';
		snippet += paragraphs[1] + '</p>';
		snippet += '<a href="http://blog-tomo.pagu.co/show/' + url + '" title="Read ' + title + '">Read More...</a>';

		this.setState({
			title: title,
			date: date,
			snippet: snippet,
			url: url,
		});
	},

	render: function () {
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
	},

});

module.exports = Blog;
