import React from 'react'
import styled from 'styled-components';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faFileAlt, faNewspaper} from '@fortawesome/pro-light-svg-icons';
library.add(fab, faSquare, faEnvelope, faFileAlt, faNewspaper);

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
    span {
        transition: color .6s;
        &:hover {
            transition: color .3s;
        }
    }


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

    & .cv {
        color: #fff;
        &:hover {
            color: #111;
            .socialicon {
                color: #fff;
            }
        }

        .socialicon {
            color: #111;
        }
    }

    & .socialicon {
        color: #fff;
    }
`;

export class SocialMedia extends React.Component {
    icon() {
        if (this.props.network === 'email') {
            return ['fal', 'envelope'];
        } else if (this.props.network === 'blog') {
            return ['fal', 'newspaper'];
        } else if (this.props.network === 'applemusic') {
            return ['fab', 'itunes-note'];
        } else if (this.props.network === 'cv') {
            return ['fal', 'file-alt'];
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