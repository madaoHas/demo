import {Field, Form, Formik} from "formik";
import classes from "./RecoveryPassword.module.css";
import classNames from "classnames";
import React from "react";
import * as Yup from "yup";
import {useLocation} from 'react-router-dom'


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});

const RecoveryPassword = () => {
    let location = useLocation();
    console.log(location)
    return (
        <div className={classes.authContainer}>
            <Formik
                initialValues={{
                    email: location.state.email
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({values, errors,touched}) => (
                    <Form className={classes.form}>
                        <label>Введите e-mail, который использовали для входа</label>
                        <Field name="email" type="email" placeholder="Email"
                               className={classNames("input", "is-medium", {["is-danger"]: errors.email && touched.email})}
                        />
                        {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                        <button type="submit" className={classNames("button", "has-text-white")}>
                            ОТПРАВИТЬ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RecoveryPassword;