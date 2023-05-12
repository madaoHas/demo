import React, {useEffect} from "react";
import Profile from "./Profile";
import {getGeneralInfo} from "../../../redux/profileReducer";
import {connect} from "react-redux";

const ProfileContainer = (props) => {
    useEffect( () => {
        props.getGeneralInfo();
    }, [] )
    return (
        <Profile {...props} />
    )
}
const mapStateToProps = (state) => ({
    profile: state.profilePage.generalInfo,
    email: state.login.auth.email,
})

export default connect(mapStateToProps, {getGeneralInfo})(ProfileContainer);