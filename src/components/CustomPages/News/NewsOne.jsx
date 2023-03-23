import classes from "./NewsOne.module.css";
import {NavLink} from "react-router-dom";

const NewsOne = () => {
    return (
        <div className={classes.news}>
            <div className={classes.picture}>
                <div className={classes.dateBlock}>
                    <div className={classes.date}>21.03.2023</div>
                </div>
            </div>
            <img src={"/img/pic.jpeg"} />
            <div className={classes.description}>
                <span className={classes.header}>Заголовок</span>
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure...
                </span>
            </div>
            <div className={classes.more}>
                <NavLink>Подробнее</NavLink>
            </div>
        </div>
    )
}
export default NewsOne;