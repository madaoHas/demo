import { NewsAdminAPI } from "../api/api";

const SET_NEWS = 'SET_NEWS';
const SET_NEWS_ITEM = 'SET_NEWS_ITEM'
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    news: [
    ],
    newsItem: {},
    pagerOut: {}
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
        // case SET_CURRENT_PAGE:
        //     return {
        //         ...state,
        //         currentPage: action.currentPage
        //     }
        // case SET_TOTAL_NEWS_COUNT:
        //     return {
        //         ...state,
        //         totalNewsCount: action.count
        //     }
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

// export const setCurrentPage = (currentPage) => {
//     return {
//         type: SET_CURRENT_PAGE,
//         currentPage
//     }
// }
// export const setTotalNewsCount = (count) => {
//     return{
//         type: SET_TOTAL_NEWS_COUNT,
//         count
//     }
// }

export const getNews = (currentPage, limit) => async (dispatch) => {
    let data = await NewsAdminAPI.getNews(currentPage, limit)
    dispatch(setNews(data));
    dispatch(setNewsItem({}));

    // dispatch(setCurrentPage(currentPage));
    // dispatch(setTotalNewsCount(data.totalCount));
}

export const getNewsItem = (id) => async (dispatch) => {
    let data = await NewsAdminAPI.getNewsItem(id);
    dispatch(setNewsItem(data));
}

export const addNews = (categoryId, title, previewText, previewImageUrl, text, textImageUrl, date) => async (dispatch) => {
    try {
        await NewsAdminAPI.addNews(categoryId, title, previewText, previewImageUrl, text, textImageUrl, date)
        dispatch(getNews(1, 10))
    }
    catch ( error ) {
        console.log(error)
    }
}

export const updateNews = (id, categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, isActive) => async (dispatch) => {
    try {
        await NewsAdminAPI.updateNews(id, categoryId, title, previewText, previewImageUrl, text, textImageUrl, date, isActive)
        dispatch(getNews(1, 10))
    }
    catch ( error ) {
        console.log(error)
    }
}

export const updateActiveNews = (id, is_active, page = 1, limit = 10) => async (dispatch) => {
    try {
        await NewsAdminAPI.updateActive(id, is_active)
        dispatch(getNews(page, limit))
    }
    catch ( error ) {
        console.log(error)
    }
}

export const deleteNews = (id, page = 1, limit = 10) => async (dispatch) => {
    try {
        await NewsAdminAPI.deleteNews(id)
        dispatch(getNews(page, limit))
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