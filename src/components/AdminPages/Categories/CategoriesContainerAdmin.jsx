import {connect} from "react-redux";
import Categories from "./Categories";
import {addCategory, getCategoryAdmin, deleteCategory, updateCategory, changePage, setFilters, setFilterTemporary} from "../../../redux/categoryReducer";
import {compose} from "redux";
import {withRouter} from "../../../hoc/withRouter";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {withAdminRedirect} from "../../../hoc/withAdminRedirect";
import {withFilterParams} from "../../../hoc/withFilterParams";

const CategoriesContainerAdmin = (props) => {
    return (
        <div>
            <Categories {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.category,
    pager: state.category.pager_out.page,
    filter: state.category.filters,
    textFilters: state.category.textFilters,
    pagesCount: state.category.pagesCount,
})

export default compose(connect(mapStateToProps,
        {
            request: getCategoryAdmin, addCategory, deleteCategory, updateCategory, changePage, setFilters, setFilterTemporary
        }),
    withRouter, withAuthRedirect, withAdminRedirect, withFilterParams)(CategoriesContainerAdmin);