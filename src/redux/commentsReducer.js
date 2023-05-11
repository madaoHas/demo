import {CommentsAPI} from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS';

let initialState = {
    comments: [],
    pager_out: {}
}

const commentsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.data.data,
                pager_out: action.data.pager_out
            }
        default: return state;
    }
}

export const setComments = (data) => {
    return {
        type: SET_COMMENTS,
        data
    }
}

export const getComments = (commentsId, currentPage, pageSize) => async (dispatch) => {
    let data = await CommentsAPI.getComments(commentsId, currentPage, pageSize);
    dispatch(setComments(data));
}

export const addComment = (postId, text) => async (dispatch) => {
    await CommentsAPI.addComments(postId, text);
    dispatch(getComments(postId));
}

export default commentsReducer;