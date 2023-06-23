import NewsOne from "./NewsOne";
import classes from "./News.module.css";
import Paginator from "../../common/Paginator/Paginator";
import React from "react";
import {setCategoryId} from "../../../redux/newsReducer";

const News = (props) => {

    const selectChange = (event) => {

        let selectedIndex = event.target.selectedIndex;

        if (selectedIndex === 0) {
            props.setCategoryId(null);
        }
        else {
            props.setCategoryId(event.target.value);
        }

    }

    return (
        <div className={classes.newsPageContainer}>
            <select
                className={classes.categorySelect} defaultValue={''}
                onChange={ (event) => {selectChange(event)} }
                value={props.categoryId}
            >
                <option value={''}> Все категории </option>
                {props.category.map(c => <option key={c.id} value={c.id} className={classes.categoryOption}>{c.name}</option>)}
            </select>
            <div className={classes.container}>
                {props.newsUserPage ? props.newsUserPage.map(n => <NewsOne className={classes.newsOne} news={n} key={n.id} />) : null}
            </div>
            <Paginator
                pagesCount={props.pagesCount}
                setPage={props.changePage}
            />
        </div>
    )
}

export default News;