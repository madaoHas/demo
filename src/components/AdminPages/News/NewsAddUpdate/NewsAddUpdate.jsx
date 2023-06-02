import React, {useState, useEffect} from "react";
import {Field, Form, Formik} from "formik";
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

    const [imagePreview, setImagePreview] = useState(null);
    const [imageCover, setImageCover] = useState(null);

    useEffect( () => {
        if (props.newsItem.preview_image_url) {
            setImagePreview(process.env.REACT_APP_URL_BASE + props.newsItem.preview_image_url.slice(7))
        }
        else {
            setImagePreview(null)
        }
    }, [props.newsItem.preview_image_url] )

    useEffect( () => {
        if (props.newsItem.text_image_url) {
            setImageCover(process.env.REACT_APP_URL_BASE + props.newsItem.text_image_url.slice(7))
        }
        else {
            setImageCover(null)
        }
    }, [props.newsItem.text_image_url] )

    const onImagePreviewChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onImageCoverChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageCover(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onDeletePreviewPhoto = (e) => {
        props.newsItem.preview_image_url = null;
        setImagePreview(null)
        e.preventDefault();
    }
    const onDeleteCoverPhoto = (e) => {
        props.newsItem.text_image_url = null;
        setImageCover(null)
        e.preventDefault();
    }

    return (
        <div className={classes.formContainer}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    header: props.newsItem.title,
                    date: props.newsItem.date,
                    category: props.newsItem.category,
                    status: props.newsItem.is_active,
                    previewPhoto: props.newsItem.preview_image_url,
                    coverPhoto: props.newsItem.text_image_url,
                    newsText: props.newsItem.text,
                    previewText: props.newsItem.preview_text
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
                                    <Field
                                        name={"header"}
                                        value={values.header}
                                        className={classNames(classes.input, {["is-danger"]: errors.header && touched.header})} />
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
                                    <img className={classes.photo} src={imagePreview} alt={''} />
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
                                                onChange={(e) => {
                                                    setFieldValue('previewPhoto', e.currentTarget.files[0])
                                                    onImagePreviewChange(e)
                                                }}
                                                accept='uploads//*'
                                            />
                                        </div>
                                        <div>
                                            <button className={classes.buttonPhoto} onClick={onDeletePreviewPhoto}>Удалить фото</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.coverPhoto}>
                                <label className={classes.label} htmlFor={"coverPhoto"}>Обложка новости</label>
                                <div className={classes.photoContainer}>
                                    <img className={classes.photo} src={imageCover} alt={''} />
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
                                                onChange={(e) => {
                                                    setFieldValue('coverPhoto', e.currentTarget.files[0]);
                                                    onImageCoverChange(e)
                                                }}
                                                accept='uploads//*'
                                            />
                                        </div>
                                        <div>
                                            <button className={classes.buttonPhoto} onClick={onDeleteCoverPhoto}>Удалить фото</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.newsTexts}>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"newsText"} className={classes.label}>Текст новости</label>
                                <textarea name={"newsText"} onChange={handleChange} className={classes.newsText} value={values.newsText} />
                                {errors.newsText && touched.newsText ? (
                                    <div className="has-text-danger">{errors.newsText}</div>
                                ) : null}
                            </div>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"previewText"} className={classes.label}>Текст превью</label>
                                <textarea name={"previewText"} onChange={handleChange} className={classes.previewText} value={values.previewText} />
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