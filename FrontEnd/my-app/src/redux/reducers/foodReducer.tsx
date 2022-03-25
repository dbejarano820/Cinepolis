import { ActionTypes } from "../constants/action-types"

const initialState = {
    foods : [
        {
            name : "PALOMITAS",
            price : 3000,
            image : 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
        },
    ],
};

export const foodReducer = (state=initialState, {type, payload} : any) => {

    switch(type) {
        case ActionTypes.SET_FOODS:
            return state;

        default:
            return state;
    }
};


export const selectedFoodReducer = (state = {}, {type, payload} : any) => {
    switch (type) {
        case ActionTypes.SELECTED_FOOD:
            return state;
        default:
            return state;
    }
}