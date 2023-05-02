import React from "react";
import classes from "../Users/UsersTable.module.css";
import classNames from "classnames";
import { ColumnFilter, ColumnFilterDate } from "../../common/ColumnFilter";
import { TableAdmin } from "../../common/TableAdmin";
import { useState } from 'react'


function CommentsTable(props) {
    const [enabled, setEnabled] = useState(false)
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Дата комментария',
                accessor: 'date',
                // Cell: ({value}) => {
                //     return format(new Date(value), "dd-MM-yyyy")
                // },
                Filter: ColumnFilterDate
            },
            {
                Header: 'ID пользователя',
                accessor: 'idUser',
                Filter: ColumnFilter
            },
            {
                Header: 'Пользователь',
                accessor: 'user',
                Filter: ColumnFilter
            },
            {
                Header: 'Новость',
                accessor: 'news',
                Filter: ColumnFilter
            },
            {
                Header: 'Комментарий',
                accessor: 'comment',
                Filter: ColumnFilter
            },
        ],
        []
    )

    const optionRef = React.createRef();

    const data = React.useMemo(() => props.comments, [])

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
            <TableAdmin columns={columns} data={data} linkCom={false} infoTable={"comments"} />
        </div>
    )
}

export default CommentsTable;
