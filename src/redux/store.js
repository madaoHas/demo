import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import newsReducer from "./newsReducer";
import profileReducer from "./profileReducer";
import loginReducer from "./loginReducer";
import usersAdminReducer from "./usersAdminReducer";
import commentsReducer from "./commentsReducer";
import categoryReducer from "./categoryReducer";

import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    newsPage: newsReducer,
    profilePage: profileReducer,
    login: loginReducer,
    usersAdminPage: usersAdminReducer,
    comments: commentsReducer,
    category: categoryReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;