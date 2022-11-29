import { Error } from ".";
import { TopTracksActionType } from "../action-types";

export interface Track {
    trackName: string,
    albumName: string,
    image: string,
    artistName: string
}

export interface TrackState {
    loading: boolean,
    error: Error,
    data: Track[]
}

interface GetTopTracksAction {
    type: TopTracksActionType.GET_TOP_TRACKS;
}

interface GetTopTracksSuccessAction {
    type: TopTracksActionType.GET_TOP_TRACKS_SUCCESS,
    payload: Track[]
}

interface GetTopTracksErrorAction {
    type: TopTracksActionType.GET_TOP_TRACKS_ERROR,
    payload: Error
}

export type TrackAction = GetTopTracksAction | GetTopTracksSuccessAction | GetTopTracksErrorAction;