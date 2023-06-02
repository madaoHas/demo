import React from "react";
import classes from "../Users/UsersTable.module.css";
import { ColumnFilter } from "../../common/ColumnFilter";
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


    let [inputId, setInputId] = useState(true);
    let [inputText, setInputText] = useState(false);

    const ShowInput = () => {
        let elemOnId = document.getElementById('selectFilter')
        let valueOption = elemOnId.value;
        setInputId(false)
        setInputText(false);

        if (valueOption === 'ID') {
            setInputId(true)
        }
        else if (valueOption === 'Название категории') {
            setInputText(true);
        }

    }

    return (
        <div className={classes.container}>
            <div className={classes.inputFilterMobile}>
                <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput(setInputText)}}>
                    {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
                </select>
                {inputId ? <ColumnFilter column={{id: 'id'}} columns={[1,2]} type={'mobile'} /> : null}
                {inputText ? <ColumnFilter column={{id: 'name'}} columns={[1,2]} type={'mobile'} />: null}
            </div>
            <TableAdmin
                columns={columns}
                data={data}
                linkCom={false}
                deleteRow={props.deleteCategory}
                infoTable={'categories'}
                updateCategory={props.updateCategory}
            />
        </div>
    )
}

export default CategoriesTable;
