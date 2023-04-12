import React from "react";
import {useFilters, useTable} from "react-table";
import classes from "./TableAdmin.module.css";
import {matchSorter} from "match-sorter";
import {NavLink} from "react-router-dom";

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

fuzzyTextFilterFn.autoRemove = val => !val

export const TableAdmin = ({columns, data, linkCom}) => {
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


    return (
        <table {...getTableProps()}>
            {/*<col className={classes.colId}/>*/}
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th{...column.getHeaderProps()}>
                            {column.render('Header')}
                            <div className={classes.filter}>{column.canFilter ? column.render('Filter') : null}</div>
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
                            return <td className={classes.ellipsis} {...cell.getCellProps()}>
                                <span>
                                    {cell.render('Cell')}
                                </span>
                            </td>
                        })}
                        {linkCom ? <td className={classes.link}><NavLink to={"/"}><img src={"/img/linkCom.svg"} /></NavLink></td> : null}
                        <td className={classes.link}><NavLink to={"/"}><img src={"/img/update.svg"} /></NavLink></td>
                        <td className={classes.link}><NavLink to={"/"}><img src={"/img/delete.svg"} /></NavLink></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}