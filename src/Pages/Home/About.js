import React, { Component } from 'react';
import parse from 'date-fns/parse';
import differenceInYears from 'date-fns/difference_in_years';
import styled from 'styled-components';

const AboutContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  text-align: justify;
  width: 800px;

  @media screen and (max-width: 840px) {
    padding: 0;
    width: 100%;

    & p {
        padding-left: 20px;
        padding-right: 20px;
    }
  }
`;

class About extends Component {
  age() {
    const now = new Date();
    const birthday = parse(this.props.me.birthday);
    return differenceInYears(now, birthday);
  }

  employment() {
    if (this.props.me.work[0].company === 'unemployed') {
      return `I'm looking for work (get in touch if you feel like it!)`;
    }
    return `work in ${ this.props.me.based } at ${ this.props.me.work[0].company }`;
  }

  render() {
    return (
      <AboutContainer id="about">
        <p>So hello there, I'm { this.props.me.name }. I'm { this.age() }, from { this.props.me.location } and currently { this.employment() }.</p>
        <p>I'm a frontend developer with a focus on building components with javascript frameworks like reactjs & vuejs along with knowledge of a combination of most css solutions (css, scss, less, stylus, postcss, css in js). Storybook is ❤. I do also a little bit of backend work, either in javascript with node or php where I use laravel.</p>
        <p>Outside of coding, I'm a big fan of things japanese but mostly enjoy music (and mostly IDOL (<a href="https://tomoshi.uchuu.io" title="oshis">oshi-list</a>) at that)) and aesthetics. I try to get over there every 2 years at least and I'm trying to learn the language via a tutor, self teaching and going to meetups.</p>
        <p>I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry). You can see what I'm currently listening to below or via <a href={this.props.me.contact.lastfm} title="My Lastfm">my Lastfm</a>.</p>
      </AboutContainer>
    );
  }
}

export default About;
