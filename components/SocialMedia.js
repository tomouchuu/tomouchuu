import React from 'react'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faFileAlt, faNewspaper} from '@fortawesome/free-regular-svg-icons';
library.add(fab, faSquare, faEnvelope, faFileAlt, faNewspaper);

export class SocialMedia extends React.Component {
  icon() {
    if (this.props.network === 'email') {
      return ['far', 'envelope'];
    } else if (this.props.network === 'blog') {
      return ['far', 'newspaper'];
    } else if (this.props.network === 'applemusic') {
      return ['fab', 'itunes-note'];
    } else if (this.props.network === 'cv') {
      return ['far', 'file-alt'];
    }
    return ['fab', this.props.network];
  }

  scale() {
    if (this.props.scale) { return `fa-${this.props.scale}`; }
    return 'fa-lg';
  }

  title() {
    if (this.props.network === 'email') {
      return 'Email me';
    } else if (this.props.network === 'blog') {
      return 'My blog';
    } else if (this.props.network === 'applemusic') {
      return 'Apple Music';
    } else if (this.props.network === 'cv') {
      return 'My CV';
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
      <a href={this.link()} title={this.title()} rel="noopener">
        <span className={`m-1 fa-layers fa-fw ${this.scale()} socials ${this.props.network}`}>
          <FontAwesomeIcon icon="square" size="lg" />
          <FontAwesomeIcon icon={this.icon()} size="xs" className="socialicon" />
        </span>
      </a>
    );
  }
}

export default SocialMedia;