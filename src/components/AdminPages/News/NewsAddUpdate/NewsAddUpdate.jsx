import React from "react";
import {Field, Form, Formik, replace} from "formik";
import * as Yup from "yup";
import {DateInput} from "../../../common/inputCustom/dateInput";
import {SelectInput} from "../../../common/inputCustom/selectInput";
import {SwitchInput} from "../../../common/inputCustom/switchInput";
import classes from "./NewsAddUpdate.module.css";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";


const SignupSchema = Yup.object().shape({
    header: Yup.string().required('Обязательное поле'),
    date: Yup.string().required('Обязательное поле'),
    previewText: Yup.string().required('Обязательное поле'),
    newsText: Yup.string().required('Обязательное поле'),
    category: Yup.object().required('Обязательное поле'),
});

const NewsAddUpdate = (props) => {
    let navigate = useNavigate();
    let url = window.location.href;
    let infoPage = url.match(/(?<=(http:\/\/localhost:3000\/admin\/news\/))((add)|(update))$/)[0]
    return (
        <div className={classes.formContainer}>
            <Formik
                initialValues={{
                    header: '',
                    date: '',
                    category: '',
                    status: false,
                    previewPhoto: '',
                    coverPhoto: '',
                    newsText: '',
                    previewText: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // console.log(values.previewPhoto);
                    if (infoPage === 'add') {
                        props.addUser(values.category.id, values.header, values.previewText, values.previewPhoto, values.newsText, values.coverPhoto, values.date)
                    }
                    navigate('/admin/news', {replace: false});
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange
                }) => (
                    <Form className={classes.form} encType="multipart/form-data" method="POST">
                        <div className={classes.generalInfo}>
                            <div className={classes.line}>
                                <div className={classes.containerInput}>
                                    <label htmlFor={"header"} className={classes.label}>Заголовок новости</label>
                                    <Field name={"header"} className={classNames(classes.input, {["is-danger"]: errors.header && touched.header})}></Field>
                                    {errors.header && touched.header ? (
                                        <div className="has-text-danger">{errors.header}</div>
                                    ) : null}
                                </div>
                                <div className={classes.containerInput}>
                                    <label htmlFor={"date"} className={classes.label}>Дата публикации</label>
                                    <Field
                                        component={DateInput}
                                        name={"date"}
                                        className={classNames(classes.input, {["is-danger"]: errors.date && touched.date})}
                                        type="text"
                                        value={values.date}
                                        onChange={(val)=>{values.date=val}}
                                    />
                                    {errors.date && touched.date ? (
                                        <div className="has-text-danger">{errors.date}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div className={classNames(classes.containerInput, {[classes.addCategory]: infoPage === 'add'})}>
                                    <label htmlFor={"category"} className={classes.label}>Категория</label>
                                    <Field
                                        component={SelectInput}
                                        name={"category"}
                                        values={props.categories}
                                        value={values.category}
                                        valueType={"name"}
                                        onChangeOption={(a)=> {values.category = a}}
                                    />
                                    {errors.category && touched.category ? (
                                        <div className="has-text-danger">{errors.category}</div>
                                    ) : null}
                                </div>
                                <div className={classes.containerInput} style={infoPage === 'add' ? {display: 'none'} : null}>
                                    <label htmlFor={"status"} className={classes.label}>Статус новости:</label>
                                    <Field
                                        component={SwitchInput}
                                        name={"status"}
                                        value={values.status}
                                        onChangeSwitch={(a) => {values.status = a}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes.photos}>
                            <div className={classes.previewPhoto}>
                                <label htmlFor={"previewPhoto"} className={classes.label}>Превью новости</label>
                                <input
                                    type='file'
                                    name={'previewPhoto'}
                                    onChange={(e) =>
                                        setFieldValue('previewPhoto', e.currentTarget.files[0])
                                    }
                                    accept='uploads//*'
                                />
                            </div>
                            <div className={classes.coverPhoto}>
                                <label htmlFor={"coverPhoto"} className={classes.label}>Обложка новости</label>
                                <input
                                    type='file'
                                    name={"coverPhoto"}
                                    onChange={(e) =>
                                        setFieldValue('coverPhoto', e.currentTarget.files[0])
                                    }
                                    accept='uploads//*'
                                />
                            </div>
                        </div>
                        <div className={classes.newsTexts}>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"newsText"} className={classes.label}>Текст новости</label>
                                <textarea name={"newsText"} onChange={handleChange} className={classes.newsText}></textarea>
                                {errors.newsText && touched.newsText ? (
                                    <div className="has-text-danger">{errors.newsText}</div>
                                ) : null}
                            </div>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"previewText"} className={classes.label}>Текст превью</label>
                                <textarea name={"previewText"} onChange={handleChange} className={classes.previewText}></textarea>
                                {errors.previewText && touched.previewText ? (
                                    <div className="has-text-danger">{errors.previewText}</div>
                                ) : null}
                            </div>
                        </div>
                        <button type="submit" className={classes.button}>Сохранить</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewsAddUpdate;