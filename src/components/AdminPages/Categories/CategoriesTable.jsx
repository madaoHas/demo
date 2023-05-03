import React from "react";
import classes from "../Users/UsersTable.module.css";
import classNames from "classnames";
import { ColumnFilter, ColumnFilterDate } from "../../common/ColumnFilter";
import { TableAdmin } from "../../common/TableAdmin";
import { useState } from 'react'


function CategoriesTable(props) {
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Название категории',
                accessor: 'name',
                Filter: ColumnFilter
            },
        ],
        []
    )

    const optionRef = React.createRef();

    const data = props.categories

    let [inputText, setInputText] = useState(false);

    const ShowInput = () => {
        let valueOption = optionRef.current.value;
        console.log(valueOption);
        setInputText(false);

        setInputText(true);
        console.log('inputText - ' + inputText);
    }

    return (
        <div className={classes.container}>
            <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput(setInputText)}}>
                {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
            </select>
            {inputText ? <ColumnFilter column={""} />: null}
            <TableAdmin columns={columns} data={data} linkCom={false} />
        </div>
    )
}

export default CategoriesTable;
