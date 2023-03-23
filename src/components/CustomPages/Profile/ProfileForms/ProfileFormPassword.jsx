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


const ProfileFormPassword = () => {
    return (
        <div className={classes.general}>
            <Formik
                initialValues={{
                    oldPassword: '', password: '', confirmPassword: ''
                }}
                // validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({values, errors,touched}) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="oldPassword">Старый пароль</label>
                                <Field name="oldPassword" type="password" className="input"
                                       validate={validateOldPassword} />
                                {errors.oldPassword && touched.oldPassword && <div>{errors.oldPassword}</div>}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="password">Новый пароль</label>
                                <Field type="password" className="input" name="password"
                                       validate={validatePassword} />
                                {errors.password && touched.password && <div>{errors.password}</div>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                                <Field type="password" className="input" name="confirmPassword"
                                       validate={value => validateConfirmPassword(values.password, value)}/>
                                {errors.confirmPassword && touched.confirmPassword && (<div>{errors.confirmPassword}</div>)}
                            </div>
                        </div>
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