import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import newsReducer from "./newsReducer";
import profileReducer from "./profileReducer";
import loginReducer from "./loginReducer";
import usersAdminReducer from "./usersAdminReducer";
import newsAdminReducer from "./newsAdminReducer";
import commentsAdminReducer from "./commentsAdminReducer";
import commentsReducer from "./commentsReducer";
import categoryReducer from "./categoryReducer";
import appReducer from "./appReducer";

import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    newsPage: newsReducer,
    profilePage: profileReducer,
    login: loginReducer,
    usersAdminPage: usersAdminReducer,
    newsAdminPage: newsAdminReducer,
    commentsAdminPage: commentsAdminReducer,
    comments: commentsReducer,
    category: categoryReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;