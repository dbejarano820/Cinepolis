import { createStore } from "redux";
import reducers from "./reducers"
//import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist';

/* const persistConfig = {
    key: 'root', 
    //storage,
};

const persistedReducers = persistReducer(persistConfig, reducers); */

const store = createStore(
    reducers, {}, 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );

const persistor = persistStore(store)

export default store;


