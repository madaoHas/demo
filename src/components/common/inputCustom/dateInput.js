import classes from "./dateInput.module.css";
import Flatpickr from "react-flatpickr";
import React from "react";
import moment from "moment";


export const DateInput = (props) => {
    const { value, onChange } = props;
    let newdate = '';
    if (value) {
        if (value !== '') {
            newdate = value.split("-").reverse().join("-");
        }
    }

    return (
        <div className={classes.dateContainer}>
            <img src={"/img/Calendar.svg"} className={classes.labelDate} />
            <Flatpickr
                type={props.type}
                className={classes.dateFilter}
                value={newdate !== '' ? newdate : value}
                onChange={text => {
                    onChange(text[0] ? moment(text[0]).format("yyyy-MM-DD") : '');
                }}
                options={{
                    dateFormat: "d-m-Y"
                }}
            />
        </div>
    );
}