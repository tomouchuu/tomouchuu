import { api } from "~/lib/api";
import type { LastfmData } from "~/server/api/routers/lastfm";

export const lastfmQueryOpts = () => ({
  queryKey: ["lastfmData"],
  queryFn: async () => {
    try {
      const initialData = await api.lastfm.getLatest.query();

      const albumInfo = await api.lastfm.getAlbumInfo.query({
        album: initialData.album,
        artist: initialData.artist,
      });
      const artistInfo = await api.lastfm.getArtistInfo.query(
        initialData.artist,
      );
      const trackInfo = await api.lastfm.getTrackInfo.query({
        artist: initialData.artist,
        track: initialData.track,
      });

      return {
        album: albumInfo,
        artist: artistInfo,
        track: trackInfo,
        isLive: initialData.isLive,
      } as LastfmData;
    } catch (error) {
      console.error(error);
    }
  },
  staleTime: 1000 * 60 * 2, // 2 minutes
  throwOnError: false,
  placeholderData: {
    album: {
      name: "Loading...",
      playedCount: 0,
      url: "",
    },
    artist: {
      name: "Loading...",
      playedCount: 0,
      url: "",
    },
    track: {
      name: "Loading...",
      playedCount: 0,
      url: "",
    },
    isLive: false,
  },
});
