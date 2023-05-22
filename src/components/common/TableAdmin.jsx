import React from "react";
import {useFilters, useTable} from "react-table";
import classes from "./TableAdmin.module.css";
import {matchSorter} from "match-sorter";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import ModalPage from "./Modal/ModalPage";

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

fuzzyTextFilterFn.autoRemove = val => !val

export const TableAdmin = ({columns, data, linkCom, infoTable, updateActive, deleteRow}) => {
    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
            columns,
            data,
            filterTypes,
        },
        useFilters,
    )

    const onDeleteRow = (id) => {
        deleteRow(id)
    }

    const [isModal, setModal] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const handleButtonClick = (row) => {
        setSelectedRow(row);
    };


    return (
        <div className={classes.tableWrap}>
            <table className={classes.table} {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th{...column.getHeaderProps()}>
                                {column.render('Header')}
                                <div
                                    className={classes.filter}>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td className={classNames(classes.ellipsis, {[classes.switch]: cell.column.Header === "Активен"})}
                                           {...cell.getCellProps()}
                                           data-label={cell.column.Header !== "Активен" ? cell.column.Header : null}>
                                <span>
                                    {cell.column.Header === "Активен" ?
                                        <label className={classes.switch}>
                                            <input type="checkbox"
                                                   checked={cell.row.original.is_active}
                                                   onChange={ () => {
                                                       if (infoTable === 'users') {
                                                           handleButtonClick({
                                                               id: cell.row.original.id,
                                                               active: !cell.row.original.is_active,
                                                               content: !cell.row.original.is_active ? 'Вы уверены, что хотите активировать аккаунт' : 'Вы уверены, что хотите деактивировать аккаунт?'
                                                           })
                                                           setModal(true);
                                                       }
                                                       else if (infoTable === 'news') {
                                                           cell.row.original.is_active = !cell.row.original.is_active;
                                                           updateActive(cell.row.original.id, cell.row.original.is_active)
                                                       }
                                                   } } />
                                            <span className={classNames(classes.slider, classes.round)} />
                                        </label> :
                                        cell.render('Cell')}
                                </span>
                                </td>
                            })}
                            {linkCom ?
                                <td className={classNames(classes.link, classes.navLink)}>
                                    <NavLink to={"/"}><img src={"/img/linkCom.svg"} alt={''}/></NavLink>
                                </td> : null
                            }
                            <td className={classNames(classes.link)}>
                                <NavLink state={{row: row.values}} to={"/admin/" + infoTable + "/update"}>
                                    <img src={"/img/update.svg"} alt={''} />
                                </NavLink>
                            </td>
                            <td className={classNames(classes.link, classes.deleteLink)}>
                                <NavLink><img src={"/img/delete.svg"} onClick={() => { onDeleteRow(row.values.id) }} alt={''}/></NavLink>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {isModal && (
                <ModalPage
                    isVisible={isModal}
                    content={<p>{selectedRow.content}</p>}
                    onClose={() => setModal(false)}
                    updateActive={updateActive}
                    id={selectedRow.id}
                    active={selectedRow.active}
                />
            )}
        </div>
    )
}