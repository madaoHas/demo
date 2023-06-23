import {CommentsAdminAPI} from "../api/api";
import {setFiltersInState} from "../helpers";

const SET_COMMENTS_ADMIN = 'commentsAdminPage/SET_COMMENTS_ADMIN';
const SET_COMMENT_ITEM_ADMIN = 'commentsAdminPage/SET_COMMENT_ITEM_ADMIN';
const CHANGE_FILTER = 'commentsAdminPage/CHANGE_FILTER'
const CHANGE_TEXT_FILTER = 'commentsAdminPage/CHANGE_TEXT_FILTER'
const CHANGE_PAGE = 'commentsAdminPage/CHANGE_PAGE'

let initialState = {
    comments: [],
    commentItem: {},
    pager_out: {
        page: 1,
        limit: 10
    },
    pagesCount: '',
    filters: {
        id: null,
        user_id: null,
        email: null,
        title: null,
        text: null,
        created_at: null
    },
    textFilters: {
        id: undefined,
        user_id: undefined,
        email: undefined,
        title: undefined,
        text: undefined,
        created_at: undefined
    },
}

const commentsAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_COMMENTS_ADMIN:
            return {
                ...state,
                comments: action.comments.data,
                pagesCount: action.pagesCount
            }
        case SET_COMMENT_ITEM_ADMIN:
            return {
                ...state,
                commentItem: action.comment
            }
        case CHANGE_FILTER: {
            return {
                ...state,
                filters: action.filter
            }
        }
        case CHANGE_TEXT_FILTER: {
            return {
                ...state,
                textFilters: {...state.textFilters, [action.filterName]: action.filterValue}
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                pager_out: {...state.pager_out, page: action.page}
            }
        }
        default: return state;
    }
}

export const setCommentsAdmin = (comments, pagesCount) => {
    return {
        type: SET_COMMENTS_ADMIN,
        comments,
        pagesCount
    }
}

export const setCommentItemAdmin = (comment) => {
    return {
        type: SET_COMMENT_ITEM_ADMIN,
        comment
    }
}

export function changeFilter(filter){
    return{type: CHANGE_FILTER, filter: filter}
}
export function setFilterTemporary(filterName, filterValue) {
    return {type: CHANGE_TEXT_FILTER, filterValue, filterName}
}
export function changePage(page){
    return{type: CHANGE_PAGE, page: page}
}

export const setFilters = (filters) => async(dispatch, getState) => {
    let filter = setFiltersInState(getState().commentsAdminPage.filters, filters)
    dispatch(changeFilter(filter))
}

// export const filterMobileComments = (filterName, valueName) => async (dispatch) => {
//     try {
//         let filter = {[filterName]: valueName}
//         let data = await CommentsAdminAPI.getComments(filter, 1, 10);
//         dispatch(setCommentsAdmin(data));
//         dispatch(setCommentItemAdmin({}));
//     }
//     catch (error) {
//         console.log(error)
//     }
// }


export const getComments = () => async (dispatch, getState) => {
    try {
        let data = await CommentsAdminAPI.getComments(getState().commentsAdminPage.filters, getState().commentsAdminPage.pager_out.page, getState().commentsAdminPage.pager_out.limit);
        dispatch(setCommentsAdmin(data, data.pager_out.count));
        dispatch(setCommentItemAdmin({}));
        // getState().commentsAdminPage.filters = {}
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
        dispatch(setCommentItemAdmin({error: 'Такого комментария нет'}));
    }
}
export const updateComment = (id, text) => async (dispatch) => {
    try {
        await CommentsAdminAPI.updateComment(id, text);
        dispatch(getComments({}, 1, 10));
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


export default commentsAdminReducer;