import {combineReducers} from "redux";
import { movieReducer, selectedMovieReducer } from "./movieReducer";
import { foodReducer, selectedFoodReducer } from './foodReducer'
import { tandaReducer, selectedTandaReducer } from "./tandaReducer";
import { seatReducer, selectedSeatReducer } from "./seatReducer";
import { selectedAdminUserReducer, selectedUserReducer, UserReducer } from "./userReducer";

const reducers = combineReducers({
    allUsers: UserReducer,
    adminUser: selectedAdminUserReducer,
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