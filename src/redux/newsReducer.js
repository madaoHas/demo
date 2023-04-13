import {NewsAPI} from "../api/api";

const SET_NEWS = 'SET_NEWS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    news: [
        {
            id: 1,
            date: '27.03.2023',
            img: '',
            header: 'header',
            category: 'Категория',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et. Mauris ultrices eros in cursus turpis. Justo eget magna fermentum iaculis eu non diam. Tellus in metus vulputate eu scelerisque. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Volutpat odio facilisis mauris sit amet. Auctor eu augue ut lectus arcu. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Nulla pharetra diam sit amet. Donec ultrices tincidunt arcu non sodales neque. Laoreet non curabitur gravida arcu. Et tortor at risus viverra adipiscing at in tellus. Tristique senectus et netus et malesuada fames ac. Enim diam vulputate ut pharetra sit amet. Condimentum mattis pellentesque id nibh tortor. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc.',
            miniText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure...",
            comments: [
                {id: 1, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et. Mauris ultrices eros in cursus turpis. Justo eget magna fermentum iaculis eu non diam. Tellus in metus vulputate eu scelerisque. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Volutpat odio facilisis mauris sit amet. Auctor eu augue ut lectus arcu. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Nulla pharetra diam sit amet. Donec ultrices tincidunt arcu non sodales neque. Laoreet non curabitur gravida arcu. Et tortor at risus viverra adipiscing at in tellus. Tristique senectus et netus et malesuada fames ac.'},
                {id: 2, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 2,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'sport',
            text: 'text111',
            miniText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Duis aute irure...",
            comments: [
                {id: 3, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 4, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 3,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'sport',
            text: 'text111',
            miniText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure...",
            comments: [
                {id: 5, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 6, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 4,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'gintama',
            text: 'text111',
            miniText : "mini text",
            comments: [
                {id: 7, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 8, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 5,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'gintama',
            text: 'text111',
            miniText : "mini text",
            comments: [
                {id: 9, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 10, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 6,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'gintama',
            text: 'text111',
            miniText : "mini text",
            comments: [
                {id: 9, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 10, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 7,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'sport',
            text: 'text111',
            miniText : "mini text",
            comments: [
                {id: 9, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 10, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 8,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            category: 'gintama',
            text: 'text111',
            miniText : "mini text",
            comments: [
                {id: 9, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 10, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
    ],
    currentPage: 1,
    pageSize: 8,
    totalNewsCount: 5
}

const newsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.news
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_NEWS_COUNT:
            return {
                ...state,
                totalNewsCount: action.count
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

export const getNews = (currentPage, pageSize) => async (dispatch) => {
    let data = await NewsAPI.getNews(currentPage, pageSize)
    dispatch(setCurrentPage(currentPage));
    dispatch(setNews(data.items));
    dispatch(setTotalNewsCount(data.totalCount));
}

export const getSelectedNews = (idNews) => async (dispatch) => {
    let data = await NewsAPI.getSelectedNews(idNews)
    dispatch(setNews(data.items));
}

export default newsReducer;