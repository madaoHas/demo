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
        else {
            value = null
            this.calendar.clear()
        }
        let filter = {[this.props.column.id]: value}
        this.props.setFilters(filter)
    }
    render() {
        return (
            <Flatpickr
                className={classes.dateContainer}
                onCreate={flatpickr => {
                    this.calendar = flatpickr;
                }}
                onDestroy={() => {
                    delete this.calendar;
                }}
                render={({defaultValue}, ref) => {
                    return (
                        <div
                            className={classes.dateInput}
                        >
                            <input
                                type={"image"}
                                src={"/img/Calendar.svg"}
                                className={classes.labelDate}
                                alt={""}
                                onFocus={() => {
                                    let input = document.getElementsByClassName(`${classes.dateFilter}`)
                                    let calendar = document.getElementsByClassName('flatpickr-calendar')
                                    input[0].classList.add('active')
                                    calendar[0].classList.add('open')
                                    calendar[0].classList.add('arrowTop')
                                    calendar[0].classList.add('arrowLeft')
                                    calendar[0].style.cssText='top: 236px; left: 423.953px; right: auto;'
                                }}
                                onBlur={() => {
                                    let input = document.getElementsByClassName(`${classes.dateFilter}`)
                                    let calendar = document.getElementsByClassName('flatpickr-calendar')
                                    input[0].classList.remove('active')
                                    calendar[0].classList.remove('open')
                                }}
                            />
                            <input
                                // className={`${f.filter}`}
                                className={classes.dateFilter}
                                type='text'
                                defaultValue={moment(this.props.filter[this.props.column.id]).format('DD-MM-YYYY')}
                                value={moment(this.props.filter[this.props.column.id]).format('DD-MM-YYYY')}
                                ref={ref}
                            />
                            {this.props.filter[this.props.column.id] ?
                                <a
                                    className={`${classes.clearDate}`}
                                    onClick={()=> {
                                        console.log(this)
                                        this.OnChange()
                                    }}
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


