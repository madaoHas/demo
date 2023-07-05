import classes from "../Profile.module.css";
import {Field, Form, Formik} from "formik";
import React, {useState, useEffect, useRef} from "react";
import PhoneInput from "../phoneInput";
import * as Yup from "yup";
import classNames from "classnames";


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    surname: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});


const ProfileFormGeneral = (props) => {

    const [imageAvatar, setImageAvatar] = useState(null);

    useEffect( () => {
        if (props.profile.avatar_url) {
            setImageAvatar(process.env.REACT_APP_URL_BASE + props.profile.avatar_url.slice(7))
        }
        else {
            setImageAvatar(null)
        }
    }, [props.profile.avatar_url] )

    const onImageAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageAvatar(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onDeleteAvatarPhoto = (e) => {
        props.profile.avatar_url = null;
        setImageAvatar(null)
        e.preventDefault();
    }

    const [fieldValueChange, setFieldValueChange] = useState(true)

    const ref = useRef(null);

    const changeInput = async (setFieldValue, field, value) => {

        await setFieldValue(field, value)
        let currentValues = ref.current.values

        let flagChange = false

        for (let valueItem in currentValues) {
            if (valueItem === "email") {
                if (props.profile.user.email !== currentValues[valueItem]) {
                    flagChange = true
                }
            }
            else {
                if (props.profile[valueItem] !== currentValues[valueItem]) {
                    flagChange = true
                }
            }
            if (flagChange === true) {
                setFieldValueChange(false);
            }
            else {
                setFieldValueChange(true)
            }
        }
    }


    return (
        <div className={classes.general}>
            <Formik
                innerRef={ref}
                enableReinitialize={true}
                initialValues={{
                    name: props.profile.name,
                    surname: props.profile.surname,
                    email: props.profile.user?.email,
                    phone_number: props.profile.phone_number,
                    birthday: props.profile.birthday,
                    city: props.profile.city,
                    avatar_url: props.profile.avatar_url
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    // values.numberPhone = values.numberPhone.split(" ").join("");
                    if (typeof values.avatar_url === 'string') {
                        values.avatar_url = undefined
                    }
                    if (values.avatar_url === null) {
                        values.avatar_url = 'null'
                    }
                    props.setGeneralInfo(values.name, values.surname, values.phone_number, values.city, values.birthday, values.avatar_url, values.email, actions.setStatus, actions.setSubmitting)
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange,
                      status={ error: [] },
                      isSubmitting
                }) => (
                    <Form className={classes.form} encType="multipart/form-data" method="POST">
                        <div className={classes.avatar}>
                            <label htmlFor="avatar_url" className={classes.label}>Аватар</label>
                            <div className={classes.photoContainer}>
                                <div className={classes.photo}><img alt={''} src={imageAvatar} /></div>
                                <div className={classes.controlsButtonPhoto}>
                                    <div>
                                        <label htmlFor={'uploadAvatarPhoto'}  className={classes.buttonPhoto}>
                                            Загрузить фото
                                        </label>
                                        <input
                                            disabled={isSubmitting}
                                            type='file'
                                            id={'uploadAvatarPhoto'}
                                            name={"avatar_url"}
                                            className={classes.photoInput}
                                            onChange={(e) => {
                                                setFieldValue('avatar_url', e.currentTarget.files[0]);
                                                setFieldValueChange(false);
                                                onImageAvatarChange(e)
                                            }}
                                            accept='uploads//*'
                                        />
                                    </div>
                                    <div>
                                        <button
                                            disabled={isSubmitting || imageAvatar === null}
                                            className={classNames(classes.buttonPhoto, {[classes.buttonDisabled]: isSubmitting || imageAvatar === null}) }
                                            onClick={(e) => {
                                                setFieldValueChange(false);
                                                onDeleteAvatarPhoto(e)
                                            }}
                                        >
                                            Удалить фото
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="name" className={classes.label}>Имя</label>
                                <Field
                                    disabled={isSubmitting}
                                    value={values.name}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "name", e.target.value)
                                    }}
                                    className={classNames("input", {["is-danger"]: errors.name && touched.name})}
                                    name="name"
                                />
                                {errors.name && touched.name ? (
                                    <div className="has-text-danger">{errors.name}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="surname" className={classes.label}>Фамилия</label>
                                <Field
                                    disabled={isSubmitting}
                                    value={values.surname}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "surname", e.target.value)
                                    }}
                                    className={classNames("input", {["is-danger"]: errors.surname && touched.surname})}
                                    name="surname"
                                />
                                {errors.surname && touched.surname ? (
                                    <div className="has-text-danger">{errors.surname}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="email" className={classes.label}>e-mail</label>
                                <Field
                                    disabled={isSubmitting}
                                    value={values.email}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "email", e.target.value)
                                    }}
                                    name="email"
                                    className={classNames("input", {["is-danger"]: errors.email && touched.email})}
                                    type="email"
                                />
                                {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                            </div>
                            <div>
                                <label htmlFor="phone_number" className={classes.label}>Номер телефона</label>
                                <Field
                                    disabled={isSubmitting}
                                    component={PhoneInput}
                                    value={values.phone_number}
                                    setFieldValue={setFieldValue}
                                    onChange={changeInput}
                                    name="phone_number"
                                />
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="birthday" className={classes.label}>Дата рождения</label>
                                <Field
                                    value={values.birthday}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "birthday", e.target.value)
                                    }}
                                    type="date"
                                    className="input"
                                    name="birthday"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className={classes.label}>Город</label>
                                <Field
                                    value={values.city}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "city", e.target.value)
                                    }}
                                    className="input"
                                    name="city"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        {status && status.error.length > 0 ? (<div className="has-text-danger">{status.error}</div>) : null}
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button
                            type="submit"
                            className={classNames("button", "has-background-grey", "has-text-white", {"is-loading": isSubmitting})}
                            disabled={isSubmitting || fieldValueChange}
                        >
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileFormGeneral;