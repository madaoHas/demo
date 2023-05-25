import NewsOne from "./NewsOne";
import classes from "./News.module.css";
import Paginator from "../../common/Paginator/Paginator";
import React, {useEffect} from "react";

const News = (props) => {
    let idCategory = 0
    useEffect( () => {

    }, [props.pager.count] )



    const selectChange = (event) => {
        idCategory = props.category[event.target.selectedIndex].id-1;

        if (idCategory === 0) {
            props.getNews(null, 1, 8);
        }
        else {
            props.getNews(props.category[event.target.selectedIndex].id-1, 1, 8);
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
            <Paginator
                pager={props.pager}
                onChangePage={props.getNews}
                id={props.categoryId}
                info={'news'}
            />
        </div>
    )
}

export default News;