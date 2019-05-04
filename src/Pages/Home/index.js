import { config } from '../../config';

import React, { Component } from 'react';

import Intro from './Intro';
import Navbar from '../../Components/Navbar';
import About from './About';
import RecentTweet from './RecentTweet';
import Programming from './Programming';
import RecentBlog from './RecentBlog';
import RecentPlayed from './RecentPlayed';
import Loading from '../../Components/Loading';

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
          "contact": {
            "email": "tomo@uchuu.io",
            "twitter": "https://www.twitter.com/tomouchuu",
            "github": "https://github.com/tomouchuu",
            "mastodon": "https://niu.moe/@tomo",
            "linkedin": "https://www.linkedin.com/in/thomas-moore-730226121/"
          },
          "work": [
            {
              "company": "reed.co.uk",
              "date": "September 2016 - Current",
              "description": "I'm a frontend developer working on the design systems team. At work we use reactjs with storybook powered by express with scss for styling."
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
      music: {
        loaded: false,
        recentlyPlayed: {
          artist: {},
          track: {},
          album: {}
        },
      }
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

    fetch(`${config.api}/blog?latest=true`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogpost: {
            loaded: true,
            data: data
          }
        });
      });

    fetch(`${config.api}/twitter/`)
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

      fetch(`${config.api}/lastfm`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.err) {
            this.setState({
              music: {
                loaded: true,
                recentlyPlayed: data
              }
            });
          } else {
            this.setState({
              music: {
                loaded: 'fail',
                recentlyPlayed: null
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
    if (this.state.me.loaded) { navbar = <Navbar className="navbar" socials={this.state.me.data.contact} /> }
    if (this.state.me.loaded) { about = <About me={this.state.me.data} /> }
    if (this.state.twitter.loaded) { recentTweet = <RecentTweet tweet={this.state.twitter.data} /> }
    if (this.state.music.loaded) { recentPlayed = <RecentPlayed data={this.state.music.recentlyPlayed} /> }
    if (this.state.music.loaded === 'fail') { recentPlayed = null }
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
