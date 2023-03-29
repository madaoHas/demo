import classes from "./Comments.module.css";
import classNames from "classnames";
import React from "react";
import CommentsForm from "./CommentsForm";
import Comment from "./Comment";


const Comments = (props) => {
    return (
        <div className={classes.commentsBlock}>
            <div className={classes.header}>Комментарии</div>
            <CommentsForm {...props} />
            <div className={classes.comments}>
                {props.state.news.comments.map(c => <Comment comment={c} key={c.id} />)}
            </div>
        </div>
    )
}

export default Comments;