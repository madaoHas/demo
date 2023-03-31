import {NavLink} from "react-router-dom";
import classes from "./Users.module.css"

const Users = () => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Пользователи</div>
                    <div className={classes.headerLink}><NavLink to={"/"}>Добавить</NavLink></div>
                </div>
                <div>
                    <table>
                        <tr><td>1</td><td>1</td><td>1</td></tr>
                        <tr><td>1</td><td>1</td></tr>
                        <tr><td>1</td></tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;