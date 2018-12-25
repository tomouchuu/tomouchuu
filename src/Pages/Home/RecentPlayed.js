import React, { Component } from 'react';
import styled from 'styled-components';

const RecentPlayedArea = styled.div`
  background: #d51007;
  color: #fff;
  padding: 20px;
  position: relative;
  overflow: hidden;
  & a,
  & a:hover { transition: all .2s; }
  & a {
    color: #fff;
    &:hover { color: #ddd; }
  }
`;
const RecentPlayedBackgroundArtwork = styled.div`
  background-image: url(${props => props.image ? props.image : ''});
  height: 103%;
  position: absolute;
  top: -5px;
  left: 0px;
  width: 105%;
  background-attachment: fixed;
  background-size: cover;
  filter: blur(5px);
`;
const RecentPlayedContainer = styled.div`
  margin: 0 auto;
  width: 800px;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 5px;
  @media screen and (max-width: 840px) {
    width: auto;
  }
`;
const RecentPlayedTitle = styled.h3`
  margin: 0;
  text-align: right;
  @media screen and (max-width: 500px) {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const TrackInfoArea = styled.div``;
const AlbumArtwork = styled.img`
  box-shadow: 0 0 5px #888;
  border-radius: 5px;
  float: left;
  margin: 5px 15px 15px;
  transition: all .5s;
  &:hover {
    box-shadow: 0 0 15px #333;
    transition: all .5s;
  }

  @media screen and (max-width: 500px) {
    float: none;
    margin: 0;
  }
`;
const TrackInfo = styled.div`
  margin: -20px 15px 15px;

  & p {
    margin: 0
  }
  & a {
    text-decoration: none;
  }

  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;
const TrackName = styled.h4`
  font-size: 26px;
  line-height: 26px;
  margin-bottom: 10px;
`;

class RecentPlayed extends Component {
  render() {
    let image = false;
    if (this.props.data.track.image) {
      image = this.props.data.track.image;
    } else if (this.props.data.album.image) {
      image = this.props.data.album.image;
    } else if (this.props.data.artist.image) {
      image = this.props.data.artist.image;
    }

    return (
      <RecentPlayedArea>
        {
          image ? 
          <RecentPlayedBackgroundArtwork image={image} /> : null
        }
        <RecentPlayedContainer>
          <RecentPlayedTitle>- { this.props.data.islive === 'true' ? 'Currently Playing' : 'Last Played' } -</RecentPlayedTitle>
          <TrackInfoArea>
            <a href={this.props.data.album.url} title={`See ${this.props.data.album.name} on LastFm`}><AlbumArtwork src={image} alt={this.props.data.album.name} /></a>
            <TrackInfo>
              <TrackName>{this.props.data.track.name}</TrackName>
              <p>
                <a href={this.props.data.artist.url} title={`See ${this.props.data.artist.name} on Lastfm`}>Artist: {this.props.data.artist.name}</a>
              </p>
              <p><a href={this.props.data.album.url} title={`See ${this.props.data.album.name} on Lastfm`}>Album: {this.props.data.album.name}</a></p>
              <p>Played: {this.props.data.track.playedCount} times</p>
            </TrackInfo>
            <div className="clearfix"></div>
          </TrackInfoArea>
        </RecentPlayedContainer>
      </RecentPlayedArea>
    );
  }
};

export default RecentPlayed;