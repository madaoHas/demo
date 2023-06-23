import {CategoryAPI} from "../api/api";
import {setFiltersInState} from "../helpers";

const SET_CATEGORY = 'SET_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY';
const SET_PAGE = 'SET_PAGE';
const CHANGE_FILTER = 'category/CHANGE_FILTER'
const CHANGE_TEXT_FILTER = 'category/CHANGE_TEXT_FILTER'
const CHANGE_PAGE = 'category/CHANGE_PAGE'

let initialState = {
    category: [],
    pager_out: {
        page: 1,
        limit: 10
    },
    pagesCount: '',
    filters: {
        id: null,
        name: null
    },
    textFilters: {
        id: undefined,
        name: undefined
    },
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category,
                pagesCount: action.pagesCount
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
        case CHANGE_FILTER: {
            return {
                ...state,
                filters: action.filter
            }
        }
        case CHANGE_TEXT_FILTER: {
            return {
                ...state,
                textFilters: {...state.textFilters, [action.filterName]: action.filterValue}
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                pager_out: {...state.pager_out, page: action.page}
            }
        }
        default: return state;
    }
}

export const setCategory = (category, pagesCount) => {
    return {
        type: SET_CATEGORY,
        category,
        pagesCount
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

export function changeFilter(filter){
    return{type: CHANGE_FILTER, filter: filter}
}
export function setFilterTemporary(filterName, filterValue) {
    return {type: CHANGE_TEXT_FILTER, filterValue, filterName}
}
export function changePage(page){
    return{type: CHANGE_PAGE, page: page}
}

export const setFilters = (filters) => async(dispatch, getState) => {
    let filter = setFiltersInState(getState().category.filters, filters)
    dispatch(changeFilter(filter))
}

// export const filterMobileCategories = (filterName, valueName) => async (dispatch) => {
//     try {
//         let filter = {[filterName]: valueName}
//         let data = await CategoryAPI.getCategoryAdmin(filter, 1, 10);
//         dispatch(setCategory(data.data.data));
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

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

export const getCategoryAdmin = () => async (dispatch, getState) => {
    try {
        let data = await CategoryAPI.getCategoryAdmin(getState().category.filters, getState().category.pager_out.page, getState().category.pager_out.limit);
        if (data.status === 200) {
            dispatch(setCategory(data.data.data, data.data.pager_out.count));
            // dispatch(setPage(data.data.pager_out));
        }
        // getState().category.filters = {}
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = (name, setStatus) => async (dispatch) => {
    try {
        await CategoryAPI.addCategory(name)
        dispatch(getCategoryAdmin({}, 1, 10));
    }
    catch (error) {
        if (error.response.status === 400) {
            setStatus({error: 'Такая категория уже есть!'})
        }
    }
}

export const updateCategory = (id, name) => async (dispatch) => {
    try {
        console.log(name)
        await CategoryAPI.updateCategory(id, name)
        dispatch(getCategoryAdmin({}, 1, 10));
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        await CategoryAPI.deleteCategory(id)
        dispatch(getCategoryAdmin(getState().category.filters, 1, 10));
    }
    catch (error) {
        console.log(error)
    }
}

export default categoryReducer;