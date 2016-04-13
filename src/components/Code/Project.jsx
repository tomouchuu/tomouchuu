import React from 'react';
import Radium from 'radium';

const propTypes = {
	pimage: React.PropTypes.string.isRequired,
	ptitle: React.PropTypes.string.isRequired,
	pdesc: React.PropTypes.string.isRequired,
	plink: React.PropTypes.string.isRequired,
};

const style = {
	img: {
		maxWidth: '100%',
	},
	title: {
		marginTop: -15,
	},
};

function Project({ pimage, ptitle, pdesc, plink }) {
	return (
		<div className="project">
			<img src={ pimage } alt={ ptitle } style={ style.img } />
			<h4 style={ style.title }>{ ptitle }</h4>
			<p>
				{`${pdesc} `}
				<a href={ plink } title={`Go to ${ptitle}`} target="_blank">
					View Project
				</a>
			</p>
		</div>
	);
}

Project.propTypes = propTypes;

Project = Radium(Project); //eslint-disable-line

export default Project;
