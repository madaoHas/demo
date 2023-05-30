import {Field, Form, Formik} from "formik";
import classes from "./RecoveryPassword.module.css";
import classNames from "classnames";
import React from "react";
import * as Yup from "yup";
import {useLocation} from 'react-router-dom'
import {recoveryPassword} from "../../redux/loginReducer";
import {connect} from "react-redux";


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});

const RecoveryPassword = (props) => {
    let location = useLocation();
    console.log(location)
    return (
        <div className={classes.authContainer}>
            <Formik
                initialValues={{
                    email: location.state.email
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                    props.recoveryPassword(values, actions.setStatus)
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      status={ error: [] }}) => (
                    <Form className={classes.form}>
                        <label>Введите e-mail, который использовали для входа</label>
                        <Field name="email" type="email" placeholder="Email"
                               className={classNames("input", "is-medium", {["is-danger"]: errors.email && touched.email})}
                        />
                        {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button type="submit" className={classNames("button", "has-text-white")}>
                            ОТПРАВИТЬ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps, {recoveryPassword})(RecoveryPassword)