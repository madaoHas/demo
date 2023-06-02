import {Field, Form, Formik} from "formik";
import classes from "./AuthForm.module.css";
import classNames from "classnames";
import React from "react";
import * as Yup from "yup";
import {NavLink} from "react-router-dom";


const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .required('Обязательное поле'),
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});


const LoginForm = ({login}) => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '', password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    login(values.email, values.password, actions.setStatus);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      status={ error: [] }
                }) => (
                    <Form className={classes.form}>
                        <Field name="email" type="email" placeholder="Email"
                               className={classNames("input", "is-medium", {["is-danger"]: errors.email && touched.email})}
                        />
                        {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                            <Field type="password" name="password" placeholder="Пароль"
                               className={classNames("input", "is-medium", {["is-danger"]: errors.password && touched.password})}
                        />
                        {errors.password && touched.password ? <div className="has-text-danger">{errors.password}</div> : null}
                        {status && status.error ? (<div className="has-text-danger">{status.error}</div>) : null}
                        <NavLink to={"/recovery"} state={{ email: values.email }} >Забыли пароль?</NavLink>
                        <button type="submit" className={classNames("button", "has-background-grey", "has-text-white")}>
                            ВОЙТИ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;
