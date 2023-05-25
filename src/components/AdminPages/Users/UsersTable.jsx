import React, {useEffect} from "react";
import classes from "./UsersTable.module.css";
import {
    ColumnFilter,
    ColumnFilterDate,
    ColumnFilterSelectActive,
    ColumnFilterSelectRole
} from "../../common/ColumnFilter";
import {TableAdmin} from "../../common/TableAdmin";
import { useState } from 'react'
import moment from 'moment'



function UsersTable(props) {
    let [data, setData] = useState([]);
    useEffect( () => {
        setData(props.users)
    },[props.users] )
    const columns = React.useMemo(() => [
            {
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            },
            {
                Header: 'Дата регистрации',
                accessor: 'created_at',
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
                accessor: 'name',
                Filter: ColumnFilter
            },
            {
                Header: 'Фамилия',
                accessor: 'surname',
                Filter: ColumnFilter
            },
            {
                Header: 'Роль',
                accessor: 'role',
                Filter: ColumnFilterSelectRole,
            },
            {
                Header: 'Активен',
                accessor: 'is_active',
                Filter: ColumnFilterSelectActive,
                Cell: ''
},
        ],
        []
    )

    const optionRef = React.createRef();

    if (data[0]) {
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i].profile === 'object') {
                data[i].name = data[i].profile.name
                data[i].surname = data[i].profile.surname
            }
            data[i].created_at = moment(data[i].created_at).format('DD-MM-yyyy');
            if (data[i].role === 1) {
                data[i].role = 'Пользователь'
            }
            if (data[i].role === 10) {
                data[i].role = 'Админ'
            }
        }
    }

    // const data = React.useMemo(() => props.users, [])

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
        else if (valueOption === 'Роль') {
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
            <TableAdmin
                columns={columns}
                data={data}
                linkCom={true}
                updateActive={props.updateActiveUser}
                infoTable={"users"}
                deleteRow={props.deleteUser}
            />
        </div>
    )
}



export default UsersTable;
