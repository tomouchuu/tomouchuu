import twitter from 'twitter-text';
import {formatDistanceToNow} from 'date-fns';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

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
    <p className="my-2 text-lg">
      <a href={statusurl(tweet)} title={relativedate(tweet.status.created_at)} target="_blank" rel="noopener">
        <FontAwesomeIcon icon={faTwitter} size="lg" fixedWidth className="mr-1" />
      </a>
      <span dangerouslySetInnerHTML={text(tweet.status.full_text)} />
    </p>
  );
}

export default CurrentTweet;