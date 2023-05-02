import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import classes from "./UserAdd.module.css";
import classNames from "classnames";


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле')
});

const UserAdd = () => {
    return (
        <div className={classes.formContainer}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({values, errors, touched, setFieldValue}) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="email" className={classes.label}>e-mail</label>
                                <Field className={classNames(classes.input, {["is-danger"]: errors.email && touched.email})}
                                       name="email"/>
                                {errors.email && touched.email ? (
                                    <div className="has-text-danger">{errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password" className={classes.label}>Пароль</label>
                                <Field
                                    className={classNames(classes.input, {["is-danger"]: errors.password && touched.password})}
                                    name="password"/>
                                {errors.password && touched.password ? (
                                    <div className="has-text-danger">{errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        <button type="submit" className={classes.button}>
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserAdd;