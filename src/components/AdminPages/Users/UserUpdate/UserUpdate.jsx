import React, {useEffect, useState} from "react";
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
    firstName: Yup.string()
        .min(2, 'Минимальное количество символов 2!')
        .max(50, 'Максимальное количество символов 50!'),
    lastName: Yup.string()
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

    return (
        <div className={classes.container}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: userItem.id,
                    dateRegis: userItem.created_at,
                    comment: '',
                    status: userItem.is_active,
                    role: userItem.role,
                    photo: userItem.profile?.avatar_url,
                    firstName: userItem.profile?.name,
                    lastName: userItem.profile?.surname,
                    email: userItem.email,
                    numberPhone: userItem.profile?.phone_number,
                    birthday: userItem.profile?.birthday,
                    city: userItem.profile?.city
                }}

                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    if (typeof values.role === 'object') {
                        values.role = values.role.name === 'Админ' ? 10 : 1
                    }
                    if (values.numberPhone) {
                        values.numberPhone = values.numberPhone.split(" ").join("");
                    }
                    let obj = {
                        id: values.id,
                        user: {
                            email: userItem.email === values.email ? undefined : values.email,
                            role: userItem.role === values.role ? undefined : values.role,
                            is_active: userItem.is_active === values.status ? undefined : values.status
                        },
                        profile: {
                            name: userItem.profile?.name === values.firstName ? undefined : values.firstName,
                            surname: userItem.profile?.surname === values.lastName ? undefined : values.lastName,
                            phone_number: userItem.profile?.phone_number === values.numberPhone ? undefined : values.numberPhone,
                            city: userItem.profile?.city === values.city ? undefined : values.city,
                            birthday: userItem.profile?.birthday === values.birthday ? undefined : values.birthday
                        },
                        avatar: {
                            avatar_url: typeof values.photo === Symbol ? undefined : values.photo
                        }
                    }
                    if (obj.avatar.avatar_url === null) {
                        obj.avatar.avatar_url = 'null'
                    }
                    updateUserItem(obj, actions.setStatus);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange,
                      status={ error: [] }
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
                                    <label htmlFor={"dateRegis"} className={classes.label}>Дата регистрации:</label>
                                    <span name="dateRegis">{moment(values.dateRegis).format('DD-MM-YYYY')}</span>
                                </div>
                                <div className={classNames(classes.stringInfo)}>
                                    <label htmlFor={"status"} className={classes.label}>Статус аккаунта:</label>
                                    <Field
                                        component={SwitchInput}
                                        name={"status"}
                                        value={values.status}
                                        onChangeSwitch={(a) => {values.status = a}}
                                    />
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.selectRole}>
                                    <label htmlFor={"role"} className={classes.label}>Роль</label>
                                    <Field
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
                                        onChangeOption={(a)=> {values.role = a}}
                                    />
                                    {errors.role && touched.role ? (
                                        <div className="has-text-danger">{errors.role}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className={classes.avatar}>
                            <label htmlFor="photo" className={classes.label}>Аватар</label>
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
                                            type='file'
                                            id={'uploadAvatarPhoto'}
                                            name={"photo"}
                                            className={classes.photoInput}
                                            onChange={(e) => {
                                                setFieldValue('photo', e.currentTarget.files[0]);
                                                onImageAvatarChange(e)
                                            }}
                                            accept='uploads//*'
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className={classes.buttonPhoto}
                                            onClick={onDeleteAvatarPhoto}
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
                                    <label htmlFor="firstName" className={classes.label}>Имя</label>
                                    <Field className={classNames(classes.input, {["is-danger"]: errors.firstName && touched.firstName})} name="firstName" />
                                    {errors.firstName && touched.firstName ? (
                                        <div className="has-text-danger">{errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="lastName" className={classes.label}>Фамилия</label>
                                    <Field className={classNames(classes.input, {["is-danger"]: errors.lastName && touched.lastName})} name="lastName"/>
                                    {errors.lastName && touched.lastName ? (
                                        <div className="has-text-danger">{errors.lastName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="email" className={classes.label}>e-mail</label>
                                    <Field name="email" className={classNames(classes.input, {["is-danger"]: errors.email && touched.email})} type="email" />
                                    {errors.email && touched.email ? <div className="has-text-danger">{errors.email}</div> : null}
                                </div>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="numberPhone" className={classes.label}>Номер телефона</label>
                                    <Field
                                        component={PhoneInput}
                                        value={values.numberPhone}
                                        onChange={ handleChange }
                                        name="numberPhone"
                                        className={classes.input}
                                    />
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="birthday" className={classes.label}>Дата рождения</label>
                                    <Field
                                        component={DateInput}
                                        name={"date"}
                                        className={classNames(classes.input)}
                                        type="text"
                                        value={values.birthday}
                                        onChange={(val)=>{values.birthday=val}}
                                    />
                                </div>
                                <div className={classes.profileEdit}>
                                    <label htmlFor="city" className={classes.label}>Город</label>
                                    <Field className={classes.input} name="city"/>
                                </div>
                            </div>
                        </div>
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button type="submit" className={classes.button}>Сохранить</button>
                    </Form>
                )}
            </Formik>
            <Formik
                initialValues={{
                    password: '', confirmPassword: ''
                }}
                onSubmit={(values, actions) => {
                    updateUserItemPassword({id: userItem.id, password: values.password}, actions.setStatus);
                    actions.resetForm({values: ''});
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      status={ error: [] }}) => (
                    <Form className={classes.form}>
                        <div className={classes.line}>
                            <div className={classes.profileEdit}>
                                <label htmlFor="password" className={classes.label}>Новый пароль</label>
                                <Field type="password" name="password"
                                       className={classNames(classes.input, {["is-danger"]: errors.password && touched.password})}
                                       validate={validatePassword} />
                                {errors.password && touched.password && <div className="has-text-danger">{errors.password}</div>}
                            </div>
                            <div className={classes.profileEdit}>
                                <label htmlFor="confirmPassword" className={classes.label}>Подтвердите новый пароль</label>
                                <Field type="password" name="confirmPassword"
                                       className={classNames(classes.input, {["is-danger"]: errors.confirmPassword && touched.confirmPassword})}
                                       validate={value => validateConfirmPassword(values.password, value)}/>
                                {errors.confirmPassword && touched.confirmPassword && (<div className="has-text-danger">{errors.confirmPassword}</div>)}
                            </div>
                        </div>
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button type="submit" className={classNames(classes.button, "has-background-grey", "has-text-white")}>
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UserUpdate