import twitter from 'twitter-text';
import {formatDistanceToNow} from 'date-fns';

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
        <p className="text-lg">
            <a href={statusurl(tweet)} title={relativedate(tweet.status.created_at)} target="_blank">
                TW
            </a>
            <span dangerouslySetInnerHTML={text(tweet.status.full_text)} />
        </p>
    );
}

export default CurrentTweet;