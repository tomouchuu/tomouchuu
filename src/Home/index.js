import { config } from './../config';

import React, { Component } from 'react';

import Intro from './Intro';
import Navbar from './../Navbar';
import About from './About';
import RecentTweet from './RecentTweet';
import Programming from './Programming';
import RecentBlog from './RecentBlog';
import RecentPlayed from './RecentPlayed';
import Loading from '../Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {
        loaded: true,
        data: {
          "name": "Thomas Moore",
          "birthday": "1993-09-14",
          "location": "Chelmsford",
          "based": "London",
          "contact": {
            "email": "tomo@uchuu.io",
            "blog": "https://tomo.uchuu.io/blog",
            "twitter": "https://www.twitter.com/tomouchuu",
            "github": "https://github.com/tomouchuu",
            "instagram": "https://instagram.com/tomouchuu",
            "spotify": "https://open.spotify.com/user/117937777",
            "discord": "discord:tomouchuu#6089",
            "mastodon": "https://niu.moe/@tomo",
            "snapchat": "http://tomo.uchuu.io/images/snapcode.png",
            "youtube": "https://www.youtube.com/channel/UCl8LE1A9XI5gE_VD47hl8Cg",
            "twitch": "https://www.twitch.tv/tomouchuu",
            "soundcloud": "https://soundcloud.com/tomopagu",
            "trello": "https://trello.com/b/FcW2Q1jL",
            "linkedin": "https://www.linkedin.com/in/thomas-moore-730226121/"
          },
          "work": [
            {
              "company": "reed.co.uk",
              "date": "September 2016 - Current",
              "description": "I'm a junior full-stack developer working on the jobseeker site. At work we use Razor & Knockout with LESS for our front end and a C# backend."
            },
            {
              "company": "Ahead4",
              "date": "May 2012 - September 2016",
              "description": "I handled a lot of the front end tasks such as slicing sites and some back end tasks using PHP and MySQL to integrate designs into our custom CMS, Wordpress or a bespoke control panel depending on the client."
            }
          ]
        },
      },
      blogpost: {
        loaded: false,
        data: {}
      },
      twitter: {
        loaded: false,
        data: {},
      },
      github: {
        loaded: false,
        data: {},
      },
      spotify: {
        loaded: false,
        recentlyPlayed: {},
      },
      spotifyTop: {
        loaded: false,
        top: {},
      },
    }
  }

  componentDidMount() {
    fetch(config.api)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          me: {
            loaded: true,
            data: data.me,
          }
        });
      });

    fetch(`${config.api}/blog/latest`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogpost: {
            loaded: true,
            data: data
          }
        });
      });

    fetch(`${config.api}/twitter`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          twitter: {
            loaded: true,
            data
          }
        });
      });

    fetch(`${config.api}/github`)
      .then((response) => response.json())
      .then((data) => {
        const githubData = data.slice(0, 7);
        this.setState({
          github: {
            loaded: true,
            data: githubData
          }
        });
      });

      fetch(`${config.api}/spotify`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.err) {
            this.setState({
              spotify: {
                loaded: true,
                recentlyPlayed: data
              }
            });
          } else {
            this.setState({
              spotify: {
                loaded: 'fail',
                recentlyPlayed: null
              }
            });
          }
        });

      fetch(`${config.api}/spotify/top`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.err) {
            this.setState({
              spotifyTop: {
                loaded: true,
                top: data
              }
            });
          }
        });
  }

  render() {
    let intro = <Loading loadingitem="Intro" color="#fa0afe" />;
    let navbar = <Loading loadingitem="Navbar" color="#111" />;
    let about = <Loading loadingitem="About" color="#111" />;
    let recentTweet = <Loading loadingitem="Recent Tweet" color="#55acee" />;
    let recentBlog = <Loading loadingitem="Recent Blog" color="#2ECC40" />;
    let recentPlayed = <Loading loadingitem="Recently Played" color="#1db954" />;
    let programming = <Loading loadingitem="Programming Section" color="#333" />;
    if (this.state.me.loaded) { intro = <Intro me={this.state.me.data} twitterloaded={this.state.twitter.loaded} image={ this.state.twitter.data.profile_image_url } /> }
    if (this.state.me.loaded) { navbar = <Navbar socials={this.state.me.data.contact} /> }
    if (this.state.me.loaded) { about = <About me={this.state.me.data} music={this.state.spotifyTop.loaded} topmusic={this.state.spotifyTop.top} /> }
    if (this.state.twitter.loaded) { recentTweet = <RecentTweet tweet={this.state.twitter.data.status} /> }
    if (this.state.spotify.loaded) { recentPlayed = <RecentPlayed data={this.state.spotify.recentlyPlayed} /> }
    if (this.state.spotify.loaded === 'fail') { recentPlayed = null }
    if (this.state.blogpost.loaded) { recentBlog = <RecentBlog blogpost={this.state.blogpost.data} /> }
    if (this.state.github.loaded) { programming = <Programming data={this.state.github.data} /> }

    return (
      <div className="Home">
        { intro }
        { navbar }
        { about }
        { recentTweet }
        { recentPlayed }
        { recentBlog }
        { programming }
      </div>
    );
  }
}

export default Home;
