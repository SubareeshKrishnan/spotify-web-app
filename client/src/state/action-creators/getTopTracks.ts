import axios from "axios"
import { Dispatch } from "redux"
import { TrackDetails } from "../../components/Track"
import { TopTracksActionType } from "../action-types"
import { Track, TrackAction } from "../actions"

export const getTopTracks = (accessToken: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        dispatch({
            type: TopTracksActionType.GET_TOP_TRACKS,
        });

        try {
            const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                params: {
                    'limit': 10,
                    'time_range': 'medium_term'
                }
            });
            const items: TrackDetails[] = data.items;
            
            const details: Track[] = items.map((item) => {
                return {
                    trackName: item.name,
                    albumName: item.album.name,
                    image: item.album.images[0].url,
                    artistName: item.album.artists[0].name
                };
            });
            console.log(details);
            
            dispatch({
                type: TopTracksActionType.GET_TOP_TRACKS_SUCCESS,
                payload: details
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: TopTracksActionType.GET_TOP_TRACKS_ERROR,
                    payload: error.response && error.response.data.error
                });
            }
        }
    }
}