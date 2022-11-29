import { TopTracksActionType } from "../action-types";
import { TrackAction, TrackState } from "../actions";


const initialState: TrackState = {
    loading: false,
    error: {
        message: "",
        status: -1
    },
    data: [{
        trackName: "",
        albumName: "",
        image: "",
        artistName: ""
    }]
};

const reducer = (state: TrackState = initialState, action: TrackAction) => {
    switch (action.type) {
        case TopTracksActionType.GET_TOP_TRACKS:
            return { loading: true, error: false, data: initialState.data }
        case TopTracksActionType.GET_TOP_TRACKS_SUCCESS:
            return { loading: false, error: initialState.error, data: action.payload }
        case TopTracksActionType.GET_TOP_TRACKS_ERROR:
            return { loading: false, error: action.payload, data: initialState.data }

        default:
            return state;

    }
}

export default reducer;