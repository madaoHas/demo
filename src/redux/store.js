import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import newsReducer from "./newsReducer";
import profileReducer from "./profileReducer";

import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    newsPage: newsReducer,
    profilePage: profileReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;