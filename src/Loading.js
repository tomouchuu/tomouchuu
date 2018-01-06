import React, { Component } from 'react';
import styled from 'styled-components';
import { ScaleLoader } from 'halogenium';
import { config } from './config';

const LoadingComponent = styled.div`
  margin: 15px 0;
  text-align: center;
`;
const LoadingHeader = styled.h3`
  margin: 0;
`;
const LoadingText = styled.p`
  margin: 0;
`;

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dismiss: false,
      major: false,
    }
  }

  componentDidMount() {
    var i = 0;
    this.timerID = setInterval(
      () => {
        i++;
        this.isMajor(i);
        this.dismiss(i);
      }, 1000
    );
  }

  isMajor(i) {
    if (i > 20) {
      this.setState({
        major: true
      });
    }
  }

  dismiss(i) {
    if (i > 60) {
      clearInterval(this.timerID);

      this.setState({
        dismiss: true
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    if (this.state.dismiss) { return null; }
    return (
      <LoadingComponent>
        <ScaleLoader color={this.props.color} size="16px" margin="4px" />
        <LoadingHeader>LOADING</LoadingHeader>
        <LoadingText>{this.props.loadingitem}</LoadingText>
        {
          (this.state.major) ? <div><LoadingText>Looks like there is a major issue here, fancy telling me about it?</LoadingText><LoadingText><a href={`${config.github}/issues`}>Github</a> || <a href={config.twitter}>Twitter</a></LoadingText></div> : null
        }
      </LoadingComponent>
    );
  }
};

export default Loading;