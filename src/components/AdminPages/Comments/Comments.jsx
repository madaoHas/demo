import {NavLink} from "react-router-dom";
import classes from "../Users/Users.module.css"
import CommentsTable from "./CommentsTable";

const Comments = (props) => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Комментарии</div>
                    <div className={classes.headerLink}><NavLink to={"/"}>Добавить</NavLink></div>
                </div>
                <CommentsTable {...props} />
            </div>
        </div>
    )
}

export default Comments;