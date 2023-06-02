import React from "react";
import {useFilters, useTable} from "react-table";
import classes from "./TableAdmin.module.css";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import ModalPage from "./Modal/ModalPage";


export const TableAdmin = ({columns, data, linkCom, infoTable, updateActive, deleteRow, updateCategory}) => {
    const [editingIndex, setEditingIndex] = React.useState(null);
    const [editingValue, setEditingValue] = React.useState("");


    const handleEditButtonClick = (index, value) => {
        setEditingIndex(index);
        setEditingValue(value);
    };

    const handleInputChange = (event) => {
        setEditingValue(event.target.value);
    };

    const handleSaveButtonClick = (index, oldName) => {
        if (oldName !== editingValue) {
            updateCategory(index, editingValue);
        }
        setEditingIndex(null);
        setEditingValue("");
    };


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
            columns,
            data,
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
                                <div className={classes.filter}>
                                    {column.canFilter ? column.render('Filter') : null}
                                </div>
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
                            {row.cells.map((cell) => {
                                return <td className={classNames(classes.ellipsis, {[classes.switch]: cell.column.Header === "Активен"})}
                                           {...cell.getCellProps()}
                                           data-label={cell.column.Header !== "Активен" ? cell.column.Header : null}>
                                <span className={classes.rowTable}>
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
                                        (editingIndex === cell.row.id && cell.column.Header !== "ID") ? (
                                            <input type="text" value={editingValue} onChange={handleInputChange} className={classes.inputUpdate} />
                                        ) : (
                                            cell.render('Cell')
                                        )}
                                </span>
                                </td>
                            })}
                            {linkCom ?
                                <td className={classNames(classes.link, classes.navLink)}>
                                    <NavLink to={"/admin/comments"} state={infoTable === 'users' ? {id: row.values.id} : {title: row.values.title}}><img src={"/img/linkCom.svg"} alt={''}/></NavLink>
                                </td> : null
                            }
                            <td className={classNames(classes.link)}>
                                {infoTable !== 'categories' ?
                                    <NavLink state={{row: row.values}} to={"/admin/" + infoTable + "/update"}>
                                    <img src={"/img/update.svg"} alt={''} />
                                    </NavLink> :
                                    (editingIndex === row.id) ? (
                                            <button className={classNames(classes.link, classes.buttonUpdate)}
                                                    onClick={() => handleSaveButtonClick(row.values.id, row.original.name)}>
                                                <img src={"/img/success.svg"} alt={''} className={classes.successImg} />
                                            </button>
                                    ) : (
                                        <button className={classNames(classes.link, classes.buttonUpdate)}
                                                onClick={() => handleEditButtonClick(row.id, row.values.name)}>
                                            <img src={"/img/update.svg"} alt={''} />
                                        </button>
                                    )}

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