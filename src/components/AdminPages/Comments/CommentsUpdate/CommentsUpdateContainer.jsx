import React, {useEffect} from "react";
import CommentsUpdate from "./CommentsUpdate";
import {Navigate, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {getCommentItem, updateComment} from "../../../../redux/commentsAdminReducer";

const CommentsUpdateContainer = (props) => {
    const location = useLocation();
    const { state } = location;
    useEffect( () => {
        if (state) {
            props.getCommentItem(state.row.id)
        }
    }, [] )
    console.log(props);
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

export default connect(mapStateToProps, {getCommentItem, updateComment})(CommentsUpdateContainer);
