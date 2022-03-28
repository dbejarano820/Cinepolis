import { ActionTypes } from "../constants/action-types"

const initialState = {
    foods : [],
};

export const foodReducer = (state=initialState, {type, payload} : any) => {

    switch(type) {
        case ActionTypes.SET_FOODS:
            return {...state, foods:payload};
        default:
            return state;
    }
};


export const selectedFoodReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SELECTED_FOOD:
            return {...state, ...payload};
        case ActionTypes.REMOVE_SELECTED_FOOD:
            return {};
        default:
            return state;
    }
}

