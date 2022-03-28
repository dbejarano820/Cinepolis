import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";
import { foodReducer, selectedFoodReducer } from './foodReducer'
import { tandaReducer, selectedTandaReducer } from "./tandaReducer";
import { seatReducer, selectedSeatReducer } from "./seatReducer";

const reducers = combineReducers({
    allMovies: movieReducer,
    movie: selectedMovieReducer,
    allFoods : foodReducer,
    food : selectedFoodReducer,
    allTandas: tandaReducer,
    tanda: selectedTandaReducer,
    allSeats : seatReducer,
    seat : selectedSeatReducer,
});

export default reducers;