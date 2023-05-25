import classes from "./Comments.module.css";
import classNames from "classnames";
import React from "react";
import CommentsForm from "./CommentsForm";
import Comment from "./Comment";
import Paginator from "../../../common/Paginator/Paginator";


const Comments = (props) => {
    return (
        <div className={classes.commentsBlock}>
            <div className={classes.header}>Комментарии</div>
            {props.auth.id ? <CommentsForm postId={props.postId} auth={props.auth} addComment={props.addComment} getComments={props.getComments} /> : null}
            <div className={classes.comments}>
                { props.comments.length > 0 ? props.comments.map(c => <Comment comment={c} key={c.id}  />) : 'Комментариев пока нет(' }
            </div>
            <Paginator
                pager={props.pager}
                onChangePage={props.getComments}
                info={'comments'}
                postId={props.postId}
            />
        </div>
    )
}

export default Comments;