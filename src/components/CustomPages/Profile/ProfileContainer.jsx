import React, {useEffect} from "react";
import Profile from "./Profile";
import {getGeneralInfo, setGeneralInfo, setPasswordProfile} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

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

export default compose(connect(mapStateToProps, {getGeneralInfo, setGeneralInfo, setPasswordProfile}),
    withRouter, withAuthRedirect)(ProfileContainer);
