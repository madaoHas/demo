import React from "react";
import UserAdd from "./UserAdd";
import {connect} from "react-redux";
import {addUser} from "../../../../redux/usersAdminReducer";
import {compose} from "redux";
import {withRouter} from "../../../../hoc/withRouter";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../../hoc/withAdminRedirect";

const UserAddContainer = (props) => {
    return (
        <UserAdd {...props} />
    )
}


const mapStateToProps = () => ({
})

export default compose(connect(mapStateToProps, {addUser}),
    withRouter, withAuthRedirect, withAdminRedirect)(UserAddContainer);

