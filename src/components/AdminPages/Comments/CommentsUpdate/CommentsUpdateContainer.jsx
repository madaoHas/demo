import React, {useEffect} from "react";
import CommentsUpdate from "./CommentsUpdate";
import {Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {getCommentItem, updateComment} from "../../../../redux/commentsAdminReducer";
import {compose} from "redux";
import {withRouter} from "../../../../hoc/withRouter";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../../hoc/withAdminRedirect";

const CommentsUpdateContainer = (props) => {
    const location = useLocation();
    let id = location.pathname.slice(23);
    useEffect( () => {
        if (id) {
            props.getCommentItem(id)
        }
    }, [] )
    if (props.commentItem.error) {
        return <div>{props.commentItem.error}</div>
    }
    else {
        return (
            <CommentsUpdate {...props} />
        )
    }
}

const mapStateToProps = (state) => ({
    commentItem: state.commentsAdminPage.commentItem
})

export default compose(connect(mapStateToProps, {getCommentItem, updateComment}),
    withRouter, withAuthRedirect, withAdminRedirect)(CommentsUpdateContainer);

