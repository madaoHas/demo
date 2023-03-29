import {NewsAPI} from "../api/api";

const SET_NEWS = 'SET_NEWS';

let initialState = {
    news: [
        {
            id: 1,
            date: '27.03.2023',
            img: '',
            header: 'header',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et. Mauris ultrices eros in cursus turpis. Justo eget magna fermentum iaculis eu non diam. Tellus in metus vulputate eu scelerisque. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Volutpat odio facilisis mauris sit amet. Auctor eu augue ut lectus arcu. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Nulla pharetra diam sit amet. Donec ultrices tincidunt arcu non sodales neque. Laoreet non curabitur gravida arcu. Et tortor at risus viverra adipiscing at in tellus. Tristique senectus et netus et malesuada fames ac. Enim diam vulputate ut pharetra sit amet. Condimentum mattis pellentesque id nibh tortor. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc.',
            miniText : "mini text",
            comments: [
                {id: 1, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet LoremipsumdolorsitametLoremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet'},
                {id: 2, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
            ]
        },
        {
            id: 2,
            date: '25.03.2023',
            img: '',
            header: 'header1',
            text: 'text111',
            miniText : "mini text",
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
            text: 'text111',
            miniText : "mini text",
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
            text: 'text111',
            miniText : "mini text",
            comments: [
                {id: 9, username: 'username', date: {date: '27.03.2023', time: '00:00'}, text: 'text'},
                {id: 10, username: 'username1', date: {date: '27.03.2023', time: '10:00'}, text: 'text'}
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

export const getSelectedNews = (idNews) => async (dispatch) => {
    let data = await NewsAPI.getSelectedNews(idNews)
    dispatch(setNews(data.items));
}

export default newsReducer;