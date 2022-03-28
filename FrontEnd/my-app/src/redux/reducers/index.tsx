import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";
import { foodReducer, selectedFoodReducer } from './foodReducer'
import { tandaReducer, selectedTandaReducer } from "./tandaReducer";
import { seatReducer, selectedSeatReducer } from "./seatReducer";
import { selectedUserReducer } from "./userReducer";

const reducers = combineReducers({
    user: selectedUserReducer,

    allMovies: movieReducer,
    movie: selectedMovieReducer,

    allTandas: tandaReducer,
    tanda: selectedTandaReducer,
    allSeats : seatReducer,
    seat : selectedSeatReducer,

    allFoods : foodReducer,
    food : selectedFoodReducer,
    
});

export default reducers;