import React, {useEffect} from "react";
import classes from "../Users/UsersTable.module.css";
import { ColumnFilter, ColumnFilterDate } from "../../common/ColumnFilter";
import { TableAdmin } from "../../common/TableAdmin";
import { useState } from 'react'
import moment from "moment";


function CommentsTable(props) {
    let [data, setData] = useState([]);
    useEffect( () => {
        setData(props.comments)
    },[props.comments] )
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Дата комментария',
                accessor: 'created_at',
                // Cell: ({value}) => {
                //     return format(new Date(value), "dd-MM-yyyy")
                // },
                Filter: ColumnFilterDate
            },
            {
                Header: 'ID пользователя',
                accessor: 'user_id',
                Filter: ColumnFilter,
                defaultValue: props.state
            },
            {
                Header: 'Пользователь',
                accessor: 'email',
                Filter: ColumnFilter
            },
            {
                Header: 'Новость',
                accessor: 'title',
                Filter: ColumnFilter,
                defaultValueTitle: props.state
            },
            {
                Header: 'Комментарий',
                accessor: 'text',
                Filter: ColumnFilter
            },
        ],
        []
    )

    if (data[0]) {
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i].user === 'object') {
                data[i].email = data[i].user.email
            }
            if (typeof data[i].post === 'object') {
                data[i].title = data[i].post.title
            }
            data[i].created_at = moment(data[i].created_at).format('DD-MM-yyyy');
        }
    }

    const optionRef = React.createRef();

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
            <TableAdmin
                columns={columns}
                data={data}
                linkCom={false}
                infoTable={"comments"}
                deleteRow={props.deleteComment}
            />
        </div>
    )
}

export default CommentsTable;
