import {NewsAPI} from "../api/api";

const SET_NEWS = 'SET_NEWS';

let initialState = {
    news: [
        {
            id: 1,
            date: '27.03.2023',
            img: '',
            header: 'header',
            text: 'text',
            comments: [
                {username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 2,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            text: 'text111',
            comments: [
                {username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 3,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            text: 'text111',
            comments: [
                {username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 4,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            text: 'text111',
            comments: [
                {username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 5,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            text: 'text111',
            comments: [
                {username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
    ],
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