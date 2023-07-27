import React, {useEffect} from "react";
import classes from "./Login.module.css";
import {Navigate, NavLink, useSearchParams} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {connect} from "react-redux";
import {login, registration} from "../../redux/loginReducer";

const Login = React.memo((props) => {

    if (Object.keys(props.isAuth).length !== 0) {
        return (<Navigate to={'/news?page=1'} />)
    }
    return (
        <div className={classes.authContainer}>
            <div className={classes.switch}>
                <NavLink
                    to={"/login/authorization"}
                    className={props.url === "authorization" && classes.active}
                >
                    ВХОД
                </NavLink>
                <NavLink
                    to={"/login/registration"}
                    className={props.url === "registration" && classes.active}
                >
                    РЕГИСТРАЦИЯ
                </NavLink>
            </div>
            {props.url === "authorization" && <LoginForm login={props.login} />}
            {props.url === "registration" && <RegistrationForm registration={props.registration} />}
        </div>
    )
})

const mapStateToProps = (state) => ({
    isAuth: state.login.auth,
})

export default connect(mapStateToProps, {login, registration})(Login);