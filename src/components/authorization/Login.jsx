import React from "react";
import classes from "./Login.module.css";
import {Navigate, NavLink} from "react-router-dom";
import {useState} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {connect} from "react-redux";
import {login, registration} from "../../redux/loginReducer";

const Login = React.memo((props) => {
    let [activeLogin, useActiveLogin] = useState(true);
    let [activeReg, useActiveReg] = useState(false);
    const ActivLoginNav = () => {
        useActiveLogin(true);
        useActiveReg(false);
    }
    const ActivRegNav = () => {
        useActiveReg(true);
        useActiveLogin(false);
    }
    if (Object.keys(props.isAuth).length !== 0) {
        return (<Navigate to={'/'} />)
    }
    return (
        <div className={classes.authContainer}>
            <div className={classes.switch}>
                <NavLink to={"/login"} onClick={ActivLoginNav} className={activeLogin && classes.active}>ВХОД</NavLink>
                <NavLink to={"/login"} onClick={ActivRegNav} className={activeReg && classes.active}>РЕГИСТРАЦИЯ</NavLink>
            </div>
            {activeLogin && <LoginForm login={props.login} />}
            {activeReg && <RegistrationForm registration={props.registration} />}
        </div>
    )
})

const mapStateToProps = (state) => ({
    isAuth: state.login.auth
})

export default connect(mapStateToProps, {login, registration})(Login);