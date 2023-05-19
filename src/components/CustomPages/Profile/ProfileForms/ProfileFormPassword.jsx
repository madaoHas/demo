import classes from "../Profile.module.css";
import {Field, Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";
import classNames from "classnames";


const validateOldPassword = values => {
    let error = "";
    if (!values) {
        error = "*Обязательное поле";
    }
    return error;
}

const validatePassword = values => {
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


const ProfileFormPassword = (props) => {
    return (
        <div className={classes.general}>
            <Formik
                initialValues={{
                    oldPassword: '', password: '', confirmPassword: ''
                }}
                // validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                    props.setPasswordProfile(values.oldPassword, values.password, actions.setStatus);
                    actions.resetForm({values: ''});
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      status={ error: [] }}) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="oldPassword" className={classes.label}>Старый пароль</label>
                                <Field name="oldPassword" type="password"
                                       className={classNames("input", {["is-danger"]: errors.oldPassword && touched.oldPassword})}
                                       validate={validateOldPassword} />
                                {errors.oldPassword && touched.oldPassword && <div className="has-text-danger">{errors.oldPassword}</div>}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="password" className={classes.label}>Новый пароль</label>
                                <Field type="password" name="password"
                                       className={classNames("input", {["is-danger"]: errors.password && touched.password})}
                                       validate={validatePassword} />
                                {errors.password && touched.password && <div className="has-text-danger">{errors.password}</div>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className={classes.label}>Подтвердите новый пароль</label>
                                <Field type="password" name="confirmPassword"
                                       className={classNames("input", {["is-danger"]: errors.confirmPassword && touched.confirmPassword})}
                                       validate={value => validateConfirmPassword(values.password, value)}/>
                                {errors.confirmPassword && touched.confirmPassword && (<div className="has-text-danger">{errors.confirmPassword}</div>)}
                            </div>
                        </div>
                        {status && status.error ? (<div className="has-text-danger">{status.error}</div>) : null}
                        <button type="submit" className={classNames("button", "has-background-grey", "has-text-white")}>
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileFormPassword;