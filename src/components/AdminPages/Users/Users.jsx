import {NavLink} from "react-router-dom";
import classes from "./Users.module.css"
import UsersTable from "./UsersTable";

const Users = (props) => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Пользователи</div>
                    <div className={classes.headerLink}><NavLink to={"/admin/users/add"}>Добавить</NavLink></div>
                </div>
                <UsersTable {...props} />
            </div>
        </div>
    )
}

export default Users;