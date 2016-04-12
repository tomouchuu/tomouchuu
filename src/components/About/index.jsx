import React from 'react';
import moment from 'moment';

const state = {
	age: '22',
	name: 'Thomas Moore',
	work: {
		company: 'Ahead4',
		description: 'I make websites.',
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
			<div id="about">
				<div className="about-title">
					<h1>Hello! I'm { this.state.name }</h1>
				</div>
				<div className="about-content">
					<p>
						I'm a web developer from a sleepy village in Essex, England.
						I'm { this.state.age } years old and I love making websites with a good handle
						of front end technologies like HTML, CSS (&amp; some pre-processors like LESS,
						SCSS, Stylus &amp; PostCSS) &amp; JS.
					</p>
					<p>
						My language of choice personally would be an Express / Laravel Backend
						and then either a Laravel / React frontend using SCSS/PostCSS for my CSS.
					</p>
					<p>
						I'm currently employed at { this.state.work.company }
						where { this.state.work.description }
					</p>
					<p>
						Outside of coding, you can find me on a Drum Kit banging away and
						trying to write my own music with the help of my fantastic sister,
						playing video games with friends or
						with my headphones in listening to the latest music coming out of Japan.
					</p>
				</div>
			</div>
		);
	}
}

export default About;
