import React from "react";
import classes from "./Login.module.css";
import {Navigate, NavLink, useSearchParams} from "react-router-dom";
import {useState} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {connect} from "react-redux";
import {login, registration} from "../../redux/loginReducer";

const Login = React.memo((props) => {
    let url = window.location.pathname

    if (Object.keys(props.isAuth).length !== 0) {
        return (<Navigate to={'/news?page=1'} />)
    }
    return (
        <div className={classes.authContainer}>
            <div className={classes.switch}>
                <NavLink to={"/login/authorization"} className={url === "/login/authorization" && classes.active}>ВХОД</NavLink>
                <NavLink to={"/login/registration"} className={url === "/login/registration" && classes.active}>РЕГИСТРАЦИЯ</NavLink>
            </div>
            {url === "/login/authorization" && <LoginForm login={props.login} />}
            {url === "/login/registration" && <RegistrationForm registration={props.registration} />}
        </div>
    )
})

const mapStateToProps = (state) => ({
    isAuth: state.login.auth
})

export default connect(mapStateToProps, {login, registration})(Login);