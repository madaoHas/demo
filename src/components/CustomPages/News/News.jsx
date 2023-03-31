import NewsOne from "./NewsOne";
import classes from "./News.module.css";
import Paginator from "../../common/Paginator/Paginator";

const News = (props) => {
    return (
        <div>
            <div className={classes.container}>
                {props.news.map(n => <NewsOne news={n} key={n.id} />)}

                {/*<NewsOne />*/}
            </div>
            <Paginator totalCount={props.news.totalNewsCount}
                       pageSize={props.news.pageSize}
                       currentPage={props.news.currentPage} />
        </div>
    )
}

export default News;