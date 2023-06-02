import {UsersAdminAPI} from "../api/api";

const SET_USERS = 'SET_USERS';
const SET_USER_ITEM = 'SET_USER_ITEM'
const SET_FILTER_USERS = 'SET_FILTER_USERS'

let initialState = {
    users: [],
    userItem: {},
    pager_out: {},
    filters: {
        id: null,
        email: "",
        role: null,
        is_active: null,
        created_at: "",
        name: "",
        surname: ""
    }
}

const usersAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users.data,
                pager_out: action.users.pager_out
            }
        case SET_USER_ITEM:
            return {
                ...state,
                userItem: action.user.data
            }
        case SET_FILTER_USERS:
            return {
                ...state,
                filters: action.filter
            }
        default: return state;
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}
export const setUserItem = (user) => {
    return {
        type: SET_USER_ITEM,
        user
    }
}

export const setFilterUsers = (filter) => {
    return {
        type: SET_FILTER_USERS,
        filter
    }
}

export const setFiltersUsers = (filterName, valueName) => async (dispatch, getState) => {
    try {
        let filter = getState().usersAdminPage.filters;
        filter[filterName] = valueName
        dispatch(setFilterUsers(filter))
        dispatch(getUsers(getState().usersAdminPage.filters, 1, 10))
    }
    catch (error) {
        console.log(error)
    }
}

export const filterMobileUsers = (filterName, valueName) => async (dispatch) => {
    try {
        let filter = {[filterName]: valueName}
        let data = await UsersAdminAPI.getUsers(filter, 1, 10);
        dispatch(setUsers(data));
        dispatch(setUserItem({}));
    }
    catch (error) {
        console.log(error)
    }
}

export const getUsers = (filters, page, limit) => async (dispatch, getState) => {
    try {
        let data = await UsersAdminAPI.getUsers(getState().usersAdminPage.filters, page, limit);
        dispatch(setUsers(data));
        dispatch(setUserItem({}));
        // getState().usersAdminPage.filters = {}
    }
    catch (error) {
        console.log(error)
    }
}
export const getUserItem = (id) => async (dispatch) => {
    try {
        let data = await UsersAdminAPI.getUserItem(id);
        dispatch(setUserItem({data}));
    }
    catch (error) {
        console.log(error)
    }
}
export const updateUserItem = (userItem, setStatus) => async () => {
    try {
        await UsersAdminAPI.updateUserItem(userItem);
        setStatus({success: 'Успешно измененно!'})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateUserItemPassword = (password, setStatus) => async () => {
    try {
        await UsersAdminAPI.updateUserItemPassword(password);
        setStatus({success: 'Успешно измененно!'})
    }
    catch (error) {
        console.log(error)
    }
}



export const addUser = (email, password, setStatus) => async (dispatch) => {
    try {
        await UsersAdminAPI.addUsers(email, password)
        dispatch(getUsers(1, 10));
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 400) {
            setStatus({error: 'Такой пользователь уже есть в системе'})
        }
    }
}

export const updateActiveUser = (id, active) => async (dispatch, getState) => {
    try {
        await UsersAdminAPI.updateActiveUser(id, active);
        dispatch(getUsers(getState().usersAdminPage.filters, 1, 10));
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        await UsersAdminAPI.deleteUser(id);
        dispatch(getUsers(getState().usersAdminPage.filters, 1, 10));
    }
    catch (error) {
        console.log(error)
    }
}

export default usersAdminReducer;