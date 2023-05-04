import { NewsAdminAPI } from "../api/api";

const SET_NEWS = 'SET_NEWS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    news: [
    ],
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
    console.log(data)
    dispatch(setNews(data));

    // dispatch(setCurrentPage(currentPage));
    // dispatch(setTotalNewsCount(data.totalCount));
}

export const addUser = (categoryId, title, previewText, previewImageUrl, text, textImageUrl, date) => async (dispatch) => {
    try {
        let data = await NewsAdminAPI.addNews(categoryId, title, previewText, previewImageUrl, text, textImageUrl, date)
        dispatch(getNews(1, 10))
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