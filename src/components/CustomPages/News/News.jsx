import NewsOne from "./NewsOne";
import classes from "./News.module.css";
import Paginator from "../../common/Paginator/Paginator";
import React from "react";

const News = (props) => {
    const selectChange = (event) => {
        let idNews = props.category[event.target.selectedIndex].id-1;
        if (idNews === 0) {
            props.getNews(null, 1, 10);
        }
        else {
            props.getNews(props.category[event.target.selectedIndex].id-1, 1, 10);
        }
    }
    return (
        <div className={classes.newsPageContainer}>
            <select className={classes.categorySelect} defaultValue={''} onChange={ (event) => {selectChange(event)} }>
                <option value={''}> Все категории </option>
                {props.category.map(c => <option key={c.id} className={classes.categoryOption}>{c.name}</option>)}
            </select>
            <div className={classes.container}>
                {props.newsUserPage ? props.newsUserPage.map(n => <NewsOne className={classes.newsOne} news={n} key={n.id} />) : null}
            </div>
            <Paginator {...props.pager} />
        </div>
    )
}

export default News;