import {connect} from "react-redux";
import Comments from "./Comments";
import {getComments, deleteComment} from "../../../redux/commentsAdminReducer";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";

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

export default compose(connect(mapStateToProps, {getComments, deleteComment}),
    withRouter, withAuthRedirect, withAdminRedirect)(CommentsContainerAdmin);
