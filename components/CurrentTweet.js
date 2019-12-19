import twitter from 'twitter-text';
import {formatDistanceToNow} from 'date-fns';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

const CurrentTweetText = styled.p`
    color: #fff;

    a {
        color: #fff;
    }
`;

function text(text) {
    return {__html: twitter.autoLink(text)};
  }

function relativedate(time) {
    return formatDistanceToNow(new Date(time), {addSuffix: true});
}

function statusurl(tweet) {
    return `https://twitter.com/${tweet.screen_name}/status/${tweet.status.id}`;
}

export const CurrentTweet = props => {
    const {tweet} = props;
    return (
        <CurrentTweetText>
            <a href={statusurl(tweet)} title={relativedate(tweet.status.created_at)} target="_blank">
                <FontAwesomeIcon icon={faTwitter} size="lg" fixedWidth style={{marginRight: '10px'}} />
            </a>
            <span dangerouslySetInnerHTML={text(tweet.status.full_text)} />
        </CurrentTweetText>
    );
}

export default CurrentTweet;