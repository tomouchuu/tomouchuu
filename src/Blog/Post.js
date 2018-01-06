import { config } from './../config';

import React, { Component } from 'react';
import styled from 'styled-components';

import Loading from '../Loading';

const Date = styled.p`
  display: block;
  text-align: right;
`;

class BlogPost extends Component {
  constructor(props) {
    super(props);
    let post = this.props.match.params.post;
    if (post === undefined) { post = 'latest'; }

    this.state = {
      blogpost: {
        loaded: false,
        data: {},
        content: '',
        slug: post
      },
    }
  }

  getBlogPost(post) {
    fetch(`${config.api}/blog/${post}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogpost: {
            loaded: true,
            data: data.data,
            content: data.content,
            slug: post
          }
        });
      });
  }

  componentDidMount() {
    this.getBlogPost(this.state.blogpost.slug);
  }

  componentWillReceiveProps(nextprops) {
    let post = this.props.match.params.post;
    if (post === undefined) { post = 'latest'; }

    this.setState({
      blogpost: {
        loaded: false,
        data: {},
        content: '',
        slug: post
      }
    });
    this.getBlogPost(post);
  }

  render() {
    let loading = null;
    let title = null;
    let subtitle = null;
    let date = null;
    let post = null;
    if (!this.state.blogpost.loaded) { loading = <Loading loadingitem={this.state.blogpost.slug} color="#2ECC40" /> }
    if (this.state.blogpost.loaded) { title = <h1>{this.state.blogpost.data.title}</h1> }
    if (this.state.blogpost.loaded && this.state.blogpost.data.subtitle) { subtitle = <h2>{this.state.blogpost.data.subtitle}</h2> }
    if (this.state.blogpost.loaded) { date = <Date>{this.state.blogpost.data.date}</Date> }
    if (this.state.blogpost.loaded) { post = <div dangerouslySetInnerHTML={{__html: this.state.blogpost.content}}></div> }

    return (
      <div className="blog-post">
        { loading }
        { title }
        { subtitle }
        { date }
        { post }
      </div>
    );
  }
}

export default BlogPost;
