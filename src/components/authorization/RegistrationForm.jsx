import {Field, Form, Formik} from "formik";
import classes from "./AuthForm.module.css";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import React from "react";
import * as Yup from "yup";


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

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});

const RegistrationForm = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '', password: '', confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({values, errors,touched}) => (
                    <Form className={classes.form}>
                        <Field name="email" type="email" placeholder="Email"
                               className={classNames("input", "is-medium", {["is-danger"]: errors.email && touched.email})}
                        />
                        {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                        <Field type="password" name="password" placeholder="Пароль" validate={validatePassword}
                               className={classNames("input", "is-medium", {["is-danger"]: errors.password && touched.password})}
                        />
                        {errors.password && touched.password ? <div className="has-text-danger">{errors.password}</div> : null}
                       <Field type="confirmPassword" name="confirmPassword" placeholder="Повторите пароль" type="password"
                              validate={value => validateConfirmPassword(values.password, value)}
                               className={classNames("input", "is-medium", {["is-danger"]: errors.confirmPassword && touched.confirmPassword})}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? <div className="has-text-danger">{errors.confirmPassword}</div> : null}
                        <button type="submit" className={classNames("button", "has-background-grey", "has-text-white")}>
                            ЗАРЕГЕСТРИРОВАТЬСЯ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegistrationForm;