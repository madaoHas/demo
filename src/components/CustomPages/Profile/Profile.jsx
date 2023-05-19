import classes from "./Profile.module.css";
import React, {useState} from "react";
import ProfileFormGeneral from "./ProfileForms/ProfileFormGeneral";
import ProfileFormPassword from "./ProfileForms/ProfileFormPassword";
import {setPasswordProfile} from "../../../redux/profileReducer";



const Profile = (props) => {
    console.log(props);
    return (
        <div className={classes.profile}>
            <div className={classes.header}>Профиль</div>
            <ProfileFormGeneral profile={props.profile} setGeneralInfo={props.setGeneralInfo} />
            <ProfileFormPassword setPasswordProfile={props.setPasswordProfile} />
        </div>
    )

}

export default Profile;