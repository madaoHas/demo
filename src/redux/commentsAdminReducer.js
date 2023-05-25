import { CommentsAdminAPI } from "../api/api";

const SET_COMMENTS_ADMIN = 'SET_COMMENTS_ADMIN';
const SET_COMMENT_ITEM_ADMIN = 'SET_COMMENT_ITEM_ADMIN';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    comments: [],
    commentItem: {},
    pager_out: {}
    // currentPage: 1,
    // pageSize: 8,
    // totalNewsCount: 5
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

export const getComments = (page, limit) => async (dispatch) => {
    try {
        let data = await CommentsAdminAPI.getComments(page, limit);
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

export const deleteComment = (id) => async (dispatch) => {
    try {
        await CommentsAdminAPI.deleteComment(id);
        dispatch(getComments(1, 10));
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