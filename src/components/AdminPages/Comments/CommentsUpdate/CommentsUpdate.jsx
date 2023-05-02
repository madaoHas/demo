import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import classes from "./CommentsUpdate.module.css";
import {NavLink} from "react-router-dom";

const SignupSchema = Yup.object().shape({
    comment: Yup.string().required('Обязательное поле')
});

const CommentsUpdate = (props) => {
    console.log(props.row)
    return (
        <div className={classes.formContainer}>
            <Formik
                initialValues={{
                    id: props.row.id,
                    date: props.row.date,
                    news: '',
                    user: '',
                    comment: props.row.comment
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({values, errors, touched, setFieldValue}) => (
                    <Form className={classes.form}>
                        <div className={classes.generalInfo}>
                            <div className={classes.line}>
                                <div>
                                    <label htmlFor="id" className={classes.label}>ID:</label>
                                    <span name="id">{props.row.id}</span>
                                </div>
                                <div>
                                    <label htmlFor="news" className={classes.label}>Новость:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"news"} to={"/admin/news"}>Ссылка</NavLink>
                                        <div className={classes.linkImg}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div>
                                    <label htmlFor="date" className={classes.label}>Дата комментария:</label>
                                    <span name="date">{props.row.date}</span>
                                </div>
                                <div>
                                    <label htmlFor="user" className={classes.label}>Пользователь:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"user"} to={"/admin/users"}>Ссылка</NavLink>
                                        <div className={classes.linkImg}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.commentText}>
                            <label htmlFor="comment" className={classes.label}>Текст комментария</label>
                            <textarea name={"comment"} className={classes.comment} defaultValue={props.row.comment}></textarea>
                        </div>
                        <button type="submit" className={classes.button}>
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CommentsUpdate;