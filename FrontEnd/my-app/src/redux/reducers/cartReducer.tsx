import { ActionTypes } from "../constants/action-types"

const initialState = {
    items : [],
};

export const cartReducer = (state=initialState, {type, payload} : any) => {

    switch(type) {
        case ActionTypes.SET_CART:
            return {...state, items:payload};
        default:
            return state;
    }
};
