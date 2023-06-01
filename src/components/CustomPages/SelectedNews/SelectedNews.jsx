import classes from "./SelectedNews.module.css";
import Icon from '@mdi/react';
import {mdiClockTimeNineOutline} from '@mdi/js';
import classNames from "classnames";
import {NavLink} from "react-router-dom";


const SelectedNews = (props) => {
    return (
        <div className={classes.news}>
            <div className={classes.header}>
                <div className={classes.backBlock}>
                    <NavLink to={"/"} className={classNames(classes.arrow, classes.arrowLeft)}></NavLink>
                    <NavLink to={"/"} className={classes.back}>
                        Назад
                    </NavLink>
                </div>
                <div className={classes.categoryDateBlock}>
                    <div className={classes.dateBlock}>
                        <Icon path={mdiClockTimeNineOutline} size={1} className={classes.clock} />
                        <div className={classes.date}>
                            {props.date.split("-").reverse().join(".")}
                        </div>
                    </div>
                    <div className={classes.category}>{props.category?.name}</div>
                </div>
            </div>
            <div className={classes.newsBlock}>
                <img src={props.text_image_url ? process.env.REACT_APP_URL_BASE + props.text_image_url.slice(7) : null}/>
                <div className={classes.textBlock}>
                    <div className={classes.textHeader}>
                        {props.title}
                    </div>
                    <div className={classes.text}>
                        {props.text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedNews;