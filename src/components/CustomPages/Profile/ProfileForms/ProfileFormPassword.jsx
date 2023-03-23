import classes from "../Profile.module.css";
import {Field, Form, Formik} from "formik";
import React from "react";
import * as Yup from "yup";


// const SignupSchema = Yup.object().shape({
//     password: Yup.string()
//         .min(6, 'Коротко!')
//         .max(15, 'Длинно!')
//         .required('Напишите пароль'),
// });

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
                {({values, errors, handleSubmit, handleChange, handleBlur}) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="oldPassword">Старый пароль</label>
                                <Field name="oldPassword" type="password" />
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="password">Новый пароль</label>
                                <Field type="password" name="password" validate={validatePassword} />
                                {errors.password && <div>{errors.password}</div>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                                <Field type="password" name="confirmPassword" validate={value =>
                                    validateConfirmPassword(values.password, value)
                                }/>
                                {errors.confirmPassword && (<div>{errors.confirmPassword}</div>)}
                            </div>
                        </div>
                        <button type="submit">
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileFormPassword;