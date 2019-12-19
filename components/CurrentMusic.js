import o from 'js-ordinal';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeadphones} from '@fortawesome/free-solid-svg-icons';

const CurrentMusicText = styled.p`
    color: #fff;

    a {
        color: #fff;
    }
`;

export const CurrentMusic = props => {
    const {music} = props;
    return (
        <CurrentMusicText>
            <FontAwesomeIcon icon={faHeadphones} size="lg" fixedWidth style={{marginRight: '10px'}} />
            <a href={music.track.url} title={music.track.name} target="_blank">{music.track.name}</a>
            {' by '}
            <a href={music.artist.url} title={music.artist.name} target="_blank">{music.artist.name}</a>
            {' from '}
            <a href={music.album.url} title={music.album.name} target="_blank">{music.album.name}</a>
            {` for the ${o.toOrdinal(music.track.playedCount)} time`}
        </CurrentMusicText>
    );
}

export default CurrentMusic;