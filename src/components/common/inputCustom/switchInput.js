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
                disabled={props.disabled}
                type="checkbox"
                onChange={(a) => {
                    props.onChange(props.setFieldValue, "is_active", a.target.checked)
                    setIsChecked(a.target.checked)
                }}
                checked={isChecked}
                value={isChecked}
            />
            <span className={classNames(classes.slider, classes.round)} />
        </label>
    )
}