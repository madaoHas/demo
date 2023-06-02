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
    const { state } = location;
    useEffect( () => {
        if (state) {
            props.getCommentItem(state.row.id)
        }
    }, [] )
    if (state) {
        return (
            <CommentsUpdate {...props} />
        )
    }
    else {
        return (
            <Navigate to={"/admin/comments"} />
        )
    }
}

const mapStateToProps = (state) => ({
    newsItem: state.commentsAdminPage.commentItem
})

export default compose(connect(mapStateToProps, {getCommentItem, updateComment}),
    withRouter, withAuthRedirect, withAdminRedirect)(CommentsUpdateContainer);

