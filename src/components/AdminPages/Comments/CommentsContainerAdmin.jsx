import {connect} from "react-redux";
import Comments from "./Comments";
import {getComments, deleteComment} from "../../../redux/commentsAdminReducer";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

const CommentsContainerAdmin = (props) => {
    const location = useLocation();
    const { state } = location;
    useEffect( () => {
        props.getComments({}, 1, 10)
    }, [] )
    return (
        <div>
            <Comments {...props} state={state} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    comments: state.commentsAdminPage.comments,
    pager: state.commentsAdminPage.pager_out
})

export default connect(mapStateToProps, {getComments, deleteComment})(CommentsContainerAdmin);