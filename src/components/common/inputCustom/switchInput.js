import React from "react";
import classes from "./switchInput.module.css";
import classNames from "classnames";


export const SwitchInput = (props) => {
    console.log(props.value)
    return (
        <label className={classes.switch}>
            <input
                type="checkbox"
                onChange={(a) => {props.onChangeSwitch(a.target.checked)}}
                value={props.value}
            />
            <span className={classNames(classes.slider, classes.round)}></span>
        </label>
    )
}