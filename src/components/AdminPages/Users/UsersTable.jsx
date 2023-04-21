import React from "react";
import classes from "./UsersTable.module.css";
import classNames from "classnames";
import {ColumnFilter, ColumnFilterDate} from "../../common/ColumnFilter";
import {TableAdmin} from "../../common/TableAdmin";
import { useState } from 'react'



function UsersTable(props) {
    const [enabled, setEnabled] = useState(false)
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Дата регистрации',
                accessor: 'date',
                // Cell: ({value}) => {
                //     return format(new Date(value), "dd-MM-yyyy")
                // },
                Filter: ColumnFilterDate
            },
            {
                Header: 'e-mail',
                accessor: 'email',
                Filter: ColumnFilter
            },
            {
                Header: 'Имя',
                accessor: 'firstName',
                Filter: ColumnFilter
            },
            {
                Header: 'Фамилия',
                accessor: 'lastName',
                Filter: ColumnFilter
            },
            {
                Header: 'Роль',
                accessor: 'role',
                Filter: ColumnFilter
            },
            {
                Header: 'Активен',
                accessor: 'active',
                Filter: ColumnFilter,
                Cell: <label className={classes.switch}><input type="checkbox" /><span className={classNames(classes.slider, classes.round)}></span></label>

},
        ],
        []
    )

    const optionRef = React.createRef();

    const data = React.useMemo(() => props.users, [])

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
            setInputDate(true);
        }
        else if (valueOption === 'Активен' || valueOption === 'Роль') {
            setInputSelect(true);
        }
        else {
            setInputText(true);
        }
    }

    return (
        <div className={classes.container}>
            <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput(optionRef, setInputText, setInputDate, setInputSelect)}}>
                {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
            </select>
            {console.log(columns)}
            {inputDate ? <ColumnFilterDate column={""} /> : null}
            {inputText ? <ColumnFilter column={""} />: null}
            {inputSelect ? <select ref={optionRef} className={classes.selectFilter}></select> : null}
            <TableAdmin columns={columns} data={data} linkCom={true} />
        </div>
    )
}



export default UsersTable;
