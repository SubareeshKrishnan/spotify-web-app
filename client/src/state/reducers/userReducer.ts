import { ActionType } from "../action-types";
import { Action, UserState } from "../actions";

const initialState: UserState = {
    loading: false,
    error: {
        status: -1, 
        message: ""
    },
    data: {
        id: "",
        name: "",
        images: [{
            url: "",
            height: 0,
            width: 0
        }],
        country: "",
        email: "",
        url: "",
        isLoggedIn: null,
        accessToken: "",
    }
}

const reducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.GET_USER_DETAILS:
            return { loading: true, error: false, data: initialState.data }
        case ActionType.GET_USER_DETAILS_SUCCESS:
            return { loading: false, error: initialState.error, data: action.payload }
        case ActionType.GET_USER_DETAILS_ERROR:
            return { loading: false, error: action.payload, data: initialState.data }

        default:
            return state;

    }
}

export default reducer;