import {AuthAPI} from "../api/api";
// import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';


let initialState = {
    id: null,
    email: null,
    isAuth: false,
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default: return state;
    }
}

export const setAuthUserData = (id, email, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id,
            email,
            isAuth
        }
    }
}


export const auth = () => async (dispatch) => {
    let data = await AuthAPI.auth();

    if (data.resultCode === 0) {
        let {id, email} = data.data;
        dispatch(setAuthUserData(id, email, true));
    }
}


export const login = (email, password) => async (dispatch) => {
    let data = await AuthAPI.login(email, password)
    if (data.resultCode === 0) {
        dispatch(auth());
    }
    else {
        let messages = data.messages.length > 0 ? data.messages[0] : "Some error";
        // dispatch(stopSubmit("login", {_error: messages}))
    }
}

export const logout = () => async (dispatch) => {
    let data = await AuthAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, false));
    }
}

export default loginReducer;