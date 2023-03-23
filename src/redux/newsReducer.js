import {NewsAPI} from "../api/api";

const SET_NEWS = 'SET_NEWS';

let initialState = {
    news: [],
    currentPage: 1,
}

const newsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.news
            }
        default: return state;
    }
}

export const setNews = (news) => {
    return {
        type: SET_NEWS,
        news
    }
}

export const getNews = (currentPage, pageSize) => async (dispatch) => {
    let data = await NewsAPI.getNews(currentPage, pageSize)
    dispatch(setNews(data.items));
}

export default newsReducer;