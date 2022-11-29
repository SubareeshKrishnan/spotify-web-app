import { Error } from ".";
import { TopArtistsActionType } from "../action-types";

export interface Artist {
    image: string,
    name: string,
    genre: string
}

export interface ArtistState {
    loading: boolean,
    error: Error,
    data: Artist[]
}

interface GetTopArtistsAction {
    type: TopArtistsActionType.GET_TOP_ARTISTS;
}

interface GetTopArtistsSuccessAction {
    type: TopArtistsActionType.GET_TOP_ARTISTS_SUCCESS,
    payload: Artist[]
}

interface GetTopArtistsErrorAction {
    type: TopArtistsActionType.GET_TOP_ARTISTS_ERROR,
    payload: Error
}

export type ArtistAction = GetTopArtistsAction | GetTopArtistsSuccessAction | GetTopArtistsErrorAction;