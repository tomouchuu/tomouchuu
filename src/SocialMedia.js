import React, { Component } from 'react';
import styled from 'styled-components';

import Snapcode from './snapcode.png';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands'
import faSquare from '@fortawesome/fontawesome-free-solid/faSquare';
import faEnvelope from '@fortawesome/fontawesome-pro-light/faEnvelope';
import faNewspaper from '@fortawesome/fontawesome-pro-light/faNewspaper';
fontawesome.library.add(brands, faSquare, faEnvelope, faNewspaper);

function IconStyling(color) {
  return `
    color: ${color};
    &:hover {
      color: #fff;
      .socialicon {
          color: ${color};
      }
    }
  `;
};

const SocialIcon = styled.a`
& .fa-layers {
  margin: 5px;
}

& .twitter {
  ${IconStyling('#55acee')}
}

& .instagram {
  ${IconStyling('#3f729b')}
}

& .github {
  ${IconStyling('#333333')}
}

& .trello {
  ${IconStyling('#0079bf')}
}

& .mastodon {
  ${IconStyling('#189efc')}
}

& .discord {
  ${IconStyling('#7289da')}
}

& .email {
  ${IconStyling('#FF4136')}
}

& .blog {
  ${IconStyling('#2ECC40')}
}

& .spotify {
  ${IconStyling('#1db954')}
}

& .snapchat {
  ${IconStyling('#fffc00')}
}

& .youtube {
  ${IconStyling('#ff0000')}
}

& .twitch {
  ${IconStyling('#6441a5')}
}

& .soundcloud {
  ${IconStyling('#ff8800')}
}

& .linkedin {
  ${IconStyling('#0077b5')}
}

& .lastfm {
  ${IconStyling('#d51007')}
}

& .applemusic {
  ${IconStyling('#ff2f56')}
}

& .socialicon {
  color: #fff;
}
`;

export const SnapcodeComponent = () => (
  <img src={Snapcode} alt="My Snapcode" style={{width: '300px', margin: '0 auto', display: 'block'}} />
);

export class SocialMedia extends Component {
  icon() {
    if (this.props.network === 'email') {
      return ['fal', 'envelope'];
    } else if (this.props.network === 'blog') {
      return ['fal', 'newspaper'];
    } else if (this.props.network === 'applemusic') {
      return ['fab', 'itunes-note'];
    }
    return ['fab', this.props.network];
  }

  scale() {
    if (this.props.scale === '2x') { return 'fa-2x'; }
    return 'fa-lg';
  }

  title() {
    if (this.props.network === 'email') {
      return 'Email me';
    } else if (this.props.network === 'blog') {
      return 'My blog';
    } else if (this.props.network === 'applemusic') {
      return 'Apple Music';
    }
    return `Find me on ${this.props.network}`;
  }

  link() {
    if (this.props.network === 'email') {
      return `mailto:${this.props.url}`;
    }
    return this.props.url
  }

  render() {
    return (
      <SocialIcon href={this.link()} title={this.title()}>
        <span className={`fa-layers fa-fw ${this.scale()} ${this.props.network}`}>
          <FontAwesomeIcon icon="square" size="lg" />
          <FontAwesomeIcon icon={this.icon()} size="xs" className="socialicon" />
        </span>
      </SocialIcon>
    );
  }
}

export default SocialMedia;
