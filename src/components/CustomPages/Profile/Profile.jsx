import classes from "./Profile.module.css";
import React from "react";
import ProfileFormGeneral from "./ProfileForms/ProfileFormGeneral";
import ProfileFormPassword from "./ProfileForms/ProfileFormPassword";



const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <div className={classes.header}>Профиль</div>
            <ProfileFormGeneral profile={props.profile} setGeneralInfo={props.setGeneralInfo} />
            <ProfileFormPassword setPasswordProfile={props.setPasswordProfile} />
        </div>
    )

}

export default Profile;