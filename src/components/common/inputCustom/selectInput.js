import React, {useState, useEffect} from "react";
import classes from "./selectInput.module.css";

export const SelectInput = (props) => {

    useEffect( () => {
        setDefaultValue(props.value)
    },[props.value] )

    const [defaultValue, setDefaultValue] = useState(props.value);

    const onChange = () => {
        let select = document.getElementById("selectInput");
        let value = select.value;
        let optionSelect = {}
        let obj = props.values.map(v => v[props.valueType] === value ? {id: v.id, [props.valueType]: v[props.valueType]} : null)
        for (let option = 0; option < obj.length; option++) {
            if (obj[option] != null) {
                optionSelect = obj[option]
            }
        }
        setDefaultValue(optionSelect)
        props.onChangeOption(optionSelect);
    };
    return (
        <select className={classes.selectFilter}
                onChange={onChange}
                id={"selectInput"}
                disabled={props.values.length === 0}
                value={defaultValue ? defaultValue.name : ''}
        >
            <option hidden disabled value={''}> -- select an option -- </option>
            {props.values.map(v => <option id={v.id} key={v.id} value={v[props.valueType]} className={classes.categoryOption}>{v[props.valueType]}</option>)}
        </select>
    )
}