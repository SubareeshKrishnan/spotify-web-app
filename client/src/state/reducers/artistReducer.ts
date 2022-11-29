import { TopArtistsActionType } from "../action-types";
import { ArtistState, ArtistAction } from "../actions";


const initialState: ArtistState = {
    loading: false,
    error: {
        message: "",
        status: -1
    },
    data: [{
        name: "",
        image: "",
        genre: ""
    }]
};

const reducer = (state: ArtistState = initialState, action: ArtistAction) => {
    switch (action.type) {
        case TopArtistsActionType.GET_TOP_ARTISTS:
            return { loading: true, error: false, data: initialState.data }
        case TopArtistsActionType.GET_TOP_ARTISTS_SUCCESS:
            return { loading: false, error: initialState.error, data: action.payload }
        case TopArtistsActionType.GET_TOP_ARTISTS_ERROR:
            return { loading: false, error: action.payload, data: initialState.data }

        default:
            return state;

    }
}

export default reducer;