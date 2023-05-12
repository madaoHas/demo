import React, {useEffect, useState} from "react";
import classes from "./switchInput.module.css";
import classNames from "classnames";


export const SwitchInput = (props) => {

    useEffect(() => {
        setIsChecked(props.value)
    }, [props.value])

    const [isChecked, setIsChecked] = useState(props.value)

    return (
        <label className={classes.switch}>
            <input
                type="checkbox"
                onChange={(a) => {
                    setIsChecked(a.target.checked)
                    props.onChangeSwitch(a.target.checked)
                }}
                checked={isChecked}
                value={isChecked}
            />
            <span className={classNames(classes.slider, classes.round)}></span>
        </label>
    )
}