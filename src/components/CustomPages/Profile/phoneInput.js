import InputMask from "react-input-mask";
import React from "react";

export default function PhoneInput(props) {
    return (
        <InputMask
            disabled={props.disabled}
            name={props.field.name}
            className={props.className ? props.className : "input"}
            mask='+7 999 999 9999'
            value={props.field.value}
            onChange={(e) => props.onChange(props.setFieldValue, "phone_number", e.target.value.split(" ").join(""))}
        />
    );
}

