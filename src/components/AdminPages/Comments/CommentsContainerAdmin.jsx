import {connect} from "react-redux";
import Comments from "./Comments";
import {getComments, deleteComment} from "../../../redux/commentsAdminReducer";
import React, {useEffect} from "react";

const CommentsContainerAdmin = (props) => {
    useEffect( () => {
        props.getComments(1, 10)
    }, [] )
    return (
        <div>
            <Comments {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    comments: state.commentsAdminPage.comments
})

export default connect(mapStateToProps, {getComments, deleteComment})(CommentsContainerAdmin);