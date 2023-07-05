import React, {useState, useEffect, useRef} from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {DateInput} from "../../../common/inputCustom/dateInput";
import {SelectInput} from "../../../common/inputCustom/selectInput";
import {SwitchInput} from "../../../common/inputCustom/switchInput";
import classes from "./NewsAddUpdate.module.css";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";


const SignupSchema = Yup.object().shape({
    title: Yup.string().required('Обязательное поле'),
    date: Yup.string().required('Обязательное поле'),
    preview_text: Yup.string().required('Обязательное поле'),
    text: Yup.string().required('Обязательное поле'),
    category: Yup.object().required('Обязательное поле'),
});

const NewsAddUpdate = (props) => {

    let navigate = useNavigate();
    let infoPage = props.infoPage.match(/((add)|(update))\/?\d*$/)[1]

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


    const [fieldValueChange, setFieldValueChange] = useState(true)

    const ref = useRef(null);

    const changeInput = async (setFieldValue, field, value) => {

        await setFieldValue(field, value)
        let currentValues = ref.current.values


        let flagChange = false

        for (let valueItem in currentValues) {
            if (valueItem === "category") {
                if (props.newsItem[valueItem].name !== currentValues[valueItem].name) {
                    flagChange = true
                }
            }
            else if (props.newsItem[valueItem] !== currentValues[valueItem]) {
                flagChange = true
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
        <div className={classes.formContainer}>
            <Formik
                innerRef={ref}
                enableReinitialize={true}
                initialValues={{
                    title: props.newsItem.title,
                    date: props.newsItem.date,
                    category: props.newsItem.category,
                    is_active: props.newsItem.is_active,
                    preview_image_url: props.newsItem.preview_image_url,
                    text_image_url: props.newsItem.text_image_url,
                    text: props.newsItem.text,
                    preview_text: props.newsItem.preview_text
                }}

                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    if (infoPage === 'add') {
                        props.addNews(values.category.id, values.title, values.preview_text, values.preview_image_url, values.text, values.text_image_url, values.date, actions.setStatus, actions.setSubmitting)
                    }
                    if (infoPage === 'update') {
                        props.updateNews(props.id, values.category.id, values.title, values.preview_text, values.preview_image_url, values.text, values.text_image_url, values.date, values.is_active, actions.setStatus, actions.setSubmitting)
                    }
                    // navigate('/admin/news', {replace: false});
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
                        <div className={classes.generalInfo}>
                            <div className={classes.line}>
                                <div className={classes.containerInput}>
                                    <label htmlFor={"title"} className={classes.label}>Заголовок новости</label>
                                    <Field
                                        disabled={isSubmitting}
                                        name={"title"}
                                        onChange={(e) => {
                                            changeInput(setFieldValue, "title", e.target.value)
                                        }}
                                        value={values.title}
                                        className={classNames(classes.input, {["is-danger"]: errors.title && touched.title})} />
                                    {errors.title && touched.title ? (
                                        <div className="has-text-danger">{errors.title}</div>
                                    ) : null}
                                </div>
                                <div className={classes.containerInput}>
                                    <label htmlFor={"date"} className={classes.label}>Дата публикации</label>
                                    <Field
                                        disabled={isSubmitting}
                                        component={DateInput}
                                        name={"date"}
                                        className={classNames(classes.input, {["is-danger"]: errors.date && touched.date})}
                                        type="text"
                                        value={values.date}
                                        setFieldValue={setFieldValue}
                                        onChange={changeInput}
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
                                        disabled={isSubmitting}
                                        component={SelectInput}
                                        name={"category"}
                                        values={props.categories}
                                        value={values.category}
                                        valueType={"name"}
                                        setFieldValue={setFieldValue}
                                        onChangeOption={changeInput}
                                        // onChangeOption={(a)=> {values.category = a}}
                                    />
                                    {errors.category && touched.category ? (
                                        <div className="has-text-danger">{errors.category}</div>
                                    ) : null}
                                </div>
                                <div className={classes.containerInput} style={infoPage === 'add' ? {display: 'none'} : null}>
                                    <label htmlFor={"is_active"} className={classes.label}>Статус новости:</label>
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
                        </div>
                        <div className={classes.photos}>
                            <div className={classes.previewPhoto}>
                                <label htmlFor={"preview_image_url"} className={classes.label}>Превью новости</label>
                                <div className={classes.photoContainer}>
                                    <img className={classes.photo} src={imagePreview} alt={''} />
                                    <div className={classes.controlsButtonPhoto}>
                                        <div>
                                            <label htmlFor={'uploadPreviewPhoto'} className={classes.buttonPhoto}>
                                                Загрузить фото
                                            </label>
                                            <input
                                                disabled={isSubmitting}
                                                id={'uploadPreviewPhoto'}
                                                type='file'
                                                name={'preview_image_url'}
                                                className={classes.photoInput}
                                                onChange={(e) => {
                                                    setFieldValue('preview_image_url', e.currentTarget.files[0])
                                                    setFieldValueChange(false);
                                                    onImagePreviewChange(e)
                                                }}
                                                accept='uploads//*'
                                            />
                                        </div>
                                        <div>
                                            <button
                                                disabled={isSubmitting}
                                                className={classNames(classes.buttonPhoto, {[classes.buttonDisabled]: isSubmitting || imagePreview === null}) }
                                                onClick={(e) => {
                                                    setFieldValueChange(false);
                                                    onDeletePreviewPhoto(e)
                                                }}
                                            >
                                                Удалить фото
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.coverPhoto}>
                                <label className={classes.label} htmlFor={"text_image_url"}>Обложка новости</label>
                                <div className={classes.photoContainer}>
                                    <img className={classes.photo} src={imageCover} alt={''} />
                                    <div className={classes.controlsButtonPhoto}>
                                        <div>
                                            <label htmlFor={'uploadCoverPhoto'}  className={classes.buttonPhoto}>
                                                Загрузить фото
                                            </label>
                                            <input
                                                disabled={isSubmitting}
                                                type='file'
                                                id={'uploadCoverPhoto'}
                                                name={"text_image_url"}
                                                className={classes.photoInput}
                                                onChange={(e) => {
                                                    setFieldValue('text_image_url', e.currentTarget.files[0]);
                                                    setFieldValueChange(false);
                                                    onImageCoverChange(e)
                                                }}
                                                accept='uploads//*'
                                            />
                                        </div>
                                        <div>
                                            <button
                                                disabled={isSubmitting}
                                                className={classNames(classes.buttonPhoto, {[classes.buttonDisabled]: isSubmitting || imageCover === null}) }
                                                onClick={(e) => {
                                                    setFieldValueChange(false);
                                                    onDeleteCoverPhoto(e)
                                                }}
                                            >
                                                Удалить фото
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.newsTexts}>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"text"} className={classes.label}>Текст новости</label>
                                <textarea
                                    disabled={isSubmitting}
                                    name={"text"}
                                    // onChange={handleChange}
                                    className={classes.newsText}
                                    value={values.text}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "text", e.target.value)
                                    }}
                                />
                                {errors.text && touched.text ? (
                                    <div className="has-text-danger">{errors.text}</div>
                                ) : null}
                            </div>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"preview_text"} className={classes.label}>Текст превью</label>
                                <textarea
                                    disabled={isSubmitting}
                                    name={"preview_text"}
                                    // onChange={handleChange}
                                    className={classes.previewText}
                                    value={values.preview_text}
                                    onChange={(e) => {
                                        changeInput(setFieldValue, "preview_text", e.target.value)
                                    }}
                                />
                                {errors.preview_text && touched.preview_text ? (
                                    <div className="has-text-danger">{errors.preview_text}</div>
                                ) : null}
                            </div>
                        </div>
                        {status && status.error.length > 0 ? (<div className="has-text-danger">{status.error}</div>) : null}
                        {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        <button
                            disabled={isSubmitting || (infoPage === "update" ? fieldValueChange : false)}
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

export default NewsAddUpdate;