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


    let [inputId, setInputId] = useState(true);
    let [inputDate, setInputDate] = useState(false);
    let [inputEmail, setInputEmail] = useState(false);
    let [inputName, setInputName] = useState(false);
    let [inputSurname, setInputSurname] = useState(false);
    let [inputSelectRole, setInputSelectRole] = useState(false);
    let [inputSelectActive, setInputSelectActive] = useState(false);

    const ShowInput = () => {
        let elemOnId = document.getElementById('selectFilter')
        let valueOption = elemOnId.value;
        setInputId(false)
        setInputDate(false);
        setInputEmail(false);
        setInputName(false);
        setInputSurname(false);
        setInputSelectRole(false);
        setInputSelectActive(false);

        if (valueOption === 'Дата регистрации') {
            setInputDate(true);
        }
        else if (valueOption === 'Активен') {
            setInputSelectActive(true);
        }
        else if (valueOption === 'Роль') {
            setInputSelectRole(true);
        }
        else if (valueOption === 'ID') {
            setInputId(true)
        }
        else if (valueOption === 'e-mail') {
            setInputEmail(true)
        }
        else if (valueOption === 'Имя') {
            setInputName(true)
        }
        else if (valueOption === 'Фамилия') {
            setInputSurname(true)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputFilterMobile}>
                <select ref={optionRef} className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput()}}>
                    {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
                </select>
                {inputId ? <ColumnFilter column={{id: 'id'}} columns={[1,2,3,4,5,6,7]} type={'mobile'} /> : null}
                {inputEmail ? <ColumnFilter column={{id: 'email'}} columns={[1,2,3,4,5,6,7]} type={'mobile'} /> : null}
                {inputName ? <ColumnFilter column={{id: 'name'}} columns={[1,2,3,4,5,6,7]} type={'mobile'} /> : null}
                {inputSurname ? <ColumnFilter column={{id: 'surname'}} columns={[1,2,3,4,5,6,7]} type={'mobile'} /> : null}
                {inputDate ? <ColumnFilterDate column={{id: 'created_at'}} columns={[1,2,3,4,5,6,7]} type={'mobile'} /> : null}
                {inputSelectRole ? <ColumnFilterSelectRole column={{id: 'role'}} columns={[1,2,3,4,5,6,7]} className={classes.selectFilter} type={'mobile'} /> : null}
                {inputSelectActive ? <ColumnFilterSelectActive column={{id: 'is_active'}} columns={[1,2,3,4,5,6,7]} className={classes.selectFilter} type={'mobile'} /> : null}
            </div>
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
