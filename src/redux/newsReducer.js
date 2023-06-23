import {NewsAPI} from "../api/api";

const SET_NEWS = 'newsPage/SET_NEWS';
const SET_SELECTED_NEWS = 'newsPage/SET_SELECTED_NEWS'
const SET_CURRENT_PAGE = 'newsPage/SET_CURRENT_PAGE';
const SET_TOTAL_NEWS_COUNT = 'newsPage/SET_TOTAL_NEWS_COUNT';
const SET_CATEGORY_ID = 'newsPage/SET_CATEGORY_ID'
const CHANGE_PAGE = 'newsPage/CHANGE_PAGE'

let initialState = {
    news: [],
    selectedNews: {},
    pager_out: {
        page: 1,
        limit: 8
    },
    pagesCount: '',
    idCategory: null
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.data.data,
                pagesCount: action.data.pager_out.count
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
        case CHANGE_PAGE: {
            return {
                ...state,
                pager_out: {...state.pager_out, page: action.page}
            }
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

export function changePage(page){
    return{type: CHANGE_PAGE, page: page}
}

export const getNews = () => async (dispatch, getState) => {
    let data = await NewsAPI.getNews(getState().newsPage.idCategory, getState().newsPage.pager_out.page, getState().newsPage.pager_out.limit)
    dispatch(setNews(data));
    dispatch(setCategoryId(getState().newsPage.idCategory))
}

export const getSelectedNews = (idNews) => async (dispatch) => {
    let data = await NewsAPI.getSelectedNews(idNews)
    dispatch(setSelectedNews(data));
}

export default newsReducer;