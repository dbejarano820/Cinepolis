import axios from "axios";
import { ActionTypes } from "../constants/action-types";


export const setMovies = (movies: any) => {
    return {
        type : ActionTypes.SET_MOVIES,
        payload : movies
    };
};


export const selectedMovie = (movie: any) => {
    return {
        type : ActionTypes.SELECTED_MOVIE,
        payload : movie
    };
};

export const removeSelectedMovie = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_MOVIE,
    };
};