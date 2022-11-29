import axios from "axios"
import { Dispatch } from "redux"
import { ArtistDetails } from "../../components/Artist"
import { TopArtistsActionType } from "../action-types"
import { Artist, ArtistAction } from "../actions"

export const getTopArtists = (accessToken: string) => {
    return async (dispatch: Dispatch<ArtistAction>) => {
        dispatch({
            type: TopArtistsActionType.GET_TOP_ARTISTS,
        });

        try {
            const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                params: {
                    'limit': 3,
                    'time_range': 'medium_term'
                }
            });
            const items: ArtistDetails[] = data.items;
            
            const details: Artist[] = items.map((item) => {
                return {
                    name: item.name,
                    genre: item.genres[0],
                    image: item.images[0].url
                };
            });
            dispatch({
                type: TopArtistsActionType.GET_TOP_ARTISTS_SUCCESS,
                payload: details
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: TopArtistsActionType.GET_TOP_ARTISTS_ERROR,
                    payload: error.response && error.response.data.error
                });
            }
        }
    }
}