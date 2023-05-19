import {NewsAPI, ProfileAPI} from "../api/api";

const SET_PROFILE = 'SET_PROFILE';
const SET_PASSWORD = 'SET_PASSWORD';

let initialState = {
    generalInfo: {},
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                generalInfo: action.generalInfo
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

export const setGeneralInfo = (name, surname, phone_number, city, birthday, avatar_url, email) => async (dispatch) => {
    try {
        await ProfileAPI.setGeneralInfo(name, surname, phone_number, city, birthday, avatar_url, email)
        dispatch(getGeneralInfo());
    }
    catch (error) {
        console.log(error);
    }

}

export const setPasswordProfile = (old_password, password, setStatus) => async (dispatch) => {
    try {
        await ProfileAPI.setPassword(old_password, password)
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            setStatus({error: 'Старый пароль неверен!'})
        }
    }
}



export default profileReducer;