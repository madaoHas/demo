import {CategoryAPI} from "../api/api";

const SET_CATEGORY = 'SET_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY';

let initialState = {
    category: [],
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case ADD_CATEGORY:
            // let newMessage = {
            //     id: 4,
            //     message: action.newCategory
            // };
            return {
                ...state,
                category: [...state.category, action.newCategory]
            };
        default: return state;
    }
}

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category
    }
}

export const addCategoryAC = (newCategory) => {
    return {
        type: ADD_CATEGORY,
        newCategory
    }
}


export const getCategory = () => async (dispatch) => {
    // let data = await CategoryAPI.getCategory();
    // // console.log(data);
    // if (data) {
    //     dispatch(setCategory(data));
    // }
    // else {
    //     console.log('not found categories')
    // }
    try {
        let data = await CategoryAPI.getCategory();
        if (data.status === 200) {
            dispatch(setCategory(data.data));
        }
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = (name) => async (dispatch) => {
    try {
        let data = await CategoryAPI.addCategory(name)
        dispatch(getCategory());
    }
    catch (error) {
        console.log(error)
    }

}

export const deleteCategory = (id) => async (dispatch) => {
    let data = await CategoryAPI.deleteCategory(id)
    dispatch(setCategory(data.items));
}

export default categoryReducer;