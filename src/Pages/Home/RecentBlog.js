import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components';

const parse5 = require('parse5');

const RecentBlogArea = styled.div`
  background: #2ECC40;
  color: #111;
  padding: 20px;
  & a,
  & a:hover { transition: all .2s; }
  & a {
    color: #333;
    &:hover { color: #222; }
  }
  & h3 {
    color: #fff;
    margin: 0;
  }
`;
const RecentBlogContainer = styled.div`
  margin: 0 auto;
  width: 800px;
  @media screen and (max-width: 840px) {
    width: 100%;
  }
`;
const BlogTitle = styled.h3`
  margin: 0;
`;
const Snippet = styled.div`
  text-align: justify;
`;
const ReadMore = styled(Link)`
  display: block;
  text-align: right;
`;

class RecentBlog extends Component {
  snippet() {
    const blogpost = parse5.parseFragment(this.props.blogpost.content);
    const snippet = blogpost.childNodes[0].childNodes[0].value;
    return snippet;
  }

  render() {
    return (
      <RecentBlogArea>
        <RecentBlogContainer>
          <BlogTitle>- { this.props.blogpost.data.title } -</BlogTitle>
          <h4>{ this.props.blogpost.data.date }</h4>
          <Snippet>
              <p>{ this.snippet() }</p>
          </Snippet>
          <ReadMore to={`/blog/${this.props.blogpost.slug}`} title="READ MORE">READ MORE...</ReadMore>
        </RecentBlogContainer>
      </RecentBlogArea>
    );
  }
};

export default RecentBlog;