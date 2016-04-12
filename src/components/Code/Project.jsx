import React from 'react';

const propTypes = {
	pimage: React.PropTypes.string.isRequired,
	ptitle: React.PropTypes.string.isRequired,
	pdesc: React.PropTypes.string.isRequired,
	plink: React.PropTypes.string.isRequired,
};

function Project({ pimage, ptitle, pdesc, plink }) {
	return (
		<div className="project">
			<img src={ pimage } alt={ ptitle } />
			<h4>{ ptitle }</h4>
			<p>
				{ pdesc }
				<a href={ plink } title={`Go to ${ptitle}`} target="_blank">
					View Project
				</a>
			</p>
		</div>
	);
}

Project.propTypes = propTypes;

export default Project;
