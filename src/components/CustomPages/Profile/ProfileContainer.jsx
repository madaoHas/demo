import React, {useEffect} from "react";
import Profile from "./Profile";
import {getGeneralInfo, setGeneralInfo, setPasswordProfile} from "../../../redux/profileReducer";
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
})

export default connect(mapStateToProps, {getGeneralInfo, setGeneralInfo, setPasswordProfile})(ProfileContainer);