import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import classes from "./UserAdd.module.css";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле')
});

const UserAdd = (props) => {
    // let navigate = useNavigate();
    return (
        <div className={classes.formContainer}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    props.addUser(values.email, values.password, actions.setStatus, actions.setSubmitting);
                    // navigate('/admin/users', {replace: false});
                }}
            >
                {({
                      errors,
                      touched,
                      status={ error: [] },
                      isSubmitting
                }) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="email" className={classes.label}>e-mail</label>
                                <Field
                                    disabled={isSubmitting}
                                    className={classNames(classes.input, {["is-danger"]: errors.email && touched.email})}
                                    name="email"
                                />
                                {errors.email && touched.email ? (
                                    <div className="has-text-danger">{errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password" className={classes.label}>Пароль</label>
                                <Field
                                    disabled={isSubmitting}
                                    className={classNames(classes.input, {["is-danger"]: errors.password && touched.password})}
                                    name="password"
                                    type="password"/>
                                {errors.password && touched.password ? (
                                    <div className="has-text-danger">{errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        {status && status.error.length > 0 ? (<div className="has-text-danger">{status.error}</div>) : null}
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={classNames(classes.button, {"is-loading": isSubmitting}, "button")}
                        >
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserAdd;