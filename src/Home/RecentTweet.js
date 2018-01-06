import React, { Component } from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import twitter from 'twitter-text';

const RecentTweetArea = styled.div`
  background: #55acee;
  color: #333;
  padding: 20px;
  & a,
  & a:hover { transition: all .2s; }
  & a {
    color: #111;
    &:hover { color: #222; }
  }
  & h3 {
    color: #fff;
    margin: 0;
  }
`;
const RecentTweetContainer = styled.div`
  margin: 0 auto;
  width: 800px;
  @media screen and (max-width: 840px) {
    width: 100%;
  }
`;
const Text = styled.div`
  text-align: center;
`;
const Date = styled.a`
  display: block;
  text-align: right;
`;

class RecentTweet extends Component {
  text() {
    return {__html: twitter.autoLink(this.props.tweet.text)};
  }

  relativedate() {
    return distanceInWordsToNow(this.props.tweet.created_at, {addSuffix: true});
  }

  statusurl() {
    return `https://twitter.com/${this.props.tweet.screen_name}/status/${this.props.tweet.id}`;
  }

  render() {
    return (
      <RecentTweetArea>
        <RecentTweetContainer>
          <h3>- RECENT TWEET -</h3>
          <Text dangerouslySetInnerHTML={this.text()}></Text>
          <Date href={this.statusurl()} title={this.props.tweet.created_at} target="_blank">{ this.relativedate() }</Date>
        </RecentTweetContainer>
      </RecentTweetArea>
    );
  }
};

export default RecentTweet;