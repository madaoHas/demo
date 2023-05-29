import {CategoryAPI} from "../api/api";
import {getComments} from "./commentsAdminReducer";

const SET_CATEGORY = 'SET_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY';
const SET_PAGE = 'SET_PAGE';
const SET_FILTER_CATEGORIES = 'SET_FILTER_CATEGORIES';

let initialState = {
    category: [],
    pager_out: {},
    filters: {
        id: null,
        name: ""
    }
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
        case SET_FILTER_CATEGORIES:
            return {
                ...state,
                filters: action.filter
            }
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

export const setFilterCategories = (filter) => {
    return {
        type: SET_FILTER_CATEGORIES,
        filter
    }
}

export const setFiltersCategories = (filterName, valueName) => async (dispatch, getState) => {
    try {
        let filter = getState().category.filters;
        filter[filterName] = valueName
        dispatch(setFilterCategories(filter))
        dispatch(getCategoryAdmin(getState().category.filters, 1, 10))
    }
    catch (error) {
        console.log(error)
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

export const getCategoryAdmin = (filter, page, limit) => async (dispatch, getState) => {
    try {
        let data = await CategoryAPI.getCategoryAdmin(getState().category.filters, page, limit);
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
        dispatch(getCategoryAdmin(1, 10));
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
        dispatch(getCategoryAdmin(1, 10));
    }
    catch (error) {
        console.log(error)
        // if (error.response.status === 400) {
        //     setStatus({error: 'Такая категория уже есть!'})
        // }
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        await CategoryAPI.deleteCategory(id)
        dispatch(getCategoryAdmin(getState().category.filters, 1, 10));
    }
    catch (error) {

    }

}

export default categoryReducer;