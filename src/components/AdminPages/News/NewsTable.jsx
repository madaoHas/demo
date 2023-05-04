import React from "react";
import classes from "../Users/UsersTable.module.css";
import classNames from "classnames";
import { ColumnFilter, ColumnFilterDate } from "../../common/ColumnFilter";
import { TableAdmin } from "../../common/TableAdmin";
import { useState } from 'react'
import {useEffect} from "react";


function NewsTable(props) {
    let [data, setData] = useState([]);
    useEffect( () => {
        setData(props.news)
    },[props.news] )
    // const [enabled, setEnabled] = useState(false)
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Дата публикации',
                accessor: 'date',
                // Cell: ({value}) => {
                //     return format(new Date(value), "dd-MM-yyyy")
                // },
                Filter: ColumnFilterDate
            },
            {
                Header: 'Заголовок',
                accessor: 'title',
                Filter: ColumnFilter
            },
            {
                Header: 'Категория',
                accessor: 'category',
                Filter: ColumnFilter
            },
            {
                Header: 'Активен',
                accessor: 'is_active',
                Filter: ColumnFilter,
                Cell: <label className={classes.switch}><input type="checkbox" /><span className={classNames(classes.slider, classes.round)}></span></label>
            },
        ],
        []
    )

    const optionRef = React.createRef();
    if (data[0]) {
        for (let i = 0; i < data.length; i++) {
            data[i].category = data[i].category.name
        }
    }
    
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
    }

    return (
        <div className={classes.container}>
            <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput(setInputText, setInputDate, setInputSelect)}}>
                {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
            </select>
            {inputDate ? <ColumnFilterDate column={""} /> : null}
            {inputText ? <ColumnFilter column={""} />: null}
            {inputSelect ? <select ref={optionRef} className={classes.selectFilter}></select> : null}
            <TableAdmin columns={columns} data={data} linkCom={true} infoTable={"news"} />
        </div>
    )
}

export default NewsTable;
