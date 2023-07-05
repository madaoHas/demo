import {NewsAdminAPI} from "../api/api";
import {setFiltersInState} from "../helpers";

const SET_NEWS = 'newsAdminPage/SET_NEWS';
const SET_NEWS_ITEM = 'newsAdminPage/SET_NEWS_ITEM'
const CHANGE_FILTER = 'newsAdminPage/CHANGE_FILTER'
const CHANGE_TEXT_FILTER = 'newsAdminPage/CHANGE_TEXT_FILTER'
const CHANGE_PAGE = 'newsAdminPage/CHANGE_PAGE'
const SET_CATEGORIES = 'adminNews/SET_CATEGORIES'

let initialState = {
    news: [],
    newsItem: {},
    pager_out: {
        page: 1,
        limit: 10
    },
    pagesCount: '',
    filters: {
        id: null,
        category_id: null,
        title: null,
        date: null,
        is_active: null
    },
    textFilters: {
        id: undefined,
        title: undefined
    },
    categories: [],
}

const newsAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.data.data,
                pagesCount: action.pagesCount
            }
        case SET_NEWS_ITEM:
            return {
                ...state,
                newsItem: action.data
            }
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
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories
            }
        }
        default: return state;
    }
}

export const setNews = (data, pagesCount) => {
    return {
        type: SET_NEWS,
        data,
        pagesCount
    }
}

export function setCategories(categories) {
    return {type: SET_CATEGORIES, categories: categories}
}

export const setNewsItem = (data) => {
    return {
        type: SET_NEWS_ITEM,
        data
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
    let filter = setFiltersInState(getState().newsAdminPage.filters, filters)
    dispatch(changeFilter(filter))
}

// export const filterMobileNews = (filterName, valueName) => async (dispatch) => {
//     try {
//         let filter = {[filterName]: valueName}
//         let data = await NewsAdminAPI.getNews(filter, 1, 10)
//         dispatch(setNews(data));
//         dispatch(setNewsItem({}));
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

export const getNews = () => async (dispatch, getState) => {
    try {
        let data = await NewsAdminAPI.getNews(getState().newsAdminPage.filters, getState().newsAdminPage.pager_out.page, getState().newsAdminPage.pager_out.limit)
        dispatch(setNews(data, data.pager_out.count));
        dispatch(setNewsItem({}));
        dispatch(requestCategories())
    }
    catch (error) {
        console.log(error)
    }
}

export const requestCategories = () => async (dispatch) => {
    let response = await NewsAdminAPI.getCategories()
    if(response.status === 200){
        dispatch(setCategories(response.data))
    }
}

export const getNewsItem = (id) => async (dispatch) => {
    try {
        let data = await NewsAdminAPI.getNewsItem(id);
        dispatch(setNewsItem(data));
    }
    catch (error) {
        console.log(error)
        dispatch(setNewsItem({error: 'Новость не найдена'}));
    }
}

export const addNews = (categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, setStatus, setSubmitting) => async (dispatch) => {
    try {
        await NewsAdminAPI.addNews(categoryId, title, previewText, previewImageUrl, text, textImageUrl, date)
        setStatus({success: 'Новость добавлена', error: []})
        setSubmitting(false)
        // dispatch(getNews({},1, 10))
    }
    catch ( error ) {
        console.log(error)
        setStatus({error: 'Что-то не так'})
        setSubmitting(false)
    }
}

export const updateNews = (id, categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, isActive, setStatus, setSubmitting) => async (dispatch) => {
    try {
        await NewsAdminAPI.updateNews(id, categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, isActive)
        setStatus({success: 'Новость обновлена', error: []})
        setSubmitting(false)
        // dispatch(getNews({},1, 10))
    }
    catch ( error ) {
        console.log(error)
        setStatus({error: 'Что-то не так'})
        setSubmitting(false)
    }
}

export const updateActiveNews = (id, is_active, page = 1, limit = 10) => async (dispatch, getState) => {
    try {
        await NewsAdminAPI.updateActive(id, is_active)
        dispatch(getNews(getState().newsAdminPage.filters, page, limit))
    }
    catch ( error ) {
        console.log(error)
    }
}

export const deleteNews = (id, page = 1, limit = 10) => async (dispatch, getState) => {
    try {
        await NewsAdminAPI.deleteNews(id)
        dispatch(getNews(getState().newsAdminPage.filters, page, limit))
    }
    catch ( error ) {
        console.log(error)
    }
}


export default newsAdminReducer;