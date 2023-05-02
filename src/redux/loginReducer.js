import {AuthAPI} from "../api/api";
// import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';


let initialState = {
    id: 1,
    email: "fgfgere@gmail.com",
    isAuth: true,
    role: "admin"
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

export const setAuthUserData = (id, email, isAuth, role) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id,
            email,
            isAuth,
            role
        }
    }
}

export const registration = (email, password) => async (dispatch) => {
    try {
        let data = await AuthAPI.registration(email, password);
        console.log(data);
        // dispatch
    }
    catch (error) {
        console.log(error);
    }

}

export const auth = (token) => async (dispatch) => {
    try {
        let data = await AuthAPI.auth(token);
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }

    // if (data.resultCode === 0) {
    //     let {id, email, role} = data.data;
    //     dispatch(setAuthUserData(id, email, true, role));
    // }
}


export const login = (email, password) => async (dispatch) => {
    try {
        let data = await AuthAPI.login(email, password)
        console.log(data);
        // dispatch(auth(data.token))
    }
    catch (error) {
        console.log(error)
    }
    // if (data.resultCode === 0) {
    //     // dispatch(auth());
    // }
    // else {
    //     let messages = data.messages.length > 0 ? data.messages[0] : "Some error";
    //     // dispatch(stopSubmit("login", {_error: messages}))
    // }
}

export const logout = () => async (dispatch) => {
    let data = await AuthAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, false));
    }
}

export default loginReducer;