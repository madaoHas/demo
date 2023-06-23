import {compose} from "redux";
import {connect} from "react-redux";
import {setFilterTemporary, setFilters} from "../../../redux/categoryReducer";
import {DefaultFilter} from "../../common/ColumnFilter";

const stateToProps = (state) => ({
    filter: state.category.filter,
    textFilters: state.category.textFilters
})

export const CategoriesDefaultFilter = compose(
    connect(stateToProps, {setFilters, setFilterTemporary}),
)(DefaultFilter)