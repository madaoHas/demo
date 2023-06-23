import React from 'react';
import {Pagination} from '@mui/material'



const Paginator = ({setPage, pagesCount}) => {

    if (pagesCount > 1) {
        return (
            <Pagination onChange={(e)=>{
                setPage(e.target.innerText)
            }}
                        count={pagesCount}
            />
        )
    }

}


export default Paginator;
