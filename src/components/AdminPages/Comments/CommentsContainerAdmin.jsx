import {connect} from "react-redux";
import Comments from "./Comments";
import {getComments, deleteComment, changePage, setFilters, setFilterTemporary} from "../../../redux/commentsAdminReducer";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";
import {withFilterParams} from "../../../hoc/withFilterParams";

const CommentsContainerAdmin = (props) => {
    return (
        <div>
            <Comments {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    comments: state.commentsAdminPage.comments,
    pager: state.commentsAdminPage.pager_out.page,
    filter: state.commentsAdminPage.filters,
    textFilters: state.commentsAdminPage.textFilters,
    pagesCount: state.commentsAdminPage.pagesCount,
})

export default compose(connect(mapStateToProps,
        {request: getComments, deleteComment, changePage, setFilters, setFilterTemporary}),
    withRouter, withAuthRedirect, withAdminRedirect, withFilterParams)(CommentsContainerAdmin);
