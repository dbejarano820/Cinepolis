import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const fetchMovies = () => async (dispatch: any) => {
//
  };
  
  export const fetchMovie = (movieTitle: any) => async (dispatch: any) => {
    const response : any = await axios
    .get(`http://localhost:5001/api/movies/${movieTitle}`)
    .catch((err) => {
        console.log("Err: ", err);
    });
    dispatch({ type: ActionTypes.SELECTED_MOVIE, payload: response.data });

    const response2 : any = await axios
    .get(`http://localhost:5001/api/movies/tandas/${movieTitle}`)
    .catch((err) => {
        console.log("Err: ", err);
    });
    dispatch({ type: ActionTypes.SET_TANDAS, payload: response2.data });

  };

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