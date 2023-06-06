import React, {useEffect} from "react";
import {connect} from "react-redux";
import UserUpdate from "./UserUpdate";
import {useLocation} from "react-router-dom";
import {getUserItem, updateUserItem, updateUserItemPassword} from "../../../../redux/usersAdminReducer";
import {compose} from "redux";
import {withRouter} from "../../../../hoc/withRouter";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../../hoc/withAdminRedirect";


const UserUpdateContainer = (props) => {
    const location = useLocation();
    let id = location.pathname.slice(20);
    useEffect( () => {
        if (id) {
            props.getUserItem(id)
        }
    }, [id] )
    if (props.userItem) {
        if (props.userItem.error) {
            return <div>{props.userItem.error}</div>
        }
        else {
            return (
                <UserUpdate userItem={props.userItem} updateUserItem={props.updateUserItem} updateUserItemPassword={props.updateUserItemPassword} />
            )
        }
    }
}


const mapStateToProps = (state) => ({
    userItem: state.usersAdminPage.userItem
})


export default compose(connect(mapStateToProps, {getUserItem, updateUserItem, updateUserItemPassword}),
    withRouter, withAuthRedirect, withAdminRedirect)(UserUpdateContainer);
