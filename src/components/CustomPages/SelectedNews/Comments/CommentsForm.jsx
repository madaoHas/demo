import {Field, Form, Formik} from "formik";
import classes from "./CommentsForm.module.css";
import classNames from "classnames";
import React from "react";


const CommentsForm = (props) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.username}>
                {/*process.env.REACT_APP_URL_BASE + userItem.profile.avatar_url.slice(7)*/}
                <img src={props.auth.profile.avatar_url ? process.env.REACT_APP_URL_BASE + props.auth.profile.avatar_url.slice(7) : '/img/images.jpeg'} />
                <div>Username</div>
            </div>
            <Formik
                initialValues={{
                    comment: ''
                }}
                onSubmit={values => {
                    props.addComment(props.postId, values.comment);
                    values.comment = '';
                }}
            >
                {({values, errors, touched, setFieldValue}) => (
                    <Form className={classes.form}>
                        <div className={classes.commentInput}>
                            <Field
                                placeholder="Текст комментария"
                                className={classNames("input", {["is-danger"]: errors.comment && touched.comment})}
                                name="comment"/>
                            {errors.comment && touched.comment ? (
                                <div className="has-text-danger">{errors.comment}</div>
                            ) : null}
                        </div>
                        <button type="submit" className={classNames("button", "has-background-grey", "has-text-white")}>
                            ОТПРАВИТЬ
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CommentsForm;