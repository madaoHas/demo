import {CategoryAPI} from "../api/api";

const SET_CATEGORY = 'SET_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY';

let initialState = {
    category: [
        {
            id: 1,
            category: "sport"
        },
        {
            id: 2,
            category: "all"
        },
        {
            id: 3,
            category: "gintama"
        },
    ],
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
    let data = await CategoryAPI.getCategory()
    dispatch(setCategory(data.items));
}

export const addCategory = (category) => async (dispatch) => {
    let data = await CategoryAPI.addCategory(category)
    dispatch(addCategoryAC(data.items));
}

export const deleteCategory = (id) => async (dispatch) => {
    let data = await CategoryAPI.deleteCategory(id)
    dispatch(setCategory(data.items));
}

export default categoryReducer;