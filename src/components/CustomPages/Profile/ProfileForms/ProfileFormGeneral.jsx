import classes from "../Profile.module.css";
import {Field, Form, Formik} from "formik";
import React, {useState, useEffect} from "react";
import PhoneInput from "../phoneInput";
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

    return (
        <div className={classes.general}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    firstName: props.profile.name,
                    lastName: props.profile.surname,
                    email: props.profile.user?.email,
                    numberPhone: props.profile.phone_number,
                    birthday: props.profile.birthday,
                    city: props.profile.city,
                    photo: props.profile.avatar_url
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // values.date = values.date.split("-").reverse().join("-");
                    values.numberPhone = values.numberPhone.split(" ").join("");
                    console.log(values);
                    props.setGeneralInfo(values.firstName, values.lastName, values.numberPhone, values.city, values.birthday, values.photo, values.email)
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange}) => (
                    <Form className={classes.form} encType="multipart/form-data" method="POST">
                        <div className={classes.avatar}>
                            <label htmlFor="photo" className={classes.label}>Аватар</label>
                            <div className={classes.photoContainer}>
                                <img className={classes.photo} alt={''} src={imageAvatar} />
                                <div className={classes.controlsButtonPhoto}>
                                    <div>
                                        <label htmlFor={'uploadAvatarPhoto'}  className={classes.buttonPhoto}>
                                            Загрузить фото
                                        </label>
                                        <input
                                            type='file'
                                            // value={values.coverPhoto || ''}
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
                                        <button className={classes.buttonPhoto} onClick={onDeleteAvatarPhoto}>Удалить фото</button>
                                    </div>
                                </div>
                            </div>
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
                                <Field
                                    component={PhoneInput}
                                    value={values.numberPhone}
                                    onChange={ handleChange }
                                    name="numberPhone"
                                />
                            </div>
                        </div>
                        <div className={classes.line}>
                            <div>
                                <label htmlFor="birthday" className={classes.label}>Дата рождения</label>
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