import classes from "./NewsOne.module.css";
import {NavLink} from "react-router-dom";

const NewsOne = (props) => {
    return (
        <div className={classes.news}>
            <div className={classes.picture}>
                <div className={classes.dateBlock}>
                    <div className={classes.date}>{props.news.date}</div>
                </div>
            </div>
            <img src={props.news.img ? props.news.img : '/img/images.jpeg'} />
            <div className={classes.description}>
                <span className={classes.header}>{props.news.header}</span>
                <span>
                    {props.news.text}
                </span>
            </div>
            <div className={classes.more}>
                <NavLink to={"/news/"+props.news.id} state={{news: props.news}} className={"has-text-white"}>Подробнее</NavLink>
            </div>
        </div>
    )
}
export default NewsOne;