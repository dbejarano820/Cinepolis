import { ActionTypes } from "../constants/action-types"

const initialState = {
    seats : [],
};

export const seatReducer = (state=initialState, {type, payload} : any) => {

    switch(type) {
        case ActionTypes.SET_SEATS:
            return {...state, seats:payload};
        default:
            return state;
    }
};


export const selectedSeatReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SELECTED_SEAT:
            return { ...state, ...payload};
        case ActionTypes.REMOVE_SELECTED_SEAT:
            return {};
        default:
            return state;
    }
}