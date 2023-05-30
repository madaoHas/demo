import {AuthAPI} from "../api/api";
// import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_HASH = 'auth/SET_HASH'


let initialState = {
    auth: {},
    hashRight: true
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                auth: action.userInfo
            }
        case SET_HASH:
            return {
                ...state,
                hashRight: action.hashResult
            }
        default: return state;
    }
}

export const setAuthUserData = (userInfo) => {
    return {
        type: SET_USER_DATA,
        userInfo
    }
}

export const setHash = (hashResult) => {
    return {
        type: SET_HASH,
        hashResult
    }
}

export const registration = (email, password, setStatus) => async (dispatch) => {
    try {
        let data = await AuthAPI.registration(email, password);
        console.log(data);
        setStatus({success: 'Регистрация прошла успешно'})
        // dispatch
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            setStatus({error: 'Пользователь с таким email уже существует'})
        }
    }

}

export const auth = () => async (dispatch) => {
    try {
        let data = await AuthAPI.auth();
        dispatch(setAuthUserData(data));
    }
    catch (error) {
        console.log(error)
    }
}


export const login = (email, password, setStatus) => async (dispatch) => {
    try {
        let data = await AuthAPI.login(email, password);
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        dispatch(auth());
    }
    catch (error) {
        console.log(error.response.status)
        if (error.response.status === 401) {
            setStatus({error: 'Неверный логин или пароль'})
        }
        if (error.response.status === 400) {
            setStatus({error: 'Такого пользователя нет в системе'})
        }
    }
}

export const logout = () => async (dispatch) => {
    try {
        await AuthAPI.logout();
        // localStorage.clear();
        dispatch(setAuthUserData(null));
        // if (data.resultCode === 0) {
        //     dispatch(setAuthUserData(null, null, false));
        // }
    }
    catch(error) {
        console.log(error);
    }
}

export const recoveryPassword = (email, setStatus) => async (dispatch) => {
    try {
        await AuthAPI.recovery(email);
        setStatus({success: 'Отправлено письмо на почту'})
    }
    catch(error) {
        console.log(error);
    }
}

export const checkHash = (hash) => async (dispatch) => {
    try {
        await AuthAPI.checkHash(hash);
        dispatch(setHash(true))
    }
    catch (error) {
        console.log(error)
        dispatch(setHash(false))
    }
}

export const changePassword = (password, hash, setStatus) => async (dispatch) => {
    try {
        await AuthAPI.changePassword(password, hash);
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 400) {
            setStatus({error: 'Ой, что-то пошло не так'})
        }
    }
}

export default loginReducer;