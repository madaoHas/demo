import {NewsAPI, ProfileAPI} from "../api/api";

const SET_PROFILE = 'SET_PROFILE';
const SET_PASSWORD = 'SET_PASSWORD';

let initialState = {
    generalInfo: {},
    password: ''
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                generalInfo: action.generalInfo
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.password
            }
        default: return state;
    }
}

export const setProfile = (generalInfo) => {
    return {
        type: SET_PROFILE,
        generalInfo
    }
}

export const setPassword = (password) => {
    return {
        type: SET_PASSWORD,
        password
    }
}

export const getGeneralInfo = () => async (dispatch) => {
    try {
        let data = await ProfileAPI.getGeneralInfo()
        console.log(data);
        dispatch(setProfile(data));
    }
    catch (error) {
        console.log(error)
    }

}

export const setGeneralInfo = (name, surname, phone_number, city, birthday, avatar_url) => async (dispatch) => {
    try {
        await ProfileAPI.setGeneralInfo(name, surname, phone_number, city, birthday, avatar_url)
        dispatch(getGeneralInfo());
    }
    catch (error) {
        console.log(error);
    }

}

export const getPassword = () => async (dispatch) => {
    let data = await ProfileAPI.getPassword()
    dispatch(setPassword(data.items));
}



export default profileReducer;