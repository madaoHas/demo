import React, {useEffect, useState, useRef} from "react";
import {Field, Form, Formik} from "formik";
import classes from "./UserUpdate.module.css";
import {SwitchInput} from "../../../common/inputCustom/switchInput";
import {SelectInput} from "../../../common/inputCustom/selectInput";
import classNames from "classnames";
import PhoneInput from "../../../CustomPages/Profile/phoneInput";
import moment from 'moment'
import {NavLink} from "react-router-dom";
import {DateInput} from "../../../common/inputCustom/dateInput";
import * as Yup from "yup";


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    surname: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    email: Yup.string().email('Формат почты неверен').required('Обязательное поле')
});

const validatePassword = (values) => {
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

const UserUpdate = ({userItem, updateUserItem, updateUserItemPassword}) => {

    const [imageAvatar, setImageAvatar] = useState(null);

    useEffect( () => {
        if (userItem.profile?.avatar_url) {
            setImageAvatar(process.env.REACT_APP_URL_BASE + userItem.profile.avatar_url.slice(7))
        }
        else {
            setImageAvatar(null)
        }
    }, [userItem.profile?.avatar_url] )

    const onImageAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageAvatar(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onDeleteAvatarPhoto = (e) => {
        userItem.profile.avatar_url = null;
        setImageAvatar(null)
        e.preventDefault();
    }

    const [fieldValueChange, setFieldValueChange] = useState(true)

    const ref = useRef(null);

    const changeInput = async (setFieldValue, field, value) => {

        if (field === "phone_number") {
            if (value === "") {
                value = null
            }
        }

        await setFieldValue(field, value)
        let currentValues = ref.current.values

        let flagChange = false

        for (let valueItem in currentValues) {
            if (valueItem === "email") {
                if (userItem.email !== currentValues[valueItem]) {
                    flagChange = true
                }
            }
            else if (valueItem === "is_active") {
                if (userItem.is_active !== currentValues[valueItem]) {
                    flagChange = true
                }
            }
            else if (valueItem === "role") {
                if (userItem.role !== currentValues[valueItem]) {
                    flagChange = true
                }
            }
            else {
                if (valueItem !== "id" && valueItem !== "created_at" && valueItem !== "comment") {
                    if (userItem.profile[valueItem] !== currentValues[valueItem]) {
                        flagChange = true
                    }
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
        <div className={classes.container}>
            <Formik
                innerRef={ref}
                enableReinitialize={true}
                initialValues={{
                    id: userItem.id,
                    created_at: userItem.created_at,
                    comment: '',
                    is_active: userItem.is_active,
                    role: userItem.role,
                    avatar_url: userItem.profile?.avatar_url,
                    name: userItem.profile?.name,
                    surname: userItem.profile?.surname,
                    email: userItem.email,
                    phone_number: userItem.profile?.phone_number,
                    birthday: userItem.profile?.birthday,
                    city: userItem.profile?.city
                }}

                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    if (typeof values.role === 'object') {
                        values.role = values.role.name === 'Админ' ? 10 : 1
                    }
                    if (values.phone_number) {
                        values.phone_number = values.phone_number.split(" ").join("");
                    }
                    let obj = {
                        id: values.id,
                        user: {
                            email: userItem.email === values.email ? undefined : values.email,
                            role: userItem.role === values.role ? undefined : values.role,
                            is_active: userItem.is_active === values.is_active ? undefined : values.is_active
                        },
                        profile: {
                            name: userItem.profile?.name === values.name ? undefined : values.name,
                            surname: userItem.profile?.surname === values.surname ? undefined : values.surname,
                            phone_number: userItem.profile?.phone_number === values.phone_number ? undefined : values.phone_number,
                            city: userItem.profile?.city === values.city ? undefined : values.city,
                            birthday: userItem.profile?.birthday === values.birthday ? undefined : values.birthday
                        },
                        avatar: {
                            avatar_url: typeof values.avatar_url === Symbol ? undefined : values.avatar_url
                        }
                    }
                    if (obj.avatar.avatar_url === null) {
                        obj.avatar.avatar_url = 'null'
                    }
                    updateUserItem(obj, actions.setStatus, actions.setSubmitting);
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

                        <div className={classes.headerInfo}>
                            <div className={classes.line}>
                                <div className={classes.stringInfo}>
                                    <label htmlFor={"id"} className={classes.label}>ID:</label>
                                    <span name="id">{values.id}</span>
                                </div>
                                <div className={classes.stringInfo}>
                                    <label htmlFor={"comment"} className={classes.label}>Комментарии:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"comment"} to={"/admin/comments"} state={{id: userItem.id}}>Ссылка</NavLink>
                                        <div className={classes.linkImg} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.stringInfo}>
                                    <label htmlFor={"created_at"} className={classes.label}>Дата регистрации:</label>
                                    <span name="created_at">{moment(values.created_at).format('DD-MM-YYYY')}</span>
                                </div>
                                <div className={classNames(classes.stringInfo)}>
                                    <label htmlFor={"is_active"} className={classes.label}>Статус аккаунта:</label>
                                    <Field
                                        disabled={isSubmitting}
                                        component={SwitchInput}
                                        name={"is_active"}
                                        value={values.is_active}
                                        setFieldValue={setFieldValue}
                                        onChange={changeInput}
                                    />
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.selectRole}>
                                    <label htmlFor={"role"} className={classes.label}>Роль</label>
                                    <Field
                                        disabled={isSubmitting}
                                        component={SelectInput}
                                        name={"role"}
                                        values={[
                                            {
                                                id: 1,
                                                name: 'Админ'
                                            },
                                            {
                                                id: 2,
                                                name: 'Пользователь'
                                            }
                                        ]}
                                        value={
                                            values.role === 10 ?
                                                {id: 1, name: 'Админ'} :
                                                {id: 2, name: 'Пользователь'}
                                        }
                                        valueType={"name"}
                                        setFieldValue={setFieldValue}
                                        onChangeOption={changeInput}

                                    />
                                    {errors.role && touched.role ? (
                                        <div className="has-text-danger">{errors.role}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className={classes.avatar}>
                            <label htmlFor="avatar_url" className={classes.label}>Аватар</label>
                            <div className={classes.photoContainer}>
                                <img
                                    className={classes.photo}
                                    alt={''}
                                    src={imageAvatar}
                                />
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
                        <div className={classes.generalInfo}>
                            <div className={classes.line}>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="name" className={classes.label}>Имя</label>
                                    <Field
                                        value={values.name}
                                        onChange={(e) => {
                                            changeInput(setFieldValue, "name", e.target.value)
                                        }}
                                        disabled={isSubmitting}
                                        className={classNames(classes.input, {["is-danger"]: errors.name && touched.name})}
                                        name="name"
                                    />
                                    {errors.name && touched.name ? (
                                        <div className="has-text-danger">{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="surname" className={classes.label}>Фамилия</label>
                                    <Field
                                        value={values.surname}
                                        onChange={(e) => {
                                            changeInput(setFieldValue, "surname", e.target.value)
                                        }}
                                        disabled={isSubmitting}
                                        className={classNames(classes.input, {["is-danger"]: errors.surname && touched.surname})}
                                        name="surname"
                                    />
                                    {errors.surname && touched.surname ? (
                                        <div className="has-text-danger">{errors.surname}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="email" className={classes.label}>e-mail</label>
                                    <Field
                                        value={values.email}
                                        onChange={(e) => {
                                            changeInput(setFieldValue, "email", e.target.value)
                                        }}
                                        disabled={isSubmitting}
                                        name="email"
                                        className={classNames(classes.input, {["is-danger"]: errors.email && touched.email})}
                                        type="email"
                                    />
                                    {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                                </div>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="phone_number" className={classes.label}>Номер телефона</label>
                                    <Field
                                        disabled={isSubmitting}
                                        component={PhoneInput}
                                        value={values.phone_number}
                                        setFieldValue={setFieldValue}
                                        onChange={changeInput}
                                        name="phone_number"
                                        className={classes.input}
                                    />
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="birthday" className={classes.label}>Дата рождения</label>
                                    <Field
                                        disabled={isSubmitting}
                                        component={DateInput}
                                        name={"birthday"}
                                        className={classNames(classes.input)}
                                        type="text"
                                        value={values.birthday}
                                        // onChange={(val)=>{values.birthday=val}}
                                        setFieldValue={setFieldValue}
                                        onChange={changeInput}
                                    />
                                </div>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="city" className={classes.label}>Город</label>
                                    <Field
                                        value={values.city}
                                        onChange={(e) => {
                                            changeInput(setFieldValue, "city", e.target.value)
                                        }}
                                        className={classes.input}
                                        name="city"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>
                        {status && status.error.length > 0 ? (<div className="has-text-danger">{status.error}</div>) : null}
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button
                            disabled={isSubmitting || fieldValueChange}
                            type="submit"
                            className={classNames(classes.button, {"is-loading": isSubmitting}, "button")}
                        >
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
            <Formik
                initialValues={{
                    password: '', confirmPassword: ''
                }}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    updateUserItemPassword({id: userItem.id, password: values.password}, actions.setStatus, actions.setSubmitting);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      status={ error: [] },
                      isSubmitting
                }) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div className={classes.profileEdit}>
                                <label htmlFor="password" className={classes.label}>Новый пароль</label>
                                <Field
                                    disabled={isSubmitting}
                                    type="password"
                                    name="password"
                                    className={classNames(classes.input, {["is-danger"]: errors.password && touched.password})}
                                    validate={validatePassword}
                                />
                                {errors.password && touched.password && <div className="has-text-danger">{errors.password}</div>}
                            </div>
                            <div className={classes.profileEdit}>
                                <label htmlFor="confirmPassword" className={classes.label}>Подтвердите новый пароль</label>
                                <Field
                                    disabled={isSubmitting}
                                    type="password"
                                    name="confirmPassword"
                                    className={classNames(classes.input, {["is-danger"]: errors.confirmPassword && touched.confirmPassword})}
                                    validate={value => validateConfirmPassword(values.password, value)}
                                />
                                {errors.confirmPassword && touched.confirmPassword && (<div className="has-text-danger">{errors.confirmPassword}</div>)}
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

export default UserUpdate