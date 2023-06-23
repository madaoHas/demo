import Users from "./Users";
import {connect} from "react-redux";
import {
    getUsers,
    updateActiveUser,
    deleteUser,
    setFilters,
    setFilterTemporary,
    changePage
} from "../../../redux/usersAdminReducer";
import React from "react";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";
import {withFilterParams} from "../../../hoc/withFilterParams";

const UsersContainer = (props) => {
    return (
        <div>
            <Users {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.usersAdminPage.users,
    pager: state.usersAdminPage.pager_out.page,
    filter: state.usersAdminPage.filters,
    textFilters: state.usersAdminPage.textFilters,
    pagesCount: state.usersAdminPage.pagesCount,
})

export default compose(connect(mapStateToProps,
        {
            request: getUsers, updateActiveUser, deleteUser, setFilterTemporary, setFilters, changePage
        }),
    withRouter, withAuthRedirect, withAdminRedirect, withFilterParams)(UsersContainer);
