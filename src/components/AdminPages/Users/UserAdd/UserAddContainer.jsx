import React from "react";
import UserAdd from "./UserAdd";
import {connect} from "react-redux";
import {addUser} from "../../../../redux/usersAdminReducer";
import {compose} from "redux";
import {withRouter} from "../../../../hoc/withRouter";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";

const UserAddContainer = (props) => {
    return (
        <UserAdd {...props} />
    )
}


const mapStateToProps = (state) => ({
})

export default compose(connect(mapStateToProps, {addUser}),
    withRouter, withAuthRedirect)(UserAddContainer);

