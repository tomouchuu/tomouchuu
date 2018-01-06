import { config } from './../config';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './../Navbar';
import Archive from './Archive';
import Post from './Post';

const BlogContainer = styled.div`
  margin: 0 auto;
  font-size: 16px;
  line-height: 30px;
  text-align: justify;
  width: 800px;

  & p iframe,
  & p img,
  & iframe,
  & .twitter-tweet,
  & .instagram-media {
    display: block;
    margin: 15px auto !important;
  }
`;

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {
        loaded: false,
        data: {},
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
  }

  render() {
    let navbar = null;
    if (this.state.me.loaded) { navbar =  <Navbar navbartype="blog" socials={this.state.me.data.contact} /> }

    return (
      <div className="BlogSite">
        { navbar }
        <BlogContainer>
          <Switch>
            <Route exact path="/blog" component={Post} />
            <Route exact path="/blog/archive" component={Archive} />
            <Route path="/blog/:post" component={Post} />
          </Switch>
        </BlogContainer>
      </div>
    );
  }
}

export default Blog;
