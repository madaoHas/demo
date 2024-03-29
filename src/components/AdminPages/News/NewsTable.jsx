import React from "react";
import classes from "../Users/UsersTable.module.css";
import {NewsActiveFilter, NewsCategoriesFilter, NewsDateFilter, NewsDefaultFilter} from "./NewsFilters";
import dateFormat from "dateformat";

import { TableAdmin } from "../../common/TableAdmin";
import { useState } from 'react'
import {useEffect} from "react";
import moment from "moment";


function NewsTable(props) {
    // let [data, setData] = useState([props.news]);
    let data = props.news

    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: NewsDefaultFilter,
                // defaultValue: props.state,
                // table: 'news'
            },
            {
                Header: 'Дата публикации',
                accessor: 'date',
                Filter: NewsDateFilter
            },
            {
                Header: 'Заголовок',
                accessor: 'title',
                Filter: NewsDefaultFilter,
                // defaultValueTitle: ''
            },
            {
                Header: 'Категория',
                accessor: 'category',
                Filter: NewsCategoriesFilter,
            },
            {
                Header: 'Активен',
                accessor: 'is_active',
                Filter: NewsActiveFilter,
            },
        ],
        [{}]
    )

    const optionRef = React.createRef();

    if (data[0]) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category === null) {
                data[i].category = ''
            }
            if (data[i].date.split('-')[0].length === 4) {
                data[i].date = data[i].date.split('-').reverse().join('-')
            }
            if (typeof data[i].category === 'object') {
                data[i].category = data[i].category.name
            }
        }
    }


    let [inputId, setInputId] = useState(true);
    let [inputDate, setInputDate] = useState(false);
    let [inputHeader, setInputHeader] = useState(false);
    let [inputSelectCategory, setInputSelectCategory] = useState(false);
    let [inputSelectActive, setInputSelectActive] = useState(false);

    const ShowInput = () => {
        let elemOnId = document.getElementById('selectFilter')
        let valueOption = elemOnId.value;
        setInputId(false)
        setInputDate(false);
        setInputHeader(false);
        setInputSelectCategory(false);
        setInputSelectActive(false);

        if (valueOption === 'Дата публикации') {
            setInputDate(true);
        }
        else if (valueOption === 'Активен') {
            setInputSelectActive(true);
        }
        else if (valueOption === 'Категория') {
            setInputSelectCategory(true);
        }
        else if (valueOption === 'ID') {
            setInputId(true)
        }
        else if (valueOption === 'Заголовок') {
            setInputHeader(true);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputFilterMobile}>
                <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput()}}>
                    {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
                </select>
                {/*{inputId ? <ColumnFilter column={{id: 'id'}} columns={[1,2,3,4,5]} type={'mobile'} /> : null}*/}
                {/*{inputHeader ? <ColumnFilter column={{id: 'title'}} columns={[1,2,3,4,5]} type={'mobile'} /> : null}*/}
                {/*{inputDate ? <ColumnFilterDate column={{id: 'date'}} columns={[1,2,3,4,5]} type={'mobile'} /> : null}*/}
                {/*{inputSelectCategory ? <ColumnFilterSelectCategory column={{id: 'category', categories: props.categories }} columns={[1,2,3,4,5]} type={'mobile'} /> : null}*/}
                {/*{inputSelectActive ? <ColumnFilterSelectActive column={{id: 'is_active'}} columns={[1,2,3,4,5]} type={'mobile'} /> : null}*/}
            </div>
            <TableAdmin
                columns={columns}
                data={data}
                linkCom={true}
                infoTable={"news"}
                updateActive={props.updateActiveNews}
                deleteRow={props.deleteNews}
            />
        </div>
    )
}

export default NewsTable;
