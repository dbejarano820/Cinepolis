import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";

const reducers = combineReducers({
    allMovies: movieReducer,
    movie: selectedMovieReducer,
});

export default reducers;