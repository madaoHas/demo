import {UsersAdminAPI} from "../api/api";
import {setFiltersInState} from "../helpers";

const SET_USERS = 'usersAdminPage/SET_USERS';
const SET_USER_ITEM = 'usersAdminPage/SET_USER_ITEM'
const SET_FILTER_USERS = 'usersAdminPage/SET_FILTER_USERS'
const SET_FILTER_TEMPORARY = 'usersAdminPage/SET_FILTER_TEMPORARY'
const CHANGE_PAGE = 'usersAdminPage/CHANGE_PAGE'

let initialState = {
    users: [],
    userItem: {},
    pager_out: {
        page: 1,
        limit: 10
    },
    pagesCount: '',
    filters: {
        id: null,
        email: null,
        role: null,
        is_active: null,
        created_at: null,
        name: null,
        surname: null
    },
    textFilters: {
        id: undefined,
        email: undefined,
        name: undefined,
        surname: undefined
    }
}

const usersAdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users.data,
                pagesCount: action.pagesCount
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
        case SET_FILTER_TEMPORARY:
            return {
                ...state,
                textFilters: {...state.textFilters, [action.filterName]: action.filterValue}
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

export const setUsers = (users, pagesCount) => {
    return {
        type: SET_USERS,
        users,
        pagesCount
    }
}
export const setUserItem = (user) => {
    return {
        type: SET_USER_ITEM,
        user
    }
}

export const changeFilter = (filter) => {
    return {
        type: SET_FILTER_USERS,
        filter
    }
}

export const setFilterTemporary = (filterName, filterValue) => {
    return {
        type: SET_FILTER_TEMPORARY,
        filterName,
        filterValue
    }
}
export function changePage(page){
    return{type: CHANGE_PAGE, page: page}
}




export const setFilters = (filters) => async (dispatch, getState) => {
    try {
        console.log(filters)
        let filter = setFiltersInState(getState().usersAdminPage.filters, filters, 'role')
        console.log(filter)
        await dispatch(changeFilter(filter))
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

export const getUsers = () => async (dispatch, getState) => {
    try {
        let data = await UsersAdminAPI.getUsers(getState().usersAdminPage.filters, getState().usersAdminPage.pager_out.page, getState().usersAdminPage.pager_out.limit);
        dispatch(setUsers(data, data.pager_out.count));
        dispatch(setUserItem({}));
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
        dispatch(setUserItem({
            data: {
                error: 'Пользователь не найден'
            }
        }));
    }
}
export const updateUserItem = (userItem, setStatus, setSubmitting) => async () => {
    try {
        await UsersAdminAPI.updateUserItem(userItem);
        setStatus({success: 'Успешно измененно!', error: []})
        setSubmitting(false)
    }
    catch (error) {
        console.log(error)
        setSubmitting(false)
        setStatus({error: 'Что-то пошло не так'})
    }
}

export const updateUserItemPassword = (password, setStatus, setSubmitting) => async () => {
    try {
        await UsersAdminAPI.updateUserItemPassword(password);
        setStatus({success: 'Успешно измененно!', error: []})
        setSubmitting(false)
    }
    catch (error) {
        console.log(error)
        setSubmitting(false)
        setStatus({error: 'Что-то пошло не так'})
    }
}



export const addUser = (email, password, setStatus, setSubmitting) => async (dispatch) => {
    try {
        await UsersAdminAPI.addUsers(email, password);
        setStatus({success: 'Пользователь добавлен', error: []})
        setSubmitting(false)
        dispatch(getUsers(1, 10));
    }
    catch (error) {
        console.log(error)
        if (error.response.status === 400) {
            setStatus({error: 'Такой пользователь уже есть в системе'})
            setSubmitting(false)
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