import Users from "./Users";
import {connect} from "react-redux";
import {getUsers, updateActiveUser, deleteUser} from "../../../redux/usersAdminReducer";
import React, {useEffect} from "react";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

const UsersContainer = (props) => {
    useEffect( () => {
        props.getUsers({}, 1, 10)
    }, [] )
    return (
        <div>
            <Users {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.usersAdminPage.users,
    pager: state.usersAdminPage.pager_out
})

export default compose(connect(mapStateToProps, {getUsers, updateActiveUser, deleteUser}),
    withRouter, withAuthRedirect)(UsersContainer);
