import { ActionTypes } from "../constants/action-types";

export const setUser = (user: any) => {
    return {
        type : ActionTypes.SET_USER,
        payload : user
    };
};