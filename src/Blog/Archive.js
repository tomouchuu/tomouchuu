import { config } from './../config';

import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

class BlogArchive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogposts: {
        loaded: false,
        data: {}
      },
    }
  }

  componentDidMount() {
    fetch(`${config.api}/blog`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogposts: {
            loaded: true,
            data
          }
        });
      });
  }

  render() {
    let archive = null;
    if (this.state.blogposts.loaded) {
      archive = this.state.blogposts.data.map((post, index) => {
        var title = post.name.replace('.md', '');
        return (
          <li key={index}><Link to={`/blog/${title}`} title={title}>{title}</Link></li>
        )
      })
    }

    return (
      <div className="blog-archive">
        <h1>All blog posts</h1>
        <ul>
          { archive }
        </ul>
      </div>
    );
  }
}

export default BlogArchive;
