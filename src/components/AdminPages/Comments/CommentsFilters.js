import {compose} from "redux";
import {connect} from "react-redux";
import {setFilters, setFilterTemporary} from "../../../redux/commentsAdminReducer";
import {DateFilter, DefaultFilter} from "../../common/ColumnFilter";

const stateToProps = (state) => ({
    filter: state.commentsAdminPage.filters,
    textFilters: state.commentsAdminPage.textFilters

})

export const CommentsDefaultFilter = compose(
    connect(stateToProps, {setFilters, setFilterTemporary}),
)(DefaultFilter)

export const CommentsDateFilter = compose(
    connect(stateToProps, {setFilters}),
)(DateFilter)