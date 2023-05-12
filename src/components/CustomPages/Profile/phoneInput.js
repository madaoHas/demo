import InputMask from "react-input-mask";
import React from "react";

export default function PhoneInput(props) {
    return (
        <InputMask
            name={props.field.name}
            className="input"
            mask='(+7) 999 999 9999'
            value={props.field.value}
            onChange={props.field.onChange}>
        </InputMask>
    );
}

