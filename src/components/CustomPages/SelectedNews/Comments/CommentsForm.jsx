import {Field, Form, Formik} from "formik";
import classes from "./CommentsForm.module.css";
import classNames from "classnames";
import React from "react";


const CommentsForm = (props) => {
    return (
        <div className={classes.formContainer}>
            <div className={classes.username}>
                <img src={props.state.news.img ? props.state.news.img : '/img/images.jpeg'} />
                <div>Username</div>
            </div>
            <Formik
                initialValues={{
                    comment: ''
                }}
                onSubmit={values => {
                    console.log(values);
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