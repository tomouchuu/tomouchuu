import o from 'js-ordinal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeadphones} from '@fortawesome/free-solid-svg-icons';

export const CurrentMusic = props => {
    const {music} = props;
    let {album, artist, track} = music;

    if (Object.keys(album).length < 1) { album = {url: '', name: 'Unknown'}; }
    if (Object.keys(artist).length < 1) { artist = {url: '', name: 'Unknown'}; }
    if (Object.keys(track).length < 1) { track = {url: '', name: 'Unknown', playedCount: 1}; }

    if (!track.playedCount) { track.playedCount = 1; }

    return (
        <p className="my-2 text-lg">
            <FontAwesomeIcon icon={faHeadphones} size="lg" fixedWidth className="mr-1" />
            <a href={track.url} title={track.name} target="_blank">{track.name}</a>
            {' by '}
            <a href={artist.url} title={artist.name} target="_blank">{artist.name}</a>
            {' from '}
            <a href={album.url} title={album.name} target="_blank">{album.name}</a>
            {` for the `}
            <span className="ordinal">{o.toOrdinal(track.playedCount)}</span>
            {` time`}
        </p>
    );
}

export default CurrentMusic;