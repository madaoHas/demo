import classes from "../Profile.module.css";
import {Field, Form, Formik} from "formik";
import React, {useState} from "react";
import InputMask from "react-input-mask";
import * as Yup from "yup";



const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
});

function PhoneInput(props) {
    return (
        <InputMask
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
                {({errors, touched}) => (
                    <Form className={classes.form}>
                        <input className="input is-danger" type="text" placeholder="Danger input" />
                        <div className={classes.avatar}>
                            <label htmlFor="photo">Аватар</label>
                            <Field type="file" name="photo"/>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="firstName">Имя</label>
                                <Field name="firstName"/>
                                {errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="lastName">Фамилия</label>
                                <Field name="lastName"/>
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="email">e-mail</label>
                                <Field name="email" type="email"/>
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="numberPhone">Номер телефона</label>
                                <PhoneInput
                                    name="numberPhone"
                                    value={phone}
                                    onChange={handleInput}>
                                </PhoneInput>
                                {/*<Field id="numberPhone" type="text" name="numberPhone" />*/}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="birthday">Дата рождения</label>
                                <Field name="birthday"/>
                            </div>
                            <div>
                                <label htmlFor="city">Город</label>
                                <Field name="city"/>
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

export default ProfileFormGeneral;