import React, {useEffect} from "react";
import {connect} from "react-redux";
import UserUpdate from "./UserUpdate";
import {useLocation} from "react-router-dom";
import {getUserItem, updateUserItem} from "../../../../redux/usersAdminReducer";
import {compose} from "redux";
import {withRouter} from "../../../../hoc/withRouter";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";


const UserUpdateContainer = (props) => {
    const location = useLocation();
    const { state } = location;
    useEffect( () => {
        if (state) {
            props.getUserItem(state.row.id)
        }
    }, [] )
    if (props.userItem) {
        return (
            <UserUpdate userItem={props.userItem} updateUserItem={props.updateUserItem} />
        )
    }
}


const mapStateToProps = (state) => ({
    userItem: state.usersAdminPage.userItem
})


export default compose(connect(mapStateToProps, {getUserItem, updateUserItem}),
    withRouter, withAuthRedirect)(UserUpdateContainer);
