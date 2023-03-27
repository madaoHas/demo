import NewsOne from "./NewsOne";
import classes from "./News.module.css";

const News = (props) => {
    return (
        <div className={classes.container}>
            {props.news.map(n => <NewsOne news={n} key={n.id} />)}

            {/*<NewsOne />*/}
        </div>
    )
}

export default News;