import React from "react";
import classes from "../Users/UsersTable.module.css";
import classNames from "classnames";
import { ColumnFilter, ColumnFilterDate } from "../../common/ColumnFilter";
import { TableAdmin } from "../../common/TableAdmin";
import { useState } from 'react'


function CategoriesTable(props) {
    const [enabled, setEnabled] = useState(false)
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Название категории',
                accessor: 'category',
                Filter: ColumnFilter
            },
        ],
        []
    )

    const optionRef = React.createRef();

    const data = React.useMemo(() => props.categories, [])

    let [inputText, setInputText] = useState(false);
    let [inputDate, setInputDate] = useState(false);
    let [inputSelect, setInputSelect] = useState(false);

    const ShowInput = () => {
        let valueOption = optionRef.current.value;
        console.log(valueOption);
        setInputText(false);
        setInputDate(false);
        setInputSelect(false);

        if (valueOption === 'Дата регистрации') {
            console.log('date!')
            setInputDate(true);
        }
        else if (valueOption === 'Активен') {
            setInputSelect(true);
        }
        else if (valueOption === 'Категория') {
            setInputSelect(true);
        }
        else {
            setInputText(true);
        }
        console.log('inputText - ' + inputText);
        console.log('inputDate - ' + inputDate);
        console.log('inputSelect - ' + inputSelect);
    }

    return (
        <div className={classes.container}>
            <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput(setInputText, setInputDate, setInputSelect)}}>
                {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
            </select>
            {inputDate ? <ColumnFilterDate column={""} /> : null}
            {inputText ? <ColumnFilter column={""} />: null}
            {inputSelect ? <select ref={optionRef} className={classes.selectFilter}></select> : null}
            <TableAdmin columns={columns} data={data} linkCom={false} />
        </div>
    )
}

export default CategoriesTable;
