import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {DateInput} from "../../../common/inputCustom/dateInput";
import {SelectInput} from "../../../common/inputCustom/selectInput";
import {SwitchInput} from "../../../common/inputCustom/switchInput";
import classes from "./NewsAddUpdate.module.css";
import classNames from "classnames";


const SignupSchema = Yup.object().shape({
    header: Yup.string().required('Обязательное поле'),
    date: Yup.string().required('Обязательное поле'),
});

const NewsAddUpdate = (props) => {
    return (
        <div className={classes.formContainer}>
            <Formik
                initialValues={{
                    header: '',
                    date: '',
                    category: props.categories[0],
                    status: false,
                    previewPhoto: '',
                    coverPhoto: '',
                    newsText: '',
                    previewText: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange
                }) => (
                    <Form className={classes.form}>
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
                                <div className={classes.containerInput}>
                                    <label htmlFor={"category"} className={classes.label}>Категория</label>
                                    <Field
                                        component={SelectInput}
                                        name={"category"}
                                        values={props.categories}
                                        value={values.category}
                                        valueType={"category"}
                                        onChangeOption={(a)=> {values.category = a}}
                                    />
                                </div>
                                <div className={classes.containerInput}>
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
                                <input type='file'/>
                            </div>
                            <div className={classes.coverPhoto}>
                                <label htmlFor={"coverPhoto"} className={classes.label}>Обложка новости</label>
                                <input type='file'/>
                            </div>
                        </div>
                        <div className={classes.newsTexts}>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"newsText"} className={classes.label}>Текст новости</label>
                                <textarea name={"newsText"} onChange={handleChange} className={classes.newsText}></textarea>
                            </div>
                            <div className={classes.containerTextarea}>
                                <label htmlFor={"previewText"} className={classes.label}>Текст превью</label>
                                <textarea name={"previewText"} onChange={handleChange} className={classes.previewText}></textarea>
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