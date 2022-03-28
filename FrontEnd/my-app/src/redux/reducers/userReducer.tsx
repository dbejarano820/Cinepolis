import { ActionTypes } from "../constants/action-types"

export const selectedUserReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SET_USER:
            return { ...state, ...payload};
        case ActionTypes.REMOVE_USER:
            return {};
        default:
            return state;
    }
}