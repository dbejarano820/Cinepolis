import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";
import { tandaReducer, selectedTandaReducer } from "./tandaReducer";

const reducers = combineReducers({
    allMovies: movieReducer,
    movie: selectedMovieReducer,
    allTandas: tandaReducer,
    tanda: selectedMovieReducer,
});

export default reducers;