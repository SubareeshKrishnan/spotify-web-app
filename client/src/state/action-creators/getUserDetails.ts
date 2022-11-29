import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action, User } from "../actions";


export const getUserDetails = (accessToken: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_USER_DETAILS
        });

        try {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            console.log(data);
            
            const details: User = {
                id: data.id,
                name: data.display_name,
                images: data.images,
                isLoggedIn: true,
                country: data.country,
                email: data.email,
                url: data.external_urls.spotify,
                accessToken: accessToken,
            }

            dispatch({
                type: ActionType.GET_USER_DETAILS_SUCCESS,
                payload: details
            });
        } catch(error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response && error.response.data.error);
                dispatch({
                    type: ActionType.GET_USER_DETAILS_ERROR,
                    payload: error.response && error.response.data.error
                })
            }
        }   
    }
}