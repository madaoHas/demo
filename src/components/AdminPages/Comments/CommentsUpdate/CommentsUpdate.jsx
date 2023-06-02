import React from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import classes from "./CommentsUpdate.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import moment from 'moment'

const SignupSchema = Yup.object().shape({
    comment: Yup.string().required('Обязательное поле')
});

const CommentsUpdate = (props) => {
    console.log(props)
    let navigate = useNavigate();
    return (
        <div className={classes.formContainer}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: props.newsItem.id,
                    date: props.newsItem.created_at,
                    news: '',
                    user: '',
                    comment: props.newsItem.text
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    props.updateComment(values.id, values.comment);
                    navigate('/admin/comments', {replace: false});
                }}
            >
                {({
                      values,
                      handleChange
                }) => (
                    <Form className={classes.form}>
                        <div className={classes.generalInfo}>
                            <div className={classes.line}>
                                <div>
                                    <label htmlFor="id" className={classes.label}>ID:</label>
                                    <span name={"id"}>{values.id}</span>
                                </div>
                                <div>
                                    <label htmlFor="news" className={classes.label}>Новость:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"news"} to={"/admin/news"} state={{id: props.newsItem.post_id}}>Ссылка</NavLink>
                                        <div className={classes.linkImg} />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.line}>
                                <div>
                                    <label htmlFor="date" className={classes.label}>Дата комментария:</label>
                                    <span name="date">{moment(values.date).format('DD-MM-YYYY')}</span>
                                </div>
                                <div>
                                    <label htmlFor="user" className={classes.label}>Пользователь:</label>
                                    <div className={classes.link}>
                                        <NavLink name={"user"} to={"/admin/users"} state={{id: props.newsItem.user_id}}>Ссылка</NavLink>
                                        <div className={classes.linkImg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.commentText}>
                            <label htmlFor="comment" className={classes.label}>Текст комментария</label>
                            <textarea
                                name={"comment"}
                                className={classes.comment}
                                value={values.comment}
                                onChange={handleChange}
                            />
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