import { combineReducers } from "redux";
import userDetailsReducer from "./userReducer";
import trackDetailsReducer from "./trackReducer";
import artistDetailsReducer from "./artistReducer";


const reducers = combineReducers({
    userDetails: userDetailsReducer,
    trackDetails: trackDetailsReducer,
    artistDetails: artistDetailsReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;