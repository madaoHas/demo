import classes from "./ColumnFilter.module.css";
import React from "react";
import flatpickr from "flatpickr";
import moment from "moment";
import {format} from "date-fns";
import {useRef, useCallback} from "react";
import Flatpickr from "react-flatpickr";


export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
        <input
            className={classes.inputFilter}
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
        />
    )
}

export const ColumnFilterDate = ({ column }) => {
    const { filterValue, setFilter } = column;

    return (
        <>
            <img src={"/img/Calendar.svg"} className={classes.labelDate} />
            <Flatpickr
                className={classes.dateFilter}
                value={filterValue || ''}
                onChange={e => {
                   setFilter(e[0] ? moment(e[0]).format("DD-MM-yyyy") : undefined) // Set undefined to remove the filter entirely
               }}
                options={{
                    dateFormat: "d-m-Y"
                }}
            />
        </>
        // <input type="date"
        //        className={classes.inputFilter}
        //        ref={inputRef}
        //        value={filterValue || ''}
        //        onChange={e => {
        //            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        //        }}
        // />
    );
}
