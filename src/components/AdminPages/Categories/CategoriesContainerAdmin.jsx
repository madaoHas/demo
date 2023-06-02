import {connect} from "react-redux";
import Categories from "./Categories";
import {addCategory, getCategoryAdmin, deleteCategory, updateCategory} from "../../../redux/categoryReducer";
import {useEffect} from "react";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";

const CategoriesContainerAdmin = (props) => {
    useEffect( () => {
        props.getCategoryAdmin({}, 1, 10);
    }, [])
    return (
        <div>
            <Categories {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.category,
    pager: state.category.pager_out
})

export default compose(connect(mapStateToProps, {getCategoryAdmin, addCategory, deleteCategory, updateCategory}),
    withRouter, withAuthRedirect, withAdminRedirect)(CategoriesContainerAdmin);