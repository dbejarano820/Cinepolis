import { ActionTypes } from "../constants/action-types";

export const setSeats = (seats: any) => {
    return {
        type : ActionTypes.SET_SEATS,
        payload : seats
    };
};

export const setSeatMap = (seats: any) => {
    return {
        type : ActionTypes.SET_SEAT_MAP,
        payload : seats
    };
};


export const setAmountSelectedSeats = (seats: any) => {
    return {
        type : ActionTypes.SET_AMOUNT_SELECTED_SEATS,
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