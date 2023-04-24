import {connect} from "react-redux";
import Categories from "./Categories";

const CategoriesContainerAdmin = (props) => {
    return (
        <div>
            <Categories {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.category.category
})

export default connect(mapStateToProps)(CategoriesContainerAdmin);