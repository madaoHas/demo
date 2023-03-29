import classes from "./SelectedNews.module.css";
import Icon from '@mdi/react';
import {mdiClockTimeNineOutline} from '@mdi/js';
import classNames from "classnames";
import {Navigate, NavLink} from "react-router-dom";


const SelectedNews = (props) => {
    return (
        <div className={classes.news}>
            <div className={classes.header}>
                <div className={classes.backBlock}>
                    <NavLink to={"/"} className={classNames(classes.arrow, classes.arrowLeft)}></NavLink>
                    {/*<Icon path={mdiChevronLeft} size={2} />*/}
                    <NavLink to={"/"} className={classes.back}>
                        Назад
                    </NavLink>
                </div>
                <div className={classes.dateBlock}>
                    <Icon path={mdiClockTimeNineOutline} size={1}/>
                    <div className={classes.date}>
                        {props.state.news.date}
                    </div>
                </div>
            </div>
            <div className={classes.newsBlock}>
                <img src={props.state.news.img ? props.state.news.img : '/img/images.jpeg'}/>
                <div className={classes.textBlock}>
                    <div className={classes.textHeader}>
                        {props.state.news.header}
                    </div>
                    <div className={classes.text}>
                        {props.state.news.text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedNews;