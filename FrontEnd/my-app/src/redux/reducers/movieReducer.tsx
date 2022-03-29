import { ActionTypes } from "../constants/action-types"

const initialState = {
    movies : [],
};

export const movieReducer = (state=initialState, {type, payload} : any) => {

    switch(type) {
        case ActionTypes.SET_MOVIES:
            return {...state, movies:payload};
        case ActionTypes.FETCH_MOVIES:
            return {...state, movies:payload};
        default:
            return state;
    }
};


export const selectedMovieReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SELECTED_MOVIE:
            return { ...state, ...payload};
        case ActionTypes.REMOVE_SELECTED_MOVIE:
            return {};
        default:
            return state;
    }
}