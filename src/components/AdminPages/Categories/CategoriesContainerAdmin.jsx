import {connect} from "react-redux";
import Categories from "./Categories";
import {addCategory, getCategoryAdmin, deleteCategory, updateCategory} from "../../../redux/categoryReducer";
import {useEffect} from "react";

const CategoriesContainerAdmin = (props) => {
    useEffect( () => {
        props.getCategoryAdmin(1, 10);
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

export default connect(mapStateToProps, {getCategoryAdmin, addCategory, deleteCategory, updateCategory})(CategoriesContainerAdmin);