import {compose} from "redux";
import {connect} from "react-redux";
import {setFilterTemporary, setFilters} from "../../../redux/usersAdminReducer";
import {DateFilter, DefaultFilter, SelectFilter} from "../../common/ColumnFilter";

const stateToProps = (state) => ({
    filter: state.usersAdminPage.filters,
    textFilters: state.usersAdminPage.textFilters
})

export const UserDefaultFilter = compose(
    connect(stateToProps, {setFilters, setFilterTemporary}),
)(DefaultFilter)

export const UserDateFilter = compose(
    connect(stateToProps, {setFilters}),
)(DateFilter)


const UserRoleFilterContainer = (props) => {
    const options = [
        {
            value: '1',
            label: 'Пользователь'
        },
        {
            value: '10',
            label: 'Админ'
        }
    ]
    const OnChange = (value) => {

        if(Number(value) !== 0){
            value=Number(value)
        }else{
            value = null
        }
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
export const UserRoleFilter = compose(
    connect(stateToProps, {setFilters}),
)(UserRoleFilterContainer)


const UserActiveFilterContainer = (props) => {
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
        if (value === "") {
            value = null
        }
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
export const UserActiveFilter = compose(
    connect(stateToProps, {setFilters}),
)(UserActiveFilterContainer)