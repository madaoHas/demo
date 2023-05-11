import classes from "./NewsOne.module.css";
import {NavLink} from "react-router-dom";
import Icon from '@mdi/react';
import {mdiClockTimeNineOutline} from '@mdi/js';

const NewsOne = (props) => {
    return (
        <div className={classes.news}>
            <div className={classes.picture}>
                <div className={classes.dateBlock}>
                    <Icon path={mdiClockTimeNineOutline} size={0.8}/>
                    <div className={classes.date}>{props.news.date}</div>
                </div>
            </div>
            <img src={props.news.preview_image_url ? process.env.REACT_APP_URL_BASE + props.news.preview_image_url : '/img/grey.jpeg'} />
            <div className={classes.description}>
                <div className={classes.headerContainer}>
                    <span className={classes.header}>{props.news.title}</span>
                    <span className={classes.category}>{props.news.category.name}</span>
                </div>
                <span className={classes.textNews}>
                    {props.news.preview_text}
                </span>
            </div>
            <div className={classes.more}>
                <NavLink to={"/news/"+props.news.id} state={{news: props.news.id}} className={"has-text-white"}>Подробнее</NavLink>
            </div>
        </div>
    )
}
export default NewsOne;