import {connect} from "react-redux";
import Categories from "./Categories";
import {getCategory, addCategory} from "../../../redux/categoryReducer";
import {useEffect} from "react";

const CategoriesContainerAdmin = (props) => {
    useEffect( () => {
        props.getCategory();
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

export default connect(mapStateToProps, {getCategory, addCategory})(CategoriesContainerAdmin);