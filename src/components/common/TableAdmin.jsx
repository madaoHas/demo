import React from "react";
import {useFilters, useTable} from "react-table";
import classes from "./TableAdmin.module.css";
import {matchSorter} from "match-sorter";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {deleteNews, updateActiveNews} from "../../redux/newsAdminReducer";

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

fuzzyTextFilterFn.autoRemove = val => !val

export const TableAdmin = ({columns, data, linkCom, infoTable, updateActiveNews, deleteNews}) => {
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
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({
            columns,
            data,
            filterTypes,
        },
        useFilters,
    )

    const onDeleteRow = (id) => {
        if (infoTable === 'news') {
            deleteNews(id)
        }
    }

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
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td className={classNames(classes.ellipsis, {[classes.switch]: cell.column.Header === "Активен"})}
                                           {...cell.getCellProps()}
                                           data-label={cell.column.Header != "Активен" ? cell.column.Header : null}>
                                <span>
                                    {cell.column.Header === "Активен" ?
                                        <label className={classes.switch}>
                                            <input type="checkbox"
                                                   checked={cell.row.values.is_active}
                                                   onChange={ ()=>{
                                                       cell.row.values.is_active = !cell.row.values.is_active;
                                                       updateActiveNews(cell.row.values.id, cell.row.values.is_active)
                                                   } } />
                                            <span className={classNames(classes.slider, classes.round)}></span>
                                        </label> :
                                        cell.render('Cell')}
                                </span>
                                </td>
                            })}
                            {linkCom ?
                                <td className={classNames(classes.link, classes.navLink)}>
                                    <NavLink to={"/"}><img src={"/img/linkCom.svg"}/></NavLink>
                                </td> : null
                            }
                            <td className={classNames(classes.link)}>
                                <NavLink state={{row: row.values}} to={"/admin/" + infoTable + "/update"}>
                                    <img src={"/img/update.svg"} />
                                </NavLink>
                            </td>
                            <td className={classNames(classes.link, classes.deleteLink)}>
                                <NavLink><img src={"/img/delete.svg"} onClick={() => { onDeleteRow(row.values.id) }}/></NavLink>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}