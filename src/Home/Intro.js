import React, { Component } from 'react';

import parse from 'date-fns/parse';
import differenceInYears from 'date-fns/difference_in_years';
import styled from 'styled-components';

import HeroBG from './../Hero';
import SocialMedia from './../SocialMedia';

const IntroArea = styled(HeroBG)`
  display: flex;
  padding: 100px;
  font-size: 1.4rem;

  & h1 {
    display: inline;
    font-size: 2.75rem;
  }
  & b {
    font-size: 2rem;
  }

  @media screen and (max-width: 800px) {
    padding: 30px;
  }
`;
const IntroContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  margin: 0 auto;
  padding: 0 30px 30px;
  width: 550px;
  line-height: 40px;

  div {
    text-align: center;
  }
  img ~ div {
    text-align: left;
  }

  a.looking-for {
    color: #ddd;
    text-decoration: none;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    text-align: center;
    div,
    img ~ div {
      text-align: center;
    }
  }
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  border: 1px solid #fff;
  float: left;
  margin-top: 60px;
  margin-right: 30px;
  width: 170px;

  @media screen and (max-width: 500px) {
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  }
`;
const SocialList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: -15px 0 0;
  text-align: center;

  & li {
    display: inline-block;
  }
`;
const Signature = styled.p`
  font-size: 1rem;
  font-weight: light;
  margin: 0;
  text-align: center;
`;

class Intro extends Component {
  profileimg() {
    const profileimg = this.props.image.replace('_normal', '');
    return profileimg;
  }

  age() {
    const now = new Date();
    const birthday = parse(this.props.me.birthday);
    return differenceInYears(now, birthday);
  }

  employment() {
    let markup = `working at <b>${ this.props.me.work[0].company }</b>`;
    if (this.props.me.work[0].company === 'unemployed') {
      markup = `<span>looking for work, <a href="mailto:${ this.props.me.contact.email }" class="looking-for">get in touch</a></span>`;
    }
    return {__html: markup};
  }

  render() {
    const contactData = this.props.me.contact;
    const socialMediaArr = [];
    Object.keys(this.props.me.contact).forEach(function(network, i) {
      socialMediaArr.push({
        network: network,
        url: contactData[network],
      })
    });

    return (
      <IntroArea id="intro" hue="189" saturation="100" lightness="81" animate={true} transition="5">
        <IntroContainer>
          {
            (this.props.twitterloaded) ? <ProfileImg src={this.profileimg()} alt={this.props.me.name} /> : null
          }
          <br />
          <div>Hi I'm <h1>{ this.props.me.name }</h1>, <b>{this.age()} years old</b>, from <b>{this.props.me.location}</b> and based in <b>{ this.props.me.based }</b> where I'm currently <span dangerouslySetInnerHTML={this.employment()} />.</div>
          <p style={{'fontSize': '1.2rem'}}>Find me on:</p>
          <SocialList>
          {socialMediaArr.map((social) =>
            <li key={social.network}><SocialMedia network={social.network} url={social.url} scale="2x" /></li>
          )}
          </SocialList>
          <Signature>- トーマス＠宇宙 -</Signature>
        </IntroContainer>
      </IntroArea>
    );
  }
}

export default Intro;
