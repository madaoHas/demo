import NewsOne from "./NewsOne";
import classes from "./News.module.css";
import Paginator from "../../common/Paginator/Paginator";
import React from "react";

const News = (props) => {
    console.log(props)
    return (
        <div className={classes.newsPageContainer}>
            <select className={classes.categorySelect} defaultValue={''}>
                <option hidden disabled value={''}> -- select an option -- </option>
                {props.category.map(c => <option key={c.id} className={classes.categoryOption}>{c.name}</option>)}
            </select>
            <div className={classes.container}>
                {props.newsUserPage.map(n => <NewsOne news={n} key={n.id} />)}
            </div>
            <Paginator totalCount={props.newsUserPage.totalNewsCount}
                       pageSize={props.newsUserPage.pageSize}
                       currentPage={props.newsUserPage.currentPage} />
        </div>
    )
}

export default News;