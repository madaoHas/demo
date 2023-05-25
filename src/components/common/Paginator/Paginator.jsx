import React from 'react';
import {Pagination} from '@mui/material'



const Paginator = ({pager, onChangePage, id = 0, info, postId}) => {

    const onClickPage = (e) => {
        if (info === 'news') {
            id === 0 ? onChangePage(null, e.target.innerText, pager.limit) : onChangePage(id, e.target.innerText, pager.limit)
        }
        else if (info === 'comments') {
            onChangePage(postId, e.target.innerText, pager.limit);
        }
        else {
            onChangePage(e.target.innerText, pager.limit);
        }
    }

    if (pager.count > 1) {
        return (
            <Pagination
                count={pager.count}
                onChange={ (e) => { onClickPage(e) } }
            />
        )
    }

}


export default Paginator;
