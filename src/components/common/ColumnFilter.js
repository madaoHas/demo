import classes from "./ColumnFilter.module.css";
import {Component} from "react";
import React from "react";
import moment from "moment";
import Flatpickr from "react-flatpickr";



export const DefaultFilter = (props) => {
    let value = props.textFilters[props.column.id]
    return (
        <form onSubmit={(e) => {
            props.setFilters(props.textFilters)
            e.preventDefault()
        }}>
            <input
                className={classes.inputFilter}
                name={props.column.id}
                value={value ? value : undefined}
                onChange={( e) => {
                    if (e.target.value === "") {
                        props.setFilterTemporary(props.column.id, null)
                    }
                    else {
                        props.setFilterTemporary(props.column.id, e.target.value)
                    }
                }}

            />
        </form>
    )
}

export class DateFilter extends Component {
    OnChange = (e) => {
        let value = undefined
        if(e){
            value=moment(e[0]).format('YYYY-MM-DD')
        }
        let filter = {[this.props.column.id]: value}
        this.props.setFilters(filter)
    }
    render() {
        return (
            <Flatpickr
                className={classes.dateFilter}
                onCreate={flatpickr => {
                    this.calendar = flatpickr;
                }}
                onDestroy={() => {
                    delete this.calendar;
                }}
                render={({defaultValue}, ref) => {
                    return (
                        <div
                            // className={`${s.dateInput} `}
                        >
                            <input
                                // className={`${f.filter}`}
                                type='text'
                                value={this.props.filter[this.props.column.id]}
                                ref={ref}
                            />
                            {this.props.filter[this.props.column.id] ?
                                <a
                                    // className={`${s.clearDate}`}
                                    onClick={()=> {
                                        this.OnChange()}}
                                />
                                : null}
                        </div>

                    );
                }}
                onChange={e => {
                    this.OnChange(e)
                }}
            />
        );
    }
}


export const SelectFilter = ({OnChange, currentOptions, value}) => {
    const options = currentOptions?.map(o =>
        <option key={o.label} value={o.value}>
            {o.label}
        </option>
    )
    return (
        <select
            className={classes.selectFilter}
            value={value}
            onChange={(e) => {
                OnChange(e.target.value)
            }}
        >
            <option value="">Все</option>
            {options}
        </select>
    )
}


