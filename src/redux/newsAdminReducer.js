import { NewsAdminAPI } from "../api/api";

const SET_NEWS = 'SET_NEWS';
const SET_NEWS_ITEM = 'SET_NEWS_ITEM'
const SET_FILTER = 'SET_FILTER'
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    news: [],
    newsItem: {},
    pagerOut: {},
    filters: {
        id: null,
        category_id: null,
        title: "",
        date: "",
        is_active: null
    }
}

const newsAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.data.data,
                pagerOut: action.data.pager_out
            }
        case SET_NEWS_ITEM:
            return {
                ...state,
                newsItem: action.data
            }
        case SET_FILTER:
            return {
                ...state,
                filters: action.filter
            }
        default: return state;
    }
}

export const setNews = (data) => {
    return {
        type: SET_NEWS,
        data
    }
}

export const setNewsItem = (data) => {
    return {
        type: SET_NEWS_ITEM,
        data
    }
}

export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter
    }
}


export const setFiltersNews = (filterName, valueName) => async (dispatch, getState) => {
    try {
        let filter = getState().newsAdminPage.filters;
        filter[filterName] = valueName
        dispatch(setFilter(filter))
        dispatch(getNews(getState().newsAdminPage.filters, 1, 10))
    }
    catch (error) {
        console.log(error)
    }
}

export const getNews = (filters, currentPage, limit) => async (dispatch, getState) => {
    try {
        let data = await NewsAdminAPI.getNews(getState().newsAdminPage.filters, currentPage, limit)
        dispatch(setNews(data));
        dispatch(setNewsItem({}));
    }
    catch (error) {
        console.log(error)
    }
}

export const getNewsItem = (id) => async (dispatch) => {
    try {
        let data = await NewsAdminAPI.getNewsItem(id);
        dispatch(setNewsItem(data));
    }
    catch (error) {
        console.log(error)
    }
}

export const addNews = (categoryId, title, previewText, previewImageUrl, text, textImageUrl, date) => async (dispatch, getState) => {
    try {
        await NewsAdminAPI.addNews(categoryId, title, previewText, previewImageUrl, text, textImageUrl, date)
        dispatch(getNews({},1, 10))
    }
    catch ( error ) {
        console.log(error)
    }
}

export const updateNews = (id, categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, isActive) => async (dispatch, getState) => {
    try {
        await NewsAdminAPI.updateNews(id, categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, isActive)
        dispatch(getNews({},1, 10))
    }
    catch ( error ) {
        console.log(error)
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





// export const getSelectedNews = (idNews) => async (dispatch) => {
//     let data = await NewsAPI.getSelectedNews(idNews)
//     dispatch(setNews(data.items));
// }

export default newsAdminReducer;