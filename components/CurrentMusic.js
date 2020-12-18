import o from 'js-ordinal';

export const CurrentMusic = props => {
    const {music} = props;
    let {album, artist, track} = music;

    if (Object.keys(album).length < 1) { album = {url: '', name: 'Unknown'}; }
    if (Object.keys(artist).length < 1) { artist = {url: '', name: 'Unknown'}; }
    if (Object.keys(track).length < 1) { track = {url: '', name: 'Unknown', playedCount: 1}; }

    if (!track.playedCount) { track.playedCount = 1; }

    return (
        <p className="text-lg">
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