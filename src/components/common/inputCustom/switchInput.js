import React from "react";
import classes from "./switchInput.module.css";
import classNames from "classnames";


export const SwitchInput = (props) => {
    return (
        <label className={classes.switch}>
            <input
                type="checkbox"
                onChange={(a) => {props.onChangeSwitch(a.target.checked)}}
            />
            <span className={classNames(classes.slider, classes.round)}></span>
        </label>
    )
}