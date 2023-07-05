import React from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import classes from "./CommentsUpdate.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import moment from 'moment'
import classNames from "classnames";
import {useRef, useState} from "react";

const SignupSchema = Yup.object().shape({
    text: Yup.string().required('Обязательное поле')
});



const CommentsUpdate = (props) => {

    const [fieldValueChange, setFieldValueChange] = useState(true)

    const ref = useRef(null);

    const changeInput = async (setFieldValue, field, value) => {

        await setFieldValue(field, value)
        let currentValues = ref.current.values


        let flagChange = false

        for (let valueItem in currentValues) {
            if (props.commentItem[valueItem] !== currentValues[valueItem]) {
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
                    id: props.commentItem.id,
                    created_at: props.commentItem.created_at,
                    post_id: props.commentItem.post_id,
                    user_id: props.commentItem.user_id,
                    text: props.commentItem.text
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    props.updateComment(values.id, values.text, actions.setStatus, actions.setSubmitting);
                }}
            >
                {({
                      values,
                      handleChange,
                      status={ error: [] },
                      isSubmitting,
                      setFieldValue,
                      errors,
                      touched
                }) => (
                    <Form className={classes.form}>
                        <div className={classes.generalInfo}>
                            <div className={classes.line}>
                                <div>
                                    <label htmlFor="id" className={classes.label}>ID:</label>
                                    <span name={"id"}>{values.id}</span>
                                </div>
                                <div>
                                    <label htmlFor="post_id" className={classes.label}>Новость:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"post_id"} to={"/admin/news"} state={{id: props.commentItem.post_id}}>Ссылка</NavLink>
                                        <div className={classes.linkImg} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div>
                                    <label htmlFor="created_at" className={classes.label}>Дата комментария:</label>
                                    <span name="created_at">{moment(values.created_at).format('DD-MM-YYYY')}</span>
                                </div>
                                <div>
                                    <label htmlFor="user_id" className={classes.label}>Пользователь:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"user_id"} to={"/admin/users"} state={{id: props.commentItem.user_id}}>Ссылка</NavLink>
                                        <div className={classes.linkImg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.commentText}>
                            <label htmlFor="text" className={classes.label}>Текст комментария</label>
                            <textarea
                                disabled={isSubmitting}
                                name={"text"}
                                className={classes.comment}
                                value={values.text}
                                onChange={(e) => {
                                    changeInput(setFieldValue, "text", e.target.value)
                                }}
                            />
                            {errors.text && touched.text ? (
                                <div className="has-text-danger">{errors.text}</div>
                            ) : null}
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
        </div>
    )
}

export default CommentsUpdate;