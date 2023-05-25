import {CategoryAPI} from "../api/api";

const SET_CATEGORY = 'SET_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY';
const SET_PAGE = 'SET_PAGE'

let initialState = {
    category: [],
    pager_out: {}
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case SET_PAGE:
            return {
                ...state,
                pager_out: action.pager_out
            }
        case ADD_CATEGORY:
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

export const setPage = (pager_out) => {
    return {
        type: SET_PAGE,
        pager_out
    }
}

export const addCategoryAC = (newCategory) => {
    return {
        type: ADD_CATEGORY,
        newCategory
    }
}


export const getCategory = () => async (dispatch) => {
    try {
        let data = await CategoryAPI.getCategory();
        if (data.status === 200) {
            dispatch(setCategory(data.data));
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCategoryAdmin = (page, limit) => async (dispatch) => {
    try {
        let data = await CategoryAPI.getCategoryAdmin(page, limit);
        if (data.status === 200) {
            dispatch(setCategory(data.data.data));
            dispatch(setPage(data.data.pager_out))
        }
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = (name, setStatus) => async (dispatch) => {
    try {
        await CategoryAPI.addCategory(name)
        dispatch(getCategoryAdmin());
    }
    catch (error) {
        if (error.response.status === 400) {
            setStatus({error: 'Такая категория уже есть!'})
        }
    }
}

export const updateCategory = (id, name, setStatus) => async (dispatch) => {
    try {
        console.log(name)
        await CategoryAPI.updateCategory(id, name)
        dispatch(getCategoryAdmin());
    }
    catch (error) {
        console.log(error)
        // if (error.response.status === 400) {
        //     setStatus({error: 'Такая категория уже есть!'})
        // }
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await CategoryAPI.deleteCategory(id)
        dispatch(getCategoryAdmin());
    }
    catch (error) {

    }

}

export default categoryReducer;