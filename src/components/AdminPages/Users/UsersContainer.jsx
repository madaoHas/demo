import Users from "./Users";
import {connect} from "react-redux";
import {getUsers, updateActiveUser, deleteUser} from "../../../redux/usersAdminReducer";
import React, {useEffect} from "react";

const UsersContainer = (props) => {
    useEffect( () => {
        props.getUsers(1, 10)
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

export default connect(mapStateToProps, {getUsers, updateActiveUser, deleteUser})(UsersContainer);