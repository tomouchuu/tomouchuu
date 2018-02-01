import React, { Component } from 'react';
import styled from 'styled-components';

import Project from './Project';
import GithubEvent from './GithubEvent';

const ProgrammingArea = styled.div`
  background: #333333;
  color: #fff;

  & h2 {
    text-align: center;
    margin: 0;
    padding-top: 20px;
  }

  & .projects,
  & .code-timeline {
    padding: 20px;
  }

  & a {
    color: #ddd;
    text-decoration: none;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
`;
const ProjectsContainer = styled.div`
  float: left;
  width: 75%;
  
  @media screen and (max-width: 1080px) {
    width: 66%;
  }
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const CodeTimelineContainer = styled.div`
  float: left;
  width: 25%;

  @media screen and (max-width: 1080px) {
    width: 33%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

class Programming extends Component {
  render() {
    return (
      <ProgrammingArea id="programming">
        <h2>- PROGRAMMING -</h2>
        <ProjectsContainer>
          <div className="projects">
            <Project
              project="Start (スタート)"
              github="https://github.com/uchuuio/start"
              website="https://start.uchuu.io"
              description="This start page replaces your browser's new tab page and is a nice looking alternative which can be customisable with a few changes to the config file."
              image="/images/projects/start.png"
            />
            <Project
              project="tomOshi"
              github="https://github.com/tomouchuu/tomOshi"
              website="https://tomoshi.uchuu.io/"
              description="A website to showcase the japanese pop idols I support"
              image="/images/projects/tomoshi.png"
            />
            <Project
              project="Mastodon Translate"
              github="https://github.com/tomouchuu/mastodon-translate"
              description="A tampermonkey/greasemonkey script that can translate toots on mastodon via the translate server below."
            />
            <Project
              project="Translate Server"
              github="https://github.com/uchuuio/translate-server"
              website="https://translate.uchuu.io/"
              description="A micro based google translate proxy server used by mastodon-tranlate"
            />
            <Project
              project="Dempach Archive"
              github="https://github.com/uchuuio/dempach-archive"
              website="https://dempach-archive.uchuu.io/"
              description="A site that archives dempach, a radio show on tunein hosted by Mirin & Pinky of Dempagumi.inc, as shows are deleted on tunein after a few weeks. So this site scrapes tunein every week to get the latest episode and then uploads it to S3."
            />
            <Project
              project="Zen"
              github="https://github.com/uchuuio/zen"
              website="https://zen.uchuu.io"
              description="A webpage to display a thoughtful message everyday. It also exposes an API. Uses express & handlebars."
              image="/images/projects/zen.png"
            />
            <Project
              project="Disbott"
              github="https://github.com/uchuuio/disbott"
              // website="https://disbott.uchuu.io"
              description="Disbott is a bot for Discord. It's written in C# with my colleague sam and is primarily in use for some fun commands on mine and friends' discord servers."
              image="/images/projects/disbott.png"
            />
          </div>
        </ProjectsContainer>
        <CodeTimelineContainer>
          <div className="code-timeline">
          {this.props.data.map((ghevent) =>
            <GithubEvent key={ghevent.id} ghevent={ghevent} />
          )}
          </div>
        </CodeTimelineContainer>
        <div className="clearfix"></div>
      </ProgrammingArea>
    );
  }
};

export default Programming;