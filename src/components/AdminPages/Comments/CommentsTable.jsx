import React, {useEffect} from "react";
import classes from "../Users/UsersTable.module.css";
import { CommentsDefaultFilter, CommentsDateFilter } from "./CommentsFilters";
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
                Filter: CommentsDefaultFilter
            },
            {
                Header: 'Дата комментария',
                accessor: 'created_at',
                Filter: CommentsDateFilter
            },
            {
                Header: 'ID пользователя',
                accessor: 'user_id',
                Filter: CommentsDefaultFilter,
                // defaultValue: props.state
            },
            {
                Header: 'Пользователь',
                accessor: 'email',
                Filter: CommentsDefaultFilter
            },
            {
                Header: 'Новость',
                accessor: 'title',
                Filter: CommentsDefaultFilter,
                // defaultValueTitle: props.state
            },
            {
                Header: 'Комментарий',
                accessor: 'text',
                Filter: CommentsDefaultFilter
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


    let [inputId, setInputId] = useState(true);
    let [inputDate, setInputDate] = useState(false);
    let [inputIdUser, setInputIdUser] = useState(false);
    let [inputUser, setInputUser] = useState(false);
    let [inputNews, setInputNews] = useState(false);
    let [inputComment, setInputComment] = useState(false);

    const ShowInput = () => {
        let elemOnId = document.getElementById('selectFilter')
        let valueOption = elemOnId.value;

        setInputId(false)
        setInputDate(false);
        setInputIdUser(false);
        setInputUser(false);
        setInputNews(false);
        setInputComment(false);

        if (valueOption === 'Дата комментария') {
            setInputDate(true);
        }
        else if (valueOption === 'ID') {
            setInputId(true)
        }
        else if (valueOption === 'ID пользователя') {
            setInputIdUser(true)
        }
        else if (valueOption === 'Пользователь') {
            setInputUser(true)
        }
        else if (valueOption === 'Новость') {
            setInputNews(true)
        }
        else if (valueOption === 'Комментарий') {
            setInputComment(true)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.inputFilterMobile}>
                <select className={classes.selectFilter} id={"selectFilter"} onChange={()=>{ShowInput()}}
                        defaultValue={props.state ? (props.state.id ? 'ID пользователя' : 'Новость') : null}
                >
                    {columns.map(o => <option key={o.accessor} value={o.Header} className={classes.categoryOption}>{o.Header}</option>)}
                </select>
                {/*{inputId ? <ColumnFilter column={{id: 'id'}} columns={[1,2,3,4,5,6]} type={'mobile'} />: null}*/}
                {/*{inputIdUser ? <ColumnFilter column={{ id: 'user_id', defaultValue: props.state }} columns={[1,2,3,4,5,6]} type={'mobile'} />: null}*/}
                {/*{inputUser ? <ColumnFilter column={{id: 'email'}} columns={[1,2,3,4,5,6]} type={'mobile'} />: null}*/}
                {/*{inputNews ? <ColumnFilter column={{ id: 'title', defaultValueTitle: props.state }} columns={[1,2,3,4,5,6]} type={'mobile'} />: null}*/}
                {/*{inputComment ? <ColumnFilter column={{id: 'text'}} columns={[1,2,3,4,5,6]} type={'mobile'} />: null}*/}
                {/*{inputDate ? <ColumnFilterDate column={{id: 'created_at'}} columns={[1,2,3,4,5,6]} type={'mobile'} /> : null}*/}
            </div>
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
