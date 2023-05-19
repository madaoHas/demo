import React from "react";
import UserAdd from "./UserAdd";
import {connect} from "react-redux";
import {addUser} from "../../../../redux/usersAdminReducer";

const UserAddContainer = (props) => {
    return (
        <UserAdd {...props} />
    )
}


const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps, {addUser})(UserAddContainer);
