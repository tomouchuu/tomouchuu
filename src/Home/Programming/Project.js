import React, { Component } from 'react';
import styled from 'styled-components';

const ProjectSection = styled.div`
  border-bottom: 1px solid white;
  margin-bottom: 30px;
`;
const ProjectImg = styled.img`
  max-width: 100%;
`;
const ProjectHeaders = styled.h3`
  margin-top: -15px;
  margin-bottom: 0;
`;
const ProjectTitle = ProjectHeaders.extend`
  float: left;
  text-transform: uppercase;
`;
const ProjectLinks = ProjectHeaders.extend`
  float: right;
`;

class Project extends Component {
  render() {
    let image = null;
    let githubLink = null;
    let separator = null;
    let websiteLink = null;
    if (this.props.image) { image = <ProjectImg src={this.props.image} alt={this.props.project} /> }
    if (this.props.github) { githubLink = <a href={this.props.github} title={`See ${this.props.project} on Github`}>Github</a> }
    if (this.props.github && this.props.website) { separator = <span> || </span> }
    if (this.props.website) { websiteLink = <a href={this.props.website} title={`Go to ${this.props.project}`}>Website</a> }

    return (
      <ProjectSection>
        {image}
        <ProjectTitle>- { this.props.project } -</ProjectTitle>
        <ProjectLinks>
          {githubLink}
          {separator}
          {websiteLink}
        </ProjectLinks>
        <div className="clearfix"></div>
        <p>{ this.props.description }</p>
      </ProjectSection>
    );
  }
};

export default Project;