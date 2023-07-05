import classes from "./Categories.module.css"
import CategoriesTable from "./CategoriesTable";
import {Field, Form, Formik} from "formik";
import React from "react";
import Paginator from "../../common/Paginator/Paginator";
import classNames from "classnames";

const Categories = (props) => {
    return (
        <div className={classes.categoriesAdmin}>
            <div className={classes.categoriesContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Категории</div>
                    <Formik
                        initialValues={{
                            name: ''
                        }}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true)
                            props.addCategory(values.name, actions.setStatus, actions.setSubmitting);
                            // actions.resetForm({values: ''});
                        }}
                    >
                        {({
                              status={ error: [] },
                              isSubmitting
                        }) => (
                        <Form>
                            <div className={classes.addCategories}>
                                <div className={classes.categoryName}>
                                    <div className={classes.name}>Название категории: </div>
                                    <Field name="name" className={classes.input} disabled={isSubmitting} />
                                </div>
                                <button
                                    className={classNames(classes.headerLink, {"is-loading": isSubmitting}, "button")}
                                >
                                    Добавить
                                </button>
                            </div>
                            {status && status.error.length > 0 ? (<div className="has-text-danger">{status.error}</div>) : null}
                            {status && status.success ? (<div className="has-text-success">{status.success}</div>) : null}
                        </Form>
                            )}

                    </Formik>
                </div>
                <CategoriesTable {...props} />
            </div>
            <Paginator
                pagesCount={props.pagesCount}
                setPage={props.changePage}
            />
        </div>
    )
}

export default Categories;