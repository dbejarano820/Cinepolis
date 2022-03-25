import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";
import { foodReducer, selectedFoodReducer } from './foodReducer'

const reducers = combineReducers({
    allMovies: movieReducer,
    movie: selectedMovieReducer,
    allFoods : foodReducer,
    food : selectedFoodReducer
});

export default reducers;