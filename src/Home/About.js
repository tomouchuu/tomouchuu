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
        <p>I'm primarily a frontend developer with a heavy focus on javascript using frameworks like reactjs & vuejs for my frontends along with a combination with knowledge of most css solutions (css, scss, less, stylus, postcss, css in js). I do also a little bit of backend work, either in javascript with node or php where I use laravel. I'm learning C# where I can.</p>
        <p>Outside of coding, I'm a big fan of things japanese whether it's music (mostly IDOL (<a href="https://tomoshi.uchuu.io" title="oshis">oshi-list</a>)), tv (not anime) or aesthetics and I try to get over there every 2 years at least. I'm trying to learn the language via a tutor and self teaching.</p>
        <p>I also play drums occasionally, used to be in a band but I still keep playing to keep skills up, because of that I do finger drum in the office (sorry not sorry). You can see what I'm currently listening to below or on <a href={this.props.me.contact.spotify} title="My Spotify">my Spotify</a>.</p>
        {
          (this.props.music) ? <div><p>According to Spotify my most played track is <a href={this.props.topmusic.tracks.items[0].external_urls.spotify} title={`See ${this.props.topmusic.tracks.items[0].name} on Spotify`}>{this.props.topmusic.tracks.items[0].name}</a> followed by <a href={this.props.topmusic.tracks.items[1].external_urls.spotify} title={`See ${this.props.topmusic.tracks.items[1].name} on Spotify`}>{this.props.topmusic.tracks.items[1].name}</a> and <a href={this.props.topmusic.tracks.items[2].external_urls.spotify} title={`See ${this.props.topmusic.tracks.items[2].name} on Spotify`}>{this.props.topmusic.tracks.items[2].name}</a>.</p>
          <p>My most played artists are <a href={this.props.topmusic.artists.items[0].external_urls.spotify} title={`See ${this.props.topmusic.artists.items[0].name} on Spotify`}>{this.props.topmusic.artists.items[0].name}</a>, <a href={this.props.topmusic.artists.items[1].external_urls.spotify} title={`See ${this.props.topmusic.artists.items[1].name} on Spotify`}>{this.props.topmusic.artists.items[1].name}</a> and <a href={this.props.topmusic.artists.items[2].external_urls.spotify} title={`See ${this.props.topmusic.artists.items[2].name} on Spotify`}>{this.props.topmusic.artists.items[2].name}</a>. What do you think?</p></div> : null
        }
        <p>You might be wondering what uchuu is. Uchuu is a circle that I created with a few of my friends, the aim, do cool multimedia stuff and help each other out. The idea came from japanese groups, that would be a part of a group yet able to be their own individual ala ryo(supercell) so therefore I'm tomo@uchuu!</p>
      </AboutContainer>
    );
  }
}

export default About;
