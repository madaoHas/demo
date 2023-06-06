import Users from "./Users";
import {connect} from "react-redux";
import {getUsers, updateActiveUser, deleteUser} from "../../../redux/usersAdminReducer";
import React, {useEffect} from "react";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";
import {useLocation} from "react-router-dom";

const UsersContainer = (props) => {
    const location = useLocation();
    const { state } = location;
    useEffect( () => {
        props.getUsers({}, 1, 10)
    }, [props.filters.id] )
    return (
        <div>
            <Users {...props} state={state} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.usersAdminPage.users,
    pager: state.usersAdminPage.pager_out,
    filters: state.usersAdminPage.filters
})

export default compose(connect(mapStateToProps, {getUsers, updateActiveUser, deleteUser}),
    withRouter, withAuthRedirect, withAdminRedirect)(UsersContainer);
