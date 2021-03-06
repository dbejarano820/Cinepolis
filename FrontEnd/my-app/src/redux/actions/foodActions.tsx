import { ActionTypes } from "../constants/action-types";

export const setFoods = (foods: any) => {
    return {
        type : ActionTypes.SET_FOODS,
        payload : foods
    };
};

export const selectedFood = (food: any) => {
    return {
        type : ActionTypes.SELECTED_FOOD,
        payload : food
    };
};


export const removeSelectedFood = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_FOOD,
    };
};