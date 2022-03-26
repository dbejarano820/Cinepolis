import { ActionTypes } from "../constants/action-types";

export const setTandas = (tandas: any) => {
    return {
        type : ActionTypes.SET_TANDAS,
        payload : tandas
    };
};

export const removeSetTandas = () => {
    return {
        type : ActionTypes.REMOVE_SET_TANDAS,
    };
};

export const selectedTanda = (tanda: any) => {
    return {
        type : ActionTypes.SELECTED_TANDA,
        payload : tanda
    };
};

export const removeSelectedTanda = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_TANDA,
    };
};