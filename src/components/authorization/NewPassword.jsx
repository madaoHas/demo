import React, {useEffect} from "react";
import {useLocation, Navigate, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {changePassword, checkHash} from "../../redux/loginReducer";
import classes from "./RecoveryPassword.module.css";
import {Field, Form, Formik} from "formik";
import classNames from "classnames";


const validatePassword = (values) => {
    let error = "";
    const passwordRegex = /(?=.*[0-9])/;
    if (!values) {
        error = "*Обязательное поле";
    } else if (values.length < 6) {
        error = "*Длина пароля не менее 6 символов.";
    } else if (!passwordRegex.test(values)) {
        error = "*Пароль должен содержать минимум одно число.";
    }
    return error;
};

const validateConfirmPassword = (pass, value) => {
    let error = "";
    if (!value) {
        error = "*Обязательное поле";
    }
    if (pass && value) {
        if (pass !== value) {
            error = "Пароли не совпадают";
        }
    }
    return error;
};

const NewPassword = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    useEffect( () => {
        props.checkHash(location.search.slice(6))
    }, [props.hashResult] )
    if (props.hashResult === true) {
        return (
            <div className={classes.authContainer}>
                <Formik
                    initialValues={{
                       password: '', confirmPassword: ''
                    }}
                    onSubmit={(values, actions) => {
                        props.changePassword(values.password, location.search.slice(6), actions.setStatus)
                        navigate('/login', {replace: false});
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          status={ error: [] }}) => (
                        <Form className={classes.form}>
                            <Field type="password" name="password" placeholder="Пароль" validate={validatePassword}
                                   className={classNames("input", "is-medium", {["is-danger"]: errors.password && touched.password})}
                            />
                            {errors.password && touched.password ? <div className="has-text-danger">{errors.password}</div> : null}
                            <Field name="confirmPassword" placeholder="Повторите пароль" type="password"
                                   validate={value => validateConfirmPassword(values.password, value)}
                                   className={classNames("input", "is-medium", {["is-danger"]: errors.confirmPassword && touched.confirmPassword})}
                            />
                            {errors.confirmPassword && touched.confirmPassword ? <div className="has-text-danger">{errors.confirmPassword}</div> : null}
                            {status && status.error ? (<div className="has-text-danger">{status.error}</div>) : null}
                            {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                            <button type="submit" className={classNames("button", "has-background-grey", "has-text-white")}>
                                СОХРАНИТЬ
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
    if (props.hashResult === false) {
        return (
            <Navigate to={"/"} />
        )
    }

}

const mapStateToProps = (state) => ({
    hashResult: state.login.hashRight
})

export default connect(mapStateToProps, {checkHash, changePassword})(NewPassword);