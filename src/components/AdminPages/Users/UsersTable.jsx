import React from "react";
import {useMemo} from "react";
import classes from "./UsersTable.module.css";
import classNames from "classnames";
import {ColumnFilter, ColumnFilterDate} from "../../common/ColumnFilter";
import {format} from "date-fns";
import {TableAdmin} from "../../common/TableAdmin";
import { useState } from 'react'
import { Switch } from '@headlessui/react'


function UsersTable(props) {
    console.log(props);
    const [enabled, setEnabled] = useState(false)
    const columns = React.useMemo(
        () => [
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

    const data = React.useMemo(() => props.users, [])

    return (
        <TableAdmin columns={columns} data={data} linkCom={true}/>
    )
}

export default UsersTable;