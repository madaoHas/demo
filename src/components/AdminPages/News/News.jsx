import {NavLink} from "react-router-dom";
import classes from "../Users/Users.module.css"
import NewsTable from "./NewsTable";

const News = (props) => {
    return (
        <div className={classes.usersAdmin}>
            <div className={classes.usersContainer}>
                <div className={classes.header}>
                    <div className={classes.headerName}>Опубликованные новости</div>
                    <div className={classes.headerLink}><NavLink to={"/"}>Добавить</NavLink></div>
                </div>
                <NewsTable {...props} />
            </div>
        </div>
    )
}

export default News;