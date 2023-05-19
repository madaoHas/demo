import {UsersAdminAPI} from "../api/api";

const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_NEWS_COUNT = 'SET_TOTAL_NEWS_COUNT';

let initialState = {
    users: [
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
                users: action.users.data
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

export const getUsers = (page, limit) => async (dispatch) => {
    try {
        let data = await UsersAdminAPI.getUsers(page, limit);
        // dispatch(setCurrentPage(currentPage));
        dispatch(setUsers(data));
        // dispatch(setTotalNewsCount(data.totalCount));
    }
    catch (error) {
        console.log(error)
    }
}

export const addUser = (email, password, setStatus) => async (dispatch) => {
    try {
        await UsersAdminAPI.addUsers(email, password)
        // dispatch(setCurrentPage(currentPage));
        dispatch(getUsers(1, 10));
        // dispatch(setTotalNewsCount(data.totalCount));
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 400) {
            setStatus({error: 'Такой пользователь уже есть в системе'})
        }
    }
}

export const updateActiveUser = (id, active) => async (dispatch) => {
    try {
        await UsersAdminAPI.updateActiveUser(id, active);
        // dispatch(setCurrentPage(currentPage));
        dispatch(getUsers(1, 10));
        // dispatch(setTotalNewsCount(data.totalCount));
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await UsersAdminAPI.deleteUser(id);
        dispatch(getUsers(1, 10));
    }
    catch (error) {
        console.log(error)
    }
}


// export const getSelectedNews = (idNews) => async (dispatch) => {
//     let data = await NewsAPI.getSelectedNews(idNews)
//     dispatch(setNews(data.items));
// }

export default usersAdminReducer;