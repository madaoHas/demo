import classes from "../Users/Users.module.css"
import CommentsTable from "./CommentsTable";
import Paginator from "../../common/Paginator/Paginator";
import React from "react";

const Comments = (props) => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Комментарии</div>
                </div>
                <CommentsTable {...props} />
            </div>
            <Paginator
                pagesCount={props.pagesCount}
                setPage={props.changePage}
            />
        </div>
    )
}

export default Comments;