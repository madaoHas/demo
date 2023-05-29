import { CommentsAdminAPI } from "../api/api";
import {getUsers} from "./usersAdminReducer";

const SET_COMMENTS_ADMIN = 'SET_COMMENTS_ADMIN';
const SET_COMMENT_ITEM_ADMIN = 'SET_COMMENT_ITEM_ADMIN';
const SET_FILTER_COMMENTS = 'SET_FILTER_COMMENTS'

let initialState = {
    comments: [],
    commentItem: {},
    pager_out: {},
    filters: {
        id: null,
        user_id: null,
        email: "",
        title: "",
        text: "",
        created_at: ""
    }
}

const commentsAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_COMMENTS_ADMIN:
            return {
                ...state,
                comments: action.comments.data,
                pager_out: action.comments.pager_out
            }
        case SET_COMMENT_ITEM_ADMIN:
            return {
                ...state,
                commentItem: action.comment
            }
        case SET_FILTER_COMMENTS:
            return {
                ...state,
                filters: action.filter
            }
        default: return state;
    }
}

export const setCommentsAdmin = (comments) => {
    return {
        type: SET_COMMENTS_ADMIN,
        comments
    }
}

export const setCommentItemAdmin = (comment) => {
    return {
        type: SET_COMMENT_ITEM_ADMIN,
        comment
    }
}

export const setFilterComments = (filter) => {
    return {
        type: SET_FILTER_COMMENTS,
        filter
    }
}

export const setFiltersComments = (filterName, valueName) => async (dispatch, getState) => {
    try {
        let filter = getState().commentsAdminPage.filters;
        filter[filterName] = valueName
        dispatch(setFilterComments(filter))
        dispatch(getComments(getState().commentsAdminPage.filters, 1, 10))
    }
    catch (error) {
        console.log(error)
    }
}


export const getComments = (filter, page, limit) => async (dispatch, getState) => {
    try {
        let data = await CommentsAdminAPI.getComments(getState().commentsAdminPage.filters, page, limit);
        dispatch(setCommentsAdmin(data));
        dispatch(setCommentItemAdmin({}));
    }
    catch (error) {
        console.log(error)
    }
}

export const getCommentItem = (id) => async (dispatch) => {
    try {
        let data = await CommentsAdminAPI.getCommentItem(id);
        dispatch(setCommentItemAdmin(data));
    }
    catch (error) {
        console.log(error)
    }
}
export const updateComment = (id, text) => async (dispatch) => {
    try {
        await CommentsAdminAPI.updateComment(id, text);
        dispatch(getComments(1, 10));
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteComment = (id) => async (dispatch, getState) => {
    try {
        await CommentsAdminAPI.deleteComment(id);
        dispatch(getComments(getState().commentsAdminPage.filters, 1, 10));
    }
    catch (error) {
        console.log(error)
    }
}



// export const getSelectedNews = (idNews) => async (dispatch) => {
//     let data = await NewsAPI.getSelectedNews(idNews)
//     dispatch(setNews(data.items));
// }

export default commentsAdminReducer;