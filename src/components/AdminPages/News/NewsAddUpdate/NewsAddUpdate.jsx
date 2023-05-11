import React, {useState, useEffect} from "react";
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
    console.log(props);
    let [title, setTitle] = useState('');
    let [date, setDate] = useState('');
    let [category, setCategory] = useState('');
    let [previewText, setPreviewText] = useState('');
    let [newsText, setNewsText] = useState('');
    let [status, setStatus] = useState(false);
    let [previewPhoto, setPreviewPhoto] = useState('');
    let [coverPhoto, setCoverPhoto] = useState('');
    useEffect( () => {
        // props.getNews(1, 10);
        if (props.newsItem.title) {
            setTitle(props.newsItem.title)
        }
        if (props.newsItem.date) {
            setDate(props.newsItem.date)
        }
        if (props.newsItem.category) {
            setCategory(props.newsItem.category)
        }
        if (props.newsItem.preview_text) {
            setPreviewText(props.newsItem.preview_text)
        }
        if (props.newsItem.text) {
            setNewsText(props.newsItem.text)
        }
        if (props.newsItem.is_active) {
            setStatus(props.newsItem.is_active)
        }
        // if (props.newsItem.preview_image_url) {
        //     setPreviewPhoto(props.newsItem.preview_image_url)
        // }
        // if (props.newsItem.text_image_url) {
        //     setCoverPhoto(props.newsItem.text_image_url)
        // }
    },[props.newsItem] )
    let navigate = useNavigate();
    let url = window.location.href;
    let infoPage = url.match(/(?<=(http:\/\/localhost:3000\/admin\/news\/))((add)|(update))$/)[0]
    return (
        <div className={classes.formContainer}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    header: title,
                    date: date,
                    category: category,
                    status: status,
                    previewPhoto: previewPhoto,
                    coverPhoto: coverPhoto,
                    newsText: newsText,
                    previewText: previewText
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    if (infoPage === 'add') {
                        props.addNews(values.category.id, values.header, values.previewText, values.previewPhoto, values.newsText, values.coverPhoto, values.date)
                    }
                    if (infoPage === 'update') {
                        props.updateNews(props.id, values.category.id, values.header, values.previewText, values.previewPhoto, values.newsText, values.coverPhoto, values.date, values.status)
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
                                <div className={classes.photoContainer}>
                                    <img className={classes.photo} />
                                    <div className={classes.controlsButtonPhoto}>
                                        <div>
                                            <label htmlFor={'uploadPreviewPhoto'} className={classes.buttonPhoto}>
                                                Загрузить фото
                                            </label>
                                            <input
                                                id={'uploadPreviewPhoto'}
                                                type='file'
                                                name={'previewPhoto'}
                                                className={classes.photoInput}
                                                onChange={(e) =>
                                                    setFieldValue('previewPhoto', e.currentTarget.files[0])
                                                }
                                                accept='uploads//*'
                                            />
                                        </div>
                                        <div>
                                            <button className={classes.buttonPhoto}>Удалить фото</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.coverPhoto}>
                                <label className={classes.label} htmlFor={"coverPhoto"}>Обложка новости</label>
                                <div className={classes.photoContainer}>
                                    <img className={classes.photo} src={'/img/pic.jpeg'} />
                                    <div className={classes.controlsButtonPhoto}>
                                        <div>
                                            <label htmlFor={'uploadCoverPhoto'}  className={classes.buttonPhoto}>
                                                Загрузить фото
                                            </label>
                                            <input
                                                type='file'
                                                id={'uploadCoverPhoto'}
                                                name={"coverPhoto"}
                                                className={classes.photoInput}
                                                onChange={(e) =>
                                                    setFieldValue('coverPhoto', e.currentTarget.files[0])
                                                }
                                                accept='uploads//*'
                                            />
                                        </div>
                                        <div>
                                            <button className={classes.buttonPhoto}>Удалить фото</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.newsTexts}>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"newsText"} className={classes.label}>Текст новости</label>
                                <textarea name={"newsText"} onChange={handleChange} className={classes.newsText} value={values.newsText}></textarea>
                                {errors.newsText && touched.newsText ? (
                                    <div className="has-text-danger">{errors.newsText}</div>
                                ) : null}
                            </div>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"previewText"} className={classes.label}>Текст превью</label>
                                <textarea name={"previewText"} onChange={handleChange} className={classes.previewText} value={values.previewText}></textarea>
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