import {NavLink} from "react-router-dom";
import classes from "./Users.module.css"
import UsersTable from "./UsersTable";
import Paginator from "../../common/Paginator/Paginator";
import React from "react";

const Users = (props) => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Пользователи</div>
                    <div className={classes.headerLink}><NavLink to={"/admin/users/add"}>Добавить</NavLink></div>
                </div>
                <UsersTable state={props.state} users={props.users} updateActiveUser={props.updateActiveUser} deleteUser={props.deleteUser} />
            </div>
            <Paginator
                pagesCount={props.pagesCount}
                setPage={props.changePage}
            />
        </div>
    )
}

export default Users;