import {NavLink} from "react-router-dom";
import classes from "../Users/Users.module.css"
import NewsTable from "./NewsTable";
import Paginator from "../../common/Paginator/Paginator";
import React from "react";

const NewsAdmin = (props) => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Опубликованные новости</div>
                    <div className={classes.headerLink}><NavLink to={"/admin/news/add"}>Добавить</NavLink></div>
                </div>
                <NewsTable {...props} />
            </div>
            <Paginator
                pagesCount={props.pagesCount}
                setPage={props.changePage}
            />
        </div>
    )
}

export default NewsAdmin;