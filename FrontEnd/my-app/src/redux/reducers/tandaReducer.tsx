import { ActionTypes } from "../constants/action-types"

const initialState = {
    tandas : [],
};

export const tandaReducer = (state=initialState, {type, payload} : any) => {

    switch(type) {
        case ActionTypes.SET_TANDAS:
            return {...state, tandas:payload};

        default:
            return state;
    }
};


export const selectedTandaReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SELECTED_TANDA:
            return { ...state, ...payload};
        case ActionTypes.REMOVE_SELECTED_TANDA:
            return {};
        default:
            return state;
    }
}