import classes from "./ColumnFilter.module.css";
import React, {useEffect} from "react";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import {connect} from "react-redux";
import {setFiltersNews} from "../../redux/newsAdminReducer";
import {setFiltersUsers} from "../../redux/usersAdminReducer";
import {setFiltersComments} from "../../redux/commentsAdminReducer";
import {setFiltersCategories} from "../../redux/categoryReducer";


const onChangeFilter = (props, e) => {
    if (e.target) {
        e = e.target.value;
    }
    else if (e[0]) {
        e = moment(e[0]).format('YYYY-MM-DD')
    }
    else if (e.length === 0) {
        e = ''
    }
    if (props.columns.length === 5) {
        if (props.column.id === 'category') {
            props.column.id = props.column.id + '_id'
        }
        props.setFiltersNews(props.column.id, e)
    }
    else if (props.columns.length === 7) {
        if (props.column.id === 'role') {
            if (e > 0) {
                e = Number(e)
            }
        }
        props.setFiltersUsers(props.column.id, e)
    }
    else if (props.columns.length === 6) {
        if (props.column.id === 'postTitle') {
            props.column.id = 'title'
        }
        props.setFiltersComments(props.column.id, e)
    }
    else if (props.columns.length === 2) {
        props.setFiltersCategories(props.column.id, e)
    }
}

const mapStateToProps = (state) => ({
    // categories: state.category.category,
})

const ColumnFilterContainer = (props) => {
    useEffect( () => {
        if (props.column.defaultValue) {
            props.setFiltersComments(props.column.id, props.column.defaultValue.id)
        }
    }, [props.column.defaultValue] )
    useEffect( () => {
        if (props.column.defaultValueTitle) {
            console.log(props.column.defaultValueTitle)
            props.setFiltersComments('title', props.column.defaultValueTitle.title)
        }
    }, [props.column.defaultValueTitle] )
    return (
        <input
            className={classes.inputFilter}
            defaultValue={props.column.defaultValue ? props.column.defaultValue.id : (props.column.defaultValueTitle ? props.column.defaultValueTitle.title : '')}
            // value={filterValue || ''}
            onChange={(e) => {onChangeFilter(props,e)}}
        />
    )
}


export const ColumnFilterDateContainer = (props) => {
    return (
        <>
            <img src={"/img/Calendar.svg"} className={classes.labelDate} />
            <Flatpickr
                className={classes.dateFilter}
                // value={filterValue || ''}
                onChange={(e) => {onChangeFilter(props, e)}}
                options={{
                    dateFormat: "d-m-Y"
                }}
            />
        </>
    );
}

export const ColumnFilterSelectCategoryContainer = (props) => {
    return (
        <select className={classes.selectFilter}
                onChange={(e) => {onChangeFilter(props, e)}}
                disabled={props.column.categories.length === 0 ? true : false}
        >
            <option value={''} />
            {props.column.categories.map(v => <option id={v.id} key={v.id} value={v.id} className={classes.categoryOption}>{v.name}</option>)}
        </select>
    )
}

const activeArr = [
    {
        id: 1,
        is_active: true,
        name: 'Активен'
    },
    {
        id: 2,
        is_active: false,
        name: 'Неактивен'
    }
]

export const ColumnFilterSelectActiveContainer = (props) => {
    return (
        <select className={classes.selectFilter}
                onChange={(e) => {onChangeFilter(props, e)}}
        >
            <option value={''} />
            {activeArr.map(v => <option id={v.id} key={v.id} value={v.is_active} className={classes.categoryOption}>{v.name}</option>)}
        </select>
    )
}

const roleArr = [
    {
        id: 1,
        role: 1,
        name: 'Пользователь'
    },
    {
        id: 2,
        role: 10,
        name: 'Админ'
    },
]

export const ColumnFilterSelectRoleContainer = (props) => {
    return (
        <select className={classes.selectFilter}
                onChange={(e) => {onChangeFilter(props, e)}}
        >
            <option value={''} />
            {roleArr.map(v => <option id={v.id} key={v.id} value={v.role} className={classes.categoryOption}>{v.name}</option>)}
        </select>
    )
}

export const ColumnFilter = connect(mapStateToProps, {setFiltersNews, setFiltersUsers, setFiltersComments, setFiltersCategories})(ColumnFilterContainer);

export const ColumnFilterDate = connect(mapStateToProps, {setFiltersNews, setFiltersUsers, setFiltersComments})(ColumnFilterDateContainer);

export const ColumnFilterSelectCategory = connect(mapStateToProps, {setFiltersNews})(ColumnFilterSelectCategoryContainer);

export const ColumnFilterSelectActive = connect(mapStateToProps, {setFiltersNews, setFiltersUsers})(ColumnFilterSelectActiveContainer);

export const ColumnFilterSelectRole = connect(mapStateToProps, {setFiltersUsers})(ColumnFilterSelectRoleContainer);



