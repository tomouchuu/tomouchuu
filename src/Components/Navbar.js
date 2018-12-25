import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components';

import SocialMedia from './SocialMedia';

const NavBar = styled.nav`
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding-left: 7.5px;
  padding-right: 7.5px;

  &.home-nav {
    background: rgba(0, 0, 0, 0.9);
  }
  &.blog-nav {
    background: rgba(46, 204, 64, 0.75);
  }

  & ul {
    float: left;
    list-style: none;
    padding-left: 0;
  }
    & ul li {
      display: inline-block;
    }
      & ul li a {
        color: #fff;
        margin-left: 7.5px;
        margin-right: 7.5px;
      }
        & ul li a:hover {
          color: #ddd;
        }

  & ul.links {
    margin-top: 22px;
    margin-bottom: 22px;
    margin-left: 7.5px;
  }

  & ul.socials {
    float: right;
    margin-left: 0;
    & a { margin: 0; }
  }

  @media screen and (max-width: 500px) {
    & ul {
      text-align: center;
      width: 100%;
    }
      & ul.links {
        margin-left: 0;
        margin-bottom: 5px;
      }
  }
`;

class Navbar extends Component {
  navclass() {
    if (this.props.navbartype === 'blog') {
      return 'blog-nav';
    }
    return 'home-nav';
  }

  navlinks() {
    if (this.props.navbartype === 'blog') {
        return [
          {
            url: '/blog',
            name: 'tomo@uchuu blog'
          },
          {
            url: '/blog/archive',
            name: 'blog archive'
          },
          {
            url: '/',
            name: 'to main site'
          }
        ];
    }

    return [
      {
        url: '#intro',
        name: 'TOP'
      },
      {
        url: '#about',
        name: 'ABOUT'
      },
      {
        url: '#programming',
        name: 'PROGRAMMING'
      },
      {
        url: '/blog',
        name: 'BLOG'
      }
    ]
  }

  socialLinks() {
    // TODO: Need to attach this to an event listener for window resize
    const contactData = this.props.socials;
    const socialMediaArr = [];
    Object.keys(contactData).forEach(function(network, i) {
      socialMediaArr.push({
        network: network,
        url: contactData[network],
      })
    });

    if (window.innerWidth < 768) {
      // If Phone
      return socialMediaArr.slice(0, 6);
    } else if (window.innerWidth < 1025) {
      // If Tablet
      return socialMediaArr.slice(0, 10);
    }
    // If Desktop
    return socialMediaArr;
  }

  render() {
    return (
      <NavBar className={`${this.navclass()} ${this.props.className}`}>
        <ul className="links">
        {this.navlinks().map((link) =>
          <li key={link.name}><Link to={link.url}>{link.name}</Link></li>
        )}
        </ul>
        <ul className="socials">
        {this.socialLinks().map((social) =>
          <li key={social.network}><SocialMedia network={social.network} url={social.url} scale="2x" /></li>
        )}
        </ul>
        <div className="clearfix"></div>
      </NavBar>
    );
  }
}

export default Navbar;
