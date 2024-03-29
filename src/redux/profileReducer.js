import {ProfileAPI} from "../api/api";

const SET_PROFILE = 'SET_PROFILE';

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
        dispatch(setProfile(data));
    }
    catch (error) {
        console.log(error)
    }

}

export const setGeneralInfo = (name, surname, phone_number, city, birthday, avatar_url, email, setStatus, setSubmitting) => async (dispatch) => {
    try {
        await ProfileAPI.setGeneralInfo(name, surname, phone_number, city, birthday, avatar_url, email)
        setStatus({success: 'Успешно измененно!', error: []})
        setSubmitting(false)
    }
    catch (error) {
        console.log(error);
        setStatus({error: 'Ой, что-то не так!'})
        setSubmitting(false)
    }

}

export const setPasswordProfile = (old_password, password, setStatus, setSubmitting) => async () => {
    try {
        await ProfileAPI.setPassword(old_password, password)
        setStatus({success: 'Успешно измененно!'})
        setSubmitting(false)
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            setStatus({error: 'Старый пароль неверен!'})
            setSubmitting(false)
        }
    }
}



export default profileReducer;