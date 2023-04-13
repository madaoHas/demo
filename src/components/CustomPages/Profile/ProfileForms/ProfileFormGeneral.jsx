import classes from "../Profile.module.css";
import {Field, Form, Formik, useFormikContext, useField} from "formik";
import React, {useState} from "react";
import InputMask from "react-input-mask";
import * as Yup from "yup";
import classNames from "classnames";


const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    lastName: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});

function PhoneInput(props) {
    return (
        <InputMask
            name={props.name}
            className="input"
            mask='(+7) 999 999 9999'
            value={props.value}
            onChange={props.onChange}>
        </InputMask>
    );
}

const ProfileFormGeneral = () => {
    const [phone, setPhone] = useState('');
    const handleInput = ({target: {value}}) => setPhone(value);
    return (
        <div className={classes.general}>
            <Formik
                initialValues={{
                    firstName: '', lastName: '', email: '',
                    numberPhone: '', birthday: '', city: '', photo: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({values,errors, touched, setFieldValue}) => (
                    <Form className={classes.form}>
                        <div className={classes.avatar}>
                            <label htmlFor="photo" className={classes.label}>Аватар</label>
                            <Field type="file" name="photo"/>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="firstName" className={classes.label}>Имя</label>
                                <Field className={classNames("input", {["is-danger"]: errors.firstName && touched.firstName})} name="firstName" />
                                {errors.firstName && touched.firstName ? (
                                    <div className="has-text-danger">{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="lastName" className={classes.label}>Фамилия</label>
                                <Field className={classNames("input", {["is-danger"]: errors.lastName && touched.lastName})} name="lastName"/>
                                {errors.lastName && touched.lastName ? (
                                    <div className="has-text-danger">{errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="email" className={classes.label}>e-mail</label>
                                <Field name="email" className={classNames("input", {["is-danger"]: errors.email && touched.email})} type="email" />
                                {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="numberPhone" className={classes.label}>Номер телефона</label>
                                <PhoneInput
                                    name="numberPhone"
                                    value={phone}
                                    onChange={handleInput}>
                                </PhoneInput>
                                {console.log(phone)}
                                {/*<Field id="numberPhone" type="text" name="numberPhone" />*/}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="birthday" className={classes.label}>Дата рождения</label>
                                {/*<Field className="input" name="birthday"/>*/}
                                <Field type="date" className="input" name="birthday" />
                            </div>
                            <div>
                                <label htmlFor="city" className={classes.label}>Город</label>
                                <Field className="input" name="city"/>
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

export default ProfileFormGeneral;