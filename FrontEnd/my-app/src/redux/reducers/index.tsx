import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";
import { foodReducer, selectedFoodReducer } from './foodReducer'
import { tandaReducer, selectedTandaReducer } from "./tandaReducer";

const reducers = combineReducers({
    allMovies: movieReducer,
    movie: selectedMovieReducer,
    allFoods : foodReducer,
    food : selectedFoodReducer,
    allTandas: tandaReducer,
    tanda: selectedMovieReducer,
});

export default reducers;