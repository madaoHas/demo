import {connect} from "react-redux";
import Categories from "./Categories";
import {addCategory, getCategoryAdmin, deleteCategory, updateCategory} from "../../../redux/categoryReducer";
import {useEffect} from "react";

const CategoriesContainerAdmin = (props) => {
    console.log(props);
    useEffect( () => {
        props.getCategoryAdmin();
    }, [])
    return (
        <div>
            <Categories {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.category
})

export default connect(mapStateToProps, {getCategoryAdmin, addCategory, deleteCategory, updateCategory})(CategoriesContainerAdmin);