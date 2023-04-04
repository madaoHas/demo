import classes from "./TableAdmin.module.css";
import React from "react";

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
