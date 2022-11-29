import { ActionType } from "../action-types";

export interface Image {
    url: string,
    height: number,
    width: number
}

export interface User {
    id: string;
    name: string;
    images: Image[];
    accessToken: string;
    country: string,
    email: string,
    url: string,
    isLoggedIn: boolean | null;
}

export interface UserState {
    loading: boolean;
    error: Error;
    data: User;
}

export interface Error {
    status: number,
    message: string
}

interface GetUserDetailsAction {
    type: ActionType.GET_USER_DETAILS;
}

interface GetUserDetailsSuccessAction {
    type: ActionType.GET_USER_DETAILS_SUCCESS,
    payload: User
}

interface GetUserDetailsErrorAction {
    type: ActionType.GET_USER_DETAILS_ERROR,
    payload: Error
}

export type Action = GetUserDetailsAction | GetUserDetailsSuccessAction | GetUserDetailsErrorAction;
