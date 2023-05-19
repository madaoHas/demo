import React, {useState} from "react";
import classes from "./Paginator.module.css";
import classNames from "classnames";

// let Paginator = (props) => {
//
//     console.log(props);
//
//     // let pagesCount = Math.ceil(props.totalCount/props.pageSize);
//     let pages = [];
//     for (let i = 1; i <= props.count; i++) {
//         pages.push(i);
//     }
//     //
//     // let portionSize = 10;
//     //
//     // let portionCount = Math.ceil(pagesCount/portionSize);
//     let [portionNumber, setPortionNumber] = useState(props.page);
//     let leftPortionPageNumber = (portionNumber - 1) * props.limit;
//     let rightPortionPageNumber = portionNumber * props.limit;
//     //
//     return (
//         <div className={classes.page}>
//                 <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>
//             {pages
//                 .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
//                 .map(p => {
//                     return <span key={p} className={classNames(classes.point, {[classes.selected]: props.currentPage === p})}>{ p }</span>
//                 })}
//                 <button onClick={ () => {setPortionNumber(portionNumber + 1)} }>NEXT</button>
//         </div>
//     )
// }

// export default Paginator;

function Paginator(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (pageNumber) => {
        console.log(pageNumber)
        setCurrentPage(pageNumber);
    }

    const pageNumbers = [];
    for (let i = 1; i <= props.count; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='paginator'>
            {pageNumbers.map(number => (
                <li key={number} className={number === currentPage ? 'active' : null}>
                    <button onClick={() => handleClick(number)}>{number}</button>
                </li>
            ))}
        </ul>
    );
}

export default Paginator;
