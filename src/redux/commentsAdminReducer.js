import { CommentsAdminAPI } from "../api/api";

const SET_COMMENTS_ADMIN = 'SET_COMMENTS_ADMIN';
const SET_COMMENT_ITEM_ADMIN = 'SET_COMMENT_ITEM_ADMIN';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    comments: [
        // {
        //     id: 1,
        //     date: "02-04-2023",
        //     idUser: 2,
        //     user: "ffff@mail.ru",
        //     news: "Да ладно",
        //     comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et. Mauris ultrices eros in cursus turpis. Justo eget magna fermentum iaculis eu non diam. Tellus in metus vulputate eu scelerisque. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Volutpat odio facilisis mauris sit amet. Auctor eu augue ut lectus arcu. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Nulla pharetra diam sit amet. Donec ultrices tincidunt arcu non sodales neque. Laoreet non curabitur gravida arcu.",
        // },
        // {
        //     id: 2,
        //     date: "12-02-2023",
        //     idUser: 5,
        //     user: "dlfmlsdmls@gmail.com",
        //     news: "Да ладно",
        //     comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        // },
        // {
        //     id: 3,
        //     date: "14-02-2023",
        //     idUser: 1,
        //     user: "vbnmxm@gmail.com",
        //     news: "Да ладно",
        //     comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        // },
        // {
        //     id: 4,
        //     date: "10-01-2023",
        //     idUser: 6,
        //     user: "qq22ww333@gmail.com",
        //     news: "Да ладно",
        //     comment: "Lorem ipsum dolor sit amet.",
        // },
        // {
        //     id: 5,
        //     date: "12-01-2023",
        //     idUser: 6,
        //     user: "qq22ww333@gmail.com",
        //     news: "Да ладно",
        //     comment: "sdfsdfdsfsd.",
        // },
    ],
    commentItem: {}
    // currentPage: 1,
    // pageSize: 8,
    // totalNewsCount: 5
}

const commentsAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_COMMENTS_ADMIN:
            return {
                ...state,
                comments: action.comments
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
        dispatch(setCommentsAdmin(data.data));
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