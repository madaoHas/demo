import {NewsAPI} from "../api/api";

const SET_NEWS = 'SET_NEWS';
const SET_SELECTED_NEWS = 'SET_SELECTED_NEWS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';
const SET_CATEGORY_ID = 'SET_CATEGORY_ID'

let initialState = {
    news: [
    ],
    selectedNews: {},
    pager_out: {},
    idCategory: 0
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.data.data,
                pager_out: action.data.pager_out
            }
        case SET_SELECTED_NEWS:
            return {
                ...state,
                selectedNews: action.data
            }
        case SET_CATEGORY_ID:
            return {
                ...state,
                idCategory: action.idCategory
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

export const setCategoryId = (idCategory) => {
    return {
        type: SET_CATEGORY_ID,
        idCategory
    }
}


export const setSelectedNews = (data) => {
    return {
        type: SET_SELECTED_NEWS,
        data
    }
}
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setTotalNewsCount = (count) => {
    return{
        type: SET_TOTAL_NEWS_COUNT,
        count
    }
}

export const getNews = (categoryId, currentPage, pageSize) => async (dispatch) => {
    let data = await NewsAPI.getNews(categoryId, currentPage, pageSize)
    dispatch(setNews(data));
    dispatch(setCategoryId(categoryId))
}

export const getSelectedNews = (idNews) => async (dispatch) => {
    let data = await NewsAPI.getSelectedNews(idNews)
    dispatch(setSelectedNews(data));
}

export default newsReducer;