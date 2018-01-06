import React, { Component } from 'react';
import styled from 'styled-components';

const RecentPlayedArea = styled.div`
  background: #1db954;
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
    return (
      <RecentPlayedArea>
        <RecentPlayedBackgroundArtwork image={this.props.data.item.album.images[0].url} />
        <RecentPlayedContainer>
          <RecentPlayedTitle>- { this.props.data.is_playing ? 'Currently Playing' : 'Last Played' } -</RecentPlayedTitle>
          <TrackInfoArea>
            <a href={this.props.data.item.album.external_urls.spotify} title={`See ${this.props.data.item.album.name} on Spotify`}><AlbumArtwork src={this.props.data.item.album.images[1].url} alt={this.props.data.item.album.name} /></a>
            <TrackInfo>
              <TrackName>{this.props.data.item.name}</TrackName>
              <p>
              {
                this.props.data.item.artists.map((artist, index) => {
                  if (index !== (this.props.data.item.artists.length - 1)) {
                    return (<span key={artist.id}><a key={artist.id} href={artist.external_urls.spotify} title={`See ${artist.name} on Spotify`}>{artist.name}</a>, </span>);
                  }
                  return (<a key={artist.id} href={artist.external_urls.spotify} title={`See ${artist.name} on Spotify`}>{artist.name}</a>);
                })
              }
              </p>
              <p><a href={this.props.data.item.album.external_urls.spotify} title={`See ${this.props.data.item.album.name} on Spotify`}>{this.props.data.item.album.name}</a></p>
              <p>
                <a href={this.props.data.item.preview_url} title={`Preview ${this.props.data.item.name}`}>Preview</a> || <a href={this.props.data.item.external_urls.spotify} title={`Listen to ${this.props.data.item.name} on Spotify`}>Listen on Spotify</a>
              </p>
            </TrackInfo>
            <div className="clearfix"></div>
          </TrackInfoArea>
        </RecentPlayedContainer>
      </RecentPlayedArea>
    );
  }
};

export default RecentPlayed;