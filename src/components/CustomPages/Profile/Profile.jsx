import classes from "./Profile.module.css";
import React, {useState} from "react";
import ProfileFormGeneral from "./ProfileForms/ProfileFormGeneral";
import ProfileFormPassword from "./ProfileForms/ProfileFormPassword";



const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <div className={classes.header}>Профиль</div>
            <ProfileFormGeneral email={props.email} profile={props.profile} />
            <ProfileFormPassword />
        </div>
    )

}

export default Profile;