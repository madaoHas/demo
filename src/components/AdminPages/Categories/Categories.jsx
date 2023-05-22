import classes from "./Categories.module.css"
import CategoriesTable from "./CategoriesTable";
import {Field, Form, Formik} from "formik";
import React from "react";

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
                            props.addCategory(values.name, actions.setStatus);
                            actions.resetForm({values: ''});
                        }}
                    >
                        {({
                                status={ error: [] }}) => (
                        <Form>
                            <div className={classes.addCategories}>
                                <div className={classes.categoryName}>
                                    <div className={classes.name}>Название категории: </div>
                                    <Field name="name" className={classes.input} />
                                </div>
                                <button className={classes.headerLink}>Добавить</button>
                            </div>
                            {status && status.error ? (<div className="has-text-danger">{status.error}</div>) : null}
                        </Form>
                            )}

                    </Formik>
                </div>
                <CategoriesTable {...props} />
            </div>
        </div>
    )
}

export default Categories;