import React from "react";
import classes from "./selectInput.module.css";

export const SelectInput = (props) => {
    const onChange = (event) => {
        let select = document.getElementById("selectInput");
        let value = select.value;
        let optionSelect = {}
        let obj = props.values.map(v => v[props.valueType] === value ? {id: v.id, [props.valueType]: v[props.valueType]} : null)
        for (let option = 0; option < obj.length; option++) {
            if (obj[option] != null) {
                optionSelect = obj[option]
            }
        }
        props.onChangeOption(optionSelect);
    };
    return (
        <select className={classes.selectFilter}
                onChange={onChange}
                id={"selectInput"}
                disabled={props.values.length === 0 ? true : false}
                placeholder={props.values.length === 0 ? 'пусто' : ''}
        >
            {props.values.map(v => <option id={v.id} key={v.id} value={v[props.valueType]} className={classes.categoryOption}>{v[props.valueType]}</option>)}
        </select>
    )
}