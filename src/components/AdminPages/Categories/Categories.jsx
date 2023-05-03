import {NavLink} from "react-router-dom";
import classes from "./Categories.module.css"
import CategoriesTable from "./CategoriesTable";
import {Field, Form, Formik, useFormikContext, useField} from "formik";

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
                        onSubmit={values => {
                            props.addCategory(values.name);
                        }}
                    >
                        <Form>
                            <div className={classes.addCategories}>
                                <div className={classes.categoryName}>
                                    <div className={classes.name}>Название категории: </div>
                                    <Field name="name" className={classes.input} />
                                </div>
                                <button className={classes.headerLink}>Добавить</button>
                            </div>
                        </Form>

                    </Formik>
                </div>
                <CategoriesTable {...props} />
            </div>
        </div>
    )
}

export default Categories;