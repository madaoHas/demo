import {UsersAdminAPI} from "../api/api";

const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    users: [
        {
            id: 1,
            date: "02-04-2023",
            email: "dfsdsfd@gmail.com",
            firstName: "Gigi",
            lastName: "Hadit",
            role: "user",
            active: true,
        },
        {
            id: 2,
            date: "04-02-2023",
            email: "qwerty@gmail.com",
            firstName: "Darina",
            lastName: "Ivanova",
            role: "admin",
            active: true,
        },
        {
            id: 3,
            date: "05-02-2023",
            email: "qwerty@gmail.com",
            firstName: "qweas",
            lastName: "xczxc",
            role: "user",
            active: true,
        },
        {
            id: 4,
            date: "05-01-2023",
            email: "sda2dwe@gmail.com",
            firstName: "xcxzc",
            lastName: "LLdddw",
            role: "user",
            active: true,
        },
        {
            id: 5,
            date: "12-01-2023",
            email: "ginsan@gmail.com",
            firstName: "Wivi",
            lastName: "Karida",
            role: "user",
            active: true,
        },
    ],
    // currentPage: 1,
    // pageSize: 8,
    // totalNewsCount: 5
}

const usersAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
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

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
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

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    let data = await UsersAdminAPI.getUsers(currentPage, pageSize)
    // dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(data.items));
    // dispatch(setTotalNewsCount(data.totalCount));
}

// export const getSelectedNews = (idNews) => async (dispatch) => {
//     let data = await NewsAPI.getSelectedNews(idNews)
//     dispatch(setNews(data.items));
// }

export default usersAdminReducer;