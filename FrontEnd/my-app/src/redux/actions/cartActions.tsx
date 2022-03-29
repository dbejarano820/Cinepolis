import axios from "axios";
import { ActionTypes } from "../constants/action-types";


export const setCart = (items: any) => {
    return {
        type : ActionTypes.SET_CART,
        payload : items
    };
};
