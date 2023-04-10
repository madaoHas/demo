import {CommentsAPI} from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS';

let initialState = {
    comments: [
        {
            id: 1,
            username: 'username',
            date: {date: '27.03.2023', time: '00:00'},
            text: 'Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet LoremipsumdolorsitametLoremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet Loremipsumdolorsitamet',
            newsId: 1
        },
        {
            id: 2,
            username: 'username1',
            date: {date: '27.03.2023', time: '00:00'},
            text: 'Loremipsumdolorsitamet Loremipsumdolorsitamet',
            newsId: 1
        },
        {
            id: 3,
            username: 'username2',
            date: {date: '27.03.2023', time: '00:00'},
            text: 'Loremipsumdolorsitamet Loremipsumdolorsitamet',
            newsId: 1
        },
        {
            id: 4,
            username: 'username3',
            date: {date: '27.03.2023', time: '00:00'},
            text: 'Loremipsumdolorsitamet Loremipsumdolorsitamet',
            newsId: 2
        },
    ],
}

const commentsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        default: return state;
    }
}

export const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export const getComments = () => async (dispatch) => {
    let data = await CommentsAPI.getComments()
    dispatch(setComments(data.items));
}

export default commentsReducer;