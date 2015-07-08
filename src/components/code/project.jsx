var React = require('react');

var Project = React.createClass({

	render: function() {
		return (
			<div className="project">
				<img src={ this.props.pimage } alt={ this.props.ptitle } />
				<h4>{ this.props.ptitle }</h4>
				<p>
					{ this.props.pdesc }  <a href={ this.props.plink } title={ 'Go to ' + this.props.ptitle } target="_blank">View Project</a>
				</p>
			</div>
		);
	}

});

module.exports = Project;
