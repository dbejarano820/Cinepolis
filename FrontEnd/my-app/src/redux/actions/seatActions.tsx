import { ActionTypes } from "../constants/action-types";

export const setSeats = (seats: any) => {
    return {
        type : ActionTypes.SET_SEATS,
        payload : seats
    };
};

export const selectedSeat = (seat: any) => {
    return {
        type : ActionTypes.SELECTED_SEAT,
        payload : seat
    };
};

export const removeSelectedSeat = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_SEAT,
    };
};