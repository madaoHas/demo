import classes from "./Login.module.css";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Login = () => {
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
    return (
        <div className={classes.authContainer}>
            <div className={classes.switch}>
                <NavLink to={"/login"} onClick={ActivLoginNav} className={activeLogin && classes.active}>ВХОД</NavLink>
                <NavLink to={"/login"} onClick={ActivRegNav} className={activeReg && classes.active}>РЕГИСТРАЦИЯ</NavLink>
            </div>
            {activeLogin && <LoginForm />}
            {activeReg && <RegistrationForm />}
        </div>
    )
}

export default Login;