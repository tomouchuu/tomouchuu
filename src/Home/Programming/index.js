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
              github="https://github.com/tomouchuu/start"
              description="This start page replaces your browser's new tab page and is a nice looking alternative which can be customisable with a few changes to the config file."
              image="/images/projects/start.png"
            />
            <Project
              project="Zen"
              github="https://github.com/tomouchuu/zen"
              website="https://zen.uchuu.io"
              description="A webpage to display a thoughtful message everyday. It also exposes an API. Uses express & handlebars."
              image="/images/projects/zen.png"
            />
            <Project
              project="Disbott"
              github="https://github.com/uchuuio/disbott"
              // website="https://disbott.uchuu.io"
              description="Disbott is a bot for Discord. It's written in node and is primarily in use for some fun commands on mine and friends' discord servers."
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