import React from 'react';
import Radium from 'radium';
import moment from 'moment';

import FitterHappierText from 'react-fitter-happier-text';

const state = {
	age: '22',
	name: 'Thomas Moore',
	work: {
		company: 'reed.co.uk',
		description: 'I work on the jobseeker site.',
	},
};

const styles = {
	base: {
		padding: 15,
	},
	showCV: {
		display: 'none',
	},
};

class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = state;
	}

	componentWillReceiveProps(update) {
		const name = update.me.name;
		const birthday = moment(update.me.birthday, 'DD-MM-YYYY');
		const age = moment().diff(birthday, 'years');
		const employment = update.me.work[0];

		this.setState({
			age,
			name,
			work: {
				company: employment.company,
				description: employment.description,
			},
		});
	}

	render() {
		return (
			<div id="about" style={styles.base}>
				<div className="about-title">
					<FitterHappierText text={`Hello! I'm ${this.state.name}`} />
				</div>
				<div className="about-content">
					<p>
						I'm a web developer from a sleepy village in Essex, England.
						I'm { this.state.age } years old and I love making websites with a good handle
						of front end technologies like HTML, CSS (&amp; pre-processors like LESS,
						SCSS, Stylus &amp; PostCSS) &amp; JS.
					</p>
					<p>
						My language of choice personally would be an Express / Laravel Backend
						and then either a VueJS/ReactJS / Blade frontend using SCSS/PostCSS for my CSS.
					</p>
					<p>
						I'm currently employed at { this.state.work.company }
						&nbsp;where { this.state.work.description }
					</p>
					<p>
						Outside of coding, you can find me on a Drum Kit banging away and
						trying to write my own music with the help of my fantastic sister,
						playing video games with friends or
						with my headphones in listening to the latest music coming out of Japan.
					</p>
					<p style={styles.showCV}>You can find my CV on <a href="https://represent.io/tomo" target="_blank">Represent.io</a> and in <a href="https://represent.io/tomo.pdf" target="_blank">PDF form</a></p>
				</div>
			</div>
		);
	}
}

About = Radium(About); //eslint-disable-line

export default About;
