import {compose} from "redux";
import {connect} from "react-redux";
import {setFilterTemporary, setFilters} from "../../../redux/newsAdminReducer";
import {DateFilter, DefaultFilter, SelectFilter} from "../../common/ColumnFilter";

const stateToProps = (state) => ({
    filter: state.newsAdminPage.filters,
    textFilters: state.newsAdminPage.textFilters,
    categories: state.newsAdminPage.categories
})
export const NewsDefaultFilter = compose(
    connect(stateToProps, {setFilters, setFilterTemporary}),
)(DefaultFilter)

export const NewsDateFilter = compose(
    connect(stateToProps, {setFilters}),
)(DateFilter)

const NewsCategoriesFilterContainer = (props) => {
    const options = props.categories.map(c => {
        return {label: c.name, value: c.id}
    })
    const OnChange = (value) => {
        let filter = {'category_id': value}
        props.setFilters(filter)
    }
    return (
        <SelectFilter
            value={props.filter[props.column.id]}
            currentOptions={options}
            OnChange={OnChange}
        />
    )
}
export const NewsCategoriesFilter = compose(
    connect(stateToProps, {setFilters}),
)(NewsCategoriesFilterContainer)

const NewsActiveFilterContainer = (props) => {
    const options = [
        {
            value: 'true',
            label: 'Да'
        },
        {
            value: 'false',
            label: 'Нет'
        }
    ]
    const OnChange = (value) => {
        let filter = {[props.column.id]: value}
        props.setFilters(filter)
    }
    return (
        <SelectFilter
            value={props.filter[props.column.id]}
            currentOptions={options}
            OnChange={OnChange}
        />
    )
}
export const NewsActiveFilter = compose(
    connect(stateToProps, {setFilters}),
)(NewsActiveFilterContainer)