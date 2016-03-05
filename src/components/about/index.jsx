var React = require('react');
var moment = require('moment');

var About = React.createClass({

	getInitialState: function () {
		return {
			age: '21',
			name: 'Thomas Moore',
			work: {
				company: 'Ahead4',
				description: 'I make websites.',
			},
		};
	},

	componentWillReceiveProps: function (update) {
		var name = update.me.name;
		var birthday = moment(update.me.birthday, 'DD-MM-YYYY');
		var age = moment().diff(birthday, 'years');
		var employment = update.me.work[0];

		this.setState({
			age: age,
			name: name,
			work: {
				company: employment.company,
				description: employment.description,
			},
		});
	},

	render: function () {
		return (
			<div id="about">
				<div className="about-title">
					<h1>Hello! I'm { this.state.name }</h1>
				</div>
				<div className="about-content">
					<p>I'm a web developer from a sleepy village in Essex, England. I'm { this.state.age } years old and I love making websites with a good handle of front end technologies like HTML, CSS (&amp; some pre-processors like LESS, SCSS, Stylus &amp; PostCSS) &amp; JS.</p>
					<p>My language of choice personally would be an Express / Laravel Backend and then either a Laravel / React frontend using SCSS/PostCSS for my CSS.</p>
					<p>I'm currently employed at { this.state.work.company } where { this.state.work.description }</p>
					<p>Outside of coding, you can find me on a Drum Kit banging away and trying to write my own music with the help of my fantastic sister, playing Sound Voltex / IIDX at the "local" arcade or with my headphones in listening to the latest music coming out of Japan.</p>
				</div>
			</div>
		);
	},

});

module.exports = About;
