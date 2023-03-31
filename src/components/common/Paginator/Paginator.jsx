import React, {useState} from "react";
import classes from "./Paginator.module.css";
import classNames from "classnames";

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalCount/props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionSize = 10;

    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={classes.page}>
            {portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} className={classNames(classes.point, {[classes.selected]: props.currentPage === p})}>{ p }</span>
                })}
            {portionCount > portionNumber &&
                <button onClick={ () => {setPortionNumber(portionNumber + 1)} }>NEXT</button>
            }
        </div>
    )
}

export default Paginator;